import { SkeletonContainer } from './styles';

interface SkeletonProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string | number;
	className?: string;
	style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
	width = '100%',
	height = '16px',
	borderRadius = '4px',
	className = '',
}) => {
	// width와 height가 숫자인 경우 rem 단위를 추가
	const getSize = (size: string | number) => {
		if (typeof size === 'number') {
			return `${size}px`;
		}
		return size;
	};

	return (
		<SkeletonContainer
			className={className}
			style={{
				width: getSize(width),
				height: getSize(height),
				borderRadius: getSize(borderRadius),
			}}
		/>
	);
};

export default Skeleton;
