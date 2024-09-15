import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import { TagImgWrapper, TagWrapper } from './styles';
import theme from '../../../../styles/theme';
import { TagProps } from '../dto';

interface Props {
	tag: TagProps;
	isSelected: boolean;
	onClick: () => void;
}

const Tag: React.FC<Props> = ({ tag, isSelected, onClick }) => {
	return (
		<TagWrapper $isSelected={isSelected} onClick={onClick}>
			<TagImgWrapper>
				<img src={tag.tagImgUrl} alt="tag" />
			</TagImgWrapper>
			<StyledText
				$textTheme={{ style: 'body3-light', lineHeight: 1.2 }}
				color={isSelected ? theme.colors.white : theme.colors.black}
			>
				#{tag.tagName}
			</StyledText>
		</TagWrapper>
	);
};

export default Tag;
