import styled from 'styled-components';
import theme from '../../styles/theme';

export interface StyledTextProps {
	$textTheme: {
		style: keyof typeof theme.fontStyles;
		lineHeight: number;
	};
	color?: string;
}

//디자인 ver1.0 폰트 전 페이지 적용 후에 삭제 에정
export const StyledText = styled.div<StyledTextProps>`
	${(props) => props.theme.fontStyles[props.$textTheme.style]};
	line-height: ${(props) => props.$textTheme.lineHeight}rem;
	color: ${(props) => (props.color ? props.color : theme.colors.black)};
	white-space: pre-line;
`;

//디자인 ver1.0 폰트입니다 적용해주세요
export const Body2 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 15px;                        
  font-weight: 700;                       
  line-height: 22.01px;                   
  color: rgba(29, 29, 29, 1);

`;

export const Body2M = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 15px;                        
  font-weight: 500;                       
  line-height: 22.01px;                   
  color: rgba(142, 142, 142, 1);
`;

export const Headline2 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 17px;                        
  font-weight: 500;                       
  line-height: 24px;                   
  color: rgba(29, 29, 29, 1)
`;

export const Display2 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 40px;                        
  font-weight: 500;                       
  line-height: 52px;                   
  color: rgba(0, 0, 0, 1);
`;

export const HakgyoansimPuzzle = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 24px;                        
  font-weight: 900;                       
  line-height: 24px;                   
  color: rgba(255, 35, 137, 1);
`;

export const Cation2 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 11px;                        
  font-weight: 400;                       
  line-height: 14px;                   
  color: rgba(29, 29, 29, 1);
`;

export const Body1 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 16px;                        
  font-weight: 500;                       
  line-height: 24px;                   
  color: rgba(123, 123, 123, 1));
`;

export const Headline1 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 18px;                        
  font-weight: 700;                       
  line-height: 26.01px;                   
  color: rgba(29, 29, 29, 1);
`;

export const Cation1 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 12px;                        
  font-weight: 400;                       
  line-height: 16.01px;                   
  color: rgba(0, 0, 0, 1);
`;

export const Cation1M = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 12px;                        
  font-weight: 500;                       
  line-height: 16.01px;                   
  color: rgba(142, 142, 142, 1);

`;
export const Title1 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 36px;                        
  font-weight: 700;                       
  line-height: 48.02px;                   
  color: rgba(29, 29, 29, 1);
`;

export const Heading1 = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 22px;                        
  font-weight: 400;                       
  line-height: 30.01px;                   
  color: rgba(29, 29, 29, 1);
`;

export const Heading1B = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 22px;                        
  font-weight: 700;                       
  line-height: 30.01px;                   
  color: rgba(29, 29, 29, 1);
`;

export const AccountText = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 16px;                        
  font-weight: 500;                       
  color: rgba(77, 77, 77, 1);

`;

export const MyPageBio = styled.div`
  font-family: 'Pretendard', sans-serif;  
  font-size: 14px;                        
  font-weight: 400;                       
  color: rgba(136, 136, 136, 1);
`;

