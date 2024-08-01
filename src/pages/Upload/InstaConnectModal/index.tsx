import React, { useState } from 'react';
import axios from 'axios';
import { Content, Input } from './styles';
import { Header, PrevButton } from '../Header';
import BottomButton from '../../../components/BottomButton';
import { StyledText } from '../../../components/Text/StyledText';
import FailedModal from './FailedModal';
import Loader from './Loader/Loader';
import close from '../assets/close.svg';
import { InstaConnectModalProps } from '../dto';

const InstaConnectModal: React.FC<InstaConnectModalProps> = ({ onIdSelect, onClose, onNext }) => {
	const [instagramID, setInstagramID] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

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
					<Loader />
				) : (
					<>
						<StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>인스타 계정 연동을 위해</StyledText>
						<StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>
							인스타그램 ID를 작성해주세요
						</StyledText>
						<Input
							type="text"
							value={instagramID}
							onChange={(e) => setInstagramID(e.target.value)}
							placeholder="인스타그램 ID"
						/>
					</>
				)}
			</Content>

			<BottomButton content="연동하기" onClick={handleConnect} />

			{isModalOpen && <FailedModal onNext={handleModalClose} instagramId={instagramID} />}
		</>
	);
};

export default InstaConnectModal;
