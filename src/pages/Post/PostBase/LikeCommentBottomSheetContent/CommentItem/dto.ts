import { Comment } from '@apis/post-comment/dto';

export interface CommentItemProps {
	comment: Comment;
	handleUserClick: (userId: number) => void;
	handleMenuOpen: (comment: Comment, event: React.MouseEvent<HTMLButtonElement>) => void;
}
