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

	useEffect(() => {
		if (isOpenBottomSheet) {
			setInitialRender(false);
		}
	}, [isOpenBottomSheet]);

	// 드래그 시작 시점의 y값
	const onPointerDown = useCallback((event: React.PointerEvent | React.TouchEvent) => {
		event.stopPropagation();
		if ('touches' in event) {
			setStartY(event.touches[0].clientY);
		} else {
			setStartY(event.clientY);
		}
	}, []);

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
				}
				setStartY(null); // 초기화
			}
		},
		[startY, onCloseBottomSheet],
	);

	useEffect(() => {
		// pc
		const handlePointerUp = (event: PointerEvent) => onPointerUp(event);
		// 모바일
		const handleTouchEnd = (event: TouchEvent) => onPointerUp(event);

		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('touchend', handleTouchEnd);

		return () => {
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	}, [onPointerUp]);

	if (initialRender && !isOpenBottomSheet) return null;

	return (
		<BottomSheetWrapper
			$isOpenBottomSheet={isOpenBottomSheet}
			$isBackgroundDimmed={isBackgroundDimmed}
			onClick={(e: React.MouseEvent) => {
				// BottomSheet 외부를 클릭할 경우 BottomSheet 닫음
				if (e.target === e.currentTarget) {
					onCloseBottomSheet();
				}
			}}
		>
			<BottomSheetLayout
				onPointerDown={onPointerDown}
				onTouchStart={onPointerDown}
				$isOpenBottomSheet={isOpenBottomSheet}
			>
				<Handler />
				<Component />
			</BottomSheetLayout>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;
