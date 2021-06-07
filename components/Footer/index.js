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
{/*
      <Link href="/">
          <a>
              <HStack spacing={2}>
                  <Text fontSize="1xl" fontWeight="">
                      PGP:527B5C82B1F6B2DB72A0ECBF87497B9163974F5A
                  </Text>
              </HStack>
          </a>
      </Link>
*/}
      <Link href="/">
          <a>
              <HStack spacing={2}>
                  <Text fontSize="1xl" fontWeight="">
                      GitHub: ebd2ac43
                  </Text>
              </HStack>
          </a>
      </Link>
          <Link href="/">
              <a>
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          License: MIT
                      </Text>
                  </HStack>
              </a>
          </Link>
          <Link href="/">
              <a>
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Version: v1.0.0
                      </Text>
                  </HStack>
              </a>
          </Link>
          <Link href="/">
              <a>
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Warns: No
                      </Text>
                  </HStack>
              </a>
          </Link>

          <Link href="/">
              <a>
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Docs
                      </Text>
                  </HStack>
              </a>
          </Link>

          <Link href="/">
              <a>
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Protocol
                      </Text>
                  </HStack>
              </a>
          </Link>

          <Link href="/">
              <a>
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Discord
                      </Text>
                  </HStack>
              </a>
          </Link>

{/*
          <Link href="/">
              <a>
                  <HStack spacing={2}>
                      <Text fontSize="1xl" fontWeight="">
                          Contract
                      </Text>
                  </HStack>
              </a>
          </Link>
*/}
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
