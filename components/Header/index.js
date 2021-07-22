import { Text, Box, HStack, Container, Center } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Link from "next/link";
import Image from "next/image";

import { useWeb3, NetworkName } from "../../helpers/web3";
import { shortenAddress } from "../../helpers/utils";
import {useMemo} from "react";


export default function Header() {
  const { active, activate, deactivate, account, pending, library, netName } = useWeb3();

    return (
        <Container maxW="container.xl">
      <HStack py={5} wrap="wrap" spacing={0}>
      <Link href="/">
          <a>
              <HStack spacing={2}>
                  <Text fontSize="4xl" fontWeight="extrabold">
                      seedlist
                  </Text>
              </HStack>
          </a>
      </Link>

        <Box flexGrow={1}></Box>
        <Box>
          {(!active || !account) && (
            <Button
              colorScheme="blackAlpha"
              bg="#2b2d32"
              boxShadow="sm"
              onClick={activate}
              isLoading={pending}
            >
                <Image
                    src="./metamask.svg"
                    width="22"
                    height="22"
                />

                <Text fontSize="1xl">
                    Wallet Connect
              </Text>
            </Button>
          )}
          {active && account && (
            <ButtonGroup isAttached boxShadow="sm">
              <Button
                colorScheme="whiteAlpha"
                bg="#2b2d32"
                fontFamily="monospace"
                onClick={deactivate}
              >
                  <Image
                      src="./metamask.svg"
                      width="22"
                      height="22"
                  />

                  {shortenAddress(netName, account)}
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </HStack>
    </Container>
  );
}
