//TODO: marginBottom prop 제거
export interface BottomSheetMenuProps {
	items: SheetItemDto[];
	marginBottom?: string;
}

export interface SheetItemDto {
	text: string;
	action: () => void;
	icon?: string; // svg를 import하여 값으로 사용
}
