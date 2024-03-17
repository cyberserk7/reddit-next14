import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { postVoteSchema } from "@/schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {
    params,
} : {
    params: {
        postId: string;
    }
}) {
  try {
    const body = await req.json();
    const { voteType } = postVoteSchema.parse(body);
    const {postId} = params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_postId: {
              userId: session.user.id,
              postId,
            },
          },
        });
        return new Response("OK");
      }

      await db.vote.update({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
        data: {
          type: voteType,
        },
      });
    } else if (!existingVote) {
      await db.vote.create({
        data: {
          postId,
          userId: session.user.id,
          type: voteType,
        },
      });
    }

    return new NextResponse("OK");
  } catch (error) {
    console.log("VOTES_UPDATE", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}