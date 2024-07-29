import React, { useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TagMent, OOTDContainer, TagContainer, TagRow, FeedContainer } from './styles';
import Tag from './Tag';
import { FeedProps, TagProps } from './dto';
import Feed from './Feed';

// 추후 변경
const tagData: TagProps[] = [
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#hip' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#classic' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#vintage' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#casual' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#chic' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#bohemian' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#sporty' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#formal' },
	{ tagImgUrl: './../../../../assets/Home/tag.svg', tagName: '#street' },
];

// 추후 변경
const feedData: FeedProps[] = [
	{
		profileUrl: './../../../../assets/Home/profileImg2.svg',
		userName: 'IDID',
		text: 'Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...Text~~~~~~~~~~~~~~~~~~~~~~~...',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
	{
		profileUrl: './../../../../assets/Home/profileImg2.svg',
		userName: 'IDID2',
		text: '굳굳',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
];

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
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.gray4}>
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
