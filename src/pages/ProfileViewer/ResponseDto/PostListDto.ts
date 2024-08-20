export interface PostListDto {
    isSuccess: boolean;
    code: number;
    message: string;
    result: {
        totalPosts: number;
        totalLikes: number;
        posts: [
            {
                postId: number;
                userId: number;
                likes: number;
                firstPhoto: string;
                isRepresentative: boolean
            }
        ]
    }
}