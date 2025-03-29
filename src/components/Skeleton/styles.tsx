import { styled } from 'styled-components';

export const SkeletonContainer = styled.div`
	background-color: #e0e0e0;
	position: relative;
	overflow: hidden;
	background: linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
`;
