import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { ConfirmationModalLayout, ConfirmationModalWrapper, ContentBox, ButtonContainer, Button } from './styles';

interface Confirm {
	text: string; // 버튼명 ex. 취소, 차단하기, ...
	action: () => void; // 버튼 클릭 시 실행될 함수
}

interface ConfirmationModalProps {
	content: string; // Mocal 내용
	confirms: Confirm[]; // 버튼을 두 개 받아야 하는 경우도 있어 일단 하나인 경우에도 배열로 전달
	onClickBackground: () => void; // Modal을 닫는 함수
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ content, confirms, onClickBackground }) => {
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
					{confirms.map((confirm: Confirm, index: number) => (
						<div key={index} style={{ display: 'flex', flex: '1' }}>
							<Button onClick={confirm.action}>
								<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.black}>
									{confirm.text}
								</StyledText>
							</Button>
							{index < confirms.length - 1 && (
								<div style={{ height: '100%', borderRight: '1px solid rgba(0,0,0,0.3)', margin: 'auto' }} />
							)}
						</div>
					))}
				</ButtonContainer>
			</ConfirmationModalLayout>
		</ConfirmationModalWrapper>
	);
};

export default ConfirmationModal;
