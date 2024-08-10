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
			font-size: 2rem;
		`,
		'heading1-medium': css`
			font-family: 'Gmarket Sans';
			font-weight: 500; /* medium */
			font-size: 2rem;
		`,
		'heading2-light': css`
			font-family: 'Gmarket Sans';
			font-weight: 300; /* light */
			font-size: 1.313rem;
		`,
		'body1-medium': css`
			font-family: 'Gmarket Sans';
			font-weight: 500; /* medium */
			font-size: 1rem;
		`,
		'body2-medium': css`
			font-family: 'Pretendard Variable';
			font-weight: 500; /* medium */
			font-size: 1rem;
		`,
		'body2-regular': css`
			font-family: 'Pretendard Variable';
			font-weight: 400; /* normal */
			font-size: 1rem;
		`,
		'body2-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 1rem;
		`,
		'body3-light': css`
			font-family: 'Gmarket Sans';
			font-weight: 300; /* light */
			font-size: 0.875rem;
		`,
		'body4-regular': css`
			font-family: 'Pretendard Variable';
			font-weight: 400; /* normal */
			font-size: 0.813rem;
		`,
		'body4-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 0.813rem;
		`,
		'body5-medium': css`
			font-family: 'Gmarket Sans';
			font-weight: 500; /* medium */
			font-size: 0.75rem;
		`,
		'body5-light': css`
			font-family: 'Gmarket Sans';
			font-weight: 300; /* light */
			font-size: 0.75rem;
		`,
		'body6-regular': css`
			font-family: 'Pretendard Variable';
			font-weight: 400; /* normal */
			font-size: 0.75rem;
		`,
		'body6-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 0.75rem;
		`,
		'button1-medium': css`
			font-family: 'Pretendard Variable';
			font-weight: 500; /* medium */
			font-size: 1rem;
		`,
		'button2-medium': css`
			font-family: 'Pretendard Variable';
			font-weight: 500; /* medium */
			font-size: 0.813rem;
		`,
		'button2-light': css`
			font-family: 'Pretendard Variable';
			font-weight: 300; /* light */
			font-size: 0.813rem;
		`,
	},
};

export default theme;