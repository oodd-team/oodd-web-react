import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import Back from '@assets/arrow/left.svg';

import BottomButton from '@components/BottomButton';
import { OODDFrame } from '@components/Frame/Frame';
import TopBar from '@components/TopBar';

import {
	PickMyStyleLayout,
	StyledSubTitle,
	StyledTitle,
	CategoryList,
	CategoryItem,
	ImageContainer,
	PlaceholderImage,
	StyledCategory,
} from './style';

const categories = [
	'classic',
	'street',
	'hip',
	'casual',
	'sporty',
	'feminine',
	'minimal',
	'formal',
	'outdoor',
	'luxury',
];

const PickMyStyle: React.FC = () => {
	const [clickedImages, setClickedImages] = useState<{ [key: string]: boolean }>({});
	const navigate = useNavigate();

	const navigateToLogin = () => {
		navigate('/login');
	};

	// 특정 이미지 클릭 시 해당 이미지의 상태만 변경
	const handleImageClick = (category: string, index: number) => {
		const key = `${category}-${index}`;
		setClickedImages((prev) => ({
			...prev,
			[key]: !prev[key], // 클릭할 때마다 상태 변경 (토글 기능)
		}));
	};

	return (
		<OODDFrame>
			<TopBar LeftButtonSrc={Back} onClickLeftButton={navigateToLogin} />
			<PickMyStyleLayout>
				<CategoryList>
					<StyledTitle
						$textTheme={{
							style: { mobile: 'title3-bold', tablet: 'title2-bold', desktop: 'title1-bold' },
						}}
					>
						카테고리별 취향을 골라보세요!💗
					</StyledTitle>
					<StyledSubTitle
						$textTheme={{
							style: { mobile: 'caption1-medium', tablet: 'body2-medium', desktop: 'body1-medium' },
						}}
					>
						OODD가 당신의 취향의 스타일을 가진 분들을 소개해 드릴게요!
					</StyledSubTitle>
					{categories.map((category) => (
						<CategoryItem key={category}>
							<StyledCategory $textTheme={{ style: 'body1-bold' }} color={theme.colors.brand.primary}>
								# {category}
							</StyledCategory>
							<ImageContainer>
								{[0, 1].map((index) => (
									<PlaceholderImage
										key={index}
										isClicked={!!clickedImages[`${category}-${index}`]}
										onClick={() => handleImageClick(category, index)}
									>
										이미지 {index + 1}
									</PlaceholderImage>
								))}
							</ImageContainer>
						</CategoryItem>
					))}
				</CategoryList>
				<BottomButton content="OODD 시작하기" onClick={navigateToLogin} disabled={true} />
			</PickMyStyleLayout>
		</OODDFrame>
	);
};

export default PickMyStyle;
