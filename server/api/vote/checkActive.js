import { initDb } from "../db/voteDatabase"

export default defineEventHandler(async (event) => {
    try{
        const db = await initDb();
        try {
            var [response] = await db.execute("SELECT * FROM vote WHERE active = 1");
            var activesId = [];
            var cnt = 0;
            console.log(response[0].id);
            response.forEach((vote) => {
                console.log(vote);
                activesId[cnt] = {
                    id: vote.id
                }
                cnt++;
            })
            return activesId;

        } catch(error){
            console.log("Ha habido un error al fetch todos los datos");
            console.log(error);
        }
    } catch (error) {
        console.log("Error while trying to fetch all data from the vote table");
        console.error(error);
    }
})