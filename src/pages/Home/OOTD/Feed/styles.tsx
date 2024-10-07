import styled from 'styled-components';
import { StyledText } from '../../../../components/Text/StyledText';

export const FeedWrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	margin-bottom: 1rem;
	height: auto;
`;

export const FeedTop = styled.div`
	display: flex;
	align-items: center;
	margin: 0.5rem 0 1rem 0;
`;

export const Info = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	cursor: pointer;
`;

export const FeedProfileImgWrapper = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	background: #ffdeed;

	box-shadow:
		0px 1px 2px 0px rgba(0, 0, 0, 0.12),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const FeedTimeAgo = styled(StyledText)`
	margin: 0 0.5rem 0 auto;
`;

export const FeedText = styled.div`
	margin-bottom: 0.5rem;
	display: flex;
	align-items: center;
	word-wrap: break-word;
	word-break: break-all;
`;

export const FeedImgBox = styled.div`
	position: relative;
	width: 100%;
	border-radius: 0.75rem;
	background-color: ${({ theme }) => theme.colors.gray1};
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;

	.ootd-image-small {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.ootdSwiper,
	.swiper-wrapper {
		z-index: 10;
		align-items: stretch;
	}

	.ootdSwiper .swiper-pagination {
		position: absolute;
		top: 0.75rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		pointer-events: none; /* 마우스 이벤트 무시 */
	}

	.ootdSwiper .swiper-pagination-bullet {
		width: 0.375rem;
		height: 0.375rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.white};
		background: rgba(255, 255, 255, 0.5);
		opacity: 1;
		pointer-events: auto; /* 페이지네이션 클릭 가능 */
	}

	.ootdSwiper .swiper-pagination-bullet-active {
		width: 0.375rem;
		height: 0.375rem;
		background-color: ${({ theme }) => theme.colors.white};
		opacity: 1;
	}

	.ootdSwiper .ootd-slide-small {
		transition: none !important;
	}
`;

export const ReactionWrapper = styled.div`
	position: absolute;
	width: 12.75rem;
	height: 6.75rem;
	bottom: 1.125rem;
	gap: 0.5rem;
	display: flex;
	flex-direction: column;
	z-index: 10;
`;

export const Reaction = styled.div`
	display: flex;
	justify-content: space-between;
	width: 12.75rem;
	height: 5rem;
	gap: 0.75rem;
`;

export const Btn = styled.div`
	cursor: pointer;
	width: 3.75rem;
	height: 3.75rem;
	background-color: rgba(0, 0, 0, 0.1);
	border: 0.0875rem solid ${({ theme }) => theme.colors.white};
	border-radius: 50%;
	backdrop-filter: blur(0.3125rem);
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 2rem;
		height: 2rem;
	}
`;

export const Comment = styled.div`
	display: flex;
	justify-content: space-between;
	width: 12.75rem;
	height: 5rem;
	gap: 0.75rem;
`;

export const CommentBtn = styled.div`
	cursor: pointer;
	width: 12.75rem;
	height: 2.5rem;
	background-color: rgba(0, 0, 0, 0.1);
	border: 0.0875rem solid ${({ theme }) => theme.colors.white};
	border-radius: 1.25rem;
	backdrop-filter: blur(0.3125rem);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	gap: 0.5rem;

	img {
		width: 1.5rem;
		height: 1.5rem;
	}
`;
