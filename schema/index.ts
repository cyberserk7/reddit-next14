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