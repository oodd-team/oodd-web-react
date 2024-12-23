import React from 'react';
import ReactDOM from 'react-dom';
import { MenuButtonListProps } from './dto';
import { MenuListWrapper, MenuListContainer, MenuButtonItem } from './styles';
import { StyledText } from '../../../../../components/Text/StyledText';

const MenuButtonList: React.FC<MenuButtonListProps> = ({ items, onClose, position }) => {
	const handleWrapperClick = () => {
		onClose(); // Wrapper 클릭 시 닫기
	};

	const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation(); // Container 클릭 시 이벤트 중단
	};

	return ReactDOM.createPortal(
		<MenuListWrapper onClick={handleWrapperClick}>
			<MenuListContainer $position={position} onClick={handleContainerClick}>
				{items.map((item, index) => (
					<MenuButtonItem key={index} onClick={item.action}>
						<StyledText $textTheme={{ style: 'body4-regular' }} color={item.color}>
							{item.text}
						</StyledText>
						<img src={item.icon} alt="icon" />
					</MenuButtonItem>
				))}
			</MenuListContainer>
		</MenuListWrapper>,
		document.body,
	);
};

export default MenuButtonList;
