import React from 'react';
import { IconsProps } from '../IconsProps';

const Home: React.FC<IconsProps> = ({ isFilled = false }) => {
	return (
		<>
			{isFilled ? (
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="1 0 14 14" fill="none">
					<path d="M8 2.6425L11.75 6.0175V11.875H10.25V7.375H5.75V11.875H4.25V6.0175L8 2.6425Z" fill="white" />
					<path d="M8 0.625L0.5 7.375H2.75V13.375H7.25V8.875H8.75V13.375H13.25V7.375H15.5L8 0.625Z" fill="white" />
				</svg>
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="1 0 14 14" fill="none">
					<path
						d="M8 2.6425L11.75 6.0175V11.875H10.25V7.375H5.75V11.875H4.25V6.0175L8 2.6425ZM8 0.625L0.5 7.375H2.75V13.375H7.25V8.875H8.75V13.375H13.25V7.375H15.5L8 0.625Z"
						fill="white"
					/>
				</svg>
			)}
		</>
	);
};

export default Home;
