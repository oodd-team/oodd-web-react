import React from 'react';
import type { IconsProps } from './dto';

// desktopNavBar의 아이콘 크기는 14, 12 / default의 아이콘 크기는 14, 14

const Message: React.FC<IconsProps> = ({ width = '14', height = '14', color = '', isFilled = false }) => {
	return (
		<>
			{isFilled ? ( // isFilled가 true일 때 원하는 색 사용 (desktopNavBar의 message-fill는 color을 black으로, default는 color을 white로)
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
				>
					<path
						d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25Z"
						fill={color}
					/>

					<path d="M12.2 1.8H1.8V11.4H2.8L3.4 10.8H12.2V1.8Z" fill={color} />
				</svg>
			) : (
				// isFilled가 false일 때 원하는 색 사용 (desktopNavBar의 message는 color을 black으로, default는 color을 #8E8E8E로, default의 message-white는 color을 white로)
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
				>
					<path
						d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25ZM12.4 9.7H2.95L1.6 11.05V1.6H12.4V9.7Z"
						fill={color}
					/>
				</svg>
			)}
		</>
	);
};

export default Message;
