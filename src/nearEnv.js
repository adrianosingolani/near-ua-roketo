const ROKETO_CONTRACT = 'streaming-r-v2.dcversus.testnet';
const WRAP_CONTRACT = 'wrap.testnet'
const DAPP_ACCOUNT = 'streaming-ua.testnet';

function getNearEnv(env) {
  switch (env) {
    case 'mainnet': 
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        roketoAccount: ROKETO_CONTRACT,
        wrapAccount: WRAP_CONTRACT,
        dappAccount: DAPP_ACCOUNT,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
      };
    case 'testnet': 
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        roketoAccount: ROKETO_CONTRACT,
        wrapAccount: WRAP_CONTRACT,
        dappAccount: DAPP_ACCOUNT,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      };
    default:
      throw Error(`Unknown environment "${env}".`);
  }
}

export default getNearEnv;