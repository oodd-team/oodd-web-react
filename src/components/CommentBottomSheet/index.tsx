import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';

import BottomSheet from '../BottomSheet';
import Comment from '../Comment';
import { BottomSheetProps } from '../BottomSheet/dto';
import { CommentBottomSheetProps } from './dto';

import {
	CommentBottomSheetLayout,
	CommentModalBox,
	CommentModalContainer,
	CommentModalHeader,
	CommentModalLayout,
	CommentModalWrapper,
	XButton,
} from './styles';

const CommentBottomSheet: React.FC<CommentBottomSheetProps> = ({
	isBottomSheetOpen,
	commentProps,
	handleCloseBottomSheet,
}) => {
	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isBottomSheetOpen,
		Component: Comment,
		componentProps: commentProps,
		onCloseBottomSheet: handleCloseBottomSheet,
	};

	const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			handleCloseBottomSheet();
		}
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
					<CommentModalWrapper onClick={handleClickBackground}>
						<CommentModalContainer>
							<CommentModalHeader>
								<StyledText $textTheme={{ style: 'heading1-bold' }} color={theme.colors.white}>
									메시지 보내기
								</StyledText>
								<XButton />
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
