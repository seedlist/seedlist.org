import React from "react";
import {Box, Stack} from "@chakra-ui/layout";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Heading} from "@chakra-ui/react";
import {IBaseProps} from "../interfaces/props";
import {Navigate, Route, Routes} from "react-router-dom";
import { Identity } from "../pages/identity";
import { Brainwallet } from "../pages/brainwallet";
import {Vault} from "../pages/vault";
import {BrowserRouter as Router} from "react-router-dom";
import {NotFound} from "../pages/error/404";
import {Donate} from "../pages/donate";
import {MIT} from "../pages/MIT";

const App:React.FC<IBaseProps> = (props:IBaseProps)=>{

        return(
            <Box minH="100vh" color="white">
                <Heading>
                    <title>seedlist.org</title>
                </Heading>
                <Stack spacing={20}>
					<Router>
						<Header />
						<Routes>
							<Route path="/" element={ <Navigate to="/vault" />}> </Route>
							<Route path="/vault" element={<Vault />}> </Route>
							<Route path="/brainwallet" element={<Brainwallet />}> </Route>
							<Route path="/identity" element={<Identity />}> </Route>
							<Route path="/*" element={<NotFound />}> </Route>
							<Route path="/donate" element={<Donate />}> </Route>
							<Route path="/MIT" element={<MIT />}> </Route>
						</Routes>
						<Footer/>
					</Router>
                </Stack>
            </Box>
        );
}

export {App};