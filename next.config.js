module.exports = {
  reactStrictMode: true,
  env: {
    IPFS: process.env.IPFS === "true" ? "true" : "false",
    COMMIT_SHA:
      process.env.VERCEL_GITHUB_COMMIT_SHA ||
      process.env.GITHUB_SHA ||
      "master",
    BLOCKNATIVE_KEY: "a0bab6a1-d0f5-4e98-a35c-1e2c35e8f37e",
    WEB3_PROVIDER_HTTPS:
    "http://127.0.0.1:8545",
      //"https://rinkeby.infura.io/v3/a08d292fd61f4005998a9a31d02b7ee7",
  },
  images: {
    loader: "imgix",
    path: "",
  },
};
