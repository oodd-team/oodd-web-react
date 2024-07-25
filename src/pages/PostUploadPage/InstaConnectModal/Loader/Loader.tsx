import React from 'react';
import styled, { keyframes } from 'styled-components';

const shadowPulse = keyframes`
  33% {
    background: #FFF;
    box-shadow: -24px 0 black, 24px 0 #FFF;
  }
  66% {
    background: black;
    box-shadow: -24px 0 #FFF, 24px 0 #FFF;
  }
  100% {
    background: #FFF;
    box-shadow: -24px 0 #FFF, 24px 0 black;
  }
`;

const LoaderWrapper = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	display: block;
	margin: 15px auto;
	position: relative;
	background: #fff;
	box-shadow:
		-24px 0 #fff,
		24px 0 #fff;
	box-sizing: border-box;
	animation: ${shadowPulse} 1.5s linear infinite;
`;

const Loader: React.FC = () => {
	return <LoaderWrapper />;
};

export default Loader;
