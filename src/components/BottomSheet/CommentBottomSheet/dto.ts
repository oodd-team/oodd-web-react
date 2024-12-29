import { CommentProps } from './Comment/dto';

export interface CommentBottomSheetProps {
	isBottomSheetOpen: boolean;
	commentProps: CommentProps;
	handleCloseBottomSheet: () => void;
}
