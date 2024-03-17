import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function DELETE(req: Request, {
    params,
} : {
    params : {
        commentId: string;
    }
}) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const comment = await db.comment.findUnique ({
            where: {
                id: params.commentId,
            },
            include: {
                post: true,
            }
        })
        if(!comment) {
            return new NextResponse("Comment does not exist", {status: 404});
        }

        if(session.user.id != comment.authorId && session.user.id != comment.post.authorId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        await db.comment.delete({
            where: {
                id: params.commentId,
            }
        })

        return new NextResponse("OK");

    } catch (error) {
        console.log("DELETE_COMMENT: ", error);
        return new NextResponse("Inernal server error", {status: 500});
    }
}