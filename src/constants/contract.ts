// Get From Contract Interface By RPC
export const DOMAIN_SEPARATOR = "0xd798694e56463d62cb537445b3cb4d4ab3449fa9f5e6eeb80a3b3f985a0f1523";

// keccak256('savePrivateDataWithMinting(address addr, string memory data, string memory cryptoLabel, address labelHash,
// address receiver, uint256 deadline)');
export const MINT_SAVE_PERMIT_TYPE_HASH =
	"0xe4f65c557ffdb3934e9fffd9af8d365eca51b20601a53082ce10b1e0ac04461f";

// keccak256('savePrivateDataWithoutMinting(address addr, string memory data,
// string memory cryptoLabel, address labelHash, uint256 deadline)');
export const SAVE_PERMIT_TYPE_HASH = "0x25f3fe064ef39028ecb8ad22c47a4f382a81ca1f21d802b4fdb8c3e213b9df72";

//keccak256('queryPrivateDataByIndex(address addr, uint64 index, uint256 deadline)')
export const INDEX_QUERY_PERMIT_TYPE_HASH =
	"0xbcb00634c612072a661bb64fa073e7806d31f3790f1c827cd20f95542b5af679";

//keccak256('queryPrivateDataByName(address addr, address labelHash, uint256 deadline)')
export const NAME_QUERY_PERMIT_TYPE_HASH =
	"0xab4ac209d4a97678c29d0f2f4ef3539a24e0ce6dbd2dd481c818134b61d28ecc";

//keccak256('initPrivateVault(address addr, uint256 deadline)')
export const INIT_VAULT_PERMIT_TYPE_HASH = "0xef93604cd5c5e7d35e7ef7d38e1cac9e1cc450e49bc931effd1f65a5a993121d";

//keccak256('vaultHasRegister(address addr, uint256 deadline)')
export const VAULT_HAS_REGISTER_PERMIT_TYPE_HASH = "0x5a14c87645febe5840f128409acb12772ff89f3398b05142d7e039c76e0844e8";

//keccak256('hasMinted(address addr, uint256 deadline)')
export const HAS_MINTED_PERMIT_TYPE_HASH = "0xdbd66a895de1fdf2e44b84c83cf1e4f482f647eb80397d069bf7763a583ce1a5";

//keccak256('totalSavedItems(address addr, uint256 deadline)')
export const TOTAL_SAVED_ITEMS_PERMIT_TYPE_HASH = "0xf65e93839555276acb1b1c33eb49dff5fa6a88c6991b9b84b680dc961b85f847";

//keccak256('getLabelNameByIndex(address addr, uint256 deadline, uint64 index)')
export const GET_LABEL_NAME_BY_INDEX = "0xbd5bc3ca2c7ea773b900edfe638ad04ce3697bf85885abdbe90a2f7c1266d9ee";

//keccak256('queryPrivateVaultAddress(address addr, uint256 deadline)')
export const QUERY_PRIVATE_VAULT_ADDRESS_PERMIT_TYPE_HASH = "0x21b7e085fb49739c78b83ddb0a8a7e4b469211d08958f57d52ff68325943de04";

// =========== private vault contract caller used ===========
//keccak256('labelNameDirectly(uint64 index, uint256 deadline)')
export const LABEL_NAME_PERMIT_TYPE_HASH =
	"0xcbb2475c190d2e287f7de56c688846f7612f70b210a3856ad34c475cbad0dda7";

//keccak256('getPrivateDataByNameDirectly(address name, uint256 deadline)')
export const  GET_PRIVATE_DATA_BY_NAME_PERMIT_TYPE_HASH =
	"0x91fb9dd060bd9ffe42a43373e9de88b3a9b106cbce07f242fd6f2c4a41ef921d";

//keccak256('getPrivateDataByIndexDirectly(uint64 index, uint256 deadline)')
export const  GET_PRIVATE_DATA_BY_INDEX_PERMIT_TYPE_HASH =
	"0x17558919af4007c4fb94572ba8e807922ff7db103814e127ad21ef481ca35d98";

//keccak256('saveWithoutMintingDirectly(string memory data, string memory cryptoLabel, address labelHash, uint256 deadline)')
export const  SAVE_WITHOUT_MINTING_PERMIT_TYPE_HASH =
	"0x6681e086fd2042ee88d7eb0f54dbe27796a216fb36f4e834a75b15d90b082727";

//keccak256('saveWithMintingDirectly(string memory data, string memory cryptoLabel, address labelHash, uint256 deadline)')
export const SAVE_WITH_MINTING_PERMIT_TYPE_HASH =
	"0x8774f567563ee2634c371978f5cfa8e41e5d255912344cb6b7d652f94c66c8a4";