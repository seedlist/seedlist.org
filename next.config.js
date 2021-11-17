module.exports = {
  reactStrictMode: true,
  assetPrefix:"./",
  env: {
    CONTRACT_ADDR:"0x6d89587672fb830A6B9Fb66E665528A38779e4c1",
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
