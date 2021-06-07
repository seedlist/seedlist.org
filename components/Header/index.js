import { Text, Box, HStack, Container, Center } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Link from "next/link";
import Image from "next/image";

import { useWeb3 } from "../../helpers/web3";
import { shortenAddress } from "../../helpers/utils";


export default function Header() {
  const { active, activate, deactivate, account, pending, library } = useWeb3();

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
              colorScheme="whiteAlpha"
              boxShadow="sm"
              onClick={activate}
              isLoading={pending}
            >
              <Text fontSize="1xl">
                Wallet Connect
              </Text>
            </Button>
          )}
          {active && account && (
            <ButtonGroup isAttached boxShadow="sm">
              <Button
                colorScheme="whiteAlpha"
                fontFamily="monospace"
                onClick={deactivate}
              >
                {shortenAddress(account)}
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </HStack>
    </Container>
  );
}
