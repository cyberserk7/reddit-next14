import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { usernameSchema } from "@/schema";

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
        const {username} = usernameSchema.parse(payload);
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
        const usernameExists = await db.user.findUnique({
            where: {
                username,
            }
        })
        if(usernameExists){
            return new NextResponse("This username is already taken", {status: 409});
        }
        await db.user.update({
            where:{
                id: params.userId,
            },
            data: {
                username,
            }
        })
        return new NextResponse("OK");
    }catch(error){
        console.log("SET_USERNAME: ", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}