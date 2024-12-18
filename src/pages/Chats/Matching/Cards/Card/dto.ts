import { MatchingDto } from '../../../../../apis/matching/dto';

export interface CardProps {
	removeRejectedMatching: () => void;
	matching: MatchingDto;
}
