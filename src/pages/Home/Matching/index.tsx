import React, { useState, useEffect } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import Cards from '../../../components/Cards';
import { MatchingContainer, Like } from './styles';
import request, { BaseResponse } from '../../../apis/core';

interface Relationship {
	id: number;
	requestStatus: string; // 추가된 필드
}

const Matching: React.FC<{ tooltipRef: React.MutableRefObject<HTMLDivElement | null> }> = ({ tooltipRef }) => {
	const [matchingCount, setMatchingCount] = useState<number>(0);

	useEffect(() => {
		// 매칭 요청 수를 가져오는 API 호출
		const fetchMatchingCount = async () => {
			try {
				const response = await request.get<BaseResponse<Relationship[]>>('/user-relationships');

				// "pending" 상태의 요청만 카운트
				const pendingCount = response.result.filter((relationship) => relationship.requestStatus === 'pending').length;

				setMatchingCount(pendingCount); // 매칭 요청의 수를 설정
			} catch (error) {
				console.error('Failed to fetch matching count:', error);
			}
		};

		fetchMatchingCount();
	}, []);

	// 매칭 요청이 제거되었을 때 호출되는 함수
	const handleRemoveMatching = () => {
		setMatchingCount((prevCount) => Math.max(0, prevCount - 1));
	};

	return (
		<MatchingContainer>
			<Like>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Likes you {matchingCount}
				</StyledText>
			</Like>
			<div ref={tooltipRef}>
				<Cards onRemoveMatching={handleRemoveMatching} />
			</div>
		</MatchingContainer>
	);
};

export default Matching;
