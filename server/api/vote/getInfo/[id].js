import { initDb } from "../../db/voteDatabase"

export default defineEventHandler(async (event) => {

    const id = parseInt(event.context.params.id);

    try{
        const db = await initDb();
        try {
            var response = await db.execute("SELECT * FROM vote WHERE id = ?", [
                id
            ]
            );
            return response[0];

        } catch(error){
            console.log("Ha habido un error al fetch todos los datos");
            console.log(error);
        }
    } catch (error) {
        console.log("Error while trying to fetch all data from the vote table");
        console.error(error);
    }
})