import { initDb } from "../db/database"

export default defineEventHandler(async (event) => {
    try{
        const db = await initDb();
        try {
            var users = [];
            var cnt = 0;
            const response = await db.all("SELECT * FROM users ORDER BY id ASC");
            response.forEach((user) => {
                users[cnt] = {
                    id: user.id,
                    uuid: user.uuid,
                    username: user.username,
                    perms: user.perms,
                } 
                cnt++;
            })
            return users;

        } catch(error){
            console.log("Ha habido un error al fetch todos los datos");
            console.log(error);
        }
    } catch (error) {
        console.log("Error while trying to fetch all data from the vote table");
        console.error(error);
    }
})