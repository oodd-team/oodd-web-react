import React, { useCallback, useEffect, useState } from 'react';
import { BottomSheetProps } from './dto';
import { BottomSheetWrapper, BottomSheetLayout, Handler } from './styles';

const BottomSheet: React.FC<BottomSheetProps> = ({
	isOpenBottomSheet,
	isBackgroundDimmed,
	Component,
	onCloseBottomSheet,
}) => {
	const [startY, setStartY] = useState<number | null>(null);
	const [initialRender, setInitialRender] = useState(true);
	const [currentTranslateY, setCurrentTranslateY] = useState(0);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	useEffect(() => {
		if (isOpenBottomSheet) {
			setInitialRender(false);
			setCurrentTranslateY(0); // 초기화
		}
	}, [isOpenBottomSheet]);

	// 드래그 시작 시점의 y값
	const onPointerDown = useCallback((event: React.PointerEvent | React.TouchEvent) => {
		if ('touches' in event) {
			setStartY(event.touches[0].clientY);
		} else {
			setStartY(event.clientY);
		}
		setIsDragging(true);
	}, []);

	const onPointerMove = useCallback(
		(event: PointerEvent | TouchEvent) => {
			if (startY !== null) {
				let currentY;
				if ('touches' in event) {
					currentY = event.touches[0].clientY;
				} else {
					currentY = event.clientY;
				}
				const deltaY = currentY - startY;
				if (deltaY > 0) {
					setCurrentTranslateY(deltaY);
				}
			}
		},
		[startY],
	);

	// 드래그 종료 시점의 y값
	const onPointerUp = useCallback(
		(event: PointerEvent | TouchEvent) => {
			if (startY !== null) {
				let endY;
				if ('changedTouches' in event) {
					endY = event.changedTouches[0].clientY;
				} else {
					endY = event.clientY;
				}

				// 두 값의 변화량이 20px보다 크면 아래로 드래그한 것으로 간주하여 바텀시트 닫음
				const deltaY = endY - startY;

				if (deltaY > 20) {
					onCloseBottomSheet();
				} else {
					setCurrentTranslateY(0);
				}

				// PointerUp 직후 onClick 동작 방지
				setTimeout(() => {
					setIsDragging(false);
				}, 100);
			}
		},
		[startY, onCloseBottomSheet],
	);

	useEffect(() => {
		// pc
		const handlePointerUp = (event: PointerEvent) => onPointerUp(event);
		const handlePointerMove = (event: PointerEvent) => onPointerMove(event);
		// 모바일
		const handleTouchEnd = (event: TouchEvent) => onPointerUp(event);
		const handleTouchMove = (event: TouchEvent) => onPointerMove(event);

		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('touchend', handleTouchEnd);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	}, [onPointerMove, onPointerUp]);

	// 초기 렌더링 시 바텀시트 안 보이게 설정
	if (initialRender && !isOpenBottomSheet) return null;

	return (
		<BottomSheetWrapper
			$isOpenBottomSheet={isOpenBottomSheet}
			$isBackgroundDimmed={isBackgroundDimmed}
			onClick={(e: React.MouseEvent) => {
				// BottomSheet 외부를 클릭할 경우 BottomSheet 닫음
				if (!isDragging && e.target === e.currentTarget) {
					onCloseBottomSheet();
				}
			}}
		>
			<BottomSheetLayout
				onPointerDown={onPointerDown}
				onTouchStart={onPointerDown}
				$currentTranslateY={currentTranslateY}
				$isOpenBottomSheet={isOpenBottomSheet}
			>
				<Handler />
				<Component />
			</BottomSheetLayout>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;
