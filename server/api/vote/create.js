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

        var { title, desc, active, type, opt } = body;
        const optTemp = [
            {
                text: "A FAVOR",
                value: 0,
            },
            {
                text: "EN CONTRA",
                value: 0,
            },
            {
                text: "ABSTENCIÓN",
                value: 0,
            }
        ];

        const optTempString = JSON.stringify(optTemp);

        type = 0;
        if(!title || !desc){
            return{
                error: "Body needs to have all the data"
            };
        }

        const db = await initDb();
        try {
            await db.run("INSERT INTO vote (title, description, active, options, voted) VALUES (?, ?, ?, ?, ?)", [
                title,
                desc,
                active,
                optTempString,
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