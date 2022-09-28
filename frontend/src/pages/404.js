import React from "react";
import {
    ChakraProvider,
    Flex,
    Text,
    Heading,
  } from '@chakra-ui/react'
class NotFound extends React.Component{
    render(){
        return(
            <ChakraProvider>
                <Flex justifyContent='center' mt={20}>
                <Flex direction='column'>
                <Heading align='center' fontSize={100}>404</Heading>
                <Text align='center'>Page Not Found</Text>
                </Flex>
                </Flex>
            </ChakraProvider>
        )
    }
}

export default NotFound;