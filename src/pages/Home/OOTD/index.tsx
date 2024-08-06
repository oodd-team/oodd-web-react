import React, { useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TagMent, OOTDContainer, TagContainer, TagRow, FeedContainer } from './styles';
import Tag from './Tag';
import { FeedProps, TagProps } from './dto';
import Feed from './Feed';
import profileImg2 from '../../../assets/Home/profileImg2.svg';
import feedImg from '../../../assets/Home/feedImg.svg';
import tag from '../../../assets/Home/tag.svg';

// 추후 변경
const tagData: TagProps[] = [
	{ tagImgUrl: tag, tagName: '#hip' },
	{ tagImgUrl: tag, tagName: '#classic' },
	{ tagImgUrl: tag, tagName: '#vintage' },
	{ tagImgUrl: tag, tagName: '#casual' },
	{ tagImgUrl: tag, tagName: '#chic' },
	{ tagImgUrl: tag, tagName: '#bohemian' },
	{ tagImgUrl: tag, tagName: '#sporty' },
	{ tagImgUrl: tag, tagName: '#formal' },
	{ tagImgUrl: tag, tagName: '#street' },
];

// 추후 변경
const feedData: FeedProps[] = [
	{
		profileUrl: profileImg2,
		userName: 'IDID',
		text: 'Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...',
		feedImgUrl: feedImg,
	},
	{
		profileUrl: profileImg2,
		userName: 'IDID2',
		text: '굳굳',
		feedImgUrl: feedImg,
	},
];

// OOTD 탭입니다.
const OOTD: React.FC = () => {
	const [selectedTags, setSelectedTags] = useState<number[]>([0]);

	const handleTagClick = (index: number) => {
		setSelectedTags((prevSelectedTags) => {
			if (prevSelectedTags.includes(index)) {
				return prevSelectedTags.filter((tagIndex) => tagIndex !== index);
			} else {
				return [...prevSelectedTags, index];
			}
		});
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
				{feedData.map((feed) => (
					<Feed feed={feed} />
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
