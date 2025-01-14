import { initDb } from "../db/voteDatabase"

export default defineEventHandler(async (event) => {
    try {
        console.log("CREATE REQUEST")
        const body = await readBody(event);

        if (!body) {
            return {
                error: "Request body is empty or undefined",
            };
        }

        var { title, desc, active, opt } = body;

        if(!title || !opt){
            return{
                error: "Body needs to have all the data"
            };
        }

        const db = await initDb();
        opt = JSON.stringify(opt);
        try {
            await db.run("INSERT INTO vote (title, description, active, options, voted) VALUES (?, ?, ?, ?, ?)", [
                title,
                desc,
                active,
                opt,
                JSON.stringify([{}]),
            ]);
            console.log("Votación creada correctamente");
            return {success: true};
        } catch (error) { 
            console.error("Error while creating a new vote ", error);
            return createError({
                statusCode: 409,
                satusMessage: "There's been an error while creating the vote"
            });
        }

        
    } catch (error){
        console.error("Error while creating the vote: ", error);
        return createError({
            statusCode: 400,
            statusMessage: "Failed to process the creation"
        })
    }
});