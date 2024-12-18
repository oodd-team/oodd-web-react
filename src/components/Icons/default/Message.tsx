import React from 'react';
import { IconsProps } from '../IconsProps';

const Message: React.FC<IconsProps> = ({ isFilled = false, color = '' }) => {
	if (color && !isFilled) {
		// color가 주어지고 isFilled가 false인 경우
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
				<path
					d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25ZM12.4 9.7H2.95L1.6 11.05V1.6H12.4V9.7Z"
					fill={color}
				/>
			</svg>
		);
	}
	if (isFilled) {
		// isFilled가 true인 경우
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
				<path
					d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25Z"
					fill="white"
				/>

				<path d="M12.2 1.8H1.8V11.4H2.8L3.4 10.8H12.2V1.8Z" fill="white" />
			</svg>
		);
	}

	// 기본값: isFilled가 false이고 color도 빈 문자열일 경우
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
			<path
				d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25ZM12.4 9.7H2.95L1.6 11.05V1.6H12.4V9.7Z"
				fill="#8E8E8E"
			/>
		</svg>
	);
};

export default Message;
