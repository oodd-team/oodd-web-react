import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { MenuButtonListProps } from './dto';
import { MenuListWrapper, MenuListContainer, MenuButtonItem } from './styles';
import { StyledText } from '../../Text/StyledText';

const MenuButtonList: React.FC<MenuButtonListProps> = ({ items, isVisible, onClose }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	// 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [onClose]);

	if (!isVisible) return null;

	return ReactDOM.createPortal(
		<MenuListWrapper>
			<MenuListContainer ref={containerRef}>
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
