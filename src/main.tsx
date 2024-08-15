import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import './styles/fonts/font.css';
import { SocketProvider } from './recoil/SocketProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<RecoilRoot>
			<SocketProvider>
				<App />
			</SocketProvider>
		</RecoilRoot>
	</ThemeProvider>,
);
