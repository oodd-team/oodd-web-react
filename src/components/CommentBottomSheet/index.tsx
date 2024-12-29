import { StyledText } from '@components/Text/StyledText';
import theme from '@styles/theme';

import BottomSheet from '@components/BottomSheet';
import Comment from './Comment/index';
import type { BottomSheetProps } from '@components/BottomSheet/dto';
import type { CommentBottomSheetProps } from './dto';
import closeIcon from '@assets/default/modal-close-white.svg';

import {
	CommentBottomSheetLayout,
	CommentModalBox,
	CommentModalContainer,
	CommentModalHeader,
	CommentModalLayout,
	CommentModalWrapper,
	CloseButton,
} from './styles';

const CommentBottomSheet: React.FC<CommentBottomSheetProps> = ({
	isBottomSheetOpen,
	commentProps,
	handleCloseBottomSheet,
}) => {
	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (e.target === e.currentTarget) {
			handleCloseBottomSheet();
		}
	};

	const handleCloseButtonClick = () => {
		handleCloseBottomSheet();
	};

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isBottomSheetOpen,
		Component: Comment,
		componentProps: commentProps,
		onCloseBottomSheet: handleCloseBottomSheet,
	};

	return (
		<>
			{/* 모바일 & 태블릿 UI */}
			<CommentBottomSheetLayout>
				<BottomSheet {...bottomSheetProps}></BottomSheet>
			</CommentBottomSheetLayout>
			{/* 데스크탑 UI */}
			{isBottomSheetOpen && (
				<CommentModalLayout>
					<CommentModalWrapper onClick={handleBackgroundClick}>
						<CommentModalContainer>
							<CommentModalHeader>
								<StyledText $textTheme={{ style: 'heading1-bold' }} color={theme.colors.text.contrast}>
									매칭 요청
								</StyledText>
								<CloseButton onClick={handleCloseButtonClick}>
									<img src={closeIcon} alt="닫기" />
								</CloseButton>
							</CommentModalHeader>
							<CommentModalBox>
								<Comment {...commentProps} isModal={true} />
							</CommentModalBox>
						</CommentModalContainer>
					</CommentModalWrapper>
				</CommentModalLayout>
			)}
		</>
	);
};

export default CommentBottomSheet;
