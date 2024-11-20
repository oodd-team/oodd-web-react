import { newRequest } from "../core";
import {postCommenttResponse,deleteCommentResponse,getCommentResponse} from "./dto"

// 게시글 댓글 생성 API 응답
export const postCommentListApi = () => newRequest.get<postCommenttResponse>('/post-comment');

// 게시글 댓글 삭제 API 응답
export const deleteCommentListApi = () => newRequest.get<deleteCommentResponse>('/post-comment/{postId}');

//  게시글 댓글 리스트 조회 API 응답
export const getCommentListApi = () => newRequest.get<getCommentResponse>('/post-comment/{postId}');
