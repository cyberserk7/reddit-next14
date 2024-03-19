import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session){
            return new NextResponse("User not found", {status: 404});
        }
        const subscriptions = await db.subscribe.findMany({
            where: {
                userId: session.user.id,
            },
            select: {
                subreddit: true,
            }
        })
        
        const subredditList = subscriptions.map((item) => item.subreddit);

        return NextResponse.json(subredditList);

    } catch(err) {
        console.log("GET_SUBSCRIPTION: ", err);
        return new NextResponse("Internal server error", {status: 500});
    }
}