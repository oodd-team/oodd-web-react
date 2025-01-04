import type { IconsProps } from './dto';

const Photo: React.FC<IconsProps> = ({ width = '18', height = '18', color = '#8E8E8E' }) => {
	return (
		// photo-big는 크기와 높이를 100, 100으로 설정 (<Photo width=, height=>) / photo-white는 color을 white로 설정 (<Photo color= >)
		<svg width={width} height={height} viewBox={`0 0 100 100`} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M80 20V65H35V20H80ZM80 12.5H35C30.875 12.5 27.5 15.875 27.5 20V65C27.5 69.125 30.875 72.5 35 72.5H80C84.125 72.5 87.5 69.125 87.5 65V20C87.5 15.875 84.125 12.5 80 12.5ZM48.125 48.7625L54.4625 57.2375L63.7625 45.6125L76.25 61.25H38.75L48.125 48.7625ZM12.5 27.5V80C12.5 84.125 15.875 87.5 20 87.5H72.5V80H20V27.5H12.5Z
"
				fill={color}
			/>
		</svg>
	);
};

export default Photo;
