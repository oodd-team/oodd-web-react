import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@styles/GlobalStyles';
import theme from '@styles/theme';

import '@styles/fonts/font.css';
import { SocketProvider } from '@context/SocketProvider';

import App from './App';

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<RecoilRoot>
			<SocketProvider>
				<App />
			</SocketProvider>
		</RecoilRoot>
	</ThemeProvider>,
);
