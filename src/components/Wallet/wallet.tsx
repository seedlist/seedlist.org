import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {etherClient, IWalletInfo} from '../../ethers/etherClient';
import {Trans} from "@lingui/macro";
import {Box} from "@chakra-ui/layout";
import {Button} from "@chakra-ui/button";
import {Image} from "@chakra-ui/react";
import {IBaseProps} from "../../interfaces/props";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../reducers/state";
import { walletConnectionAction} from "../../reducers/action";
import {useRecoilState} from "recoil";
import {networkState, tokenReceiverAddr} from "../../hooks/Atoms";

const WalletInfo: React.FC<IBaseProps> = (props:IBaseProps) => {
    const [walletInfo, setWalletInfo] = useState<IWalletInfo | null>(null);
	const action = useSelector((state:StateType)=>state.action);
	const [network,] = useRecoilState(networkState)
	const [, setReceiverAddr] = useRecoilState(tokenReceiverAddr)
	const dispatch = useDispatch();
	const [chainId, setChainId] = useState<number>(4)
	const [chainName, setChainName] = useState<string>("Rinkeby")

	useMemo(()=>{
		if(network==="rinkeby"){
			setChainName("Rinkeby")
			setChainId(4)
		}
		if(network==="mainnet"){
			setChainName("Mainnet")
			setChainId(1)
		}
	},[network])

	useMemo(()=>{
		if(walletInfo?.address!==undefined){
			setReceiverAddr(walletInfo?.address)
		}
	},[walletInfo?.address])

	useMemo(()=>{
		if(chainId===walletInfo?.chainId){
			dispatch(walletConnectionAction(action, true));
		}else{
			dispatch(walletConnectionAction(action, false));
		}
	}, [dispatch, walletInfo?.chainId, action, chainId]);

	useEffect(() => {
        const doSetWalletInfo = () => {
            doGetWalletInfo().then(
                (info) => {
                    if (info) {
	                    setWalletInfo(info);
                    }
                })
                .catch(() => {
                    /** ignore */
                })
                .finally(() => {
	                // setLoaded(true);
                });
        };
        doSetWalletInfo();
    }, [walletInfo]);


    async function connectWallet() {
        let info = await doGetWalletInfo();
        console.log('getWalletInfo:', info);
    }

    return (
        <Box>
            <Button colorScheme="blackAlpha" bg="#2b2d32"
                    boxShadow="sm" onClick={connectWallet}
                    isLoading={false} >
                <Image src="./metamask.svg" width="22" height="22" />

                { !walletInfo && <div> <Trans> Connect Wallet </Trans> </div>}

                {walletInfo && walletInfo.chainId !== chainId && (
	                <div> <Trans>Switch</Trans> {chainName} <Trans>Wallet</Trans> </div>
                )}

                {walletInfo && walletInfo.chainId === chainId &&(
					<div>
						{walletInfo.address.substr(0, 6)}...{walletInfo.address.substr(-4)}
					</div>
                )}
            </Button>
        </Box>
    );
};

export async function doGetWalletInfo() {
    await etherClient.loadProvider();
    return await etherClient.getWalletInfo();
}

export default WalletInfo;
