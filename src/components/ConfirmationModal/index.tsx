import theme from '@styles/theme';

import { StyledText } from '@components/Text/StyledText';

import type { ConfirmationModalProps } from './dto';

import { ConfirmationModalLayout, ConfirmationModalWrapper, ContentBox, ButtonContainer, Button } from './styles';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	content,
	isCancelButtonVisible,
	confirm,
	onCloseModal,
}) => {
	return (
		<ConfirmationModalWrapper
			onClick={(e) => {
				e.stopPropagation();
				// Modal 외부를 클릭했을 경우 Modal 닫음
				if (e.target === e.currentTarget) {
					onCloseModal();
				}
			}}
		>
			<ConfirmationModalLayout>
				<ContentBox>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
						{content}
					</StyledText>
				</ContentBox>
				<ButtonContainer>
					{isCancelButtonVisible && (
						<>
							<Button
								onClick={() => {
									onCloseModal();
								}}
							>
								<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
									취소
								</StyledText>
							</Button>
						</>
					)}
					<Button onClick={confirm.action}>
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={'#F00'}>
							{confirm.text}
						</StyledText>
					</Button>
				</ButtonContainer>
			</ConfirmationModalLayout>
		</ConfirmationModalWrapper>
	);
};

export default ConfirmationModal;
