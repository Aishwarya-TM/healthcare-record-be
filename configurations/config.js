const dotenv = require ('dotenv')
dotenv.config()

const { DB_URI, PORT, ACCESS_TOKEN, BLOCKCHAIN_URL } = process.env

module.exports = { DB_URI, PORT, ACCESS_TOKEN,BLOCKCHAIN_URL }