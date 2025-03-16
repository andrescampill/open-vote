import { initDb } from "../db/voteDatabase"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            return {
                error: "Request body is empty or undefined",
            };
        }

        var { optNum, id, uuidRes } = body;

        const db = await initDb();

        try {
            var [response] = await db.execute("SELECT * FROM vote WHERE id = ?", [
                id
            ]
            );
            response = response
            console.log(response);
            var options = response[0].options;
            var max = 1;
            options = JSON.parse(options);
            if (options[0].text == 'per') {
                // Is personalized
                max = options[0].value;
                console.log("VOTACIÓN PERSONALZIADA");
                options.splice(0, 1);
            };
            options[optNum].value++;
            
            options = JSON.stringify(options);
            try {
                var uuidSent = response[0].voted;
                console.log(uuidSent)
                uuidSent = JSON.parse(uuidSent);
                var last = uuidSent.length + 1
                uuidSent[last] = {
                    uuid: uuidRes,
                }
            } catch(error){
                console.log(error);
                var uuidSent = [];
                uuidSent = [{
                    uuid: uuidRes
                }]
            }
            
            uuidSent = JSON.stringify(uuidSent);
            console.log(uuidSent);
            await db.execute("UPDATE vote SET options = (?) WHERE id = ?", [
                options,
                id
            ]);

            await db.execute("UPDATE vote SET voted = (?) WHERE id = ?", [
                uuidSent,
                id
            ]);
            return { success: true };
        } catch (error) {
            console.log(error);
            return createError({
                statusCode: 409,
                satusMessage: "There's been an error while submitting the vote",
            });
        }
    } catch (error) {
        console.error("Error while creating the vote: ", error);
        return createError({
            statusCode: 400,
            statusMessage: "Failed to process the creation"
        })
    }
}) 