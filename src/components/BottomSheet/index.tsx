import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BottomSheetProps } from './dto';
import {
	BottomSheetWrapper,
	BottomSheetLayout,
	Handler,
	SideBarLayout,
	XButton,
	SideBarTopBar,
	ComponentBox,
} from './styles';

const BottomSheet: React.FC<BottomSheetProps> = ({
	isOpenBottomSheet,
	isHandlerVisible = true,
	Component,
	componentProps,
	onCloseBottomSheet,
}) => {
	const startY = useRef<number | null>(null);
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const [initialRender, setInitialRender] = useState(true);
	const [isRendered, setIsRendered] = useState(false);
	const [currentTranslateY, setCurrentTranslateY] = useState(0);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	useEffect(() => {
		if (isOpenBottomSheet) {
			setIsSideBarOpen(true);
			setInitialRender(false);
			setIsRendered(true);
			setCurrentTranslateY(0); // 초기화
		} else {
			setIsSideBarOpen(false); // 애니메이션 시간에 맞춰 숨김
			setIsRendered(false);
		}
	}, [isOpenBottomSheet]);

	// 드래그 시작 시점의 y값
	const onPointerDown = useCallback((event: React.PointerEvent | React.TouchEvent) => {
		if ('touches' in event) {
			startY.current = event.touches[0].clientY;
		} else {
			startY.current = event.clientY;
		}
		setIsDragging(true);
	}, []);

	const onPointerMove = useCallback(
		(event: PointerEvent | TouchEvent) => {
			if (startY.current !== null) {
				let currentY;
				if ('touches' in event) {
					currentY = event.touches[0].clientY;
				} else {
					currentY = event.clientY;
				}
				const deltaY = currentY - startY.current;
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
			if (startY.current !== null) {
				let endY;
				if ('changedTouches' in event) {
					endY = event.changedTouches[0].clientY;
				} else {
					endY = event.clientY;
				}

				// 두 값의 변화량이 50px보다 크면 아래로 드래그한 것으로 간주하여 바텀시트 닫음
				const deltaY = endY - startY.current;

				if (deltaY > 100) {
					onCloseBottomSheet();
				} else {
					setCurrentTranslateY(0);
				}
				startY.current = null; // 초기화

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
			$isOpenBottomSheet={isRendered}
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
				$isOpenBottomSheet={isRendered}
			>
				{isHandlerVisible && <Handler />}
				<Component {...componentProps} />
			</BottomSheetLayout>
			<SideBarLayout $isSideBarOpen={isSideBarOpen}>
				<SideBarTopBar>
					<XButton />
				</SideBarTopBar>
				<ComponentBox>
					<Component {...componentProps} />
				</ComponentBox>
			</SideBarLayout>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;
