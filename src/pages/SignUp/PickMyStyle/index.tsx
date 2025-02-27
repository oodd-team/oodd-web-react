import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserInfoApi, patchUserInfoApi } from '@apis/user';
import { PatchUserInfoRequest } from '@apis/user/dto';
import { getCurrentUserId } from '@utils/getCurrentUserId';
import { styleImages } from '@utils/styleImages';

import Back from '@assets/arrow/left.svg';

import BottomButton from '@components/BottomButton';
import { OODDFrame } from '@components/Frame/Frame';
import Modal from '@components/Modal';
import TopBar from '@components/TopBar';

import { PickMyStyleLayout, StyledSubTitle, StyledTitle, CategoryList, PlaceholderImage } from './style';

const PickMyStyle: React.FC = () => {
	const [nickname, setNickname] = useState('');
	const [clickedImages, setClickedImages] = useState<{ [key: number]: boolean }>({});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const navigate = useNavigate();
	const currentUserId = getCurrentUserId();

	// 유저 정보 가져오기
	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const userInfo = await getUserInfoApi(currentUserId);
				setNickname(userInfo.data.nickname);
			} catch (error) {
				console.error('유저 정보 불러오기 실패:', error);
			}
		};
		getUserInfo();
	}, [currentUserId]);

	// 이미지 클릭 시 상태 변경
	const handleImageClick = (id: number) => {
		setClickedImages((prev) => ({
			...prev,
			[id]: !prev[id], // 클릭할 때마다 토글
		}));
	};

	const handleSubmitBtnClick = async () => {
		const selectedCategories = Object.keys(clickedImages)
			.filter((id) => clickedImages[Number(id)]) // 클릭된 이미지만 필터링
			.map((id) => styleImages.find((img) => img.id === Number(id))?.category) // category 값 가져오기
			.filter((category): category is string => !!category); // undefined 제거

		const requestData: Partial<PatchUserInfoRequest> = {
			userStyletags: selectedCategories,
		};
		console.log(requestData);

		try {
			const data = await patchUserInfoApi(requestData, currentUserId);
			console.log(data);
			navigate('/');
		} catch (error) {
			console.error('API 요청 실패:', error);
			setModalMessage('스타일 선택 중 오류가 발생했습니다.');
			console.log(requestData);
			setIsModalOpen(true);
		}
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<OODDFrame>
			<TopBar
				LeftButtonSrc={Back}
				onClickLeftButton={() => {
					window.history.back();
				}}
			/>
			<PickMyStyleLayout>
				<StyledTitle
					$textTheme={{
						style: { mobile: 'heading1-bold', tablet: 'title2-bold', desktop: 'title2-bold' },
					}}
				>
					{nickname}님의 취향을 알려주세요!
				</StyledTitle>
				<StyledSubTitle
					$textTheme={{
						style: { mobile: 'caption1-medium', tablet: 'body2-medium', desktop: 'body2-medium' },
					}}
				>
					OODD가 당신의 취향을 분석하여 맞춤 스타일을 추천해 드릴게요.
				</StyledSubTitle>
				<CategoryList>
					{styleImages.map((image) => (
						<PlaceholderImage
							key={image.id}
							$isClicked={!!clickedImages[image.id]}
							onClick={() => handleImageClick(image.id)}
							data-category={image.category}
						>
							<img src={image.src} alt={`${image.category} 스타일`} />
						</PlaceholderImage>
					))}
				</CategoryList>
				<BottomButton
					content="OODD 시작하기"
					onClick={handleSubmitBtnClick}
					disabled={!Object.values(clickedImages).some(Boolean)}
				/>
				{isModalOpen && <Modal content={modalMessage} onClose={handleModalClose} />}
			</PickMyStyleLayout>
		</OODDFrame>
	);
};

export default PickMyStyle;
