export interface InterestDto{
    isSuccess: boolean;
    code: number;
    message: string;
    result: {
        userId: number;
        friendId: number;
        status: string;
        createdAt:  string;
        updatedAt:  string;
        deletedAt:  string;
    }
}