import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { editSubredditSchema, uploadCoverImageSchema } from "@/schema";
import { authOptions } from "@/lib/auth";


export async function PATCH(req: Request,
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
        const {coverImageURL, subredditImageURL} = editSubredditSchema.parse(payload);
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
        if(session.user.id != subreddit.creatorId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        await db.subreddit.update({
            where: {
                name: params.communityName,
            },
            data: {
                coverImageURL,
                subredditImageURL,
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

export async function DELETE(req: Request, {
    params
} : {
    params : {
        communityName: string;
    }
}) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const subreddit = await db.subreddit.findUnique({
            where: {
                name: params.communityName,
            }
        })
        if(!subreddit) {
            return new NextResponse("Community not found", {status: 404})
        }
        if(session.user.id !== subreddit.creatorId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        await db.subreddit.delete({
            where: {
                name: params.communityName,
            }
        })
        return new NextResponse("OK");
    } catch (error) {
        console.log("DELETE COMMUNITY: ", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}