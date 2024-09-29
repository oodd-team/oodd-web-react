import BottomSheet from '../../../components/BottomSheet';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import Comment from '../../../components/Comment';
import { CommentProps } from '../../../components/Comment/dto';
import request from '../../../apis/core';
import { ApiDto } from '../dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	IsOpenPostCommentBottomSheetAtom,
	IsOpenPostCommentFailModalAtom,
	IsOpenPostCommentSuccessModalAtom,
	PostCommentAtom,
} from '../../../recoil/PostCommentBottomSheetAtom';

const PostCommentBottomSheet: React.FC = () => {
	const [isOpenPostCommentBottomSheet, setIsOpenPostCommentBottomSheet] = useRecoilState(
		IsOpenPostCommentBottomSheetAtom,
	);
	const [, setIsOpenPostCommentSuccessModal] = useRecoilState(IsOpenPostCommentSuccessModalAtom);
	const [, setIsOpenPostCommentFailModal] = useRecoilState(IsOpenPostCommentFailModalAtom);
	const postComment = useRecoilValue(PostCommentAtom);

	const postCommentProps: CommentProps = {
		content: `${postComment?.userName} 님의 게시물에 대한 코멘트를 남겨주세요\n코멘트는 ${postComment?.userName} 님에게만 전달됩니다`,
		sendComment: (message: string) => {
			const postNewComment = async () => {
				if (postComment) {
					const response = await request.post<ApiDto>(`/posts/${postComment.postId}/comment`, {
						content: message,
					});

					if (response.isSuccess) {
						setIsOpenPostCommentBottomSheet(false);
						setTimeout(() => {
							setIsOpenPostCommentSuccessModal(true);
						}, 100);
					} else {
						setIsOpenPostCommentFailModal(true);
					}
				} else {
					alert('잘못된 요청입니다.');
				}
			};

			postNewComment();
		},
	};

	const postCommentBottomSheet: BottomSheetProps<CommentProps> = {
		isOpenBottomSheet: isOpenPostCommentBottomSheet,
		Component: Comment,
		componentProps: postCommentProps,
		onCloseBottomSheet: () => {
			setIsOpenPostCommentBottomSheet(false);
		},
	};
	return <BottomSheet {...postCommentBottomSheet} />;
};

export default PostCommentBottomSheet;
6;
