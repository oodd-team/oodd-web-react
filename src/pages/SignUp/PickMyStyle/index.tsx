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

// const categoryImages: Record<string, string[]> = {
// 	classic: ['/images/classic1.jpg', '/images/classic2.jpg'],
// 	street: ['/images/street1.jpg', '/images/street2.jpg'],
// 	hip: ['/images/hip1.jpg', '/images/hip2.jpg'],
// 	casual: ['/images/casual1.jpg', '/images/casual2.jpg'],
// 	sporty: ['/images/sporty1.jpg', '/images/sporty2.jpg'],
// 	feminine: ['/images/feminine1.jpg', '/images/feminine2.jpg'],
// 	minimal: ['/images/minimal1.jpg', '/images/minimal2.jpg'],
// 	formal: ['/images/formal1.jpg', '/images/formal2.jpg'],
// 	outdoor: ['/images/outdoor1.jpg', '/images/outdoor2.jpg'],
// 	luxury: ['/images/luxury1.jpg', '/images/luxury2.jpg'],
// };

const PickMyStyle: React.FC = () => {
	const navigate = useNavigate();
	const navigateToLogin = () => {
		navigate('/login');
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
								<PlaceholderImage>이미지 1</PlaceholderImage>
								<PlaceholderImage>이미지 2</PlaceholderImage>
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
