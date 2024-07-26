import { DefaultTheme, css } from 'styled-components';

const theme: DefaultTheme = {
	colors: {
		black: '#000000',
		gray4: '#434343',
		gray3: '#7B7B7B',
		gray2: '#C4C4C4',
		gray1: '#E9E9E9',
		white: '#FFFFFF',
	},
	fontStyles: {
		'heading1-bold': css`
			font-family: 'Gmarket Sans';
			font-weight: bold;
			font-size: 32px;
		`,
		'heading1-medium': css`
			font-family: 'Gmarket Sans';
			font-weight: 500; /* medium */
			font-size: 32px;
		`,
		'heading2-light': css`
			font-family: 'Gmarket Sans';
			font-weight: 300; /* light */
			font-size: 21px;
		`,
		'body1-medium': css`
			font-family: 'Gmarket Sans';
			font-weight: 500; /* medium */
			font-size: 16px;
		`,
		'body2-medium': css`
			font-family: 'Pretendard Variable';
			font-weight: 500; /* medium */
			font-size: 16px;
		`,
		'body2-regular': css`
			font-family: 'Pretendard Variable';
			font-weight: 400; /* normal */
			font-size: 16px;
		`,
		'body2-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 16px;
		`,
		'body3-light': css`
			font-family: 'Gmarket Sans';
			font-weight: 300; /* light */
			font-size: 14px;
		`,
		'body4-regular': css`
			font-family: 'Pretendard Variable';
			font-weight: 400; /* normal */
			font-size: 13px;
		`,
		'body4-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 13px;
		`,
		'body5-medium': css`
			font-family: 'Gmarket Sans';
			font-weight: 500; /* medium */
			font-size: 12px;
		`,
		'body6-regular': css`
			font-family: 'Pretendard Variable';
			font-weight: 400; /* normal */
			font-size: 12px;
		`,
		'body6-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 12px;
		`,
		'button1-medium': css`
			font-family: 'Pretendard Variable';
			font-weight: 500; /* medium */
			font-size: 16px;
		`,
		'button2-medium': css`
			font-family: 'Pretendard Variable';
			font-weight: 500; /* medium */
			font-size: 13px;
		`,
		'button2-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 13px;
		`,
	},
};

export default theme;
