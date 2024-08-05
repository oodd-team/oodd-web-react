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

export const reportMenuItems = [
    {
        text: "불쾌한 콘텐츠",
        action: () => console.log("Report 1"),
        icon: ReportIcon
    },
    {
        text: "스팸",
        action: () => console.log("Report 2"),
        icon: ReportIcon
    },
    {
        text: "허위사실",
        action: () => console.log("Report 3"),
        icon: ReportIcon
    }
];