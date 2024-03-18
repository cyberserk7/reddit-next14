import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { commentVoteSchema } from "@/schema";

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

export async function PATCH(req: Request) {
    try {
      const body = await req.json();
      const { commentId, voteType } = commentVoteSchema.parse(body);
  
      const session = await getServerSession(authOptions);
  
      if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const existingVote = await db.commentVote.findFirst({
        where: {
          userId: session.user.id,
          commentId,
        },
      });
  
      const comment = await db.comment.findUnique({
        where: {
          id: commentId,
        },
        include: {
          author: true,
          votes: true,
        },
      });
  
      if (!comment) {
        return new NextResponse("Post not found", { status: 404 });
      }
  
      if (existingVote) {
        if (existingVote.type === voteType) {
          await db.commentVote.delete({
            where: {
              userId_commentId: {
                userId: session.user.id,
                commentId,
              },
            },
          });
          return new Response("OK");
        }
  
        await db.commentVote.update({
          where: {
            userId_commentId: {
              userId: session.user.id,
              commentId,
            },
          },
          data: {
            type: voteType,
          },
        });
      } else if (!existingVote) {
        await db.commentVote.create({
          data: {
            commentId,
            userId: session.user.id,
            type: voteType,
          },
        });
      }
  
      return new NextResponse("OK");
    } catch (error) {
      console.log("COMMENT_VOTES_UPDATE", error);
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
  