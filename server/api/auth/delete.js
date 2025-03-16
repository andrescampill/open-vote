import { initDb } from "../db/database"

export default defineEventHandler(async (event) => {

    try {
        const db = await initDb();
        const body = await readBody(event);
        var { id } = body;
        try {

            await db.execute("DELETE FROM users WHERE id = ?", [
                id
            ]
            );
            return { success: true };

        } catch (error) {
            console.log("Ha habido un error al fetch todos los datos");
            console.log(error);
        }
    } catch (error) {
        console.log("Error while trying to fetch all data from the vote table");
        console.error(error);
    }
})