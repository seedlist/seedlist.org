import { Text, Box, HStack, Container, Center } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Link from "next/link";
import Image from "next/image";

import { useWeb3 } from "../../helpers/web3";
import { shortenAddress } from "../../helpers/utils";
import styled from "@emotion/styled";


export default function Footer() {
  const { active, activate, deactivate, account, pending, library } = useWeb3();

  return (
    <FooterContainer maxW="container.xl" centerContent>
      <HStack py={5} wrap="wrap" spacing={6}>

      <Link href="https://github.com/NullBeings/seedlist-interface">
          <a target="_blank">
              <HStack spacing={2}>
                  <Text fontSize="1xl" fontWeight="">
                      Github: master
                  </Text>
              </HStack>
          </a>
      </Link>
          <Link href="https://github.com/NullBeings/seedlist-interface/blob/main/LICENSE">
              <a target="_blank">
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          License: MIT
                      </Text>
                  </HStack>
              </a>
          </Link>
          <Link href="/">
              <a target="_blank">
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Version: 0.1.0-rc
                      </Text>
                  </HStack>
              </a>
          </Link>

          <Link href="https://github.com/NullBeings/seedlist-docs/blob/main/protocol/seedlist_cn.md">
              <a target="_blank">
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Protocol
                      </Text>
                  </HStack>
              </a>
          </Link>

          <Link href="https://discord.gg/kQgg5kkpA5">
              <a target="_blank">
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Discord
                      </Text>
                  </HStack>
              </a>
          </Link>


          <Link href="https://github.com/NullBeings/seedlist-docs/blob/main/misc/donate.md">
              <a target="_blank">
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Donate
                      </Text>
                  </HStack>
              </a>
          </Link>

      </HStack>
    </FooterContainer>
  );
}


const FooterContainer = styled(Container)`
    position:fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`
