import React, { useState, useEffect } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TagMent, OOTDContainer, TagContainer, TagRow, FeedContainer } from './styles';
import Tag from './Tag';
import { FeedProps, TagProps, OOTDAPIResponse, UserResponse, Post } from './dto';
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
	const [selectedTags, setSelectedTags] = useState<number[]>([0]);
	const [feeds, setFeeds] = useState<FeedProps[]>([]);

	// 여러 태그를 기반으로 피드를 가져오는 함수
	const fetchFeedsByTags = async (tagNames: string[]) => {
		try {
			// 여러 개의 태그를 쿼리 파라미터로 추가
			const query = tagNames.map((tagName) => `styletag=${tagName}`).join('&');
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
		}
	};

	const handleTagClick = (index: number) => {
		setSelectedTags((prevSelectedTags) => {
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

	const handleRemoveFeed = (userName: string) => {
		setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.userName !== userName));
	};

	// 태그 데이터를 반으로 나눠서 UI에 표시
	const middleIndex = Math.ceil(tagData.length / 2);
	const firstHalf = tagData.slice(0, middleIndex);
	const secondHalf = tagData.slice(middleIndex);

	useEffect(() => {
		fetchFeedsByTags([tagData[selectedTags[0]].tagName]);
	}, []); // 첫 번째 태그 선택 시 피드를 가져옴

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
			<FeedContainer>
				{feeds.map((feed, index) => (
					<div ref={(el) => (tooltipRef.current[index] = el!)} key={index}>
						<Feed
							key={feed.userName}
							feed={feed}
							onRemove={() => handleRemoveFeed(feed.userName)}
							onMoreClick={onMoreClick}
						/>
					</div>
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
