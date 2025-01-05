import type { IconsProps } from './dto';

const Home: React.FC<IconsProps> = ({ color = '', isFilled = false, width = '14', height = '14' }) => {
	return (
		<>
			{isFilled ? ( // isFilled가 true일 때 원하는 색 사용 (desktopNavBar의 home-fill는 color을 black으로, default는 color을 white로)
				<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="1 0 14 14" fill="none">
					<path d="M8 2.6425L11.75 6.0175V11.875H10.25V7.375H5.75V11.875H4.25V6.0175L8 2.6425Z" fill={color} />
					<path d="M8 0.625L0.5 7.375H2.75V13.375H7.25V8.875H8.75V13.375H13.25V7.375H15.5L8 0.625Z" fill={color} />
				</svg>
			) : (
				// isFilled가 false일 때 원하는 색 사용 (desktopNavBar의 home은은 color을 black으로, default는 color을 white로)
				<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="1 0 14 14" fill="none">
					<path
						d="M8 2.6425L11.75 6.0175V11.875H10.25V7.375H5.75V11.875H4.25V6.0175L8 2.6425ZM8 0.625L0.5 7.375H2.75V13.375H7.25V8.875H8.75V13.375H13.25V7.375H15.5L8 0.625Z"
						fill={color}
					/>
				</svg>
			)}
		</>
	);
};

export default Home;
