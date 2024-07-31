export const mockUserData = {
    userId: "IDID",
    userBio: "안녕하세요!",
    userImg: "https://via.placeholder.com/72",  // 임시 이미지 URL
    isFriend: false,
    isInterested: false,
    postsCount: 6,
    likesCount: 110,
    fixedPostIds: [4,5],
    posts: [
        { id: 1, imageUrl: "https://via.placeholder.com/256x311", likes: 11 },
        { id: 2, imageUrl: "https://via.placeholder.com/256x311", likes: 20 },
        { id: 3, imageUrl: "https://via.placeholder.com/256x311", likes: 15 },
        { id: 4, imageUrl: "https://via.placeholder.com/256x311", likes: 22 },
        { id: 5, imageUrl: "https://via.placeholder.com/256x311", likes: 30 },
        { id: 6, imageUrl: "https://via.placeholder.com/256x311", likes: 18 }
    ]
};

// 이미 관심 친구라면 친구 신청 버튼만
// 이미 친구라면 메세지 보내기 + 관심 버튼...?
// 이미 친구라면 메세지 보내기 버튼만...??
// 친구도 ㅇ 관심도 ㅇ 이라면 메세지 보내기만?