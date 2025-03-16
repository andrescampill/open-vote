import { initDb } from "../../db/database"

export default defineEventHandler(async (event) => {

    const id = parseInt(event.context.params.id);

    try{
        const db = await initDb();
        try {
            var [res] = await db.execute("SELECT * FROM users WHERE id = ?", [
                id
            ]
            );
            console.warn("AQUI");
            console.log(res)
            var response = {
                id: res[0].id,
                uuid: res[0].uuid,
                username: res[0].username,
                perms: res[0].perms
            }
            console.log(response)
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