import React from "react";
import axios from "axios";
import {
    ChakraProvider,
    extendTheme,
    Flex, 
    Heading,
    Text,
    Input,
    Button,
} from "@chakra-ui/react"
import {Redirect} from "react-router-dom";

class Config extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            error:false,
            response:''
        }

        this.handleEmail=this.handleEmail.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleEmail(e){
        this.setState({email:e.target.value})
    }

    handleSubmit(e){
        if(this.state.email===''){
            this.setState({error:true});
        }else{
            this.setState({error:false});
            e.preventDefault();
            axios.post('http://localhost:5000/sendEmail',this.state).then(res=>{
                this.setState({response:res.data.message})
            }).catch(e=>{
                console.log(e)
            })
        }
    }

    render(){
        const theme = extendTheme({
            fonts: {
              heading: `'Open Sans', sans-serif`,
              body: `'Raleway', sans-serif`,
            },
          })

          if(this.state.response!==''){
            alert(`${this.state.response}`);
            return <Redirect to='/' />
          }
        return(
            <ChakraProvider theme={theme}>
                <Flex justifyContent='center' mt={10}>
                    <Flex direction='column' border='1px' p={12} borderColor='gray.400' backgroundColor='gray.100'>
                    <Heading align='center' fontSize='30px'>Email Configuration Form</Heading>
                    <Text pt={12} fontWeight='bold'>Email</Text>
                    <Input type='email' value={this.state.email} onChange={this.handleEmail} placeholder='fill your email'/>
                    <Button onClick={this.handleSubmit} bg='cyan.400' mt={5}>Submit</Button>
                    <Text color='red' align='center'>{this.state.error? 'empty field is forbidden':''}</Text>
                    </Flex>
                </Flex>
            </ChakraProvider>
        )
    }
}

export default Config