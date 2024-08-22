import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { TooltipLayout, TooltipContentBox, TooltipArrow } from './styles';

const TooltipBubble: React.FC<{ content: string; arrow: string; top?: number }> = ({ content, arrow, top }) => {
	return (
		<TooltipLayout $top={top}>
			<TooltipContentBox>
				<StyledText $textTheme={{ style: 'body4-regular', lineHeight: 1.2 }} color={theme.colors.black}>
					{content}
				</StyledText>
			</TooltipContentBox>
			<TooltipArrow $arrow={arrow} />
		</TooltipLayout>
	);
};

export default TooltipBubble;
