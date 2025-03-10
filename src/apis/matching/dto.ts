type RequestStatusEnum = 'accepted' | 'rejected' | 'pending';

// 매칭 요청
// request
export interface CreateMatchingRequest {
	requesterId: number;
	targetId: number;
	message: string;
}

// 최근 매칭 조회 (채팅방 리스트에서)
export interface LatestMatchingData {
	id?: number;
	requesterId?: number;
	targetId?: number;
	requestStatus?: RequestStatusEnum;
	createdAt: Date;
}

// 전체 매칭 리스트 조회
export interface MatchingData {
	id: number;
	message: string;
	createdAt: string;
	chatRoomId: number;
	targetId: number;
	requester: RequesterDto;
	requestStatus: RequestStatusEnum;
}

export interface RequesterDto {
	id: number;
	nickname: string;
	profilePictureUrl: string;
	representativePost: RepresentativePostDto;
}

export interface RepresentativePostDto {
	postImages: PostImageDto[];
	styleTags: string[];
}

export interface PostImageDto {
	url: string;
	orderNum: number;
}
