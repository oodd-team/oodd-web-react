import React from 'react';
import { HiddenCheckbox } from './styles';
import { ToggleSwitchProps } from '../dto';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled }) => {
	return <HiddenCheckbox checked={checked} onChange={onChange} disabled={disabled} role="switch" />;
};

export default ToggleSwitch;
