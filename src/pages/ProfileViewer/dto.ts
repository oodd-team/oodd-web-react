export interface Post {
    id: number;
    imageUrl: string;
    likes: number;
}

export interface UserInfoProps {
    userId: string;
    userBio: string;
    userImg?: string;
    isFriend: boolean;
    isInterested: boolean;
    postsCount?: number;
    likesCount?: number;
    fixedPostIds?: number[];
    posts?: Post[];
}

export interface PostItemProps {
    post: Post;
    isFixed: boolean;
}