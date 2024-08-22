import { useEffect, useState } from 'react';
import { Dot, DotBox, LoadingWrapper } from './styles';

const Loading: React.FC = () => {
	const [dotIndex, setDotIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setDotIndex((prev) => prev + 1);
		}, 300); // 0.3초마다 업데이트

		// 컴포넌트가 언마운트되면 interval을 정리
		return () => clearInterval(interval);
	}, []);

	return (
		<LoadingWrapper>
			<DotBox>
				<Dot $index={0} $dotIndex={dotIndex} />
				<Dot $index={1} $dotIndex={dotIndex} />
				<Dot $index={2} $dotIndex={dotIndex} />
			</DotBox>
		</LoadingWrapper>
	);
};

export default Loading;
