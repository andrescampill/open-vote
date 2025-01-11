import { initDb } from "../db/database"
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    console.log("Actualizando usuario");
    try {
        const body = await readBody(event);
        var { id, perms, pass } = body;
        const db = await initDb();

        try {
            if (!pass) {
                //Just upadte perms
                console.log("Only changing permissions");
                await db.run("UPDATE users SET (perms) = (?) WHERE id = ?", [
                    perms,
                    id
                ]);
                console.log("Actualizado");
                return { success: true };

            } else {
                console.log("changing password");
                const hashedPassword = await bcrypt.hash(pass, 12);
                await db.run("UPDATE users SET (perms, password) = (?, ?) WHERE id = ?", [
                    perms,
                    hashedPassword,
                    id
                ]);
                console.log("Actualizado");
                return { success: true };
            }
        }catch(error){
            console.error(error);
        }
    }catch(error){
        console.error(error);
    }
})