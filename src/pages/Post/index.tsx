import React, { useEffect, useRef, useState } from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto.ts';
import { BottomSheetProps } from '../Upload/PostUploadModal/dto.ts';
import { StyledText } from '../../components/Text/StyledText';
import {
	InputLayout,
	InputWrapper,
	MoreBtn,
	PostImg,
	PostInfo,
	PostText,
	PostWrapper,
	Products,
	UserInfo,
	UserName,
	UserProfile,
} from './styles';
import PostTopBar from './PostTopBar';
import ProductCard from './ProductCard';
import BottomSheet from '../../components/BottomSheet';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '../../styles/theme';
import profileImg from './../../assets/Post/profileImg.svg';
import postImg1 from './../../assets/Post/postImg1.svg';
import more from './../../assets/Post/more.svg';
import productImg from './../../assets/Post/productImg.svg';
import declaration from '../../assets/Post/declaration.svg';
import block from '../../assets/Post/block.svg';
import BottomButton from '../../components/BottomButton/index.tsx';

const Post: React.FC = () => {
	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
	const [isOpenReportSheet, setIsOpenReportSheet] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const nav = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	const productData = [
		{ id: 1, brandName: '브랜드1', modelName: '모델1/모델번호/URL...', productImgSrc: productImg },
		{ id: 2, brandName: '브랜드2', modelName: '모델2/모델번호/URL...', productImgSrc: productImg },
		{ id: 3, brandName: '브랜드3', modelName: '모델3/모델번호/URL...', productImgSrc: productImg },
		{ id: 4, brandName: '브랜드4', modelName: '모델4/모델번호/URL...', productImgSrc: productImg },
	];

	const postImages = [postImg1, postImg1, postImg1, postImg1];

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '신고하기',
				action: () => {
					setIsOpenBottomSheet(false);
					setIsOpenReportSheet(true);
				},
				icon: declaration,
			},
			{
				text: '차단하기',
				action: () => {
					setIsOpenBottomSheet(false);
				},
				icon: block,
			},
		],
		marginBottom: '50px',
	};

	const reportSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '스팸',
				action: () => {
					setIsOpenReportSheet(false);
				},
			},
			{
				text: '부적절한 콘텐츠',
				action: () => {
					setIsOpenReportSheet(false);
				},
			},
			{
				text: '괴롭힘',
				action: () => {
					setIsOpenReportSheet(false);
				},
			},
			{
				text: '그 외',
				action: () => {
					setIsOpenReportSheet(false);
				},
			},
			{
				text: '직접 입력',
				action: () => {
					setShowInput((prev) => !prev);
				},
			},
		],
		marginBottom: '50px',
	};

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet,
		isHandlerVisible: true,
		isBackgroundDimmed: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet(false);
			setShowInput(false);
		},
	};

	const reportSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOpenReportSheet,
		isHandlerVisible: true,
		isBackgroundDimmed: true,
		Component: () => (
			<div style={{ overflow: 'auto' }}>
				<BottomSheetMenu {...reportSheetMenuProps} />
				{showInput && (
					<InputLayout>
						<textarea
							ref={textareaRef}
							placeholder="해당 OOTD를 신고하려는 이유를 작성해주세요."
							value={inputValue} // value 속성으로 상태를 바인딩
							onChange={handleInputChange}
						></textarea>
						<BottomButton
							content="신고하기"
							onClick={() => setIsOpenReportSheet(false)}
							disabled={inputValue.trim().length === 0} // 값이 없을 때 비활성화
						/>
					</InputLayout>
				)}
			</div>
		),
		onCloseBottomSheet: () => {
			setIsOpenReportSheet(false);
			setShowInput(false);
		},
	};

	return (
		<OODDFrame>
			{isOpenBottomSheet && <BottomSheet {...bottomSheetProps} />}
			{isOpenReportSheet && (
				<BottomSheet {...reportSheetProps}>
					{showInput && (
						<InputLayout>
							<textarea
								placeholder="해당 OOTD를 신고하려는 이유를 작성해주세요."
								value={inputValue} // value 속성으로 상태를 바인딩
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<BottomButton
								content="신고하기"
								onClick={() => setIsOpenReportSheet(false)}
								disabled={inputValue.trim().length === 0} // 값이 없을 때 비활성화
							/>
						</InputLayout>
					)}
				</BottomSheet>
			)}
			<PostTopBar />
			<PostWrapper>
				<PostInfo>
					<UserInfo onClick={() => nav('/users/:userId')}>
						<UserProfile>
							<img src={profileImg} alt="profileImg" />
						</UserProfile>
						<UserName>
							<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
								IDID
							</StyledText>
						</UserName>
					</UserInfo>
					<MoreBtn onClick={() => setIsOpenBottomSheet(true)}>
						<img src={more} alt="more" />
					</MoreBtn>
				</PostInfo>
				<PostText>
					<StyledText
						$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
						color={theme.colors.black}
						style={{ opacity: '50%' }}
					>
						Text~~~~~~~~~~~~~~~~~~~~~~~ ...Text~~~~~~~~~~~~~~~~~~~~~~~ ...Text~~~~~~~~~~~~~~~~~~~~~~~ ...
					</StyledText>
				</PostText>
				<PostImg>
					<Swiper
						modules={[Pagination, Navigation]}
						slidesPerView={1}
						pagination={{ clickable: true }}
						navigation
						className="postSwiper"
					>
						{postImages.map((image, index) => (
							<SwiperSlide key={index}>
								<img src={image} alt="postImg" style={{ width: '100%', height: 'auto' }} />
							</SwiperSlide>
						))}
					</Swiper>
				</PostImg>
				<Products>
					{productData.map((product) => (
						<ProductCard
							key={product.id}
							brandName={product.brandName}
							modelName={product.modelName}
							productImgSrc={product.productImgSrc}
						/>
					))}
				</Products>
			</PostWrapper>
		</OODDFrame>
	);
};

export default Post;
