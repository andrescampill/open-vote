import { initDb } from "../db/voteDatabase"

export default defineEventHandler(async (event) => {

    console.log("ACTUALIZANDO")

    try{
        const body = await readBody(event);
        var { title, id, description, active } = body;
        const db = await initDb();
        try {
            console.log(body);
            await db.run("UPDATE vote SET (title, description, active) = (?, ?, ?) WHERE id = ?", [
                title,
                description,
                active,
                id
            ]);
            console.log("Actualizado");
            return { success: true };

        } catch(error){
            console.log("Ha habido un error al fetch todos los datos");
            console.log(error);
        }
    } catch (error) {
        console.log("Error while trying to fetch all data from the vote table");
        console.error(error);
    }
})