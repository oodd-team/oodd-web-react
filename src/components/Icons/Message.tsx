import React from 'react';
import { IconsProps } from './IconsProps';

const Message: React.FC<IconsProps> = ({ isFilled = false, color = '' }) => {
	if (!isFilled) {
		if (color) {
			// color가 주어지고 isFilled가 false인 경우 (default의 message는 color을 #8E8E8E으로, desktopNavBar의 message는 color을 black으로 )
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
					<path
						d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25ZM12.4 9.7H2.95L1.6 11.05V1.6H12.4V9.7Z"
						fill={color}
					/>
				</svg>
			);
		}
	}
	if (color && isFilled) {
		// isFilled가 true인 경우 (message-fill / desktopNavBar는 fill=black, default는 fill = white)
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
				<path
					d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25Z"
					fill={color}
				/>

				<path d="M12.2 1.8H1.8V11.4H2.8L3.4 10.8H12.2V1.8Z" fill={color} />
			</svg>
		);
	}
	// 예외: 위 조건을 모두 만족하지 않는 경우, 기본적으로 아무것도 렌더링하지 않음
	return null;
};

export default Message;
