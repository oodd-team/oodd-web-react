import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SwiperContainer, ImageWrapper, RemoveButton, StyledNavigation, AddButton, HiddenFileInput } from './styles';

import Reject from '../../../assets/default/reject.svg';
import Plus from '../../../assets/default/plus.svg';

import { ImageSwiperProps } from '../dto';

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images, onProcessFile, onRemoveImage }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleSelectImage = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<SwiperContainer>
			<Swiper
				className="review-swiper"
				spaceBetween={1}
				slidesPerView="auto"
				centeredSlides={true}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}
				modules={[Navigation, Pagination]}
				onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
				onSwiper={(swiper) => setCurrentSlide(swiper.activeIndex)}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={currentSlide === index ? 'main-slide' : ''}>
						<ImageWrapper>
							<img src={image.url} alt={`Selected ${index}`} />
							{images.length > 1 && (
								<RemoveButton onClick={() => onRemoveImage(image.url)}>
									<img src={Reject} alt="remove" />
								</RemoveButton>
							)}
						</ImageWrapper>
					</SwiperSlide>
				))}
				<SwiperSlide className="add-btn-box">
					<AddButton onClick={handleSelectImage}>
						<img src={Plus} />
					</AddButton>
					<HiddenFileInput
						type="file"
						onChange={(event) => {
							if (event.target.files) {
								onProcessFile(event.target.files);
							}
						}}
						ref={fileInputRef}
						multiple
						accept="image/*,.heic"
					/>
				</SwiperSlide>
				<StyledNavigation className="swiper-button-prev" />
				<StyledNavigation className="swiper-button-next" />
			</Swiper>
		</SwiperContainer>
	);
};

export default ImageSwiper;