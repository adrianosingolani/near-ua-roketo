import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
// import { formatNearAmount } from 'near-api-js/lib/utils/format';
import getNearEnv from './nearEnv';

// get network configuration values
const nearEnv = getNearEnv('testnet');

let walletConnection;

export async function initializeContract() {
  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await connect({ keyStore, ...nearEnv });
  
  // Initialize wallet connection
  walletConnection = new WalletConnection(near);

  // Load in user's account data
  const accountId = walletConnection.getAccountId();

  const roketoContract = new Contract(
    walletConnection.account(),
    nearEnv.roketoContract,
    {
      viewMethods: ['get_stream', 'get_account', 'get_account_incoming_streams', 'get_account_outgoing_streams', 'get_stats'],
      changeMethods: ['start_stream', 'pause_stream', 'stop_stream', 'withdraw'],
    }
  );

  const wrapContract = new Contract(
    walletConnection.account(),
    nearEnv.wrapContract,
    {
      viewMethods: ['ft_balance_of'],
      changeMethods: ['near_deposit', 'ft_transfer_call', 'ft_transfer'],
    }
  );

  const dappContract = new Contract(
    walletConnection.account(),
    nearEnv.dappContract,
    {
      viewMethods: ['getMessages'],
      changeMethods: ['sendMessage'],
    }
  );

  return { walletConnection, accountId, nearEnv, roketoContract, wrapContract, dappContract };
}

// export async function accountBalance() {
//   return formatNearAmount(
//     (await walletConnection.account().getAccountBalance()).total,
//     2
//   );
// }

export async function getAccountId() {
  return walletConnection.getAccountId();
}

export function login() {
  walletConnection.requestSignIn(nearEnv.dappContract);
}

export function logout() {
  walletConnection.signOut();
  window.location.reload();
}