import { VoteType } from "@prisma/client";
import * as z from "zod"

export const usernameSchema = z.object({
    username: z.string().min(1, {
        message: "Username should not be empty",
    })
})

export type SetUsernamePayload = z.infer<typeof usernameSchema>;

export const communitySchema = z.object({
    name: z.string().min(1, {
        message: "Name should not be empty"
    })
})

export type CreateCommunityPayload = z.infer<typeof communitySchema>;

export const uploadCoverImageSchema  = z.object({
    coverImageURL: z.string().min(1),
})

export type UploadCoverImagePayload = z.infer<typeof uploadCoverImageSchema>;

export const editSubredditSchema = z.object({
    subredditImageURL: z.string().nullable(),
    coverImageURL: z.string().nullable(),
})

export type editSubredditPayload = z.infer<typeof editSubredditSchema>;

export const createPostSchema = z.object({
    title: z.string().min(1),
    caption: z.string().min(1),
    imageURL: z.string().nullable(),
    videoURL: z.string().nullable(),
})

export type createPostPayload = z.infer<typeof createPostSchema>;

export const postVoteSchema = z.object({
    voteType: z.enum(["UP", "DOWN"]),
})

export type postVotePayload = z.infer<typeof postVoteSchema>