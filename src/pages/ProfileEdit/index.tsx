import React, { useRef } from 'react';
import {
	ProfileEditContainer,
	ProfilePic,
	ProfilePicWrapper,
	Label,
	Input,
	TextArea,
	Button,
	Row,
	FileInput,
} from './styles';
import avatar from '../../assets/avatar.png';
import NavbarEdit from '../../components/NavbarEdit';

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
		<ProfileEditContainer>
			<NavbarEdit />
			<ProfilePicWrapper>
				<ProfilePic>
					<img src={avatar} alt="프로필 사진" />
				</ProfilePic>
				<Button onClick={handleButtonClick}>프로필 사진 변경</Button>
				<FileInput type="file" ref={fileInputRef} onChange={handleFileChange} />
			</ProfilePicWrapper>
			<Row>
				<Label>닉네임</Label>
				<Input type="text" defaultValue="IDID" />
			</Row>
			<Row>
				<Label>소개글</Label>
				<TextArea defaultValue="Text~~~~~~~~~~~~~~~" />
			</Row>
		</ProfileEditContainer>
	);
};

export default ProfileEdit;
