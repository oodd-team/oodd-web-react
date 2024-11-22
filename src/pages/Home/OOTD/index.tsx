import React, { useState, useEffect, useRef } from 'react';
import { OOTDContainer, FeedContainer, OOTDLoading } from './styles';
import Feed from './Feed';
import Loading from '../../../components/Loading'; // Loading 컴포넌트
import { IsBlockSuccessModalOpenAtom, PostBlockAtom } from '../../../recoil/Home/BlockBottomSheetAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FeedsAtom } from '../../../recoil/Home/FeedsAtom';
import { getPostListApi } from '../../../apis/post';

interface OODDProps {
	tooltipRef: React.MutableRefObject<HTMLDivElement[]>;
}

const OOTD: React.FC<OODDProps> = ({ tooltipRef }) => {
	const [feeds, setFeeds] = useRecoilState(FeedsAtom);
	const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리
	const isBlockSuccessModalOpen = useRecoilValue(IsBlockSuccessModalOpenAtom);
	const postBlock = useRecoilValue(PostBlockAtom);
	const feedPageRef = useRef(1);

	const getPostList = async () => {
		const response = await getPostListApi(feedPageRef.current, 20);

		if (response.isSuccess) {
			setFeeds([...feeds, ...response.data.post]);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getPostList();
	}, [feedPageRef.current]);

	// 사용자 차단에 성공하면 피드에서 해당 사용자의 게시글 제거
	useEffect(() => {
		if (isBlockSuccessModalOpen === true) {
			setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.user.nickname !== postBlock?.friendName));
		}
	}, [isBlockSuccessModalOpen]);

	return (
		<OOTDContainer>
			{isLoading && (
				<OOTDLoading>
					<Loading />
				</OOTDLoading>
			)}
			<FeedContainer style={{ display: isLoading ? 'none' : 'block' }}>
				{feeds.map((feed, index) => (
					<div ref={(el) => (tooltipRef.current[index] = el!)} key={index}>
						<Feed key={feed.user.userId} feed={feed} />
					</div>
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
