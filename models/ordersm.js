const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'order',
    {
        identifier: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        creator_id: {
            type: Sequelize.INTEGER
        },
        created: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.NOW
        },
        customer_name: {
            type: Sequelize.STRING
        },
        contact_number: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        facebook: {
            type: Sequelize.STRING,
        },
        instagram: {
            type: Sequelize.STRING,
        },
        deadline: {
            type: Sequelize.STRING,
        },
        pickup_location: {
            type: Sequelize.STRING,
        },
        delivery_method: {
            type: Sequelize.STRING,
        },
        delivery_address: {
            type: Sequelize.STRING,
        },
        discount_type: {
            type: Sequelize.STRING,
        },
        discount_value: {
            type: Sequelize.FLOAT,
        },
        total_amount: {
            type: Sequelize.FLOAT,
        },
        payment_status: {
            type: Sequelize.TINYINT,
        },
        request: {
            type: Sequelize.STRING,
        },
        special_offer: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false
    }
)