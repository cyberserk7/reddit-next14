import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: Request, {
    params
} : {
    params: {
        postId: string;
    }
}) {
    try { 
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const post = await db.post.findUnique({
            where: {
                id: params.postId,
            },
            include: {
                subreddit: true,
            }
        })
        if(!post) {
            return new NextResponse("Post does not exist", {status: 404});
        }
        if(session.user.id != post.authorId && session.user.id != post.subreddit.creatorId) {
            return new NextResponse("Unauthorized", {status :401});
        }
        await db.post.delete({
            where: {
                id: params.postId,
            }
        })
        return new NextResponse("OK");
    } catch (error) {
        console.log("POST_DELETE: ", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}