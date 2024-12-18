import React from 'react';
import { IconsProps } from '../IconsProps';

const Heart: React.FC<IconsProps> = ({ isFilled = false }) => {
	return (
		<>
			{isFilled ? (
				<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" fill="white" />
					<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" stroke="url(#paint0_linear_3603_1320)" />
					<path
						d="M28 34.8813L26.9125 33.8913C23.05 30.3888 20.5 28.0788 20.5 25.2438C20.5 22.9338 22.315 21.1188 24.625 21.1188C25.93 21.1188 27.1825 21.7263 28 22.6863C28.8175 21.7263 30.07 21.1188 31.375 21.1188C33.685 21.1188 35.5 22.9338 35.5 25.2438C35.5 28.0788 32.95 30.3888 29.0875 33.8988L28 34.8813Z"
						fill="#FF2389"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_3603_1320"
							x1="0.56"
							y1="2.7451"
							x2="58.788"
							y2="6.19466"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#FF2389" />
							<stop offset="1" stop-color="#F27575" />
						</linearGradient>
					</defs>
				</svg>
			) : (
				<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" fill="white" />
					<rect x="0.5" y="0.5" width="55" height="55" rx="27.5" stroke="url(#paint0_linear_3603_1320)" />
					<path
						d="M31.375 21.1187C30.07 21.1187 28.8175 21.7262 28 22.6862C27.1825 21.7262 25.93 21.1187 24.625 21.1187C22.315 21.1187 20.5 22.9337 20.5 25.2437C20.5 28.0787 23.05 30.3887 26.9125 33.8987L28 34.8812L29.0875 33.8912C32.95 30.3887 35.5 28.0787 35.5 25.2437C35.5 22.9337 33.685 21.1187 31.375 21.1187ZM28.075 32.7812L28 32.8562L27.925 32.7812C24.355 29.5487 22 27.4112 22 25.2437C22 23.7437 23.125 22.6187 24.625 22.6187C25.78 22.6187 26.905 23.3612 27.3025 24.3887H28.705C29.095 23.3612 30.22 22.6187 31.375 22.6187C32.875 22.6187 34 23.7437 34 25.2437C34 27.4112 31.645 29.5487 28.075 32.7812Z"
						fill="#8E8E8E"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_3603_1320"
							x1="0.56"
							y1="2.7451"
							x2="58.788"
							y2="6.19466"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#FF2389" />
							<stop offset="1" stop-color="#F27575" />
						</linearGradient>
					</defs>
				</svg>
			)}
		</>
	);
};

export default Heart;
