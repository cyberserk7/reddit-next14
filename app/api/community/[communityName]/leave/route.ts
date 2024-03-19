import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {
    params,
} : {
    params: {
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
        if(!subreddit){
            return new NextResponse("Community not found", {status: 404});
        }
        const subscription = await db.subscribe.findUnique({
            where: {
                userId_subredditId: {
                    userId: session.user.id,
                    subredditId: subreddit.id
                }
            }
        })
        if(!subscription) {
            return new NextResponse("Subscription not found");
        }
        await db.subscribe.delete({
            where: {
                id: subscription.id,
            }
        })
        return new NextResponse("OK");
    } catch(error) {
        console.log("SUBREDDIT_JOIN: ", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}