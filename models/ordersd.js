const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'order_detail',
    {
        identifier: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: Sequelize.INTEGER
        },
        item_name: {
            type: Sequelize.STRING
        },
        unit_price: {
            type: Sequelize.FLOAT
        },
        quantity: {
            type: Sequelize.FLOAT
        },
        total_price: {
            type: Sequelize.FLOAT
        },
    },
    {
        timestamps: false
    }
)