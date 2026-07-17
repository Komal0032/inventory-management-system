exports.up = (pgm) => {

    pgm.createTable("products", {

        id: {
            type: "serial",
            primaryKey: true
        },

        product_name: {
            type: "varchar(100)",
            notNull: true
        },

        sku: {
            type: "varchar(50)",
            notNull: true,
            unique: true
        },

        available_quantity: {
            type: "integer",
            notNull: true,
            default: 0
        },

        low_stock_threshold: {
            type: "integer",
            notNull: true
        },

        cost_price: {
            type: "decimal(10,2)",
            notNull: true
        },

        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        },

        updated_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp")
        }

    });

};


exports.down = (pgm) => {

    pgm.dropTable("products");

};