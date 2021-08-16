import React, { useCallback, useMemo, useState } from "react";
import Onboard from "bnc-onboard";

import { Web3Provider } from "@ethersproject/providers";

import { Web3Context, NetworkName } from "./web3";

const NetworkId = 4;
//const NetworkId = 31337;
const rpcUrl = process.env.WEB3_PROVIDER_HTTPS;

const wallets = [
  { walletName: "metamask" },
];

export default function Web3ContextProvider({ children }) {
  const [netName, setNetName] = useState(undefined);
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [pending, setPending] = useState(false);

  const onboard = useMemo(
    () =>
      Onboard({
/*
        dappId: process.env.BLOCKNATIVE_KEY,
*/
        networkId: NetworkId,
        walletSelect: {
          wallets,
        },
        subscriptions: {
          wallet: (wallet) => {
            if (wallet.provider) {
              setActive(true);
              setProvider(wallet.provider);
              setLibrary(new Web3Provider(wallet.provider));
            } else {
              setActive(false);
              setProvider(undefined);
              setLibrary(undefined);
            }
          },
          address: async (address) => {
            setAccount(address);
            setNetName( await NetworkName());
          },
        },
      }),
    [setActive, setProvider, setLibrary, setAccount, setNetName]
  );

  const activate = useCallback(() => {
    setPending(true);
    onboard
      .walletSelect()
      .catch(console.error)
      .then((res) => res && onboard.walletCheck)
      .then(setActive)
      .then(() => setPending(false));
  }, [onboard, setActive]);

  const deactivate = useCallback(() => {
    setPending(true);
    onboard.walletReset();
    setPending(false);
  }, [onboard, setActive]);

  return (
    <Web3Context.Provider
      value={{
        active,
        library,
        account,
        provider,
        onboard,
        activate,
        deactivate,
        pending,
        netName,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
