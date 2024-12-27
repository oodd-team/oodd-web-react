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
	EmailInput,
} from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';
import Modal from '../../components/Modal';

import TopBar from '../../components/TopBar';
import back from '../../assets/arrow/left.svg';
import BottomButton from '../../components/BottomButton';
import imageBasic from '../../assets/default/defaultProfile.svg';
import Loading from '../../components/Loading';
import camera from '../../assets/default/camera.svg';
import { getUserInfoApi, patchUserInfoApi } from '../../apis/user'; // API import
import { UserInfoData, PatchUserInfoRequest } from '../../apis/user/dto'; // DTO import

type ExtendedUserInfoData = UserInfoData & {
	birthDate?: string; // 확장된 속성
};

const ProfileEdit: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [nickname, setNickname] = useState<string>('');
	const [bio, setBio] = useState<string>('');
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
	const [phoneNumber, setPhoneNumber] = useState<string>(''); // 전화번호
	const [birthDate, setBirthDate] = useState<string>(''); // 생년월일
	const [name, setName] = useState<string>(''); // 이름
	const [email, setEmail] = useState<string>(''); // 이메일
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const [modalContent, setModalContent] = useState<string | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [uploading, setUploading] = useState<boolean>(false); // 업로드 상태 관리
	const userId = localStorage.getItem('my_id');

	// 사용자 정보 불러오기
	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const storedUserId = Number(localStorage.getItem('my_id'));
				if (!storedUserId) {
					console.error('User ID not found in localStorage');
					return;
				}

				const userId = Number(storedUserId); // 문자열을 숫자로 변환
				const response = await getUserInfoApi(userId); // 사용자 정보 조회 API 호출
				const userInfo: ExtendedUserInfoData = response.data; // 확장된 타입 사용

				// 상태 업데이트
				setNickname(userInfo.nickname);
				setBio(userInfo.bio);
				setProfilePictureUrl(userInfo.profilePictureUrl || null);
				setPhoneNumber(userInfo.phoneNumber || '');
				setBirthDate(userInfo.birthDate || ''); // 확장된 속성 사용
				setName(userInfo.name || '');
				setEmail(userInfo.email || '');
			} catch (error) {
				console.error('Error fetching user info:', error);
			} finally {
				setIsLoading(false); // 로딩 상태 종료
			}
		};

		getUserInfo();
	}, []);

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

	const handleModalClose = () => {
		setIsModalVisible(false);
		setModalContent(null);
	};

	const handleSave = async () => {
		try {
			const storedUserId = Number(localStorage.getItem('my_id'));
			if (!storedUserId) {
				console.error('User ID not found in localStorage');
				return;
			}

			const formattedBirthDate = birthDate ? new Date(birthDate).toISOString().split('T')[0] : '';

			const payload: PatchUserInfoRequest = {
				name: name || 'Default Name',
				phoneNumber: phoneNumber || '000-0000-0000',
				birthDate: formattedBirthDate,
				email: email || 'default@example.com',
				nickname: nickname || '닉네임 없음',
				profilePictureUrl: profilePictureUrl || '',
				bio: bio || '',
			};

			const response = await patchUserInfoApi(payload, storedUserId);

			if (response.isSuccess) {
				setModalContent('프로필이 성공적으로 수정되었습니다.');
				setIsModalVisible(true);

				// 모달 닫힌 후 마이페이지로 이동
				setTimeout(() => {
					handleModalClose();
					navigate(`/profile/${userId}`);
				}, 2000);
			} else {
				setModalContent('프로필 수정에 실패했습니다.');
				setIsModalVisible(true);
			}
		} catch (error: any) {
			setModalContent('프로필 수정 중 오류가 발생했습니다.');
			setIsModalVisible(true);
			console.error('Error updating user info:', error.response?.data || error.message);
		}
	};

	if (isLoading || uploading) {
		return <Loading />;
	}

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="회원정보 수정" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />
				{isModalVisible && (
					<Modal
						content={modalContent || ''}
						onClose={handleModalClose}
						button={{
							content: '확인',
							onClick: handleModalClose,
						}}
					/>
				)}
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
						<Username>{nickname || '알수없음'}</Username>
					</StyledText>
				</UserInfo>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						이름
					</StyledText>
					<Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				</Row>
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
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						전화번호
					</StyledText>
					<Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						생년월일
					</StyledText>
					<Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
						이메일
					</StyledText>
					<EmailInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</Row>
				<BottomButton content="완료" onClick={handleSave} />
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default ProfileEdit;
