import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { postIdAtom, userAtom } from '../../recoil/Post/PostAtom.ts';

import PostBase from '../../components/PostBase/index.tsx';
import OptionsBottomSheet from '../../components/BottomSheet/OptionsBottomSheet/index.tsx';
import { OptionsBottomSheetProps } from '../../components/BottomSheet/OptionsBottomSheet/dto.ts';

const Post: React.FC = () => {
	const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(false);
	const postId = useRecoilValue(postIdAtom);
	const user = useRecoilValue(userAtom);

	const handleMenuOpen = () => {
		setIsOptionsBottomSheetOpen(true);
	};

	// 게시글 옵션(더보기) 바텀시트
	const optionsBottomSheetProps: OptionsBottomSheetProps = {
		domain: 'post',
		targetId: {
			userId: user.userId || -1,
			postId: postId || -1,
		},
		targetNickname: user.nickname || '알수없음',
		isBottomSheetOpen: isOptionsBottomSheetOpen,
		onClose: () => {
			setIsOptionsBottomSheetOpen(false);
		},
	};

	return (
		<>
			<PostBase onClickMenu={handleMenuOpen} />

			<OptionsBottomSheet {...optionsBottomSheetProps} />
		</>
	);
};

export default Post;
