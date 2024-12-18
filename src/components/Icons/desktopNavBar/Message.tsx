import React from 'react';
import { IconsProps } from '../IconsProps';

const Message: React.FC<IconsProps> = ({ isFilled = false }) => {
	return (
		<>
			{isFilled ? (
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
					{/*외곽선*/}
					<path
						d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25Z"
						fill="black"
					/>

					{/*내부 여백을 흰색으로 채우기*/}
					<path d="M12.2 1.8H1.8V11.4H2.8L3.4 10.8H12.2V1.8Z" fill="black" />
				</svg>
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
					<path
						d="M12.4 0.25H1.6C0.8575 0.25 0.25 0.8575 0.25 1.6V13.75L2.95 11.05H12.4C13.1425 11.05 13.75 10.4425 13.75 9.7V1.6C13.75 0.8575 13.1425 0.25 12.4 0.25ZM12.4 9.7H2.95L1.6 11.05V1.6H12.4V9.7Z"
						fill="black"
					/>
				</svg>
			)}
		</>
	);
};

export default Message;
