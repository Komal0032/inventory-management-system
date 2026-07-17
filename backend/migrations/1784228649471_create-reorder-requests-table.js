exports.up = (pgm) => {

    pgm.createTable("reorder_requests", {

        id: {
            type: "serial",
            primaryKey: true
        },

        product_id: {
            type: "integer",
            notNull: true
        },

        product_name: {
            type: "varchar(100)",
            notNull: true
        },

        supplier_name: {
            type: "varchar(100)",
            notNull: true
        },

        quantity_ordered: {
            type: "integer",
            notNull: true
        },

        total_price: {
            type: "decimal(10,2)",
            notNull: true
        },

        status: {
            type: "varchar(50)",
            default: "Pending"
        },

        otp: {
            type: "varchar(10)"
        },

        otp_verified: {
            type: "boolean",
            default: false
        },

        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }

    });


    pgm.addConstraint(
        "reorder_requests",
        "fk_product",
        {
            foreignKeys: {
                columns: "product_id",
                references: "products(id)",
                onDelete: "CASCADE"
            }
        }
    );

};


exports.down = (pgm) => {

    pgm.dropTable("reorder_requests");

};