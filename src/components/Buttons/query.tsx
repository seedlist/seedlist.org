import React, {useCallback} from "react";
import {Button} from "@chakra-ui/button";
import {useDispatch, useSelector} from "react-redux";
import {passwordAction} from "../../reducers/action";
import {Trans} from "@lingui/macro";
import {IBaseProps} from "../../interfaces/props";
import {ActionType, StateType} from "../../reducers/state";
import {useRecoilState} from "recoil";
import {languageState, vaultNameState} from "../../hooks/Atoms";
import {useWarningToast} from "../../hooks/useToast";

const QueryButton:React.FC<IBaseProps> = (props:IBaseProps)=>{
    const dispatch = useDispatch();
	const [vaultName, ] = useRecoilState(vaultNameState);
	const warningToast = useWarningToast()
	const [lang, ] = useRecoilState(languageState)
	const isConnection = useSelector((state:StateType)=>state.walletConnection);
    const doQuery = useCallback(()=>{
    	if(vaultName === "" || vaultName===undefined){
    		if(lang === "en-US"){
			    warningToast("vault name is invalid.");
		    }
    		if(lang === "zh-CN"){
    			warningToast("保险库名称不允许为空");
		    }
		    return;
	    }
	    dispatch(passwordAction(ActionType.CLICK_QUERY, isConnection));
    },[dispatch, vaultName]);
   return(
       <Button
           colorScheme="blackAlpha"
           fontSize="xl"
           onClick={doQuery }
           w="100%"
       >
           <Trans>Let's Query </Trans>
       </Button>
   );
}

export {QueryButton};