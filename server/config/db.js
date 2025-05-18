import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.DB_HOST)
console.log(process.env.DB_user)
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timzone: 'Z',
    dateStrings : true,
  });

  export default connection;