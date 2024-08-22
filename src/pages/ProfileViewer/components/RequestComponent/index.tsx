import React, { useRef, useState, useEffect } from 'react';
import request from '../../../../apis/core';
import { ResponseDto } from './ResponseDto';
import { RequestContainer, RequestMessage, Coment, MsgIcon, ComentContainer } from './style';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import MsgSvg_g from '../../../../assets/ProfileViewer/message_send _gray.svg';
import { RequestComponentProps } from '../../dto';
import { useRecoilState } from 'recoil';
import { friendState } from '../../../../recoil/atoms';
import Modal from '../../../../components/Modal';

const RequestComponent: React.FC<RequestComponentProps> = ({ userId, nickname, setIsBottomSheetOpen }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [, setFriend] = useRecoilState(friendState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setInputValue(textarea.value);
    };

    const handleMsgIconClick = async () => {
        if (inputValue.trim() === "") {
            return;
        }

        try {
            console.log(localStorage.getItem('id')); // 친구 신청을 보내는 id
            console.log(userId); // 친구 신청을 받는 id
            console.log(inputValue);
            const response = await request.post<ResponseDto>(`/user-relationships`, {
                requesterId: Number.parseInt(localStorage.getItem('id') as string),
                targetId: userId,
                message: inputValue
            }
        );
    
            console.log(response.result);

            setFriend(true);
            
            setModalContent(`${nickname}님에게 대표 OOTD와 한 줄 메세지를 보냈어요!`);
            setIsModalOpen(true);

            setIsBottomSheetOpen(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
            setInputValue('');

        } catch (error: any) {
           console.log(error);
           alert("친구 신청에 실패했습니다.");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    

    return (
        <>
            <RequestContainer>
                <RequestMessage>
                    <StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
                        {nickname}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!
                    </StyledText>
                </RequestMessage>
                <ComentContainer>
                    <Coment 
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        maxLength={100}
                    />
                    <MsgIcon src={MsgSvg_g} alt="message icon" onClick={handleMsgIconClick} />
                </ComentContainer>
            </RequestContainer>
            {isModalOpen && (
                <Modal content={modalContent} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default RequestComponent;




