import React, { useState, useEffect } from 'react';
import { OOTDContainer, FeedContainer, OOTDLoading } from './styles';
import { TagProps, OOTDAPIResponse, UserResponse, Post } from './dto';
import Feed from './Feed';
import request from '../../../apis/core';
import noProfileImg from '../../../assets/Home/no_profileImg.svg';
import classic from '../../../assets/Home/classic.svg';
import street from '../../../assets/Home/street.svg';
import hip from '../../../assets/Home/hip.svg';
import casual from '../../../assets/Home/casual.svg';
import sporty from '../../../assets/Home/sporty.svg';
import feminine from '../../../assets/Home/feminine.svg';
import minimal from '../../../assets/Home/minimal.svg';
import formal from '../../../assets/Home/formal.svg';
import outdoor from '../../../assets/Home/outdoor.svg';
import luxury from '../../../assets/Home/luxury.svg';
import Loading from '../../../components/Loading'; // Loading 컴포넌트
import { IsBlockSuccessModalOpenAtom, PostBlockAtom } from '../../../recoil/Home/BlockBottomSheetAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FeedsAtom } from '../../../recoil/Home/FeedsAtom';

const tagData: TagProps[] = [
	{ tagImgUrl: classic, tagName: 'classic' },
	{ tagImgUrl: street, tagName: 'street' },
	{ tagImgUrl: hip, tagName: 'hip' },
	{ tagImgUrl: casual, tagName: 'casual' },
	{ tagImgUrl: sporty, tagName: 'sporty' },
	{ tagImgUrl: feminine, tagName: 'feminine' },
	{ tagImgUrl: minimal, tagName: 'minimal' },
	{ tagImgUrl: formal, tagName: 'formal' },
	{ tagImgUrl: outdoor, tagName: 'outdoor' },
	{ tagImgUrl: luxury, tagName: 'luxury' },
];

const OOTD: React.FC<{ tooltipRef: React.MutableRefObject<HTMLDivElement[]> }> = ({ tooltipRef }) => {
	const [feeds, setFeeds] = useRecoilState(FeedsAtom);
	const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 관리
	const isBlockSuccessModalOpen = useRecoilValue(IsBlockSuccessModalOpenAtom);
	const postBlock = useRecoilValue(PostBlockAtom);

	// 여러 태그를 기반으로 피드를 가져오는 함수
	const fetchFeedsByTags = async () => {
		try {
			setIsLoading(true); // API 호출 전에 로딩 상태를 true로 설정
			// 태그를 무작위로 선택하는 함수
			const getRandomTags = (tags: TagProps[], count: number) => {
				const shuffled = tags.sort(() => 0.5 - Math.random()); // 배열 무작위로 섞기
				return shuffled.slice(0, count).map((tag) => tag.tagName);
			};

			const query = getRandomTags(tagData, Math.ceil(tagData.length / 3))
				.map((tagName) => `styletag=${tagName}`)
				.join('&');

			const response = await request.get<OOTDAPIResponse>(`/ootd?${query}`);
			if (response.isSuccess) {
				const fetchedFeeds = await Promise.all(
					response.result.posts.map(async (post: Post) => {
						const userResponse = await request.get<UserResponse>(`/users/${post.userId}`);
						return {
							userId: post.userId,
							postId: post.postId,
							profileUrl: userResponse.result.profilePictureUrl || noProfileImg,
							userName: userResponse.result.nickname || `User${post.userId}`,
							text: post.content,
							feedImgUrls: post.photoUrls,
						};
					}),
				);
				setFeeds(fetchedFeeds);
			} else {
				console.error('Failed to fetch feeds:', response.message);
			}
		} catch (error) {
			console.error('Error fetching feeds:', error);
		} finally {
			setIsLoading(false); // API 호출 후 로딩 상태를 false로 설정
		}
	};

	// 사용자 차단에 성공하면 피드에서 해당 사용자의 게시글 제거
	useEffect(() => {
		if (isBlockSuccessModalOpen === true) {
			setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.userName !== postBlock?.friendName));
		}
	}, [isBlockSuccessModalOpen]);

	useEffect(() => {
		if (feeds.length !== 0) {
			return;
		}
		fetchFeedsByTags();
	}, [feeds]);

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
						<Feed key={feed.userName} feed={feed} />
					</div>
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
