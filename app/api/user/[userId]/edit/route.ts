import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { editUserSettings, usernameSchema } from "@/schema";

export async function PATCH(req: Request, 
    {
        params,
    } : {
        params: {
            userId: string;
        }
    }   
){
    try{
        const payload = await req.json();
        const {username, image} = editUserSettings.parse(payload);
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const user = await db.user.findUnique({
            where: {
                id: params.userId
            }
        })
        if(!user) {
            return new NextResponse("User not found", {status: 404});
        }
        
        await db.user.update({
            where:{
                id: params.userId,
            },
            data: {
                username,
                image,
            }
        })
        return new NextResponse("OK");
    }catch(error){
        console.log("SET_USERNAME: ", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}