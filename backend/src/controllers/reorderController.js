const pool = require("../config/db");
const reorderQueue = require("../queues/reorderQueue");
const generateOTP = require("../utils/generateOTP");


// Get all reorder requests
const getReorders = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM reorder_requests
            ORDER BY created_at DESC;
        `);

        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Add reorder request to BullMQ Queue
// Add reorder request to BullMQ Queue
const createReorder = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        // Get product details
        const productResult = await pool.query(
            `SELECT * FROM products WHERE id = $1`,
            [product_id]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const product = productResult.rows[0];

        // Calculate total price
        const totalPrice = Number(product.cost_price) * Number(quantity);

        // OTP logic
        let status = "Pending";
        let otp = null;

        if (totalPrice > 50000) {
            status = "Pending Approval";
            otp = generateOTP();
        }

        // Create ONE reorder record
        const reorderResult = await pool.query(
            `
            INSERT INTO reorder_requests
            (
                product_id,
                product_name,
                supplier_name,
                quantity_ordered,
                total_price,
                status,
                otp,
                otp_verified
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;
            `,
            [
                product.id,
                product.product_name,
                product.supplier_name,
                quantity,
                totalPrice,
                status,
                otp,
                false
            ]
        );

        const reorder = reorderResult.rows[0];

        // Queue only if OTP is NOT required
        let jobId = null;

        if (status === "Pending") {

            const job = await reorderQueue.add(
                "create-reorder",
                {
                    reorderId: reorder.id
                },
                {
                    attempts: 3,
                    backoff: {
                        type: "exponential",
                        delay: 5000
                    }
                }
            );

            jobId = job.id;
        }

        return res.status(201).json({
            success: true,
            message:
                status === "Pending"
                    ? "Reorder request added to processing queue."
                    : "High-value order created. OTP approval required.",
            reorder,
            otpRequired: status === "Pending Approval",
            jobId
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const verifyOTP = async (req, res) => {

    try {

        const { reorderId, otp } = req.body;

        const result = await pool.query(
            `
            SELECT *
            FROM reorder_requests
            WHERE id = $1
            `,
            [reorderId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Reorder not found"
            });
        }

        const reorder = result.rows[0];

        if (reorder.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        await pool.query(
            `
            UPDATE reorder_requests
            SET
                otp_verified = true,
                status = 'Pending'
            WHERE id = $1
            `,
            [reorderId]
        );

        const job = await reorderQueue.add(
            "create-reorder",
            {
                reorderId
            },
            {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 5000
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "OTP verified successfully.",
            jobId: job.id
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



module.exports = {
    getReorders,
    createReorder,
    verifyOTP
};