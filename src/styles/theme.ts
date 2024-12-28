import { DefaultTheme, css } from 'styled-components';

const theme: DefaultTheme = {
	colors: {
		// Brand Colors
		brand: {
			primary: '#FF2389', // Pink-500
			primaryLight: '#FFBBDA', // Pink-300
			primaryLighter: '#FEEEFB', // Pink-100
			gradient: 'linear-gradient(93deg, #FF2389 1.22%, #F27575 99.73%)',
		},

		gray: {
			50: '#FAFAFA', // 가장 밝은 Gray
			100: '#F8F8F8',
			200: '#E9E9E9', // 기존 gray1
			300: '#C4C4C4', // 기존 gray2
			400: '#BDBDBD',
			500: '#9E9E9E',
			600: '#7B7B7B', // 기존 gray3
			700: '#616161',
			800: '#434343', // 기존 gray4
			900: '#222222', // 가장 어두운 Gray
		},

		black: '#000000',
		white: '#FFFFFF',

		pink: {
			50: '#FFF5F9', // 가장 밝은 Pink
			100: '#FEEEFB',
			200: '#FFD6EB',
			300: '#FFBBDA',
			400: '#FF8FC2',
			500: '#FF2389', // 브랜드 메인 생상
			600: '#E61E7C',
			700: '#C0196D',
			800: '#9A1458',
			900: '#6E0E3F', // 가장 어두운 Pink
		},

		// Functional Colors
		text: {
			primary: '#000000', // Black
			secondary: '#4343432', // Gray-800
			tertiary: '##7B7B7B', // Gray-600
			caption: '#9E9E9E', // Gray-500
			onPrimary: '#FFFFFF', // brand.primary 배경 위 텍스트 (White)
		},

		background: {
			primary: '#FFFFFF',
			secondary: '#F8F8F8', //Gray-100 (input, 데스크탑의 사이드 바텀시트 등의 배경)
			divider: '#E9E9E9', // Gray-200
		},

		border: {
			active: '#FF2389', // Pink-500
			inactive: '#FFBBDA', // Pink-300
			devider: '#E9E9E9', // Gray-200
		},

		//여기서부터 기존 **추후 삭제 필요**
		gradient: 'linear-gradient(93deg, #FF2389 1.22%, #F27575 99.73%)',
		gray4: '#434343',
		gray3: '#7B7B7B',
		gray2: '#C4C4C4',
		gray1: '#E9E9E9',
		pink3: '#FF2389',
		pink2: '#FFBBDA',
		pink1: '#FEEEFB',
	},
	elevation: {
		sm: '0px 1px 3px rgba(255, 255, 255, 0.12)', // 작은 그림자
		md: '0px 4px 6px rgba(255, 255, 255, 0.16)', // 중간 그림자
		lg: '0px 10px 15px rgba(255, 255, 255, 0.24)', // 큰 그림자
	},
	visibleOnMobileTablet: css`
		@media (max-width: 767px) {
			min-width: 300px;
			max-width: 512px;
		}

		@media (min-width: 768px) and (max-width: 991px) {
			max-width: 640px;
		}

		@media (min-width: 992px) and (max-width: 1219px) {
			max-width: 640px;
		}

		@media (min-width: 1220px) {
			display: none;
		}
	`,
	visibleOnDesktop: css`
		@media (max-width: 1219px) {
			display: none;
		}

		@media (min-width: 1220px) {
			max-width: 640px;
		}
	`,
	breakPoints: css`
		@media (max-width: 767px) {
			min-width: 300px;
			max-width: 512px;
		}

		@media (min-width: 768px) and (max-width: 991px) {
			max-width: 640px;
		}

		@media (min-width: 992px) and (max-width: 1219px) {
			max-width: 640px;
		}

		@media (min-width: 1220px) {
			max-width: 640px;
		}
	`,
	fontStyles: {
		'display1-bold': css`
			font-family: 'Pretendard Variable';
			font-weight: 700; /* bold */
			font-size: 3.5rem;
			line-height: 128.6%; /* 4.501rem */
			letter-spacing: -0.11163rem;
		`,
		'display1-medium': css`
			font-family: 'Pretendard Variable';
			font-weight: 500; /* medium */
			font-size: 3.5rem;
			line-height: 128.6%; /* 4.501rem */
			letter-spacing: -0.11163rem;
		`,
		'display1-regular': css`
			font-family: 'Pretendard Variable';
			font-weight: 300;
			font-size: 3.5rem;
			line-height: 128.6%; /* 4.501rem */
			letter-spacing: -0.11163rem;
		`,
		'display2-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 2.5rem;
			font-weight: 700;
			line-height: 130%; /* 3.25rem */
			letter-spacing: -0.0705rem;
		`,
		'display2-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 2.5rem;
			font-weight: 500;
			line-height: 130%; /* 3.25rem */
			letter-spacing: -0.0705rem;
		`,
		'display2-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 2.5rem;
			font-weight: 400;
			line-height: 130%; /* 3.25rem */
			letter-spacing: -0.0705rem;
		`,
		'title1-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 2.25rem;
			font-weight: 700;
			line-height: 133.4%; /* 3.0015rem */
			letter-spacing: -0.06075rem;
		`,
		'title1-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 2.25rem;
			font-weight: 500;
			line-height: 133.4%; /* 3.0015rem */
			letter-spacing: -0.06075rem;
		`,
		'title1-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 2.25rem;
			font-weight: 400;
			line-height: 133.4%; /* 3.0015rem */
			letter-spacing: -0.06075rem;
		`,
		'title2-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 1.75rem;
			font-weight: 700;
			line-height: 135.8%; /* 2.3765rem */
			letter-spacing: -0.04131rem;
		`,
		'title2-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 1.75rem;
			font-weight: 500;
			line-height: 135.8%; /* 2.3765rem */
			letter-spacing: -0.04131rem;
		`,
		'title2-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 1.75rem;
			font-weight: 400;
			line-height: 135.8%; /* 2.3765rem */
			letter-spacing: -0.04131rem;
		`,
		'title3-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 1.5rem;
			font-weight: 700;
			line-height: 133.4%; /* 2.001rem */
			letter-spacing: -0.0345rem;
		`,
		'title3-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 1.5rem;
			font-weight: 500;
			line-height: 133.4%; /* 2.001rem */
			letter-spacing: -0.0345rem;
		`,
		'title3-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 1.5rem;
			font-weight: 400;
			line-height: 133.4%; /* 2.001rem */
			letter-spacing: -0.0345rem;
		`,
		'heading1-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 1.375rem;
			font-weight: 700;
			line-height: 136.4%; /* 1.8755rem */
			letter-spacing: -0.02669rem;
		`,
		'heading1-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 1.375rem;
			font-weight: 500;
			line-height: 136.4%; /* 1.8755rem */
			letter-spacing: -0.02669rem;
		`,
		'heading1-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 1.375rem;
			font-weight: 400;
			line-height: 136.4%; /* 1.8755rem */
			letter-spacing: -0.02669rem;
		`,
		'heading2-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 1.25rem;
			font-weight: 700;
			line-height: 140%; /* 1.75rem */
			letter-spacing: -0.0025rem;
		`,
		'heading2-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 1.25rem;
			font-weight: 500;
			line-height: 140%; /* 1.75rem */
			letter-spacing: -0.0025rem;
		`,
		'heading2-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 1.25rem;
			font-weight: 400;
			line-height: 140%; /* 1.75rem */
			letter-spacing: -0.0025rem;
		`,
		'headline1-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 1.125rem;
			font-weight: 700;
			line-height: 144.5%; /* 1.62563rem */
			letter-spacing: -0.00025rem;
		`,
		'headline1-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 1.125rem;
			font-weight: 500;
			line-height: 144.5%; /* 1.62563rem */
			letter-spacing: -0.00025rem;
		`,
		'headline1-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 1.125rem;
			font-weight: 400;
			line-height: 144.5%; /* 1.62563rem */
			letter-spacing: -0.00025rem;
		`,
		'headline2-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 1.0625rem;
			font-weight: 700;
			line-height: 141.2%; /* 1.50025rem */
		`,
		'headline2-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 1.0625rem;
			font-weight: 500;
			line-height: 141.2%; /* 1.50025rem */
		`,
		'headline2-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 1.0625rem;
			font-weight: 400;
			line-height: 141.2%; /* 1.50025rem */
		`,
		'body1-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 1rem;
			font-weight: 700;
			line-height: 150%; /* 1.5rem */
			letter-spacing: -0.00569rem;
		`,
		'body1-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 1rem;
			font-weight: 500;
			line-height: 150%; /* 1.5rem */
			letter-spacing: -0.00569rem;
		`,
		'body1-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 1rem;
			font-weight: 400;
			line-height: 150%; /* 1.5rem */
			letter-spacing: -0.00569rem;
		`,
		'body2-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 0.9375rem;
			font-weight: 700;
			line-height: 146.7%; /* 1.37531rem */
			letter-spacing: -0.009rem;
		`,
		'body2-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 0.9375rem;
			font-weight: 500;
			line-height: 146.7%; /* 1.37531rem */
			letter-spacing: -0.009rem;
		`,
		'body2-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 0.9375rem;
			font-weight: 400;
			line-height: 146.7%; /* 1.37531rem */
			letter-spacing: -0.009rem;
		`,
		'caption1-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 0.75rem;
			font-weight: 700;
			line-height: 133.4%; /* 1.0005rem */
			letter-spacing: -0.00188rem;
		`,
		'caption1-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 0.75rem;
			font-weight: 500;
			line-height: 133.4%; /* 1.0005rem */
			letter-spacing: -0.00188rem;
		`,
		'caption1-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 0.75rem;
			font-weight: 400;
			line-height: 133.4%; /* 1.0005rem */
			letter-spacing: -0.00188rem;
		`,
		'caption2-bold': css`
			font-family: 'Pretendard Variable';
			font-size: 0.6875rem;
			font-weight: 700;
			line-height: 127.3%; /* 0.87519rem */
			letter-spacing: -0.00213rem;
		`,
		'caption2-medium': css`
			font-family: 'Pretendard Variable';
			font-size: 0.6875rem;
			font-weight: 500;
			line-height: 127.3%; /* 0.87519rem */
			letter-spacing: -0.00213rem;
		`,
		'caption2-regular': css`
			font-family: 'Pretendard Variable';
			font-size: 0.6875rem;
			font-weight: 400;
			line-height: 127.3%; /* 0.87519rem */
			letter-spacing: -0.00213rem;
		`,
	},
};

export default theme;
