import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { communitySchema, usernameSchema } from "@/schema";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";

export async function POST(req: Request){
    try{
        const payload = await req.json();
        const {name} = communitySchema.parse(payload);
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const alreadyExists = await db.subreddit.findUnique({
            where: {
                name,
            }
        })
        if(alreadyExists){
            return new NextResponse("Community with this name already exists", {status: 409});
        }
        const community = await db.subreddit.create({
            data:{
                name,
                creatorId: session.user.id,
            }
        })
        await db.subscribe.create({
            data:{
                userId: session.user.id,
                subredditId: community.id,
            }
        })
        return NextResponse.json(community.name);
    }catch(error){
        if(error instanceof z.ZodError) {
            return new NextResponse(error.message, {status: 422});
        }
        console.log("SET_USERNAME: ", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}