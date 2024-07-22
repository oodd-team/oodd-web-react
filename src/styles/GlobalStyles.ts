import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: bold;
    font-display: swap;
    src: url('./GmarketSansTTFBold.woff') format('font-woff2');
  }

  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 500; /* medium */
    font-display: swap;
    src: url('./GmarketSansTTFMedium.woff') format('font-woff2');
  }

  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 300; /* light */
    font-display: swap;
    src: url('./GmarketSansTTFLight.woff') format('font-woff2');
  }

  @font-face {
    font-family: 'Pretendard Variable';
    font-weight: 500; /* medium */
    font-display: swap;
    src: url('./Pretendard-Medium.woff2') format('font-woff2');
  }

  @font-face {
    font-family: 'Pretendard Variable';
    font-weight: 400; /* normal */
    font-display: swap;
    src: url('./Pretendard-Regular.woff2') format('font-woff2');
  }

  @font-face {
    font-family: 'Pretendard Variable';
    font-weight: 300; /* light */
    font-display: swap;
    src: url('./Pretendard-Light.woff2') format('font-woff2');
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  * {
    box-sizing: border-box;
  }
  
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, dl, dt, dd, ol, ul, li, form, label, table {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 18px;
    vertical-align: baseline;
  }
  
  body {
    line-height: 1;
    font-family: 'Pretendard Variable', 'Gmarket Sans', sans-serif;
    background-color: #FFFFFF;
    margin-bottom: 100px;
  }
  
  ol, ul {
    list-style: none;
  }
  
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;

export default GlobalStyles;
