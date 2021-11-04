import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3ContextProvider } from "../helpers/web3";

import PlausibleProvider from "next-plausible";

import "../styles/globals.scss";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

export default function SeedApp({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="seedlist.org"
      selfHosted
    >
      <ChakraProvider theme={theme}>
        <Web3ContextProvider>
          <Component {...pageProps} />
        </Web3ContextProvider>
      </ChakraProvider>
    </PlausibleProvider>
  );
}
