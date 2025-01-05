// /auth/login.js & /auth/signup.js & /db/database.js has been made with the help of Timi Omoyeni, you can find the information at vuemastery.com/blog/minimalist-nuxt-authentication

import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const initDb = async () => {
  try {
    const db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        username TEXT UNIQUE,
        password TEXT,
        perms INTEGER
      )
    `);

    console.log("Database initialized successfully");
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};