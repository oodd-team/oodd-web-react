import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Content, Input, SearchResultList, SearchResultItem, Loader } from './styles';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { SearchBottomSheetProps } from '../dto';

const SearchBottomSheetContent: React.FC<SearchBottomSheetProps> = ({ onClose, onSelectClothingInfo }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [start, setStart] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	const handleInputChange = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const fetchSearchResult = useCallback(async (searchQuery: string, start: number) => {
		try {
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
	}, []);

	//입력된 검색어에 대한 디바운스
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchResult([]);
			setStart(1);
			setReachedEnd(false);

			if (searchQuery) {
				fetchSearchResult(searchQuery, 1).then((data) => {
					if (data) {
						setSearchResult(data.items);
					} else {
						setReachedEnd(true);
					}
					setIsLoading(false);
				});
			}
		}, 300); // 300ms 동안 입력이 없을 경우 타이머가 실행됨

		return () => clearTimeout(timer);
	}, [searchQuery, fetchSearchResult]);

	//무한 스크롤 기능 구현
	useEffect(() => {
		const loadResults = async () => {
			// 검색 결과의 끝에 도달하지 않고 검색어가 존재할 때만 실행
			if (!reachedEnd && searchQuery) {
				setIsLoading(true);

				const data = await fetchSearchResult(searchQuery, start);

				if (data) {
					setSearchResult((prevResult) => [...prevResult, ...data.items]);
					setStart((prevStart) => prevStart + 20); //무한 스크롤 한 번 당 데이터 20개 씩 로드하므로
				} else {
					setReachedEnd(true);
				}
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
	}, [reachedEnd, searchQuery, isLoading, searchResult]);

	const handleAddClothingInfo = useCallback(
		(item: any) => {
			onSelectClothingInfo({
				imageUrl: item.image,
				brand: item.brand,
				model: removeBrandFromTitle(item.title, item.brand),
				modelNumber: 1,
				url: item.link,
			});
			onClose();
		},
		[onSelectClothingInfo, onClose],
	);

	const removeBrandFromTitle = useCallback((title: string, brand: string) => {
		const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const bracketRegex = new RegExp(
			`[\$begin:math:display$\\$end:math:display$()<>]*${escapedBrand}[\$begin:math:display$\\$end:math:display$()<>]*`,
			'gi',
		);
		const brandRegex = new RegExp(escapedBrand, 'gi');

		return title
			.replace(/<[^>]+>/g, '')
			.replace(bracketRegex, '')
			.replace(brandRegex, '')
			.trim();
	}, []);

	const handleCloseSheet = useCallback(() => {
		onClose();
	}, [onClose]);

	return (
		<Content>
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
					{isLoading && (
						<Loader>
							<StyledText $textTheme={{ style: 'body2-light', lineHeight: 2 }} color={theme.colors.gray3}>
								로딩 중
							</StyledText>
						</Loader>
					)}
				</SearchResultList>
			) : null}
		</Content>
	);
};

export default React.memo(SearchBottomSheetContent);
