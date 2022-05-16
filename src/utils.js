import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
// import { formatNearAmount } from 'near-api-js/lib/utils/format';
import getNearEnv from './nearEnv';

const nearEnv = getNearEnv('testnet');

export async function initializeContract() {
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearEnv));
  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
  window.roketoContract = new Contract(
    window.walletConnection.account(),
    nearEnv.roketoAccount,
    {
      viewMethods: ['get_stream', 'get_account', 'get_account_incoming_streams', 'get_account_outgoing_streams', 'get_stats'],
      changeMethods: ['start_stream', 'pause_stream', 'stop_stream', 'withdraw'],
    }
  );

  window.wrapContract = new Contract(
    window.walletConnection.account(),
    nearEnv.wrapAccount,
    {
      viewMethods: ['ft_balance_of'],
      changeMethods: ['near_deposit', 'ft_transfer_call', 'ft_transfer'],
    }
  );
}

// export async function accountBalance() {
//   return formatNearAmount(
//     (await window.walletConnection.account().getAccountBalance()).total,
//     2
//   );
// }

export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

export function login() {
  window.walletConnection.requestSignIn(nearEnv.dappAccount);
}

export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}