import { useEffect, useState } from 'react';
import TooltipBubble from './TooltipBubble';

import Cookies from 'js-cookie';
import { TooltipWrapper } from './styles';

interface TooltipDto {
	cardRef: React.MutableRefObject<HTMLDivElement | null>;
	ootdTooltipRef: React.MutableRefObject<HTMLDivElement[]>;
	activeIndex: number;
}

const Tooltip: React.FC<TooltipDto> = ({ cardRef, ootdTooltipRef, activeIndex }) => {
	const [isOpenMatchingTooltip, setIsOpenMatchingTooltip] = useState(false);
	const [isOpenOotdTooltip, setIsOpenOotdTooltip] = useState(false);
	const [matchingTooltipIndex, setMatchingTooltipIndex] = useState(0);
	const [ootdTooltipIndex, setOotdTooltipIndex] = useState(0);
	const [matchingTooltipBottom, setMatchingTooltipBottom] = useState<number>(0);

	const onClickMatchingTooltip = () => {
		if (matchingTooltipIndex < 1) {
			setMatchingTooltipIndex((prev) => prev + 1);
		} else {
			setIsOpenMatchingTooltip(false);
			Cookies.set('hasSeenMatchingTooltip', 'true');
		}
	};

	const onClickOotdTooltip = () => {
		if (ootdTooltipIndex < 2) {
			setOotdTooltipIndex((prev) => prev + 1);
		} else {
			setIsOpenOotdTooltip(false);
			Cookies.set('hasSeenOotdTooltip', 'true');
		}
	};

	useEffect(() => {
		const seenMatching = Cookies.get('hasSeenMatchingTooltip');
		const seenOotd = Cookies.get('hasSeenOotdTooltip');

		if (!seenMatching && activeIndex === 0) {
			if (cardRef) {
				setIsOpenMatchingTooltip(true);

				const cardLocation = cardRef.current?.getBoundingClientRect();

				// 현재 뷰포트에서 첫 번째 요소의 위치를 기준으로 계산
				const tooltipBottom = cardLocation!.bottom - 90;
				setMatchingTooltipBottom(tooltipBottom);
			}
		} else {
			setIsOpenMatchingTooltip(false);
		}

		// 매칭 탭에서 툴팁이 표시된 적이 없으면
		if (!seenOotd && activeIndex === 1) {
			if (ootdTooltipRef) {
				setIsOpenOotdTooltip(true);

				const element = ootdTooltipRef.current[1];
				console.log(element);

				if (element) {
					// 선택된 요소의 위치 계산
					const rect = element.getBoundingClientRect();
					const scrollTop = document.documentElement.scrollTop;
					const viewportHeight = window.innerHeight;

					const desiredPosition = viewportHeight - 73;

					setTimeout(() => {
						const scrollToPosition = rect.bottom + scrollTop - desiredPosition;
						window.scrollTo({
							top: scrollToPosition,
							behavior: 'smooth',
						});
					}, 300); // 스와이퍼가 완료된 후 스크롤
				}
				setIsOpenOotdTooltip(true);
			}
		} else {
			setIsOpenOotdTooltip(false);
		}
	}, [activeIndex]);

	return (
		<>
			{isOpenMatchingTooltip && (
				<TooltipWrapper onClick={onClickMatchingTooltip}>
					{matchingTooltipIndex === 0 ? (
						<TooltipBubble
							content={'내 스타일이 아닌 사용자의\n매칭 요청을 거절해요'}
							arrow={'25%'}
							top={matchingTooltipBottom}
						/>
					) : null}
					{matchingTooltipIndex === 1 ? (
						<TooltipBubble
							content={'사용자의 매칭 요청을 수락하고\n채팅을 시작해요'}
							arrow={'75%'}
							top={matchingTooltipBottom}
						/>
					) : null}
				</TooltipWrapper>
			)}
			{isOpenOotdTooltip && (
				<TooltipWrapper onClick={onClickOotdTooltip}>
					{ootdTooltipIndex === 0 ? (
						<TooltipBubble content={'내 스타일이 아닌 사용자를\n더 이상 조회하지 않아요'} arrow={'15.5%'} />
					) : null}
					{ootdTooltipIndex === 1 ? (
						<TooltipBubble content={'마음에 드는 사용자에게\n매칭 신청을 보내요'} arrow={'50%'} />
					) : null}
					{ootdTooltipIndex === 2 ? (
						<TooltipBubble content={'관심 친구로 등록하고\n조금 더 지켜볼 수 있어요'} arrow={'84.5%'} />
					) : null}
				</TooltipWrapper>
			)}
		</>
	);
};

export default Tooltip;
