import './App.css';
//Component
import Router from './routes/routes';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeProvider from './theme';


import { chain, WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'



const { chains, provider, webSocketProvider } = configureChains([chain.polygon], [
  publicProvider(), //not to use in production
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
})



function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <WagmiConfig client={client}>
          <Router />
        </WagmiConfig>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}

export default App;
