import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const initDb = async () => {
    try {
        console.log("Inicializando la base de datos")
        const db = await mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
            });

            await db.execute(`
                CREATE TABLE IF NOT EXISTS vote (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  title VARCHAR(255) NOT NULL,
                  description TEXT NOT NULL,
                  active TINYINT(1) NOT NULL DEFAULT 1,
                  options JSON NOT NULL,
                  voted JSON NOT NULL
                )
              `);
              

        console.log("Voting database initialized successfully");
        return db;
    } catch (error) {
        console.log("Failed to initialize the voting db: ", error);
    }
}