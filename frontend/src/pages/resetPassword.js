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

class Reset extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            Cpassword:'',
            error:false,
            error2:false,
            response:''
        }

        this.handleEmail=this.handleEmail.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleCPassword=this.handleCPassword.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleEmail(e){
        this.setState({email:e.target.value});
    }

    handlePassword(e){
        this.setState({password:e.target.value});
    }

    handleCPassword(e){
        this.setState({Cpassword:e.target.value});
    }

    handleSubmit(e){
        if(this.state.email!=='' || this.state.password!=='' || this.state.Cpassword!==''){
            this.setState({error:false});
            if(this.state.Cpassword!==this.state.password){
                this.setState({error2:true})
            }else{
                this.setState({error2:false});
                e.preventDefault();
                axios.post('http://localhost:5000/resetPassword',this.state).then(res=>{
                    this.setState({response:res.data.message})
                }).catch(e=>{
                    console.log(e)
                })
            }
        }else{
            this.setState({error:true});
        }
    }

    render(){
        const theme = extendTheme({
            fonts: {
              heading: `'Open Sans', sans-serif`,
              body: `'Raleway', sans-serif`,
            },
          })

          if(this.state.response==='update is successfully'){
            alert(`${this.state.response}`)
            return <Redirect to='/' />
          }
        return(
            <ChakraProvider theme={theme}>
                <Flex justifyContent='center' mt={10}>
                    <Flex direction='column' border='1px' p={12} borderColor='gray.400' backgroundColor='gray.100'>
                    <Heading align='center' fontSize='30px'>Password Reset Form</Heading>
                    <Text pt={12} fontWeight='bold'>Email</Text>
                    <Input type='email' value={this.state.email} onChange={this.handleEmail} placeholder='fill your email'/>
                    <Text pt={5}  fontWeight='bold'>Password</Text>
                    <Input type='password' value={this.state.password} onChange={this.handlePassword} placeholder='***********'/>
                    <Text pt={5}  fontWeight='bold'>Confirm Password</Text>
                    <Input type='password' value={this.state.Cpassword} onChange={this.handleCPassword} placeholder='***********'/>
                    <Button onClick={this.handleSubmit} bg='cyan.400' mt={5}>Submit</Button>
                    <Text color='red' align='center'>{this.state.error? 'empty field is forbidden':''}</Text>
                    <Text color='red' align='center'>{this.state.error2? 'wrong password confirmation':''}</Text>
                    <Text align='center' color='red'>{this.state.response}</Text>
                    </Flex>
                </Flex>
            </ChakraProvider>
        )
    }
}

export default Reset