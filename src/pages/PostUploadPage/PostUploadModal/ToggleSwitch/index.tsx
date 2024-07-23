import React from 'react';
import { HiddenCheckbox } from './styles';

interface ToggleSwitchProps {
	checked: boolean;
	onChange: () => void;
	disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled }) => {
	return <HiddenCheckbox checked={checked} onChange={onChange} disabled={disabled} role="switch" />;
};

export default ToggleSwitch;
