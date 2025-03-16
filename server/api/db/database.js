// /auth/login.js & /auth/signup.js & /db/database.js has been made with the help of Timi Omoyeni, you can find the information at vuemastery.com/blog/minimalist-nuxt-authentication

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const initDb = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    });

    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        perms INT NOT NULL DEFAULT 0
      )
    `);
    

    console.log("Database initialized successfully");
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};