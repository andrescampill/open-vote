import { initDb } from "../db/voteDatabase"

export default defineEventHandler(async (event) => {
    try{
        const db = await initDb();
        try {
            const [response] = await db.execute("SELECT * FROM vote ORDER BY id DESC");
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