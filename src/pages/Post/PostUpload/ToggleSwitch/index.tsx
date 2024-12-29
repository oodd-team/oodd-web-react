import type { ToggleSwitchProps } from '../dto';

import { HiddenCheckbox } from './styles';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled }) => {
	return <HiddenCheckbox checked={checked} onChange={onChange} disabled={disabled} role="switch" />;
};

export default ToggleSwitch;
