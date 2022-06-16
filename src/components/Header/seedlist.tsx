import {HStack, Text} from "@chakra-ui/layout";
import React, {useCallback, useState} from "react";
import {IBaseProps} from "../../interfaces/props";
import {Menu, MenuButton, MenuItem, MenuList, IconButton} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

const Seedlist:React.FC<IBaseProps>=(props:IBaseProps) => {
	const [version, setVersion] = useState<string>("seedlist");
	const doSelectVersion = useCallback((value:string)=>{
			setVersion(value);
	},[])
    return(
			<HStack spacing={2}>
				<Text fontWeight="extrabold" fontSize="4xl">
					seedlist
				</Text>

				<Menu autoSelect={false} >
					<MenuButton as={IconButton} rightIcon={<ChevronDownIcon />}
					            variant='outline' colorScheme={"blackAlpha.100"}
					            bg={"#1a1d22"} borderRadius='md'
					            borderWidth='0px' _hover={{ bg: '#2b2d32' }}
					            _expanded={{ bg: '#2b2d32' }} _focus={{ boxShadow: 'outline', bg:"#2b2d32" }}
					>
						version: {version}
					</MenuButton>
					<MenuList maxWidth='60px' bgColor={"#2b2d32"} borderColor={"black"} defaultValue="default">
						<MenuItem _hover={{ bg: 'blackAlpha.500'}} value="seedlist" onClick={()=>doSelectVersion("seedlist")}>seedlist</MenuItem>
						<MenuItem _hover={{ bg: 'blackAlpha.500'}} value="MIT" onClick={()=>doSelectVersion("MIT")}>MIT</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
    );
}

export {Seedlist};