import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SheetWrapper, SheetContent, Input, SearchResultList, SearchResultItem } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';
import Loader from '../../Loader/Loader';

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
	const [loading, setLoading] = useState(false);
	const [start, setStart] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [searchResult, setSearchResult] = useState<any[]>([]);

	const fetchSearchResult = async (searchQuery: string, start: number) => {
		try {
			//프록시 서버 사용
			const response = await axios.get('http://localhost:3001/clothing', {
				params: {
					query: searchQuery,
					start: start,
				},
			});

			// 응답 데이터가 정상인지 확인
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

	useEffect(() => {
		if (searchQuery) {
			const timer = setTimeout(() => {
				setSearchResult([]);
				setStart(1);
				setReachedEnd(false);
				fetchSearchResult(searchQuery, 1).then((data) => {
					if (data) {
						setSearchResult(data.items);
						setStart(2);
					} else {
						setReachedEnd(true);
					}
					setLoading(false);
				});
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [searchQuery]);

	useEffect(() => {
		const loadResults = async () => {
			if (reachedEnd && searchQuery) {
				setLoading(true);

				const data = await fetchSearchResult(searchQuery, start);

				if (data) {
					setSearchResult((prevResult) => [...prevResult, ...data.items]);
					setStart((prevStart) => prevStart + 10);
				} else {
					setReachedEnd(true);
				}

				setLoading(false);
			}
		};

		loadResults();
	}, [start, reachedEnd, searchQuery]);

	const handleInputChange = (query: string) => {
		setSearchQuery(query);
	};

	const handleAddClothingInfo = (item: any) => {
		onSelectClothingInfo({ image: item.image, brand: item.brand, model: item.title, url: item.link });
		onClose();
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
				{loading ? (
					<Loader />
				) : searchQuery ? (
					<SearchResultList>
						{searchResult.map((searchResultItem, index) => (
							<SearchResultItem key={index} onClick={() => handleAddClothingInfo(searchResultItem)}>
								<img src={searchResultItem.image} alt={searchResultItem.title} />
								<div className="infoContainer">
									<StyledText
										className="brand"
										onClick={handleCloseSheet}
										$textTheme={{ style: 'body2-light', lineHeight: 1 }}
									>
										{searchResultItem.brand}
									</StyledText>
									<StyledText
										className="detail"
										onClick={handleCloseSheet}
										$textTheme={{ style: 'body2-light', lineHeight: 1 }}
									>
										{searchResultItem.title}
									</StyledText>
								</div>
							</SearchResultItem>
						))}
					</SearchResultList>
				) : null}
			</SheetContent>
		</SheetWrapper>
	);
};

export default SearchBottomSheet;
