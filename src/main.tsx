import { ConfigProvider, theme } from 'antd';
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { networkConfig } from './utils/networkConfig'
import '@mysten/dapp-kit/dist/index.css'

const queryClient = new QueryClient()

export function Main() {
  return (
    <Router>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
            <WalletProvider
              autoConnect
              stashedWallet={{
                name: 'Find Your Walrus Site'
              }}
            >
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                </Route>
              </Routes>
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </Router>
  );
}
