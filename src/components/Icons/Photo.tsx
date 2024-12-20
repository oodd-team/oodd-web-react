import React from 'react';
import type { IconsProps } from './dto';

const Photo: React.FC<IconsProps> = ({ width = '', height = '', color = '' }) => {
	return (
		<>
			{color && ( // (photo-white)
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M15 3V12H6V3H15ZM15 1.5H6C5.175 1.5 4.5 2.175 4.5 3V12C4.5 12.825 5.175 13.5 6 13.5H15C15.825 13.5 16.5 12.825 16.5 12V3C16.5 2.175 15.825 1.5 15 1.5ZM8.625 8.7525L9.8925 10.4475L11.7525 8.1225L14.25 11.25H6.75L8.625 8.7525ZM1.5 4.5V15C1.5 15.825 2.175 16.5 3 16.5H13.5V15H3V4.5H1.5Z"
						fill={color}
					/>
				</svg>
			)}
			{!color && ( // (photo-big)
				<svg
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M83.333 16.667V66.667H33.333V16.667H83.333ZM83.333 8.333H33.333C28.5417 8.333 25 11.875 25 16.667V66.667C25 71.458 28.5417 75 33.333 75H83.333C88.125 75 91.667 71.458 91.667 66.667V16.667C91.667 11.875 88.125 8.333 83.333 8.333ZM47.9167 48.9583L54.9583 58.0417L73.75 40.625L85.8333 62.5H33.75L47.9167 48.9583ZM8.33333 25V83.333C8.33333 88.125 11.875 91.667 16.667 91.667H75V83.333H16.667V25H8.33333Z"
						fill="#8E8E8E"
					/>
				</svg>
			)}
		</>
	);
};

export default Photo;
