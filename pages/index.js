import React, { useRef, useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";

import { Contract } from "@ethersproject/contracts";

import {
  Text,
  Box,
  Stack,
  Center,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";

import {
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton, Tooltip,
} from "@chakra-ui/react";

import Header from "../components/Header";
import { WarningIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { useWeb3, Web3DefaultProvider } from "../helpers/web3";
import  {BigNumber}from "ethers";
import {
    calculateWalletAddressBaseOnSeed,
    calculatePairsBaseOnSeed,
    encryptMessage,
    decryptMessage,
    signMessage,
    calculateMultiHash,
    calculateOnceHash,
    getEncryptLabel,
    getEncryptContent,
    getDecryptLabel,
    getDecryptContent,
    getAddrAndEtherSign,
    getAddressSign,
    getHashStep8_16,
    getLabelHashStep32_64,
    getAddrAndEtherSignForStorage,
    getAddrAndEtherSignForAddingKey,
} from "../helpers/utils";

import {TextInput} from "../components/TextInput";
import abiSeed from "../abi/seedlist";

import Footer from "../components/Footer";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    Portal,
    useToast,
} from "@chakra-ui/react"

export default function Home() {
  const { active, account, library, provider, pending} = useWeb3();

  const [isKeySpaceActive, setKeySpaceActive] = useState(true);
  const [isSaveActive, setSaveActive] = useState(false);
  const [isQueryActive, setQueryActive] = useState(false);
  const [cryptoContent, setCryptoContent] = useState("");
  const [isSaveSuccess, setSaveSuccess] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [keyspaceValue, setKeyspaceValue]  = useState("");
  const [pwdValue, setpwdValue] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const [keyspacePlaceHolder, setKeyspacePlaceHolder]  = useState("seedlist space name ...");
  const [pwdPlaceHolder, setPwdPlaceHolder]  = useState("password...");
  const [labelPlaceHolder, setLabelPlaceHolder]  = useState("label...");
  const [contentPlaceHolder, setContentPlaceHolder] = useState("content...");

  const [labels, setLabels] = useState([]);
  const[decryptLabel, setDecryptLabel] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()
  const initialFocusRef = React.useRef();

  const toast = useToast()
  const toastIdRef = React.useRef()

  const popWarningToast = function (content) {
      toastIdRef.current = toast({
          description: content,
          isClosable: true,
          status:"warning",
          duration:2000,
          position:"top"
      })
  }

  const popSuccessToast = function (content) {
       toastIdRef.current = toast({
            description: content,
            isClosable: true,
            status:"success",
            duration:2000,
            position:"top"
        })
    }

 const popInfoToast = function (content) {
       toastIdRef.current = toast({
            description: content,
            isClosable: true,
            status:"info",
            duration:9000,
            position:"top"
        })
    }

  const seedlist = useMemo(
        () => ({
            symbol: "SEED",
            address: process.env.CONTRACT_ADDR,
        }),
        [process.env.CONTRACT_ADDR]
    );

  const clearInput = function (){
      setpwdValue("");
      setLabelValue("");
      setContentValue("");
      setKeyspaceValue("");
      setButtonLoading(false);
  }

    const enableKeySpace = useCallback(() => {
       clearInput();
       setKeySpaceActive(true);
       setSaveActive(false);
       setQueryActive(false);
  }, [isKeySpaceActive]);

  const enableSaveActive = useCallback(()=>{
      clearInput();
      setKeySpaceActive(false);
       setSaveActive(true);
       setQueryActive(false);
       setSaveSuccess(false);
  },[isSaveActive]);

  const enableQueryActive = useCallback(()=>{
      clearInput();
      setLabels([]);
      setKeySpaceActive(false);
      setSaveActive(false);
      setQueryActive(true);
  },[isQueryActive]);

  //////////////////////////////////////////////

  const doInitSpace = useCallback(()=>{
      setButtonLoading(true);
      let isEmpty = false;
      if(keyspaceValue.length < 8){
          isEmpty = true;
          setKeyspacePlaceHolder("Space name at least 8 chars...");
      }

      if(pwdValue.length<6){
          isEmpty = true;
          setPwdPlaceHolder("Password at least 6 chars...");
      }

      if(isEmpty==true){
          clearInput();
          setButtonLoading(false);
          return;
      }

      let watchDog = getAddrAndEtherSign(keyspaceValue, pwdValue);

      const seedContract = new Contract(
          seedlist.address,
          abiSeed,
          library.getSigner(account)
      );
      (async()=>{
          let exist = await seedContract.spaceExist(watchDog.Addr, watchDog.Sign.messageHash, watchDog.Sign.r, watchDog.Sign.s, watchDog.Sign.v);
          if(exist==true){
              popWarningToast("Space Has Exist");
              setButtonLoading(false);
              return;
          }

          let storageWatchDog = getAddrAndEtherSignForStorage(keyspaceValue, pwdValue);
          let tx = await seedContract.initKeySpace(storageWatchDog.Addr, storageWatchDog.Addr0, storageWatchDog.Sign.messageHash, storageWatchDog.Sign.r, storageWatchDog.Sign.s, storageWatchDog.Sign.v, storageWatchDog.RandomNum);
          await tx.wait();

          exist = await seedContract.spaceExist(watchDog.Addr, watchDog.Sign.messageHash, watchDog.Sign.r, watchDog.Sign.s, watchDog.Sign.v);
          if(exist==true){
              popSuccessToast("Space Init Succeess");
              setButtonLoading(false);
              return;
          }else{
              setButtonLoading(false);
          }
      })();

  },[library,keyspaceValue, pwdValue, account,isButtonLoading]);

  const doSave = useCallback(()=>{
      setButtonLoading(true);
      if(keyspaceValue.length<8){
          clearInput();
          setKeyspacePlaceHolder("Space name at least 8 chars...");
          return;
      }
      const seedContract = new Contract(
          seedlist.address,
          abiSeed,
          library.getSigner(account)
      );

      let watchDog = getAddrAndEtherSign(keyspaceValue, pwdValue);

      let _encryptText = getEncryptContent(keyspaceValue, pwdValue, labelValue, contentValue);
      if(_encryptText.length>2048){
        setContentPlaceHolder("More than 2048 bytes is not allowed...");
        return;
      }

      let _labelValue = getEncryptLabel(keyspaceValue, labelValue);
      let keyspace = calculateWalletAddressBaseOnSeed(calculateMultiHash(keyspaceValue, getHashStep8_16(keyspaceValue)));
      let id = calculateWalletAddressBaseOnSeed(calculateOnceHash(watchDog.Addr+calculateMultiHash(labelValue, getLabelHashStep32_64(labelValue))));

      (async()=>{
        let spaceExist = await seedContract.spaceExist(watchDog.Addr, watchDog.Sign.messageHash, watchDog.Sign.r, watchDog.Sign.s, watchDog.Sign.v);
        if(spaceExist==false){
            popWarningToast("Space Not Exist, Init Firstly");
            setButtonLoading(false);
            return;
        }
        let exist = await seedContract.isLabelExist(watchDog.Addr, watchDog.Sign.messageHash, watchDog.Sign.r, watchDog.Sign.s, watchDog.Sign.v, id);
        if(exist==true){
            popWarningToast("Label Has Exist");
            setButtonLoading(false);
            return;
        }
        let storageWatchDog = getAddrAndEtherSignForAddingKey(keyspaceValue, pwdValue, labelValue);
        let tx = await seedContract.addKey(keyspace, storageWatchDog.Addr, storageWatchDog.Addr0, storageWatchDog.Sign.messageHash, storageWatchDog.Sign.r, storageWatchDog.Sign.s, storageWatchDog.Sign.v,
            id, _encryptText, _labelValue, account);
        await tx.wait();
        let res = await seedContract.getKey(id, watchDog.Addr, watchDog.Sign.messageHash, watchDog.Sign.r, watchDog.Sign.s, watchDog.Sign.v);
        if (res==""){
            popWarningToast("Fail to save");
        }else{
            popSuccessToast("Save to ETHEREUM success");
            setSaveSuccess(true);
            setButtonLoading(false);
        }
      })();
  },[library, keyspaceValue, pwdValue, labelValue, contentValue, account]);

  const doSearch = useCallback(()=>{
      setButtonLoading(true);
      const seedContract = new Contract(
          seedlist.address,
          abiSeed,
          Web3DefaultProvider()
      );

      let watchDog = getAddrAndEtherSign(keyspaceValue, pwdValue);
      let id = calculateWalletAddressBaseOnSeed(calculateOnceHash(watchDog.Addr+calculateMultiHash(decryptLabel, getLabelHashStep32_64(decryptLabel))));

      (async()=>{
          let spaceExist = await seedContract.spaceExist(watchDog.Addr, watchDog.Sign.messageHash, watchDog.Sign.r, watchDog.Sign.s, watchDog.Sign.v);
          if(spaceExist==false){
              popWarningToast("Space Not Exist");
              setButtonLoading(false);
              return;
          }

          let encryptContent = await seedContract.getKey(id, watchDog.Addr, watchDog.Sign.messageHash, watchDog.Sign.r, watchDog.Sign.s, watchDog.Sign.v);
          setCryptoContent(decryptLabel+": "+getDecryptContent(keyspaceValue, pwdValue, decryptLabel, encryptContent));
          setButtonLoading(false);
      })();
    }, [keyspaceValue, pwdValue, labelValue, contentValue, decryptLabel]);

  const checkSave = useCallback(()=>{
    let isEmpty=false;
    if (keyspaceValue==""){
        isEmpty=true;
        setKeyspacePlaceHolder("Enter space name...");
    }

    if(labelValue==""){
        isEmpty=true;
        setLabelPlaceHolder("Need label...");
    }

    if(contentValue==""){
        isEmpty=true;
        setContentPlaceHolder("Enter content...");
    }

    if(isEmpty==true){
        return false;
    }

    onOpen();
    return true;
  },[keyspaceValue, contentValue, labelValue]);

  const addMore= useCallback(()=>{

  },[]);

  const checkQuery = useCallback(()=> {
        if(keyspaceValue.length<8){
            clearInput();
            setKeyspacePlaceHolder("Space name at least 8 chars...");
            return false;
        }
        return true;
    })

  const queryLabels = async function(props) {
        if(keyspaceValue==""){
            setKeyspacePlaceHolder("Enter space name...");
            setButtonLoading(false);
            return false;
        }
        const seedContract = new Contract(
            seedlist.address,
            abiSeed,
            Web3DefaultProvider()
        );

        let keyspace = calculateWalletAddressBaseOnSeed(calculateMultiHash(keyspaceValue, getHashStep8_16(keyspaceValue)));
        let sign = getAddressSign(calculateMultiHash(keyspaceValue, getHashStep8_16(keyspaceValue)));
        let result = await seedContract.unstrictLabels(keyspace, sign.messageHash, sign.r, sign.s, sign.v).then();
        let _labels = [];

        if(result.length == 0){
            popWarningToast("Space name invalid.");
        }
        for(let i=0;i<result.length;i++){
            _labels[i] = getDecryptLabel(keyspaceValue, result[i]);
        }
        setLabels(_labels);

      setButtonLoading(true);
  };

    const WalletDeactiveButton = function(props){
    return(
        <Button
            width="100%"
            colorScheme="blackAlpha"
            disabled={true}
            size="lg"
        >
            <WarningIcon w={5} h={5} color="red.500" /> Please connect wallet firstly
        </Button>
    );
}

 const KeySpaceButton = useMemo( (props) => {
  return(
        <Button
            width="100%"
            colorScheme="blackAlpha"
            isLoading={isButtonLoading}
            size="lg"
            onClick={()=>{
                doInitSpace();
            }}
         >
        Sign up
         </Button>
  );
 },[keyspaceValue, pwdValue, isButtonLoading]);

useMemo((props)=>{
    setLabels([]);
    },[keyspaceValue]);

 const PasswordDrawer = useMemo((props)=>{
  return(
    <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={()=>{onClose(); setCryptoContent("")}}
    >
        <DrawerContent colorScheme="blackAlpha">
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
                <TextInput
                    placeholder="Enter password..."
                    type="password"
                    onChange={setpwdValue}
                />
                <Center>
                        <Text fontSize="20px" color="white"> {cryptoContent}</Text>
                </Center>
            </DrawerBody>

            <DrawerFooter>
                <Button variant="outline" colorScheme="whiteAlpha" mr={3} onClick={()=>{onClose(); setButtonLoading(false); setCryptoContent("")}}>
                    Cancel
                </Button>
                <Button variant="outline" colorScheme="whiteAlpha" isLoading={isButtonLoading} mr={3} onClick={()=>{isQueryActive==true? doSearch(): doSave();}}>Submit</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);
}, [pwdValue, isOpen, isButtonLoading, cryptoContent])

    const SaveButton = function (props) {
      return(
          <>
          <Button
              width="100%"
              colorScheme="blackAlpha"
              size="lg"
              disabled={true}
              onClick={addMore}
          >
              <NotAllowedIcon w={5} h={5} color=".500" /> Add More
          </Button>
          <Button
              width="100%"
              colorScheme="blackAlpha"
              size="lg"
              onClick={checkSave}
          >
              Save
          </Button>
          </>
      );
  }

    const QueryButton = function (props){
        const initRef = React.useRef();
        const labelTable = ()=>{
            return labels.map((label)=>
            <HStack spacing={10}>
                <Box w="75%" fontSize='16px'>
                    LABEL: {label}
                </Box>
                <Box w="25%">
                    <Button size="sm" bg="blue.800" onClick={()=>{onOpen();setDecryptLabel(label); console.log("label in click:",label)}} ref={btnRef}>
                        Get it
                    </Button>
                </Box>

            </HStack>
        )}

        const labelList = ()=>{
            if(keyspaceValue == ""){
                return
            }
            if(isButtonLoading==true){
                return
            }

            if(labels.length==0){
                return
            }

            return(
                <Portal>
                    <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                        <PopoverHeader pt={4} fontWeight="" border="0">
                            Choose Label To Decrypto:
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            {labels.length>0? labelTable(): "NONE"}
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            );
        };

        return (
            <Popover closeOnBlur={false} defaultIsOpen={isPopoverOpen} closeDelay={1000} placement="top" initialFocusRef={initRef}>
                        <PopoverTrigger>
                            <Button
                                width="100%"
                                colorScheme="blackAlpha"
                                isLoading={isButtonLoading}
                                size="lg"
                                onClick={async ()=>{
                                    if(checkQuery() == true){
                                        setButtonLoading(true);
                                        await queryLabels().then(()=>{});
                                        setButtonLoading(false);
                                        setPopoverOpen(true);
                                    }
                                }}
                            >
                                Query
                            </Button>
                        </PopoverTrigger>
                        {labelList()}
            </Popover>
        )
    }


    const KeyspaceHtml = useMemo((props) => {
        return (
            <VStack spacing={0}  color="black">
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
                          type={'password'}
                      />
                  </Stack>
              </Box>
          </VStack>
      );
  }, [active, account, pwdValue, keyspaceValue, keyspacePlaceHolder, pwdPlaceHolder])

  const SaveHtml = useMemo( (props)=> {
      return (
          <VStack spacing={0}  color="black">
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
            <VStack spacing={0}  color="black">
                <Box
                    w="100%"
                    bg="whiteAlpha"
                    p={4}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Stack spacing={2}>
                        <TextInput
/*
                            disabled={(!active||!account)}
*/
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
    },[keyspaceValue, active, account, keyspacePlaceHolder]);

  return (
      <Box minH="100vh" color="white">
      <Head>
        <title>seedlist.org</title>
      </Head>
      <Stack spacing={10}>
        <Header />
        <Center>
          <Container>
            <Center>
              <Text fontSize="4xl" fontWeight="extrabold">
                IN CRYPTO, WE TRUST
              </Text>
            </Center>
             <Center>
            <Stack>
              <Box
                bgColor="#2b2d32"
                p="5"
                w="100%"
                maxW="lg"
                borderRadius="8"
              >
                <Stack spacing={6}>
                  <Center>
                    <ButtonGroup spacing="1">
                      <Tooltip placement="left" hasArrow={true} fontSize={18} label="User have to sign up a spacename before save or query content.">
                          <Button
                            colorScheme="blackAlpha"
                            fontSize="xl"
                            onClick={() => enableKeySpace()}
                            w={["32", "40"]}
                          >
                           Sign up
                          </Button>
                      </Tooltip>

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
                          onClick={() => {
                              enableQueryActive();
                          }}
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
                    {(!active || !account) && !isQueryActive && <WalletDeactiveButton />}
                    {active && account && isKeySpaceActive && KeySpaceButton }
                    {active && account && isSaveActive && <SaveButton /> }
                    {isQueryActive && <QueryButton />}
                    {PasswordDrawer}
                  </HStack>
                </Stack>
              </Box>
            </Stack>
             </Center>
          </Container>
        </Center>
        <Box p="8"></Box>
          <Footer/>
      </Stack>
    </Box>
  );
}
