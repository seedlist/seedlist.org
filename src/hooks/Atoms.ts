import {atom} from "recoil";

export const generatorState = atom(
	{
		key:"walletGeneratorTag",
		default:"puzzle"
	}
);
export const pageState = atom(
	{
		key:"pageTag",
		default:"entropy"
	}
);

export const puzzleState = atom(
	{
		key:"puzzleInWalletGenerate",
		default:""
	}
);

export const languageState = atom(
	{
		key:"language",
		default:"en-US"
	}
);

export const labelState = atom(
	{
		key:"labelTag",
		default:"bitcoin"
	}
);
export const networkState = atom(
	{
		key:"networkTag",
		default:"rinkeby"
	}
);

export const tokenReceiverAddr = atom(
	{
		key:"tokenReceiverAddrTag",
		default:""
	}
)

export const savedContentState = atom(
	{
		key:"savedContentTag",
		default:""
	}
)

export const vaultNameState = atom(
	{
		key:"vaultNameTag",
		default:""
	}
)

export const vaultPasswordState = atom(
	{
		key:"vaultPasswordTag",
		default:""
	}
)

export const labelNameState = atom(
	{
		key:"labelNameTag",
		default:""
	}
)

export const bitcoinWalletState = atom(
	{
		key:"bitcoinWalletTag",
		default:false
	}
);

export const ethereumWalletState = atom(
	{
		key:"ethereumWalletTag",
		default:false
	}
);

export const signupBtnIsLoadingState = atom(
	{
		key:"signupBtnIsLoadingTag",
		default:false
	}
);

export const saveBtnIsLoadingState = atom(
	{
		key:"saveBtnIsLoadingTag",
		default:false
	}
);
