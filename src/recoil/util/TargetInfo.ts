import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'targetInfo',
});

interface TargetInfoDto {
	id: number;
	nickname: string;
}

export const TargetInfoAtom = atom<TargetInfoDto | null>({
	key: 'TargetInfoAtom',
	default: null,
	effects_UNSTABLE: [persistAtom],
});
