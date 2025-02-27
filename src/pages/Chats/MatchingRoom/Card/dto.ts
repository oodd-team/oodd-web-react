import type { MatchingData } from '@apis/matching/dto';

// export interface CardProps {
// 	removeRejectedMatching: () => void;
// 	matching: MatchingData;
// }

export type CardProps = Pick<MatchingData, 'id' | 'chatRoomId' | 'requester'>;
