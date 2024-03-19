import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { postCommentSchema } from "@/schema";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        const {postId, text, replyToId} = postCommentSchema.parse(payload);
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const post = await db.post.findUnique({
            where: {
                id: postId,
            }
        })
        if(!post){
            return new NextResponse("Post not found", {status: 404});
        }
        await db.comment.create({
            data: {
                postId,
                authorId: session.user.id,
                text,
                replyToId,
            }
        })
        return new NextResponse("OK");
    } catch(error) {
        if(error instanceof z.ZodError) {
            return new NextResponse("Invalid inputs found", {status: 409});
        }
        console.log("POST_COMMENT: ", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}