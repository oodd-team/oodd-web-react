import React, { useState, useEffect } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TagMent, OOTDContainer, TagContainer, TagRow, FeedContainer, OOTDLoading } from './styles';
import Tag from './Tag';
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
import { IsOpenBlockSuccessModalAtom, PostBlockAtom } from '../../../recoil/BlockBottomSheetAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FeedsAtom } from '../../../recoil/FeedsAtom';
import { SelectedTagsAtom } from '../../../recoil/SelectedTagsAtom';

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

const OOTD: React.FC<{ tooltipRef: React.MutableRefObject<HTMLDivElement[]>; onMoreClick: () => void }> = ({
	tooltipRef,
	onMoreClick,
}) => {
	const selectedTags = useRecoilValue(SelectedTagsAtom);
	const setSelectedTags = useSetRecoilState(SelectedTagsAtom);
	const [feeds, setFeeds] = useRecoilState(FeedsAtom);
	const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리
	const isOpenBlockSuccessModal = useRecoilValue(IsOpenBlockSuccessModalAtom);
	const postBlock = useRecoilValue(PostBlockAtom);

	// 여러 태그를 기반으로 피드를 가져오는 함수
	const fetchFeedsByTags = async (tagNames: string[]) => {
		try {
			setLoading(true); // API 호출 전에 로딩 상태를 true로 설정
			// 태그를 무작위로 선택하는 함수
			const getRandomTags = (tags: TagProps[], count: number) => {
				const shuffled = tags.sort(() => 0.5 - Math.random()); // 배열 무작위로 섞기
				return shuffled.slice(0, count).map((tag) => tag.tagName);
			};

			const query =
				tagNames.length === 0
					? getRandomTags(tagData, Math.ceil(tagData.length / 3))
							.map((tagName) => `styletag=${tagName}`)
							.join('&')
					: tagNames.map((tagName) => `styletag=${tagName}`).join('&');

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
			setLoading(false); // API 호출 후 로딩 상태를 false로 설정
		}
	};

	const handleTagClick = (index: number) => {
		setSelectedTags((prevSelectedTags: number[]) => {
			if (prevSelectedTags.includes(index)) {
				const newSelectedTags = prevSelectedTags.filter((tagIndex) => tagIndex !== index);
				fetchFeedsByTags(newSelectedTags.map((i) => tagData[i].tagName)); // 선택된 모든 태그에 대해 필터링
				return newSelectedTags;
			} else {
				const newSelectedTags = [...prevSelectedTags, index];
				fetchFeedsByTags(newSelectedTags.map((i) => tagData[i].tagName)); // 선택된 모든 태그에 대해 필터링
				return newSelectedTags;
			}
		});
	};

	// 사용자 차단에 성공하면 피드에서 해당 사용자의 게시글 제거
	useEffect(() => {
		if (isOpenBlockSuccessModal === true) {
			setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.userName !== postBlock?.friendName));
		}
	}, [isOpenBlockSuccessModal]);

	// 태그 데이터를 반으로 나눠서 UI에 표시
	const middleIndex = Math.ceil(tagData.length / 2);
	const firstHalf = tagData.slice(0, middleIndex);
	const secondHalf = tagData.slice(middleIndex);

	useEffect(() => {
		if (feeds.length !== 0) {
			return;
		}
		fetchFeedsByTags(selectedTags.map((i) => tagData[i].tagName));
	}, [feeds]);

	return (
		<OOTDContainer>
			<TagMent>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Find your style
				</StyledText>
			</TagMent>
			<TagContainer>
				<TagRow>
					{firstHalf.map((tag, index) => (
						<Tag
							key={index}
							tag={tag}
							isSelected={selectedTags.includes(index)}
							onClick={() => handleTagClick(index)}
						/>
					))}
				</TagRow>
				<TagRow>
					{secondHalf.map((tag, index) => (
						<Tag
							key={index + firstHalf.length}
							tag={tag}
							isSelected={selectedTags.includes(index + firstHalf.length)}
							onClick={() => handleTagClick(index + firstHalf.length)}
						/>
					))}
				</TagRow>
			</TagContainer>
			{loading && (
				<OOTDLoading>
					<Loading />
				</OOTDLoading>
			)}
			<FeedContainer style={{ display: loading ? 'none' : 'block' }}>
				{feeds.map((feed, index) => (
					<div ref={(el) => (tooltipRef.current[index] = el!)} key={index}>
						<Feed key={feed.userName} feed={feed} onMoreClick={onMoreClick} />
					</div>
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
