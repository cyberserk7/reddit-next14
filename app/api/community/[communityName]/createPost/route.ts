import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createPostSchema, editSubredditSchema, uploadCoverImageSchema } from "@/schema";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request,
    {
        params,
    } : {
        params: {
            communityName: string;
        }
    }
) {
    try {
        const payload = await req.json();
        const {caption, imageURL, title ,videoURL} = createPostSchema.parse(payload);
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        const subreddit = await db.subreddit.findUnique({
            where: {
                name: params.communityName,
            }
        })
        if(!subreddit) {
            return new NextResponse("Subreddit does not exist", {status: 404})
        }
        await db.post.create({
            data: {
                title,
                description: caption,
                imageURL,
                videoURL,
                subredditId: subreddit.id,
                authorId: session.user.id
            }
        })
        return new NextResponse("OK");
    } catch(error) {
        if(error instanceof z.ZodError) {
            return new NextResponse("Invalid inputs passed", {status: 422})
        }
        console.log("UPDATE_COVERIMAGE: ", error);
        return new NextResponse("Internal server error", {status: 500})
    }
}