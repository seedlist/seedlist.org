import React from "react";
import {Box, Center, Container, HStack, Text} from "@chakra-ui/layout";
import { IBaseProps } from "../../interfaces/props";
import {Image} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";

const Donate:React.FC<IBaseProps> = (props:IBaseProps)=>{
	return(
		<Center>
			<Container>
				<Center>
					<HStack spacing="50px" marginY="60px">
						<Box>
							<Center>
								<Text> <Trans>BTC Donate Address</Trans>: </Text>
							</Center>
							<Center>
								<Image marginY="10px" src="./BTC.png" width="120" height="120" />
							</Center>
							<Center>
								<Text>17gAk5VpvFHzY26MVmHKeMAMW2Qu3S5aKy</Text>
							</Center>
						</Box>

						<Box>
							<Center>
								<Text> <Trans>ETH(ERC20) Donate Address</Trans>: </Text>
							</Center>
							<Center>
								<Image marginY="10px" src="./ERC20.png" width="120" height="120" />
							</Center>
							<Center>
								0xB1799E2ccB10E4a8386E17474363A2BE8e33cDfb
							</Center>
						</Box>
					</HStack>
				</Center>
			</Container>
		</Center>
);
}

export {Donate};
