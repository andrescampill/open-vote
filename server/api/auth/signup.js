// /auth/login.js & /auth/signup.js & /db/database.js has been made with the help of Timi Omoyeni, you can find the information at vuemastery.com/blog/minimalist-nuxt-authentication

import bcrypt from "bcrypt";
import { initDb } from "../db/database";

export default defineEventHandler( async (event) =>{
    try{
        const body = await readBody(event); 

        if(!body){
            return{
                error: "Request body is empty or undefined",
            };
        }

        const {username, password, perms} = body;
        

        if(!username || !password){
            return{
                error: "Username or password must be defined"
            };
        }

        const db = await initDb();
        const hashedPassword = await bcrypt.hash(password, 12);
        const uuid = crypto.randomUUID();

        try{
            // Insert into DB
            await db.execute("INSERT INTO users (uuid, username, password, perms) VALUES (?, ?, ?, ?)", [
                uuid,
                username,
                hashedPassword,
                perms
            ]);
            return {success: true};
        } catch (error) {
            console.error("Error while creating a new user, ", error);
            return createError({
                statusCode: 409,
                satatusMessage: "Username already exists",
            });
        }
    } catch (error) {
        console.error("Error while handeling the signup: ", error);
        return createError({
            statusCode: 400,
            satatusMessage: "Failed to preocess the requesto."
        });
    }
});