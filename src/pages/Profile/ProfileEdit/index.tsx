import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import theme from '@styles/theme';

import { getUserInfoApi, patchUserInfoApi } from '@apis/user';
import { storage } from '@config/firebaseConfig';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import back from '@assets/arrow/left.svg';
import camera from '@assets/default/camera.svg';
import imageBasic from '@assets/default/defaultProfile.svg';

import BottomButton from '@components/BottomButton/index';
import { OODDFrame } from '@components/Frame/Frame';
import Modal from '@components/Modal/index';
import Skeleton from '@components/Skeleton';
import { StyledText } from '@components/Text/StyledText';
import TopBar from '@components/TopBar/index';

import type { UserInfoData, PatchUserInfoRequest } from '@apis/user/dto';

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

type ExtendedUserInfoData = UserInfoData & {
	birthDate?: string;
};

const ProfileEdit: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [nickname, setNickname] = useState<string>('');
	const [bio, setBio] = useState<string>('');
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [birthDate, setBirthDate] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [userStyletags, setUserStyletags] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const [modalContent, setModalContent] = useState<string | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [uploading, setUploading] = useState<boolean>(false);
	const currentUserId = getCurrentUserId();

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				if (!currentUserId) {
					console.error('User ID not found');
					return;
				}

				const response = await getUserInfoApi(currentUserId);
				const userInfo: ExtendedUserInfoData = response.data;

				setNickname(userInfo.nickname);
				setBio(userInfo.bio);
				setProfilePictureUrl(userInfo.profilePictureUrl || null);
				setPhoneNumber(userInfo.phoneNumber || '');
				setBirthDate(userInfo.birthDate || '');
				setName(userInfo.name || '');
				setEmail(userInfo.email || '');
				setUserStyletags(userInfo.userStyletags || []);
			} catch (error) {
				console.error('Error fetching user info:', error);
			} finally {
				setIsLoading(false);
			}
		};

		setTimeout(getUserInfo, 1000);
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
				await uploadBytes(storageRef, file);
				const imageUrl = await getDownloadURL(storageRef);
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
			if (!currentUserId) {
				console.error('User ID not found');
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
				userStyletags: userStyletags || [],
			};

			const response = await patchUserInfoApi(payload, currentUserId);

			if (response.isSuccess) {
				setModalContent('프로필이 성공적으로 수정되었습니다.');
				setIsModalVisible(true);

				setTimeout(() => {
					handleModalClose();
					navigate(`/profile/${currentUserId}`);
				}, 2000);
			} else {
				setModalContent('프로필 수정에 실패했습니다.');
				setIsModalVisible(true);
			}
		} catch (error) {
			setModalContent('프로필 수정 중 오류가 발생했습니다.');
			setIsModalVisible(true);
			console.error('Error updating user info:', error);
		}
	};

	if (isLoading || uploading) {
		return (
			<OODDFrame>
				<ProfileEditContainer>
					<TopBar text="회원정보 수정" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />
					<ProfilePicWrapper>
						<ProfilePic>
							<Skeleton width={7.5} height={7.5} borderRadius={5} />
						</ProfilePic>
					</ProfilePicWrapper>

					<UserInfo>
						<Skeleton width={6.25} height={1.875} />
					</UserInfo>
					<Row>
						<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
							이름
						</StyledText>
						<Skeleton width="100%" height={3.75} />
					</Row>
					<Row>
						<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
							닉네임
						</StyledText>
						<Skeleton width="100%" height={3.75} />
					</Row>
					<Row>
						<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
							소개글
						</StyledText>
						<Skeleton width="100%" height={3.75} />
					</Row>
					<Row>
						<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
							전화번호
						</StyledText>
						<Skeleton width="100%" height={3.75} />
					</Row>
					<Row>
						<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
							생년월일
						</StyledText>
						<Skeleton width="100%" height={3.75} />
					</Row>
					<Row>
						<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
							이메일
						</StyledText>
						<Skeleton width="100%" height={3.75} />
					</Row>
					<BottomButton content="완료" onClick={handleSave} disabled={isLoading || uploading} />
				</ProfileEditContainer>
			</OODDFrame>
		);
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
					<StyledText $textTheme={{ style: 'Heading' }} color={theme.colors.text.tertiary}>
						<Username>{nickname || '알수없음'}</Username>
					</StyledText>
				</UserInfo>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
						이름
					</StyledText>
					<Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
						닉네임
					</StyledText>
					<Input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
						소개글
					</StyledText>
					<Input value={bio} onChange={(e) => setBio(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
						전화번호
					</StyledText>
					<Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
						생년월일
					</StyledText>
					<Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
				</Row>
				<Row>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
						이메일
					</StyledText>
					<EmailInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</Row>
				<BottomButton content="완료" onClick={handleSave} disabled={isLoading || uploading} />
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default ProfileEdit;
