import styled from "styled-components";

interface UserImgProps {
    $imgUrl?: string;
}

export const UserInfoContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 32rem;
    flex-direction: column; // 전체적으로 감싸는 요소들이 세로로 정렬
    padding: 0.55rem; // 10px
`;

export const UserProfile = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 1rem;
`;

export const UserImg = styled.div<UserImgProps>`
    width: 4rem; // 72px
    min-height: 4rem; // 72px
    background-color: #D9D9D9;
    background-image: url(${props => props.$imgUrl});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
`;

export const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    gap: 0.5rem; // 8px
    margin-left: 1rem;
`;

export const Bio = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 19.4rem;
    width: 100%;
    text-overflow: ellipsis;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 2.18rem; // 35px
    margin-top: 1rem;
    justify-content: center;
`;

export const Button = styled.button<{ $color?: string, $backgroundcolor: string }>`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    max-width: 10.25rem; // 164px
    height: 2.45rem; // 44px
    color: ${({ $color }) => $color};
    background: ${({ $backgroundcolor }) => $backgroundcolor};
    border: 0.0625rem solid #000000; // 1px
    border-radius: 0.3125rem; // 5px
    overflow: hidden; // 요소가 버튼 밖으로 나가지 않도록 함
`;

export const Icon = styled.img`
    display: display;
    width: 100%;
    max-width: 1.5rem; // 24px
    height: 100%;
    max-height: 1.5rem; // 24px
`;

export const LongButton = styled.button`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 21rem; // 350px
    gap: 0.5rem; // 8px
    height: 2.45rem; // 44px
    background-color: #000;
    border-radius: 0.3125rem; // 5px
    align-items: center;
`;

export const RequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 7rem 0 2.5rem 0;
    gap: 2.0625rem;
`;

export const RequestMessage = styled.div<{ $messageType: 'initial' | 'comment' }>`
    display: flex;
    text-align: center;
    width: ${({ $messageType }) => ($messageType === 'initial' ? '14rem' : '16rem')};
    height: 100%;
`;
export const ComentContainer = styled.div`
    align-items: center;
    width: 100%;
    max-width: 21.875rem; // 동일하게 맞춤
    position: relative; // 아이콘을 절대 위치로 배치하기 위함
`;

export const Coment = styled.textarea`
    display:flex;
    background-color: #F5F5F5;
    border: 1px solid #7B7B7B;
    border-radius: 0.1875rem;
    width: 100%; // 21.875rem -> 100%
    height: 3rem;
    padding: 1rem 2rem 1rem 1rem;
    box-sizing: border-box;
    overflow: hidden; // 스크롤을 숨김
    resize: none; // 사용자가 크기를 조절할 수 없도록 함
`;
export const MsgIcon = styled.img`
    position: absolute;
    right: 0.5rem; // 아이콘의 오른쪽 여백
    top: 50%; // 아이콘을 세로 중앙에 맞추기
    transform: translateY(-50%); // 아이콘을 정확히 중앙에 위치시키기
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;
