import BottomSheet from '../../../components/BottomSheet';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import Comment from '../../../components/Comment';
import { CommentProps } from '../../../components/Comment/dto';
import request from '../../../apis/core';
import { ApiDto } from '../dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	IsHeartBottomSheetOpenAtom,
	IsRequestFailModalOpenAtom,
	IsRequestSuccessModalOpenAtom,
	PostRequestAtom,
} from '../../../recoil/Home/HeartBottomSheetAtom';

const HeartBottomSheet: React.FC = () => {
	const [isHeartBottomSheetOpen, setIsHeartBottomSheetOpen] = useRecoilState(IsHeartBottomSheetOpenAtom);
	const [, setIsRequestSuccessModalOpen] = useRecoilState(IsRequestSuccessModalOpenAtom);
	const [, setIsRequestFailModalOpen] = useRecoilState(IsRequestFailModalOpenAtom);
	const postRequest = useRecoilValue(PostRequestAtom);

	const requestCommentProps: CommentProps = {
		content: `${postRequest?.targetName} 님께 대표 OOTD와 함께 전달될\n한줄 메시지를 보내보세요!`,
		sendComment: (message: string) => {
			const postNewRequest = async () => {
				if (postRequest) {
					const response = await request.post<ApiDto>('/user-relationships', {
						requesterId: postRequest.requesterId,
						targetId: postRequest.targetId,
						message: message,
					});

					if (response.isSuccess) {
						setIsHeartBottomSheetOpen(false);
						setTimeout(() => {
							setIsRequestSuccessModalOpen(true);
						}, 100);
					} else {
						setIsRequestFailModalOpen(true);
					}
				} else {
					alert('잘못된 요청입니다.');
				}
			};

			postNewRequest();
		},
	};

	const heartBottomSheetProps: BottomSheetProps<CommentProps> = {
		isOpenBottomSheet: isHeartBottomSheetOpen,
		Component: Comment,
		componentProps: requestCommentProps,
		onCloseBottomSheet: () => {
			setIsHeartBottomSheetOpen(false);
		},
	};
	return <BottomSheet {...heartBottomSheetProps} />;
};

export default HeartBottomSheet;
