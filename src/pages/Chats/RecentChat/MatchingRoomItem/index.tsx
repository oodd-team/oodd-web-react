import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import theme from '@styles/theme';

import { LatestMatchingData } from '@apis/matching/dto';

import defaultProfile from '@assets/default/defaultProfile.svg';

import { StyledText } from '@components/Text/StyledText';

import { UserImage, MatchingRoomLayout, LeftBox, RightBox, LatestMessage } from './styles';

const MatchingRoomItem: React.FC<Partial<LatestMatchingData>> = ({ requestStatus, createdAt }) => {
	const [timeAgo, setTimeAgo] = useState<string | null>(null);
	const nav = useNavigate();
	extend(relativeTime);

	const handleMatchingRoomClick = () => {
		nav(`/matching`);
	};

	useEffect(() => {
		if (createdAt) {
			// 초기 시간 설정
			setTimeAgo(dayjs(createdAt).locale('ko').fromNow());

			// 1초마다 `timeAgo`를 업데이트
			const interval = setInterval(() => {
				setTimeAgo(dayjs(createdAt).locale('ko').fromNow());
			}, 1000);

			// 컴포넌트 언마운트 시 타이머 정리
			return () => clearInterval(interval);
		} else {
			setTimeAgo(null);
		}
	}, []);

	return (
		<MatchingRoomLayout onClick={handleMatchingRoomClick}>
			<UserImage src={defaultProfile} alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.text.primary}>
					오딩이
				</StyledText>
				<LatestMessage $textTheme={{ style: 'caption1-regular' }} color={theme.colors.text.primary}>
					{requestStatus === 'pending' ? '얘가 너 소개받고 싶대' : '매칭이 들어오면 오딩이가 알려줄게!'}
				</LatestMessage>
			</LeftBox>
			<RightBox>
				<StyledText $textTheme={{ style: 'caption2-regular' }} color={theme.colors.text.caption}>
					{timeAgo}
				</StyledText>
			</RightBox>
		</MatchingRoomLayout>
	);
};

export default MatchingRoomItem;
