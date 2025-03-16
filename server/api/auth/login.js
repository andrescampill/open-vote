// /auth/login.js & /auth/signup.js & /db/database.js has been made with the help of Timi Omoyeni, you can find the information at vuemastery.com/blog/minimalist-nuxt-authentication

import bcrypt from 'bcrypt';
import { initDb } from "../db/database";

export default defineEventHandler( async (event) => {
    console.log("Log in started");
    try{
        const body = await readBody(event);

        if(!body){
            console.log("Request body is empty");
            return createError({
                statusCode: 400,
                statusMessage: "Request body is undefined",
            });
        }

        const { username, password } = body;

        if(!username || !password){
            console.log("User or pass missing");

            return createError({
                statusCode: 400,
                statusMessage: "Username and password are require",
            });
        }

        const db = await initDb();
        const [rows] = await db.execute("SELECT * FROM users where username = ?", [
            username,
        ]);
        const user = rows[0]

        if(!user || !(await bcrypt.compare(password, user.password))){
            console.log(`Invalid username or password for user: ${username} `);
            return createError({
                statusCode: 401,
                statusMessage: "Invalid username or password",
            });
        } else {
            const userData = {username: user.username, perm: user.perms, uuid: user.uuid};
            await setUserSession(event, {
                user: userData,
                loggedInAt: new Date(),
            });
        }

        console.log("Logged in successfully");
        return{ success: true, user};
    } catch (error){
        console.log("Error handling the request:", error);
        return createError({
            statusCode: 500,
            statusMessage: "Failed to process the request",
        });
    }
});