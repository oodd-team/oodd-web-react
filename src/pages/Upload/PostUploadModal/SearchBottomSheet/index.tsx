import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SheetWrapper, SheetContent, Input, SearchResultList, SearchResultItem } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';
import Loader from '../../InstaConnectModal/Loader/Loader';
import theme from '../../../../styles/theme';

interface ClothingInfo {
	image: string;
	brand: string;
	model: string;
	url: string;
}

interface BottomSheetProps {
	onClose: () => void;
	onSelectClothingInfo: (clothingInfo: ClothingInfo) => void;
}

const SearchBottomSheet: React.FC<BottomSheetProps> = ({ onClose, onSelectClothingInfo }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [start, setStart] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const [total, setTotal] = useState(0);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleInputChange = (query: string) => {
		setSearchQuery(query);
	};

	const fetchSearchResult = async (searchQuery: string, start: number) => {
		try {
			//프록시 서버 사용
			const response = await axios.get(
				'https://0dd3w25c7c.execute-api.ap-northeast-2.amazonaws.com/default/getNaverShopping',
				{
					params: {
						query: searchQuery,
						start: start,
					},
				},
			);

			if (response.status === 200 && response.data.items) {
				return response.data;
			} else {
				console.error('Unexpected response structure:', response);
				return null;
			}
		} catch (error) {
			console.error('Fetch error:', error);
			return null;
		}
	};

	//입력된 검색어에 대한 디바운스
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchResult([]);
			setStart(1);
			setReachedEnd(false);
			setTotal(0);

			if (searchQuery) {
				fetchSearchResult(searchQuery, 1).then((data) => {
					if (data) {
						setTotal(data.total);
						setSearchResult(data.items);
					} else {
						setReachedEnd(true);
					}
					setIsLoading(false);
				});
			}
		}, 500); // 500ms 동안 입력이 없을 경우 타이머가 실행됨

		return () => clearTimeout(timer);
	}, [searchQuery]);

	//무한 스크롤 기능 구현
	useEffect(() => {
		const loadResults = async () => {
			// 검색 결과의 끝에 도달하지 않고 검색어가 존재할 때만 실행
			if (!reachedEnd && searchQuery) {
				setIsLoading(true);

				const data = await fetchSearchResult(searchQuery, start);

				if (data) {
					setSearchResult((prevResult) => [...prevResult, ...data.items]);
					setStart((prevStart) => prevStart + 30);
				} else {
					setReachedEnd(true);
				}
				setScrollPosition(window.scrollY);
				setIsLoading(false);
			}
		};

		// IntersectionObserver를 사용하여 무한 스크롤 감지
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			// 타겟 요소가 뷰포트에 들어오고 로딩 중이 아닐 때 결과 로드 함수 호출
			if (entry.isIntersecting && !isLoading) {
				loadResults();
			}
		};

		// 기존의 IntersectionObserver 해제
		if (observerRef.current) observerRef.current.disconnect();

		// 새로운 IntersectionObserver 생성 및 설정
		observerRef.current = new IntersectionObserver(handleIntersection, {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		});

		// 타겟 요소에 IntersectionObserver 적용
		if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

		// 컴포넌트가 언마운트되거나 리렌더링될 때 기존 IntersectionObserver 해제
		return () => {
			if (observerRef.current) observerRef.current.disconnect();
		};
	}, [start, reachedEnd, searchQuery, isLoading]);

	// 스크롤 위치 유지
	useEffect(() => {
		window.scrollTo(0, scrollPosition);
	}, [searchResult]);

	const handleAddClothingInfo = (item: any) => {
		onSelectClothingInfo({
			image: item.image,
			brand: item.brand,
			model: removeBrandFromTitle(item.title, item.brand), //검색 결과에서 <b></b> 태그 제거하고 텍스트만 표시
			url: item.link,
		});
		onClose();
	};

	const removeBrandFromTitle = (title: string, brand: string) => {
		// 브랜드 이름에서 특수 문자를 이스케이프 처리하여 정규 표현식에서 사용할 수 있도록 변환
		const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		// 변환된 브랜드 이름을 대소문자 구분 없이(g) 모든 위치에서(i) 찾기 위한 정규 표현식 생성
		const regex = new RegExp(escapedBrand, 'gi');
		// 제목에서 브랜드 이름과 <b></b> 태그를 제거하고 양쪽 끝의 공백을 제거하여 반환
		return title
			.replace(/<[^>]+>/g, '')
			.replace(regex, '')
			.trim();
	};

	const handleCloseSheet = (e: React.MouseEvent<HTMLDivElement>) => {
		onClose();
	};

	return (
		<SheetWrapper>
			<SheetContent>
				<div className="input_container">
					<Input
						placeholder="브랜드명, 모델명, 모델번호, URL 등"
						type="text"
						value={searchQuery}
						onChange={(e) => handleInputChange(e.target.value)}
					/>
					<StyledText onClick={handleCloseSheet} $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
						취소
					</StyledText>
				</div>
				{searchQuery && searchResult.length > 0 ? (
					<SearchResultList>
						{total > 1 && (
							<div>
								<StyledText className="total" $textTheme={{ style: 'body4-light', lineHeight: 1 }}>
									{total}
								</StyledText>
							</div>
						)}
						{searchResult.map((searchResultItem, index) => (
							<SearchResultItem key={index} onClick={() => handleAddClothingInfo(searchResultItem)}>
								<img src={searchResultItem.image} alt={searchResultItem.title.replace(/<[^>]+>/g, '')} />
								<div className="infoContainer">
									<StyledText className="detail" $textTheme={{ style: 'body2-regular', lineHeight: 1.2 }}>
										{searchResultItem.brand}
									</StyledText>
									<StyledText
										className="detail"
										$textTheme={{ style: 'body2-light', lineHeight: 1 }}
										color={theme.colors.gray3}
									>
										{removeBrandFromTitle(searchResultItem.title, searchResultItem.brand)}
									</StyledText>
								</div>
							</SearchResultItem>
						))}
						<div className="ref" ref={loadMoreRef}></div>
						{isLoading && <Loader />}
					</SearchResultList>
				) : null}
			</SheetContent>
		</SheetWrapper>
	);
};

export default SearchBottomSheet;
