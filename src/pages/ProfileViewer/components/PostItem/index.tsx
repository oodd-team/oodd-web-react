import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { PostItemContainer, PostImageContainer, PostImage, LikesCount, HeartIcon, LikesOverlay, PinSvg} from './style';
import HeartSvg from '../../../../assets/heart.svg';
import PinIcon from '../../../../assets/Group 87.svg';
import { PostItemProps } from '../../dto';

const PostItem: React.FC<PostItemProps> = ({ post, isFixed }) => {
    return (
        <PostItemContainer>
            <PostImageContainer>
                <PostImage src={post.imageUrl} alt={`post-${post.id}`} />
                {isFixed && (
                        <PinSvg src={PinIcon} />
                )}
                <LikesOverlay>
                    <HeartIcon src={HeartSvg} alt="heart icon" />
                    <LikesCount>
                     <StyledText $textTheme={{ style: "body1-medium", lineHeight: 1.5 }} color={theme.colors.white}>
                        {post.likes}
                    </StyledText>
                    </LikesCount>
                </LikesOverlay>
            </PostImageContainer>
        </PostItemContainer>
    );
};

export default PostItem;