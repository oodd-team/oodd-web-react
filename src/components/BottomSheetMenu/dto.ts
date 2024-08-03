// SheetItemWithDivider에서 사용되는 Items 배열 요소
export interface SheetItemDto {
	text: string;
	action: () => any;
	icon: string; // svg를 import하여 값으로 사용
}

export interface BottomSheetMenuProps {
	items: SheetItemDto[]; // TODO: Item에서 메뉴별 아이콘 받도록 수정해야 함
	marginBottom: string;
}
