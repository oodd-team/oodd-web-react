import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Content, Input, SearchResultList, SearchResultItem, Loader } from './styles';
import theme from '../../../styles/theme';

import { StyledText } from '../../../components/Text/StyledText';

import { SearchBottomSheetProps } from '../dto';

const SearchBottomSheetContent: React.FC<SearchBottomSheetProps> = ({ onClose, onSelectClothingInfo }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [start, setStart] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	const handleInputChange = (query: string) => {
		setSearchQuery(query);
	};

	const fetchSearchResult = async (searchQuery: string, start: number) => {
		try {
			//네이버 쇼핑 api 프록시 서버 사용
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
				console.log('감지');
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

	const handleAddClothingInfo = (item: any) => {
		onSelectClothingInfo({
			imageUrl: item.image,
			brandName: item.brand,
			modelName: removeBrandFromTitle(item.title, item.brand), //검색 결과에서 <b></b> 태그 제거하고 텍스트만 표시
			modelNumber: '1',
			url: item.link,
		});
		onClose();
	};

	const removeBrandFromTitle = (title: string, brand: string) => {
		// 브랜드 이름에서 특수 문자를 이스케이프 처리하여 정규 표현식에서 사용할 수 있도록 변환
		const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		// 브랜드 이름을 감싸고 있는 [ ]를 제거
		const bracketRegex = new RegExp(`[\\[\\]()<>]*${escapedBrand}[\\[\\]()<>]*`, 'gi'); //gi: 대소문자 구분 없이(g) 모든 위치에서(i)
		// 변환된 브랜드 이름을 제거
		const brandRegex = new RegExp(escapedBrand, 'gi');
		// 제목에서 브랜드 이름과 <b></b> 태그를 제거하고 양쪽 끝의 공백을 제거
		return title
			.replace(/<[^>]+>/g, '')
			.replace(bracketRegex, '')
			.replace(brandRegex, '')
			.trim();
	};

	const handleCloseSheet = () => {
		onClose();
	};

	return (
		<Content>
			<div className="input_container">
				<Input
					placeholder="브랜드명, 모델명, 모델번호, URL 등"
					type="text"
					value={searchQuery}
					onChange={(e) => handleInputChange(e.target.value)}
				/>
				<StyledText onClick={handleCloseSheet} $textTheme={{ style: 'body2-regular', lineHeight: 1 }}>
					취소
				</StyledText>
			</div>
			{searchQuery && searchResult.length > 0 ? (
				<SearchResultList>
					{searchResult.map((searchResultItem, index) => (
						<SearchResultItem key={index} onClick={() => handleAddClothingInfo(searchResultItem)}>
							<img src={searchResultItem.image} alt={searchResultItem.title.replace(/<[^>]+>/g, '')} />
							<div className="infoContainer">
								<StyledText className="detail" $textTheme={{ style: 'body2-bold', lineHeight: 1.2 }}>
									{searchResultItem.brand}
								</StyledText>
								<StyledText
									className="detail"
									$textTheme={{ style: 'caption1-regular', lineHeight: 1 }}
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

export default SearchBottomSheetContent;
