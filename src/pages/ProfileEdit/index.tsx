import React, { useRef, useEffect, useState } from 'react';
import {
	ProfileEditContainer,
	ProfilePic,
	ProfilePicWrapper,
	Input,
	Button,
	Row,
	FileInput,
	CameraIcon,
	UserInfo,
	Username,
} from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';
import BottomButton from '../../components/BottomButton';
import { UserProfileResponse } from './dto';
import imageBasic from '../../assets/imageBasic.svg';
import Loading from '../../components/Loading';
import camera from '../../assets/default/camera.svg';
import request, { BaseResponse } from '../../apis/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';
import { UserResponse } from './dto';

const ProfileEdit: React.FC = () => {
	const [user, setUser] = useState<UserResponse | null>(null);
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

				const response = await request.get<BaseResponse<UserProfileResponse>>(`/users/${storedUserId}`);
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

	// 사용자 정보 가져오기 함수
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const storedUserId = localStorage.getItem('id');

				if (!storedUserId) {
					console.error('User is not logged in');
					return;
				}

				const response = await request.get<BaseResponse<UserResponse>>(`/users/${storedUserId}`);
				setUser(response.result); // user 상태에 사용자 정보 설정 (닉네임 포함)
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData(); // user 데이터를 가져오는 함수 호출
	}, []);

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
			const response = await request.patch<BaseResponse<UserProfileResponse>>(`/users/${storedUserId}`, {
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
				<TopBar text="회원정보 수정" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<ProfilePicWrapper>
					<ProfilePic>
						<img src={profilePictureUrl || imageBasic} alt="프로필 사진" />
					</ProfilePic>
					<Button onClick={handleButtonClick}>
						<CameraIcon src={camera} alt="카메라 아이콘" onClick={handleButtonClick} />
					</Button>
					<FileInput type="file" ref={fileInputRef} onChange={handleFileChange} />
				</ProfilePicWrapper>
				<UserInfo>
					<StyledText $textTheme={{ style: 'Heading', lineHeight: 0 }} color={theme.colors.gray3}>
						<Username>{user?.nickname || '김아무개...'}</Username>
					</StyledText>
				</UserInfo>
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
					content="완료" // 버튼에 표시할 텍스트
					onClick={handleSave} // 버튼 클릭 시 호출할 함수
				/>
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default ProfileEdit;
