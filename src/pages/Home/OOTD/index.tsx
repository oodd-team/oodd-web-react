import React, { useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TagMent, OOTDContainer, TagContainer, TagRow, FeedContainer } from './styles';
import Tag from './Tag';
import { FeedProps, TagProps } from './dto';
import Feed from './Feed';
import profileImg2 from '../../../assets/Home/profileImg2.svg';
import classic from '../../../assets/Home/classic.svg'
import street from '../../../assets/Home/street.svg'
import hip from '../../../assets/Home/hip.svg'
import casual from '../../../assets/Home/casual.svg'
import sporty from '../../../assets/Home/sporty.svg'
import feminine from '../../../assets/Home/feminine.svg'
import minimal from '../../../assets/Home/minimal.svg'
import formal from '../../../assets/Home/formal.svg'
import outdoor from '../../../assets/Home/outdoor.svg'
import luxury from '../../../assets/Home/luxury.svg'
import ootdImg1 from '../../../assets/Home/OOTDImg1.svg';
import ootdImg2 from '../../../assets/Home/OOTDImg2.svg';
import ootdImg3 from '../../../assets/Home/OOTDImg3.svg';
import ootdImg4 from '../../../assets/Home/OOTDImg4.svg';

// 추후 변경
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

// 추후 변경
const initialFeedData: FeedProps[] = [
	{
		profileUrl: profileImg2,
		userName: 'IDID',
		text: 'Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...',
		feedImgUrls: [ootdImg1, ootdImg2, ootdImg3, ootdImg4],
	},
	{
		profileUrl: profileImg2,
		userName: 'IDID2',
		text: '굳굳',
		feedImgUrls: [ootdImg1, ootdImg2, ootdImg3, ootdImg4],
	},
	{
		profileUrl: profileImg2,
		userName: 'IDID2',
		text: '굳굳',
		feedImgUrls: [ootdImg1, ootdImg2, ootdImg3, ootdImg4],
	},
	{
		profileUrl: profileImg2,
		userName: 'IDID2',
		text: '굳굳',
		feedImgUrls: [ootdImg1, ootdImg2, ootdImg3, ootdImg4],
	},
];

// OOTD 탭입니다.
const OOTD: React.FC<{ tooltipRef: React.MutableRefObject<HTMLDivElement[]>; onMoreClick: () => void }> = ({
	tooltipRef,
	onMoreClick,
}) => {
	const [selectedTags, setSelectedTags] = useState<number[]>([0]);
	const [feeds, setFeeds] = useState<FeedProps[]>(initialFeedData);

	const handleTagClick = (index: number) => {
		setSelectedTags((prevSelectedTags) => {
			if (prevSelectedTags.includes(index)) {
				return prevSelectedTags.filter((tagIndex) => tagIndex !== index);
			} else {
				return [...prevSelectedTags, index];
			}
		});
	};

	const handleRemoveFeed = (userName: string) => {
		setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.userName !== userName));
	};

	// tag 데이터를 반으로 나누기, 홀수일 경우 위에 줄이 하나 더 많게
	const middleIndex = Math.ceil(tagData.length / 2);
	const firstHalf = tagData.slice(0, middleIndex);
	const secondHalf = tagData.slice(middleIndex);

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
					<div ref={(el) => (tooltipRef.current[index] = el!)}>
						<Feed key={feed.userName} feed={feed} onRemove={() => handleRemoveFeed(feed.userName)} onMoreClick={onMoreClick} />
					</div>
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
