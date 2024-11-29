import React, { useState, useEffect, useRef } from 'react';
import { OOTDContainer, FeedContainer, OOTDLoading } from './styles';
import Feed from './Feed';
import Loading from '../../../components/Loading'; // Loading 컴포넌트
import { getPostListApi } from '../../../apis/post';
import { PostSummary } from '../../../apis/post/dto';

interface OODDProps {
	tooltipRef: React.MutableRefObject<HTMLDivElement[]>;
}

const OOTD: React.FC<OODDProps> = ({ tooltipRef }) => {
	const [feeds, setFeeds] = useState<PostSummary[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
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
