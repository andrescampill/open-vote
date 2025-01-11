import { initDb } from "../../db/database"

export default defineEventHandler(async (event) => {

    const id = parseInt(event.context.params.id);

    try{
        const db = await initDb();
        try {
            var response = await db.all("SELECT * FROM users WHERE id = ?", [
                id
            ]
            );
            response = {
                id: response[0].id,
                uuid: response[0].uuid,
                username: response[0].username,
                perms: response[0].perms
            }
            return response;

        } catch(error){
            console.log("Ha habido un error al fetch todos los datos");
            console.log(error);
        }
    } catch (error) {
        console.log("Error while trying to fetch all data from the vote table");
        console.error(error);
    }
})