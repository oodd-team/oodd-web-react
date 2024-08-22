import React from 'react';
import { BackIcon, MidWrapper, PostTopBarContainer, RightSpace } from './styles';
import backIcon from './../../assets/ProfileViewer/backIcon.svg';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

// Post 페이지의 상단 바입니다.
const PostTopBar: React.FC = () => {
	const nav = useNavigate();

	return (
		<PostTopBarContainer>
			<BackIcon src={backIcon} alt="logo" onClick={() => nav(-1)} />
			<MidWrapper>
				<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1.2 }} color="rgba(0, 0, 0, 0.5)">
					IDID
				</StyledText>
				<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.2 }} color={theme.colors.black}>
					OOTD
				</StyledText>
			</MidWrapper>
			<RightSpace />
		</PostTopBarContainer>
	);
};

export default PostTopBar;
