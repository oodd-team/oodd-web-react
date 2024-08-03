import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { SwiperContainer, ImageWrapper, RemoveButton, StyledNavigation, AddButton, HiddenFileInput } from './styles';
import remove from '../../assets/remove.svg';
import plus from '../../assets/plus.svg';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { ImageSwiperProps } from '../dto';

SwiperCore.use([Navigation, Pagination]);

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images, onRemove, onAddImages }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			const newImages: string[] = [];
			filesArray.forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {
						newImages.push(reader.result.toString());
						if (newImages.length === filesArray.length) {
							onAddImages(newImages);
						}
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const handleAddImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<SwiperContainer>
			<Swiper
				spaceBetween={10}
				slidesPerView="auto"
				centeredSlides={true}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}
				onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
				onSwiper={(swiper) => setCurrentSlide(swiper.activeIndex)}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={currentSlide === index ? 'main-slide' : ''}>
						<ImageWrapper>
							<img src={image} alt={`Selected ${index}`} />
							{images.length > 1 && (
								<RemoveButton onClick={() => onRemove(image)}>
									<img src={remove} alt="Remove" />
								</RemoveButton>
							)}
						</ImageWrapper>
					</SwiperSlide>
				))}
				<SwiperSlide className="add-btn-box">
					<AddButton onClick={handleAddImageClick}>
						<img src={plus} />
					</AddButton>
					<HiddenFileInput type="file" onChange={handleFileUpload} ref={fileInputRef} multiple />
				</SwiperSlide>
				<StyledNavigation className="swiper-button-prev" />
				<StyledNavigation className="swiper-button-next" />
			</Swiper>
		</SwiperContainer>
	);
};

export default ImageSwiper;
