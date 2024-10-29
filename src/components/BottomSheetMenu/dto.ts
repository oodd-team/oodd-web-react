// SheetItemWithDivider에서 사용되는 Items 배열 요소
export interface SheetItemDto {
	text: string;
	action: () => void;
	icon?: string; // svg를 import하여 값으로 사용
}

//TODO: marginBottom prop 제거
export interface BottomSheetMenuProps {
	items: SheetItemDto[];
	marginBottom?: string;
}
