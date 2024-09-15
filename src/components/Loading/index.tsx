import { Dot, DotBox, LoadingWrapper } from './styles';

const Loading: React.FC = () => {
	return (
		<LoadingWrapper>
			<DotBox>
				<Dot $index={0} />
				<Dot $index={1} />
				<Dot $index={2} />
			</DotBox>
		</LoadingWrapper>
	);
};

export default Loading;
