import React from "react";
import axios from "axios";
import {Link,Redirect} from "react-router-dom";
import {
    ChakraProvider,
    Flex,
    Text,
    Spacer,
    Heading,
    Input,
    Button,
    extendTheme,
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            show:false,
            error:false,
            response:'',
            admin:'',
            status:'',
            message:''
        }
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleLogin=this.handleLogin.bind(this);

    }

    handleEmailChange(e){
        this.setState({email:e.target.value})
    }

    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }


    handleClick(){
        this.setState((prevState=>({show:!prevState.show})));    
    }

    handleLogin(e){
        if(this.state.email ==='' || this.state.password===''){
            this.setState({error:true});
        }else{
            this.setState({error:false});
            e.preventDefault()
            axios.post('http://localhost:5000/login',this.state).then(res=>{
                    this.setState({response:res.data.message});
                    this.setState({admin:res.data.admin});
                    this.setState({status:res.data.status})
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('admin',res.data.admin);

            }).catch(error=>{
                console.log(error)
            })
        }

    }

    render(){
        if(this.state.admin==='true' && this.state.status==='Active'){
            return <Redirect to='/admin' />
        }else if(this.state.admin==='false' && this.state.status==='Active'){
            return <Redirect to='/workers' />
        }
        
        const theme = extendTheme({
            fonts: {
              heading: `'Open Sans', sans-serif`,
              body: `'Raleway', sans-serif`,
            },
          })
        return(
        <ChakraProvider theme={theme}>
          <Flex justifyContent='center' mt={20}>
            <Flex direction='column' border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100'>
            <Heading align='center'>Login</Heading>
            <Text align='center' color='gray.500' fontSize={40}>Access to dashboard</Text>
            <Text pt={12}><b>Email Address</b></Text>
            <Input type="email" value={this.state.email} onChange={this.handleEmailChange} height={14}/>
            <Flex>
            <Text pt={5}><b>Password</b></Text>
            <Spacer/>
            <Link to='/emailConfig'><Text pt={5} color='blue'>forgot password?</Text></Link>
            </Flex>
            <InputGroup>
                <Input type={this.state.show? 'text':'password'} value={this.state.password} onChange={this.handlePasswordChange}   height={14}/>
                <InputRightElement  height={14}>
                    <Button onClick={this.handleClick}  backgroundColor='gray.300'>
                        {this.state.show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement> 
            </InputGroup>
            <Button mt={5} height={14} bg="cyan.400" onClick={this.handleLogin}>Login</Button>
            <Text color='red' fontSize={20} align="center">{this.state.error? 'fill all the fields':''}</Text>
            <Text color='blue.400'  fontSize={20} align="center">{this.state.response}</Text>
            <Text color='red'  fontSize={20} align="center">{this.state.message}</Text>
            <Flex  pt={5}>
            <Link to='/guestsForm'><Text  color='blue'>Register guests</Text></Link>
            <Spacer/>
            <Link to='/approveGuests'><Text color='blue'>Aprrove guests clockOut</Text></Link>
            </Flex>
            </Flex>
          </Flex> 
        </ChakraProvider>
          
        )
    }
}

export default Login;