import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const initDb = async () => {
    try {
        console.log("Inicializando la base de datos")
        const db = await open({
            filename: "./database.sqlite",
            driver: sqlite3.Database,
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS vote (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                active INTEGER,
                options TEXT,
                voted TEXT
            )
            `);

        console.log("Voting database initialized successfully");
        return db;
    } catch (error) {
        console.log("Failed to initialize the voting db: ", error);
    }
}