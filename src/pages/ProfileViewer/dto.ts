import ReportIcon from "../../assets/ProfileViewer/carbon_warning.svg";
import BlockIcon from "../../assets/ProfileViewer/block.svg";

export interface Post {
    postId: number;
    firstPhoto: string;
    likes: number;
    isRepresentative: boolean;
}

export interface UserInfoProps {
    id: number;
    nickname: string;
    bio: string;
    userImg?: string;
    isFriend?: boolean;
    isInterested?: boolean;
    postsCount?: number;
    likesCount?: number;
    posts?: Post[];
    status: 'blank' | 'unblocked' | 'blocked';
}

export interface PostItemProps {
    post: Post;
    isRepresentative: boolean;
}

export interface RequestComponentProps {
    userId: number;
    nickname: string;
    setFriend: (visible: boolean) => void;
    setIsBottomSheetOpen: (visible: boolean) => void;
}

export interface ReportTextProps {
    onCloseBottomSheet: () => void;
    setIsInputVisible: (visible: boolean) => void;
}

export const mainMenuItems = (
    userDetails: UserInfoProps, 
    handleOpenBottomSheet: (type: string) => void, 
    handleOpenConfirmationModal: () => void
) => {
    const BottomsheetsText = userDetails.status === 'blocked' ? "차단 해제하기" : "차단하기";
    
    return [
        {
            text: "신고하기",
            action: () => handleOpenBottomSheet('report'),
            icon: ReportIcon
        },
        {
            text: BottomsheetsText,
            action: () => handleOpenConfirmationModal(),
            icon: BlockIcon
        }
    ];
};

export const reportMenuItems = (handleDirectInput: () => void)=> [
    {
        text: "불법정보",
        action: () => console.log("Report 1"),
        icon: ReportIcon
    },
    {
        text: "욕설/인신공격",
        action: () => console.log("Report 2"),
        icon: ReportIcon
    },
    {
        text: "음란성/선정성",
        action: () => console.log("Report 3"),
        icon: ReportIcon
    },
    {
        text: "영리목적/홍보성",
        action: () => console.log("Report 1"),
        icon: ReportIcon
    },
    {
        text: "개인정보노출",
        action: () => console.log("Report 2"),
        icon: ReportIcon
    },
    {
        text: "같은 내용의 반복 게시(도배)",
        action: () => console.log("Report 3"),
        icon: ReportIcon
    },
    {
        text: "직접입력",
        action: () => {
            handleDirectInput()
        },
        icon: ReportIcon
    }
];

