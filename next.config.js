module.exports = {
  reactStrictMode: true,
  env: {
    IPFS: process.env.IPFS === "true" ? "true" : "false",
    COMMIT_SHA:
      process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.GITHUB_SHA || "master",
    //BLOCKNATIVE_KEY: "a0bab6a1-d0f5-4e98-a35c-1e2c35e8f37e",
    CONTRACT_ADDR:"0x364Be6320a5Cd0d2Ef5A9fF20Bf8443E6B2F4A41",
    WEB3_PROVIDER_HTTPS:
      "https://rinkeby.infura.io/v3/a08d292fd61f4005998a9a31d02b7ee7",
    /*
            {
              Main: "https://mainnet.infura.io/v3/a08d292fd61f4005998a9a31d02b7ee7",
              Rinkeby: "https://rinkeby.infura.io/v3/a08d292fd61f4005998a9a31d02b7ee7",
              Ropsten: "https://ropsten.infura.io/v3/a08d292fd61f4005998a9a31d02b7ee7",
              Kovan: "https://kovan.infura.io/v3/a08d292fd61f4005998a9a31d02b7ee7",
              Goerli: "https://goerli.infura.io/v3/a08d292fd61f4005998a9a31d02b7ee7",
            }
    */
    //"http://127.0.0.1:8545",
  },
  images: {
    loader: "imgix",
    path: "",
  },
};
