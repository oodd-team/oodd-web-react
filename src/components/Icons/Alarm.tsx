import type { IconsProps } from './dto';

const Alarm: React.FC<IconsProps> = ({ isFilled = false, width = '14', height = '18' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 18" fill="none">
			<path
				d="M0 15.3V13.5H1.75V7.2C1.75 5.958 2.1175 4.851 2.84375 3.879C3.57 2.907 4.52375 2.277 5.6875 1.98V1.35C5.6875 0.972 5.81875 0.657 6.0725 0.396C6.32625 0.135 6.64125 0 7 0C7.35875 0 7.67375 0.135 7.9275 0.396C8.18125 0.657 8.3125 0.981 8.3125 1.35V1.98C9.47625 2.277 10.43 2.916 11.1562 3.879C11.8825 4.842 12.25 5.949 12.25 7.2V13.5H14V15.3H0ZM7 18C6.51875 18 6.1075 17.82 5.76625 17.469C5.425 17.118 5.25 16.695 5.25 16.2H8.75C8.75 16.695 8.575 17.118 8.23375 17.469C7.8925 17.82 7.48125 18 7 18ZM3.5 13.5H10.5V7.2C10.5 6.21 10.1587 5.364 9.4675 4.653C8.77625 3.942 7.95375 3.591 6.99125 3.591C6.02875 3.591 5.20625 3.942 4.515 4.653C3.82375 5.364 3.4825 6.21 3.4825 7.2V13.5H3.5Z"
				fill="#8E8E8E"
			/>
			{isFilled && <path d="M11 14.5H2.5V6C2.5 4 5 3 7.5 3C9.5 3 10.6667 5.33333 11 6.5V14.5Z" fill="#8E8E8E" />}
		</svg>
	);
};

export default Alarm;
