import React, { useState } from 'react';
//import axios from 'axios';
import theme from '../../../styles/theme';
import { Content, StyledInput } from './styles';
import { Header, PrevButton } from '../styles';
import BottomButton from '../../../components/BottomButton';
import { StyledText } from '../../../components/Text/StyledText';
import FailedModal from './FailedModal';
import close from '../assets/close.svg';
import { InstaConnectModalProps } from './dto';

const InstaConnectModal: React.FC<InstaConnectModalProps> = ({ onIdSelect, onClose, onNext }) => {
	const [instagramID, setInstagramID] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	//const [isSuccess, setIsSuccess] = useState(false);

	const handleConnect = () => {
		onIdSelect(instagramID);
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setIsModalOpen(true);
		}, 3000);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		onNext();
	};

	return (
		<>
			<Header>
				<PrevButton onClick={onClose}>
					<img src={close} />
				</PrevButton>
				<StyledText $textTheme={{ style: 'body2-light', lineHeight: 2 }}>인스타 계정 연동</StyledText>
			</Header>
			<Content>
				{isLoading ? (
					<StyledText $textTheme={{ style: 'body2-light', lineHeight: 2 }}>
						{instagramID} 계정에 연동하고 있어요
					</StyledText>
				) : (
					<>
						<StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>인스타 계정 연동을 위해</StyledText>
						<StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>
							인스타그램 ID를 작성해주세요
						</StyledText>
						<StyledInput
							type="text"
							value={instagramID}
							onChange={(e) => setInstagramID(e.target.value)}
							placeholder="인스타그램 ID"
						/>
						<StyledText
							className="tab-to-write"
							$textTheme={{ style: 'body4-regular', lineHeight: 1.2 }}
							color={theme.colors.gray4}
						>
							{!instagramID ? '탭해서 ID를 작성하세요' : '  .'}
						</StyledText>
					</>
				)}
			</Content>

			<BottomButton content="연동하기" onClick={handleConnect} />

			{isModalOpen && <FailedModal onNext={handleModalClose} instagramId={instagramID} />}
		</>
	);
};

export default InstaConnectModal;
