import React, { useState } from 'react';
import { Content, PostContainer, ImageWrapper } from './styles';
import { Header, PrevButton } from '../styles';
import { StyledText } from '../../../components/Text/StyledText';
import Modal from '../../../components/Modal';
import close from '../assets/close.svg';
import { InstaFeedSelectModalProps, Post } from './dto';

const InstaFeedSelectModal: React.FC<InstaFeedSelectModalProps> = ({ instagramId, onAddImages, onClose, onNext }) => {
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true);

	const posts: Post[] = [
		{
			imgs: [
				'https://s3-alpha-sig.figma.com/img/cd5b/e810/d1332134097034c65778fa9f27a147d8?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a-BbOW6-BhicYZDM91ziL36HyX8rnV5pvfAwrSKS9Glrpyu6AICXVovySPjjMhqw1H8FRvrOtwS18yR9C-VlsGz1c44xK46-PXBS0NSSQio5pD~z93sctmp0QFlbf0-e3Uj6YMd1ccsAwS8lhoJ~Rhq4vlNys6Z~krUpsOmJ~iK83WiNvB-nWbt4Kr42USuH2KEfzzRJbIiwiSYpzdaQyRchZKhzRADaQP2GMRHm2ETm4ozXkXaZEcjjnshk-2lvy9wXp55QfVLnz1pNhipOF4OdLlNWxrFd~OlRcfPEM9VhVmazD5BMMPn~G1Twt9VkREL2dsVgwHX580~HBKz5Zw__',
				'https://s3-alpha-sig.figma.com/img/4a6d/3e20/e0016a95d470a407e3d70a2e5d6ccecc?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fq1i4ZU2ZXoAKCoaue0jxKGqcHdexQjy4qdr9CDGcDksqsAHbrGsY~WP98YrSAHULnUKusQFgnfAfrnA5Wdcugy7ftf6bROk5o254stmN49QVOYlGnoA~rGcu82hXQXSKEO1~YLnY5xsBu3KHw-slUeJ9GOCIiJRXLLT27z79BEc3GQAkLo2fTnlQs6vgNjCreid7gFouUKzssweK73KH2W0kjimL-edhZxDJi-xDfV-h9Z1bPdiAfwSR1jhBlfV8roA43JScLQcxeCf2NqWgxD8Mx2XNk8kvPl3b5mBRTCKdRjXt~B5IDxlem0IcbtxtnOeDIVDCOPH6eLhnkTOtg__',
				'https://s3-alpha-sig.figma.com/img/f7cc/820f/697b1c1cbd748dc34de4cdd2b7f744c5?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NPPZh~hpj18yfkRNc1LS2wfCeqWnz3YQpYVfrIBe1xr1RtSDco0NkE8goJKk8tg1Nnd~GfSWD1j0lfK-ZP8fyVx3X2HD~kUkbNdlRHqkRUmU~X5a7lCQhkmYhtSVvNeqIn~SJ2FeB2HfszeDWJr11BFAnOQwlxZzOo5ogplxB7XAaLFEy6EPMRIqhOQTgLOsigNbnhkdKQcVPYmsMUxrHaaswW5FIHcouV5K19Uredr~ZcUEhj61NG63Ae5PJymD9cgNGvnpKQM-yMLe8vJ~07UihPKp4ME9K9JeDkRGE224i-mMkB4me--ZL2Oa-kyitTzIK19JPAokWTp6~OoI3Q__',
			],
		},
		{
			imgs: [
				'https://s3-alpha-sig.figma.com/img/3369/b705/d2bac0b2d1ca06765b7534d13da10acd?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RqpTY-ySq97P4crNIwUzN6T1qeYJ9dBy3~4--uHZCFYwNuHbA7lZRvmaCViDsdkJpjEwe~vHJ2KHu3aiLufIkWkd6fzGLSgz1ienSfZziQyWtBzlJ1WLs3Y8zkLnvCSIUc7Y1bg-apB6nqpaU1pG3sDzzUyCVPRkqrHLBvMh-hEEB9kN7xF-J7YR1sGFD1yBonfyBYC3vw~ixnRcLz25WsutLMVGlsu6JM09tUwR5bbZ4gZaze3Rfd36DEr3t1kf8~00mOqlP0aqhgtqY65I4-CYxFYtw~p4JJHjhVzbstrrYGxrltL5GgKLQv6QrzCDToT9p5CBS3Nx~vevNVNKlA__',
			],
		},
		{
			imgs: [
				'https://s3-alpha-sig.figma.com/img/758c/d723/9de33fce9dec1a2b9af4aefd236c7ec6?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ABOSdxZBgjDDqW9aez0Z3b0eTz6-w-qrUvAKziZgH-NbZ5pOQyTGT3ng4ZsNfD4cAAv11TVhor4~CHWcEJQgv~t0OwSMS1qdsf6oN4YDvmaPej0eHNke3yAOpA1KnNAVX3WYUgw-y1pnEILY4boDpfHT02f4SMutLAEuQLb~y6TuOCidvccjwyJEeMkWtItHdTVlnAyyjPf3wfEFE~LxiKc1E7RyzjOFSz5bd-BxJCHVc-XuMBVf3MD-6LuuvdB5zPjd3l2Qov0p77nBvvS2sgCMp94uE3XACyjASip22IpqfDPpofCSPuMzdxd0YK3U2h0r0yPrh-~912a2-hLF0Q__',
				'https://s3-alpha-sig.figma.com/img/06fa/b9bb/18b1e3848853db6d9d905acaf805bb7a?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UbFJuuZEYu2rLflK6eBv8sgoqdLIL6RW5SL3WUCr7rrK971hVw4fc1o0i9~IWN2MrqYM~Ekr8h5jdFeNHQkXq4Kr3xc2rnzMWQe-05U7gTHS2qkE21Tz8Fw1vvUGsOwCQn3UP-0YK-hybqbXwPsjzqCTd7VoBOIo1C73J3bXRmGMj3sRBvEBE3BpR7VQzn~qKg0-RR0RErNS3R31JLf9H4nW6-J-SMwldPK3ZTTIAn3sAQvTsrH19BTFKEuXTJXZjjQr-5m7AhkH3V1PgihMjlUePipfrOSwBOlSKB-IKtW6rntI6FLP4bNs~udxwAI3f0Bra~uJnNEbut8pFEVESw__',
			],
		},
		{
			imgs: [
				'https://s3-alpha-sig.figma.com/img/f6d4/9528/c555318e88c459e09782e3c96f522932?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VliO97bcps6uRHmzcKKd3aC1YiGJ0aHeua~f8Pj3bp7wmP4-lkB3wOecDpy2OJUoRgRQyRKQaIFIv1~aQ2HQmJmSuRWOEhf0kpu10JPM51fpUqu~Ol4oOaqckua1Vy2Fvcdb-4geyuJzh08913pOhwu2HMxJo~lhm0e6~Jp6BNxybFUtvSiKNtgsMB0P3spNaEBt900Z~r56~gXhXtwEj29vkFT3AMhGbo2ntRUCZsnjJ0qGSkWax5ezwa4A2RcKl3zpth44E8qS5q7u7hYqcnDJ9q9QPT6oGnHSBZUAicsyuLZZKLcUZMEbXN8lWQUqFcXGB6GTaJE2hzxrkGWVVw__',
				'https://s3-alpha-sig.figma.com/img/3369/b705/d2bac0b2d1ca06765b7534d13da10acd?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RqpTY-ySq97P4crNIwUzN6T1qeYJ9dBy3~4--uHZCFYwNuHbA7lZRvmaCViDsdkJpjEwe~vHJ2KHu3aiLufIkWkd6fzGLSgz1ienSfZziQyWtBzlJ1WLs3Y8zkLnvCSIUc7Y1bg-apB6nqpaU1pG3sDzzUyCVPRkqrHLBvMh-hEEB9kN7xF-J7YR1sGFD1yBonfyBYC3vw~ixnRcLz25WsutLMVGlsu6JM09tUwR5bbZ4gZaze3Rfd36DEr3t1kf8~00mOqlP0aqhgtqY65I4-CYxFYtw~p4JJHjhVzbstrrYGxrltL5GgKLQv6QrzCDToT9p5CBS3Nx~vevNVNKlA__',
				'https://s3-alpha-sig.figma.com/img/9d49/32a9/63320bcff4acaa403ad583f94863bc53?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RePjrG7gfby7zl02DCVQ9qyrCygvtrSlFUmS6DJ2imL8z8cDvv1sXEZQ0YaFZjYiPLMxJOzTp1bq-8QavE81PUR1pTnzJMz6O2E2ahrbQRhUC7k0RFqZ3wBTUFI-z98hzBfnLMiz3edn4A3KALQL3JXieGVd6~7Ufnq3WKC2PFx-Bd4M6D~3yLM6CqmOsOQrTFM~LhB92j9WLFa4-84VijgHMZv0wrUj1eYu3wjg4UFVlF2kV0JJO8GXF80zJklxSzaZ6v6M2CJ9f-aZhxoTQUki4mF5LK-ezei8MuDGUxSBnLfGW40Q7U4wtbp~X6LlNkscoTGvxk0lKzFewCRyHg__',
			],
		},
	];

	const handleSuccessModalClose = () => {
		setIsSuccessModalOpen(false);
	};

	const handlePostSelect = (post: Post) => {
		const newImages = post.imgs;
		onAddImages(newImages);
		onNext();
	};

	return (
		<>
			{isSuccessModalOpen && (
				<Modal
					content={`${instagramId} 계정 연동에 성공했어요!`}
					contentTwo="가져올 OOTD를 선택해 보세요"
					onClose={handleSuccessModalClose}
				/>
			)}
			<Header>
				<PrevButton onClick={onClose}>
					<img src={close} />
				</PrevButton>
				<StyledText $textTheme={{ style: 'body2-light', lineHeight: 2 }}>가져올 OOTD 선택</StyledText>
			</Header>
			<Content>
				{posts.map((post, index) => (
					<PostContainer key={index} onClick={() => handlePostSelect(post)}>
						<ImageWrapper>
							<img src={post.imgs[0]} />
						</ImageWrapper>
					</PostContainer>
				))}
			</Content>
		</>
	);
};

export default InstaFeedSelectModal;
