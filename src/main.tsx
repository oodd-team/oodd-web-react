import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@styles/GlobalStyles';
import theme from '@styles/theme';

import '@styles/fonts/font.css';
import { SocketProvider } from '@context/SocketProvider';

import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<RecoilRoot>
				<SocketProvider>
					<App />
					<ReactQueryDevtools initialIsOpen={false} />
				</SocketProvider>
			</RecoilRoot>
		</QueryClientProvider>
	</ThemeProvider>,
);
