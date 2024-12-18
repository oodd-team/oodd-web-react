import React from 'react';
import { IconsProps } from '../IconsProps';

const Like: React.FC<IconsProps> = ({ isFilled = false, color = '' }) => {
	if (color && !isFilled) {
		// color가 주어지고 isFilled가 false인 경우
		return (
			<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					id="Vector"
					d="M10.875 0.618652C9.57 0.618652 8.3175 1.22615 7.5 2.18615C6.6825 1.22615 5.43 0.618652 4.125 0.618652C1.815 0.618652 0 2.43365 0 4.74365C0 7.57865 2.55 9.88865 6.4125 13.3987L7.5 14.3812L8.5875 13.3912C12.45 9.88865 15 7.57865 15 4.74365C15 2.43365 13.185 0.618652 10.875 0.618652ZM7.575 12.2812L7.5 12.3562L7.425 12.2812C3.855 9.04865 1.5 6.91115 1.5 4.74365C1.5 3.24365 2.625 2.11865 4.125 2.11865C5.28 2.11865 6.405 2.86115 6.8025 3.88865H8.205C8.595 2.86115 9.72 2.11865 10.875 2.11865C12.375 2.11865 13.5 3.24365 13.5 4.74365C13.5 6.91115 11.145 9.04865 7.575 12.2812Z"
					fill={color}
				/>
			</svg>
		);
	}
	if (isFilled) {
		// isFilled가 true인 경우
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
				<path
					d="M8 13.8813L6.9125 12.8913C3.05 9.38877 0.5 7.07877 0.5 4.24377C0.5 1.93377 2.315 0.118774 4.625 0.118774C5.93 0.118774 7.1825 0.726275 8 1.68627C8.8175 0.726275 10.07 0.118774 11.375 0.118774C13.685 0.118774 15.5 1.93377 15.5 4.24377C15.5 7.07877 12.95 9.38877 9.0875 12.8988L8 13.8813Z"
					fill="#FF2389"
				/>
			</svg>
		);
	}

	// 기본값: isFilled가 false이고 color도 빈 문자열일 경우
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
			<path
				d="M11.375 0.118774C10.07 0.118774 8.8175 0.726275 8 1.68627C7.1825 0.726275 5.93 0.118774 4.625 0.118774C2.315 0.118774 0.5 1.93377 0.5 4.24377C0.5 7.07877 3.05 9.38877 6.9125 12.8988L8 13.8813L9.0875 12.8913C12.95 9.38877 15.5 7.07877 15.5 4.24377C15.5 1.93377 13.685 0.118774 11.375 0.118774ZM8.075 11.7813L8 11.8563L7.925 11.7813C4.355 8.54877 2 6.41127 2 4.24377C2 2.74377 3.125 1.61877 4.625 1.61877C5.78 1.61877 6.905 2.36127 7.3025 3.38877H8.705C9.095 2.36127 10.22 1.61877 11.375 1.61877C12.875 1.61877 14 2.74377 14 4.24377C14 6.41127 11.645 8.54877 8.075 11.7813Z"
				fill="#8E8E8E"
			/>
		</svg>
	);
};

export default Like;