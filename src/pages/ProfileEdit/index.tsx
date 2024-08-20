import React, { useRef, useEffect, useState } from 'react';
import { ProfileEditContainer, ProfilePic, ProfilePicWrapper, Input, Button, Row, FileInput } from './styles';
import avatar from '../../assets/avatar.png';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import request from '../../apis/core';
import { useParams } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';

type UserProfileResponse = {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string | null;
	bio: string | null;
	joinedAt: string;
};

const ProfileEdit: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { userId } = useParams<{ userId: string }>();
	const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
	const navigate = useNavigate(); // useNavigate 훅 사용

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await request.get<UserProfileResponse>(`/users/2`);
				setUserProfile(response);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		fetchUserProfile();
	}, [userId]);

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

	if (!userProfile) {
		return <div>Loading...</div>; // 또는 로딩 스피너 등을 사용할 수 있습니다.
	}

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="프로필 수정" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<ProfilePicWrapper>
					<ProfilePic>
						<img src={userProfile.profilePictureUrl || avatar} alt="프로필 사진" />
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
					<Input type="text" defaultValue={userProfile.nickname || userProfile.name} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						소개글
					</StyledText>
					<Input defaultValue={userProfile.bio || ''} />
				</Row>
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default ProfileEdit;
