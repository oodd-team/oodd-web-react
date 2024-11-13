import React, { useState } from 'react';

import theme from '../../styles/theme';
import { Content, StyledInput } from './styles';

import { OODDFrame } from '../../components/Frame/Frame';
import { StyledText } from '../../components/Text/StyledText';
import TopBar from '../../components/TopBar';
import BottomButton from '../../components/BottomButton';
import Modal from '../../components/Modal';
import { ModalProps } from '../../components/Modal/dto';

import X from '../../assets/default/x.svg';

import { InstaConnectModalProps } from './dto';

const PostInstaConnect: React.FC<InstaConnectModalProps> = () => {
	const [instagramID, setInstagramID] = useState('');
	const [isConnectFailModalOpen, setIsConnectFailModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleConnect = async () => {
		try {
			setIsLoading(true);
			window.location.href = 'https://localhost:3001/auth'; //인스타그램 인증 처리
		} catch (error) {
			console.error('Failed to fetch Instagram media:', error);
			setIsLoading(false);
			setIsConnectFailModalOpen(true);
		}
	};

	const connectFailModalProps: ModalProps = {
		isCloseButtonVisible: false,
		onClose: () => setIsConnectFailModalOpen(false),
		content: `${instagramID} 계정 연동에 실패했어요`,
		button: {
			content: '다시 시도하기',
			onClick: () => {
				setIsConnectFailModalOpen(false);
				handleConnect();
			},
		},
	};

	/*
	useEffect(() => {
		if (accessToken) {
			fetchInstagramData(accessToken);
		}
	}, [accessToken]);
	*/

	return (
		<OODDFrame>
			<TopBar text="인스타 계정 연동" LeftButtonSrc={X} />

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

			{isConnectFailModalOpen && <Modal {...connectFailModalProps} />}
		</OODDFrame>
	);
};

export default PostInstaConnect;
