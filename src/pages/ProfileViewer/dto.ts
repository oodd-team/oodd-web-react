import ReportIcon from "../../assets/ProfileViewer/carbon_warning.svg";
import BlockIcon from "../../assets/ProfileViewer/block.svg";

export interface Post {
    id: number;
    imageUrl: string;
    likes: number;
}

export interface UserInfoProps {
    userId: string;
    userBio: string;
    userImg?: string;
    isFriend: boolean;
    isInterested: boolean;
    postsCount?: number;
    likesCount?: number;
    fixedPostIds?: number[];
    posts?: Post[];
}

export interface PostItemProps {
    post: Post;
    isFixed: boolean;
}

export interface RequestComponentProps {
    userId: string;
    $messageType: 'initial' | 'comment';
    requestMessage: string;
    setFriend: (visible: boolean) => void;
    setIsBottomSheetOpen: (visible: boolean) => void;
    setRequestMessage: (message: string) => void;
}

export interface ReportTextProps {
    onCloseBottomSheet: () => void;
    setIsInputVisible: (visible: boolean) => void;
}

export const mainMenuItems = (handleOpenBottomSheet: (type: string) => void, handleOpenConfirmationModal: () => void) => [
    {
        text: "신고하기",
        action: () => handleOpenBottomSheet('report'),
        icon: ReportIcon
    },
    {
        text: "차단하기",
        action: () => handleOpenConfirmationModal(), // ConfirmationModal을 여는 함수 호출
        icon: BlockIcon
    }
];

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

