import React, { useRef } from 'react';
import { ProfileEditContainer, ProfilePic, ProfilePicWrapper, Input, Button, Row, FileInput } from './styles';
import avatar from '../../assets/avatar.png';
import NavbarEdit from '../../components/NavbarEdit';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';

const ProfileEdit: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// 프로필 사진 업데이트 로직 추가
			console.log('Selected file:', file);
		}
	};

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<NavbarEdit />
				<ProfilePicWrapper>
					<ProfilePic>
						<img src={avatar} alt="프로필 사진" />
					</ProfilePic>
					<Button onClick={handleButtonClick}>
						<StyledText $textTheme={{ style: 'button2-medium', lineHeight: 1 }} color={theme.colors.black}>
							프로필 사진 변경
						</StyledText>
					</Button>
					<FileInput type="file" ref={fileInputRef} onChange={handleFileChange} />
				</ProfilePicWrapper>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						닉네임
					</StyledText>
					<Input type="text" defaultValue="IDID" />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						소개글
					</StyledText>
					<Input defaultValue="Text~~~~~~~~~~~~~~~" />
				</Row>
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default ProfileEdit;
