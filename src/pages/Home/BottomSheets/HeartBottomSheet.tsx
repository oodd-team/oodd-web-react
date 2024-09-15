import BottomSheet from '../../../components/BottomSheet';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import Comment from '../../../components/Comment';
import { CommentProps } from '../../../components/Comment/dto';
import request from '../../../apis/core';
import { ApiDto } from '../dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	IsOpenHeartBottomSheetAtom,
	IsOpenRequestFailModalAtom,
	IsOpenRequestSuccessModalAtom,
	PostRequestAtom,
} from '../../../recoil/HeartBottomSheetAtom';

const HeartBottomSheet: React.FC = () => {
	const [isOpenHeartBottomSheet, setIsOpenHeartBottomSheet] = useRecoilState(IsOpenHeartBottomSheetAtom);
	const [, setIsOpenRequestSuccessModal] = useRecoilState(IsOpenRequestSuccessModalAtom);
	const [, setIsOpenRequestFailModal] = useRecoilState(IsOpenRequestFailModalAtom);
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
						setIsOpenHeartBottomSheet(false);
						setTimeout(() => {
							setIsOpenRequestSuccessModal(true);
						}, 100);
					} else {
						setIsOpenRequestFailModal(true);
					}
				} else {
					alert('잘못된 요청입니다.');
				}
			};

			postNewRequest();
		},
	};

	const heartBottomSheet: BottomSheetProps = {
		isOpenBottomSheet: isOpenHeartBottomSheet,
		Component: Comment,
		componentProps: requestCommentProps,
		onCloseBottomSheet: () => {
			setIsOpenHeartBottomSheet(false);
		},
	};
	return <BottomSheet {...heartBottomSheet} />;
};

export default HeartBottomSheet;
