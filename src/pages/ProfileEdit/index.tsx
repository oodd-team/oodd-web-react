import React, { useRef, useEffect, useState } from 'react';
import { ProfileEditContainer, ProfilePic, ProfilePicWrapper, Input, Button, Row, FileInput } from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import request from '../../apis/core';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';
import { BaseApiResponse } from '../../apis/util/dto';
import BottomButton from '../../components/BottomButton';
import { UserProfileResponse } from './dto';
import imageBasic from '../../assets/imageBasic.svg';
import Loading from '../../components/Loading';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';

const ProfileEdit: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
	const [nickname, setNickname] = useState<string>('');
	const [bio, setBio] = useState<string>('');
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
	const navigate = useNavigate();
	const [uploading, setUploading] = useState<boolean>(false); // 업로드 상태 관리

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const storedUserId = localStorage.getItem('id'); // 로그인된 사용자 ID 가져오기

				if (!storedUserId) {
					console.error('User is not logged in');
					return;
				}

				const response = await request.get<BaseApiResponse<UserProfileResponse>>(`/users/${storedUserId}`);
				setUserProfile(response.result as UserProfileResponse);
				setNickname((response.result?.nickname as string) || (response.result?.name as string));
				setBio(response.result?.bio || '');
				setProfilePictureUrl(response.result?.profilePictureUrl || null);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		fetchUserProfile();
	}, []); // 빈 배열이지만, userId는 내부에서 가져옴

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setUploading(true);
			try {
				const storageRef = ref(storage, `profilePictures/${file.name}`);
				await uploadBytes(storageRef, file); // Firebase에 파일 업로드
				const imageUrl = await getDownloadURL(storageRef); // 업로드된 파일의 다운로드 URL 가져오기
				setProfilePictureUrl(imageUrl);
				console.log('File uploaded and URL retrieved:', imageUrl);
			} catch (error) {
				console.error('Error uploading file:', error);
			} finally {
				setUploading(false);
			}
		}
	};

	const handleSave = async () => {
		try {
			const storedUserId = localStorage.getItem('id'); // 로그인된 사용자 ID 가져오기

			if (!storedUserId) {
				console.error('User is not logged in');
				return;
			}
			const response = await request.patch<BaseApiResponse<UserProfileResponse>>(`/users/${storedUserId}`, {
				nickname,
				profilePictureUrl,
				bio,
			});
			if (response.isSuccess) {
				navigate(`/mypage`);
			} else {
				alert('프로필 수정에 실패했습니다.');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('프로필 수정 중 오류가 발생했습니다.');
		}
		{
			uploading ? (
				<Loading />
			) : (
				<Button onClick={handleSave}>
					<StyledText $textTheme={{ style: 'button2-medium', lineHeight: 1 }} color={theme.colors.black}>
						저장하기
					</StyledText>
				</Button>
			);
		}
	};

	if (!userProfile) {
		return <Loading />; // 또는 로딩 스피너 등을 사용할 수 있습니다.
	}

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="프로필 수정" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<ProfilePicWrapper>
					<ProfilePic>
						<img src={profilePictureUrl || imageBasic} alt="프로필 사진" />
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
					<Input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						소개글
					</StyledText>
					<Input value={bio} onChange={(e) => setBio(e.target.value)} />
				</Row>
				<BottomButton
					content="저장하기" // 버튼에 표시할 텍스트
					onClick={handleSave} // 버튼 클릭 시 호출할 함수
				/>
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default ProfileEdit;
