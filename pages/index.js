import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";

import styled from "@emotion/styled";
import { Input} from "@chakra-ui/react";

import { Contract } from "@ethersproject/contracts";

import {
  Text,
  Box,
  Stack,
  Center,
  VStack,
  HStack,
  Container,
  Link,
  Flex,
} from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";

import {
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";

import Header from "../components/Header";

import { useWeb3 } from "../helpers/web3";
import {calculateValidSeed, calculateWalletAddressBaseOnSeed, calculatePairsBaseOnSeed, encryptMessage, signMessage} from "../helpers/utils";

import {TextInput} from "../components/TextInput";
import abiSeed from "../abi/seedlist";

import Footer from "../components/Footer";

const SEEDLIST = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function Home() {
  const [page, setPage] = useState("wrap");

  const { active, account, library, provider, pending} = useWeb3();

  //////////////////////////////////////////////

  const [isKeySpaceActive, setKeySpaceActive] = useState(true);
  const [isSaveActive, setSaveActive] = useState(false);
  const [isQueryActive, setQueryActive] = useState(false);

  const [keyspaceValue, setKeyspaceValue]  = useState("");
  const [pwdValue, setpwdValue] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const [keyspacePlaceHolder, setKeyspacePlaceHolder]  = useState("keyspace...");
  const [pwdPlaceHolder, setPwdPlaceHolder]  = useState("password...");
  const [labelPlaceHolder, setLabelPlaceHolder]  = useState("label...");
  const [contentPlaceHolder, setContentPlaceHolder] = useState("content...");

  const seedlist = useMemo(
        () => ({
            symbol: "SEED",
            address: SEEDLIST,
        }),
        []
    );


  const enableKeySpace = useCallback(() => {
       setKeySpaceActive(true);
       setSaveActive(false);
       setQueryActive(false);
  }, [isKeySpaceActive]);

  const enableSaveActive = useCallback(()=>{
       setKeySpaceActive(false);
       setSaveActive(true);
       setQueryActive(false);
  },[isSaveActive]);

  const enableQueryActive = useCallback(()=>{
      setKeySpaceActive(false);
      setSaveActive(false);
      setQueryActive(true);
  },[isSaveActive]);

  //////////////////////////////////////////////

  const doInitSpace = useCallback(()=>{
      let isEmpty = false;
      if(keyspaceValue == ""){
          isEmpty = true;
          setKeyspacePlaceHolder("Please enter key space value...");
      }

      if(pwdValue==""){
          isEmpty = true;
          setPwdPlaceHolder("Please enter password value...");
      }

      if(isEmpty==true){
          return;
      }

      let seed = calculateValidSeed(keyspaceValue, pwdValue);
      console.log(calculateValidSeed(keyspaceValue, pwdValue));

      let addr = calculateWalletAddressBaseOnSeed(seed);

      let pairs = calculatePairsBaseOnSeed(seed);

      let message = "\x19Ethereum Signed Message:\n"+addr.length+addr;

      let signature = signMessage(message, pairs.privKey);
      console.log('addr:', (addr))
      console.log("sign.v:", signature.v)
      console.log("sign.r:", signature.r)
      console.log("sign.s:", signature.s)
      console.log("hash:",signature.messageHash)

      let encryptText = encryptMessage("haliluya hello world what can fuck you please tell me may somebody","123456");
      console.log("enctypt:",encryptText,",length:",encryptText.length)


      const seedContract = new Contract(
          seedlist.address,
          abiSeed,
          library.getSigner(account)
      );

      seedContract.functions["initKeySpace"](addr, signature.messageHash, signature.r, signature.s, signature.v, "v1.0")
          .catch()
          .then((tx)=>tx.wait());

  },[library,keyspaceValue,pwdValue]);

  const doSave = useCallback(()=>{
    console.log("do save")
  },[]);

  const checkSave = useCallback(()=>{
    let isEmpty=false;
    if (keyspaceValue==""){
        isEmpty=true;
        setKeyspacePlaceHolder("Please enter key space value...");
    }

    if(labelValue==""){
        isEmpty=true;
        setLabelPlaceHolder("Need label...");
    }

    if(contentValue==""){
        isEmpty=true;
        setContentPlaceHolder("Please enter content value...");
    }

    if(isEmpty==true){
        return false;
    }

    return true;
  },[keyspaceValue, contentValue, labelValue]);

  const addMore= useCallback(()=>{

  },[]);

  const doQuery = useCallback(()=>{

  },[]);

const WalletDeactiveButton = function(props){
    return(
        <Button
            width="100%"
            colorScheme="blackAlpha"
            disabled={true}
            size="lg"
        >
            Please connect wallet firstly
        </Button>
    );
}

 const KeySpaceButton = function (props) {
  return(
        <Button
            width="100%"
            colorScheme="blackAlpha"
            size="lg"
            onClick={doInitSpace}
         >
         Init KeySpace
         </Button>
  );
 }

  const SaveButton = function (props) {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const btnRef = React.useRef()

      return(
          <>
          <Button
              width="100%"
              colorScheme="blackAlpha"
              size="lg"
              disabled={true}
              onClick={addMore}
          >
              Add More
          </Button>
          <Button
              width="100%"
              colorScheme="blackAlpha"
              size="lg"
              onClick={()=>{
                  if (checkSave()==true){
                    onOpen();
                  }
              }}
              ref={btnRef}
          >
              Save
          </Button>
          <Drawer
              colorScheme="blackAlpha"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
          >
              <DrawerOverlay colorScheme="blackAlpha" />
              <DrawerContent
                colorScheme="blackAlpha"
              >
                  <DrawerCloseButton />
                  <DrawerHeader>Enter your password</DrawerHeader>

                  <DrawerBody>
                      <Input
                          placeholder="Type here..."
                          type="password"
                      />
                  </DrawerBody>

                  <DrawerFooter>
                      <Button variant="outline" mr={3} onClick={onClose}>
                          Cancel
                      </Button>
                      <Button colorScheme="blue" onClick={doSave}>Save</Button>
                  </DrawerFooter>
              </DrawerContent>
          </Drawer>
          </>
      );
  }

  const QueryButton = function (props) {
      return(
          <Button
              width="100%"
              colorScheme="blackAlpha"
              size="lg"
              onClick={doQuery}
          >
              Query
          </Button>
      );
  }
  const KeyspaceHtml = useMemo((props) => {
      return (
          <VStack spacing={0} color="black" color="black">
              <Box
                  w="100%"
                  bg="whiteAlpha"
                  p={4}
                  borderRadius={8}
                  boxShadow="lg"
              >
                  <Stack spacing={2}>
                      <TextInput
                          disabled={(!active||!account)}
                          value={keyspaceValue}
                          onChange={setKeyspaceValue}
                          placeholder={keyspacePlaceHolder}
                          /*
                                                      type={'password'}
                          */
                      />
                  </Stack>
              </Box>
              <Box
                  w="100%"
                  bg="whiteAlpha"
                  p={4}
                  borderRadius={8}
                  boxShadow="lg"
              >
                  <Stack spacing={2}>
                      <TextInput
                          disabled={(!active||!account)}
                          value={pwdValue}
                          onChange={setpwdValue}
                          placeholder={pwdPlaceHolder}
                          /*
                                                      type={'password'}
                          */
                      />
                  </Stack>
              </Box>
          </VStack>
      );
  }, [active, account, pwdValue, keyspaceValue, keyspacePlaceHolder, pwdPlaceHolder])

  const SaveHtml = useMemo( (props)=> {
      return (
          <VStack spacing={0} color="black" color="black">
              <Box
                  w="100%"
                  bg="whiteAlpha"
                  p={4}
                  borderRadius={8}
                  boxShadow="lg"
              >
                  <Stack spacing={2}>
                      <TextInput
                          disabled={(!active||!account)}
                          value={keyspaceValue}
                          onChange={setKeyspaceValue}
                          placeholder={keyspacePlaceHolder}
                          /*
                                                      type={'password'}
                          */
                      />
                  </Stack>
              </Box>
              <Box
                  w="100%"
                  bg="whiteAlpha"
                  p={4}
                  borderRadius={8}
                  boxShadow="lg"
              >
                  <HStack spacing={2}>
                      <Box w="30%">
                          <TextInput
                              disabled={(!active||!account)}
                              value={labelValue}
                              onChange={setLabelValue}
                              placeholder={labelPlaceHolder}
                              /*
                                                          type={'password'}
                              */
                          />
                      </Box>

                      <Box w="70%">
                      <TextInput
                          disabled={(!active||!account)}
                          value={contentValue}
                          onChange={setContentValue}
                          placeholder={contentPlaceHolder}
                          /*
                                                      type={'password'}
                          */
                      />
                      </Box>

                  </HStack>
              </Box>
          </VStack>
      );
  },[keyspaceValue, contentValue, labelValue, active, account, keyspacePlaceHolder, contentPlaceHolder, labelPlaceHolder]);

  const QueryHtml = useMemo( (props)=> {
        return (
            <VStack spacing={0} color="black" color="black">
                <Box
                    w="100%"
                    bg="whiteAlpha"
                    p={4}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Stack spacing={2}>
                        <TextInput
                            disabled={(!active||!account)}
                            value={keyspaceValue}
                            onChange={setKeyspaceValue}
                            placeholder={keyspacePlaceHolder}
                            /*
                                                        type={'password'}
                            */
                        />
                    </Stack>
                </Box>
            </VStack>
        );
    },[keyspaceValue, active, account]);

  return (
      <Box minH="100vh" color="white">
      <Head>
        <title>seedlist.org</title>
      </Head>
      <Stack spacing={10}>
        <Header />
        <Center>
          <Containl>
            <Center>
              <Text fontSize="4xl" fontWeight="extrabold">
                IN CRYPTO, WE TRUST
              </Text>
            </Center>
             <Center>
            <Stack>
              <Box
                bgColor="whiteAlpha.600"
                p="5"
                w="100%"
                maxW="lg"
                borderRadius="8"
              >
                <Stack spacing={6}>
                  <Center>
                    <ButtonGroup spacing="1">
                      <Button
                        colorScheme="blackAlpha"
                        fontSize="xl"
                        onClick={() => enableKeySpace()}
                        w={["32", "40"]}
                      >
                        KeySpace
                      </Button>

                      <Button
                        colorScheme="blackAlpha"
                        fontSize="xl"
                        onClick={() => enableSaveActive()}
                        w={["32", "40"]}
                      >
                        Save
                      </Button>

                      <Button
                          colorScheme="blackAlpha"
                          fontSize="xl"
                          onClick={() => enableQueryActive()}
                          w={["32", "40"]}
                      >
                        Query
                      </Button>

                    </ButtonGroup>
                  </Center>
                    {isKeySpaceActive && KeyspaceHtml}
                    {isSaveActive && SaveHtml}
                    {isQueryActive && QueryHtml}
                  <HStack spaceing="24px" width="100%">
                    {(!active || !account) && <WalletDeactiveButton />}
                    {active && account && isKeySpaceActive && <KeySpaceButton />}
                    {active && account && isSaveActive && <SaveButton/>}
                    {active && account && isQueryActive && <QueryButton/>}
                  </HStack>
                </Stack>
              </Box>
            </Stack>
             </Center>
          </Containl>
        </Center>
        <Box p="8"></Box>
          <Footer/>
      </Stack>
    </Box>
  );
}

const Containl = styled(Container)`
`
