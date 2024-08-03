import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { ConfirmationModalLayout, ConfirmationModalWrapper, ContentBox, ButtonContainer, Button } from './styles';
import { ConfirmationModalProps } from './dto';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	content,
	isCancelButtonVisible,
	confirm,
	onClickBackground,
}) => {
	return (
		<ConfirmationModalWrapper
			onClick={(e) => {
				// Modal 외부를 클릭했을 경우 Modal 닫음
				if (e.target === e.currentTarget) {
					onClickBackground();
				}
			}}
		>
			<ConfirmationModalLayout>
				<ContentBox>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.black}>
						{content}
					</StyledText>
				</ContentBox>
				<ButtonContainer>
					{isCancelButtonVisible && (
						<>
							<Button
								onClick={() => {
									onClickBackground();
								}}
							>
								<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.black}>
									취소
								</StyledText>
							</Button>
							<div style={{ height: '100%', borderRight: '1px solid rgba(0,0,0,0.3)', margin: 'auto' }} />
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
