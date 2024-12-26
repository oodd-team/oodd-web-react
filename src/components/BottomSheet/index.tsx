import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { BottomSheetProps } from './dto';
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
	const [isInitialRender, setisInitialRender] = useState(true);
	const [isRendered, setIsRendered] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const [currentTranslateY, setCurrentTranslateY] = useState(0);
	const startY = useRef<number | null>(null);

	// BottomSheet 외부를 클릭할 경우 BottomSheet 닫음
	const handleBackgroundClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isDragging && e.target === e.currentTarget) {
			onCloseBottomSheet();
		}
	};

	const handleCloseButtonClick = () => {
		onCloseBottomSheet();
	};

	// 드래그 시작
	const handlePointerDown = useCallback((e: React.PointerEvent | React.TouchEvent) => {
		if ('touches' in e) {
			startY.current = e.touches[0].clientY;
		} else {
			startY.current = e.clientY;
		}
		setIsDragging(true);
	}, []);

	// 드래그 중
	const handlePointerMove = useCallback(
		(e: PointerEvent | TouchEvent) => {
			if (startY.current !== null) {
				let currentY;
				if ('touches' in e) {
					currentY = e.touches[0].clientY;
				} else {
					currentY = e.clientY;
				}
				const deltaY = currentY - startY.current;
				if (deltaY > 0) {
					setCurrentTranslateY(deltaY);
				}
			}
		},
		[startY],
	);

	// 드래그 종료
	const handlePonterUp = useCallback(
		(e: PointerEvent | TouchEvent) => {
			if (startY.current !== null) {
				let endY;
				if ('changedTouches' in e) {
					endY = e.changedTouches[0].clientY;
				} else {
					endY = e.clientY;
				}

				// 두 값의 변화량이 50px보다 크면 아래로 드래그한 것으로 간주하여 바텀시트 닫음
				const deltaY = endY - startY.current;

				if (deltaY > 100) {
					onCloseBottomSheet();
				} else {
					setCurrentTranslateY(0);
				}
				startY.current = null; // 초기화

				// pointerUp 직후 onClick 동작 방지
				setTimeout(() => {
					setIsDragging(false);
				}, 100);
			}
		},
		[startY, onCloseBottomSheet],
	);

	// 초기 렌더링 시 window에 이벤트 리스너 등록
	// 이벤트 리스너는 on[event] 형식으로 작성했습니다
	useEffect(() => {
		// 데스크탑
		const onPointerUp = (e: PointerEvent) => handlePonterUp(e);
		const onPointerMove = (e: PointerEvent) => handlePointerMove(e);
		// 모바일 & 태블릿
		const onTouchEnd = (e: TouchEvent) => handlePonterUp(e);
		const onTouchMove = (e: TouchEvent) => handlePointerMove(e);

		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
		window.addEventListener('touchmove', onTouchMove);
		window.addEventListener('touchend', onTouchEnd);

		// 언마운트 시 이벤트리스너 제거
		return () => {
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerup', onPointerUp);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
		};
	}, [handlePointerMove, handlePonterUp]);

	// 바텀시트 초기 렌더링 버그를 해결하기 위한 상태값 업데이트
	useEffect(() => {
		if (isOpenBottomSheet) {
			setisInitialRender(false);
			setIsRendered(true);
			setIsSideBarOpen(true);
			setCurrentTranslateY(0);
		} else {
			setIsRendered(false);
			setIsSideBarOpen(false);
		}
	}, [isOpenBottomSheet]);

	// 부모 요소 초기 렌더링 시 바텀시트 안 보이게 설정
	if (isInitialRender && !isOpenBottomSheet) return null;

	return (
		<BottomSheetWrapper $isBottomSheetOpen={isRendered} onClick={handleBackgroundClick}>
			{/* 모바일 & 태블릿 UI */}
			<BottomSheetLayout
				onPointerDown={handlePointerDown}
				onTouchStart={handlePointerDown}
				$currentTranslateY={currentTranslateY}
				$isBottomSheetOpen={isRendered}
			>
				{isHandlerVisible && <Handler />}
				<Component {...componentProps} />
			</BottomSheetLayout>
			{/* 데스크탑 UI */}
			<SideBarLayout $isSideBarOpen={isSideBarOpen}>
				<SideBarTopBar>
					<XButton onClick={handleCloseButtonClick} />
				</SideBarTopBar>
				<ComponentBox>
					<Component {...componentProps} />
				</ComponentBox>
			</SideBarLayout>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;
