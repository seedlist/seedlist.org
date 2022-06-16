import {Box, Center, Text} from "@chakra-ui/layout";
import {Button, ButtonGroup} from "@chakra-ui/button";
import React, {useCallback, useMemo, useState} from "react";
import {Trans} from "@lingui/macro";
import {IBaseProps} from "../../interfaces/props";
import {NavLink, useLocation} from "react-router-dom"
import {useRecoilState} from "recoil";
import { pageState } from "../../hooks/Atoms";
import {labelState} from "../../hooks/Atoms";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../reducers/state";
import {signupAction} from "../../reducers/action";
import {generatorState} from "../../hooks/Atoms";

const PageRouter:React.FC<IBaseProps> = (props:IBaseProps)=> {
	const [vaultColor, setVaultActive] = useState<string>("");
	const [walletColor, setWalletActive] = useState<string>("gray");
	const [idColor, setIdActive] = useState<string>("gray");
	const [, setPage] = useRecoilState(pageState)
	const [, setLabel] = useRecoilState(labelState)
	const [, setWalletGenerator] = useRecoilState(generatorState)
	const dispatch = useDispatch();
	const isConnection = useSelector((state:StateType)=>state.walletConnection);
	let location = useLocation()
	useMemo(()=>{
		setVaultActive("gray");
		setWalletActive("gray");
		setIdActive("gray");
		if(location.pathname==="/identity"){
			setIdActive("")
		}
		if(location.pathname==="/brainwallet"){
			setWalletActive("")
		}
		if(location.pathname==="/vault"){
			setVaultActive("")
		}
	},[location.pathname])
	const clickButton = useCallback((btn:string)=>{
		setVaultActive("gray");
		setWalletActive("gray");
		setIdActive("gray");
		if(btn === "identity"){
			setIdActive("");
			setPage("identity")
		}
		if(btn === "wallet"){
			setWalletActive("");
			setPage("wallet")
			setLabel("bitcoin")
			setWalletGenerator("puzzle")
		}
		if(btn==="vault"){
			setVaultActive("");
			setPage("vault")
			setLabel("signup")
			dispatch(signupAction(isConnection))
		}
	},[])

    return(
			<Box flexGrow={1}>
				<Center>
					<ButtonGroup spacing="2">
						<NavLink to="/vault">
							<Button bg="#2b2d32" colorScheme="blackAlpha" onClick={()=>clickButton("vault")}>
								<Text fontSize="xl" color={vaultColor}>
										<Trans>Vault </Trans>
								</Text>
							</Button>
						</NavLink>

						<NavLink to="/brainwallet">
							<Button bg="#2b2d32" colorScheme="blackAlpha" onClick={()=>clickButton("wallet")}>
								<Text fontSize="xl" color={walletColor}>
										<Trans>Brain Wallet</Trans>
								</Text>
							</Button>
						</NavLink>

						<NavLink to="/identity">
							<Button  bg="#2b2d32" colorScheme="blackAlpha" onClick={()=>clickButton("identity")}>
								<Text fontSize="xl" color={idColor}>
										<Trans>Meta Identity</Trans>
								</Text>
							</Button>
						</NavLink>
					</ButtonGroup>
				</Center>
			</Box>
    );
}

export {PageRouter};