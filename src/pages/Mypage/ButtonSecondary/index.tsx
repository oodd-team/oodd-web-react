import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './styles';

const ButtonSecondary: React.FC = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/edit-profile');
	};

	return <Button onClick={handleClick}>프로필 수정</Button>;
};

export default ButtonSecondary;
