import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../../styles/theme';
import { Content, StyledInput } from './styles';
import TopBar from '../../../components/TopBar';
import BottomButton from '../../../components/BottomButton';
import ConfirmationModal from '../../../components/ComfirmationModal';
import { ConfirmationModalProps } from '../../../components/ComfirmationModal/dto';
import { StyledText } from '../../../components/Text/StyledText';
import close from '../../../assets/Upload/close.svg';
import { InstaConnectModalProps, Post } from '../dto';

const InstaConnectModal: React.FC<InstaConnectModalProps> = ({ onClose, onNext, accessToken }) => {
	const [instagramID, setInstagramID] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleConnect = async () => {
		try {
			setIsLoading(true);
			window.location.href = 'https://localhost:3001/auth'; //인스타그램 인증 처리
		} catch (error) {
			console.error('Failed to fetch Instagram media:', error);
			setIsLoading(false);
			setIsModalOpen(true);
		}
	};

	const failedModalProps: ConfirmationModalProps = {
		content: `${instagramID} 계정 연동에 실패했어요`,
		isCancelButtonVisible: false,
		confirm: {
			text: '다시 시도하기',
			action: () => {
				setIsModalOpen(false);
				handleConnect();
			},
		},
		onCloseModal: () => {
			setIsModalOpen(false);
		},
	};

	useEffect(() => {
		if (accessToken) {
			fetchInstagramData(accessToken);
		}
	}, [accessToken]);

	const fetchInstagramData = async (accessToken: string) => {
		try {
			setIsLoading(true);
			const response = await axios.get('https://localhost:3001/instagram-import', {
				params: { access_token: accessToken },
			});
			const fetchedPosts = response.data as Post[];
			onNext(fetchedPosts);
		} catch (error) {
			console.error('Failed to fetch Instagram media:', error);
			setIsModalOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<TopBar text="인스타 계정 연동" LeftButtonSrc={close} onLeftClick={onClose} />
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

			{isModalOpen && <ConfirmationModal {...failedModalProps} />}
		</>
	);
};

export default InstaConnectModal;
