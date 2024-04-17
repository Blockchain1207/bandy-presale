import './App.css'
import HomePage from './pages/HomePage'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from "wagmi/providers/public";
// import { mainnet, goerli } from 'wagmi/chains'

const blast = {
  id: 81457,
  name: 'Blast',
  network: 'Blast',
  nativeCurrency: { name: 'Blast', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.blast.io'] },
    public: { http: ['https://rpc.blast.io'] },
  },
  blockExplorers: {
    default: { name: 'BlastScan', url: 'https://blastscan.io' },
  },
  contracts: { // https://www.multicall3.com/deployments
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 88189,
    },
  },
};

const blastSepolia = {
  id: 168587773,
  name: 'Blast Sepolia',
  network: 'blast-sepolia',
  nativeCurrency: { name: 'Blast Sepolia', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://blast-sepolia.blockpi.network/v1/rpc/public'] },
    public: { http: ['https://blast-sepolia.blockpi.network/v1/rpc/public'] },
  },
  blockExplorers: {
    default: { name: 'BlastSepoliaScan', url: 'https://testnet.blastscan.io' },
  },
  contracts: {
    multicall3: { // https://www.multicall3.com/deployments
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 756690,
    },
  },
};

const { chains, publicClient, provider } = configureChains(
  [blastSepolia],
  [publicProvider()]
);

const PROJECT_ID = 'de24cddbaf2a68f027eae30d9bb5df58'

// const recommendedWalletList = [
//   {
//     groupName: "Recommended",
//     wallets: [
//       injectedWallet({ chains }),
//       safeWallet({ chains }),
//       metaMaskWallet({ chains, projectId: PROJECT_ID }),
//       walletConnectWallet({ chains, projectId: PROJECT_ID }),
//     ],
//   },
// ];

// const othersWalletList = [
//   {
//     groupName: "Others",
//     wallets: [
//       coinbaseWallet({ appName: APP_NAME, chains }),
//     ],
//   },
// ];

// const connectors = connectorsForWallets([...recommendedWalletList, ...othersWalletList]);

// const wagmiClient = createClient({
//   autoConnect: true,
//   // connectors,
//   connectors: w3mConnectors({ projectId, chains }),
//   provider,
// });

// const ethereumClient = new EthereumClient(wagmiClient, chains)

// const chains = [mainnet, goerli]
// const chains = [blast, blastSepolia]
const projectId = 'bbca516cbd2b4f0b7dac799da63350f1'

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {

  return (
    <>
      {/* <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} /> */}
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App
