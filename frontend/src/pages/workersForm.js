import React from "react";
import axios from "axios";
import {Link,Redirect} from "react-router-dom";
import {
    Flex,
    Text,
    Heading,
    Input,
    Button,
    extendTheme,
    Select,
    ButtonGroup,
    InputGroup,
    InputRightElement,
    ChakraProvider
  } from '@chakra-ui/react'

  class WorkersForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
          fullname:'',
          email:'',
          password:'',
          department:'',
          phone:'',
          departments:[],
          response:'',
          show:false,
          error:false,
          logout:false
          
        }
        this.getDepartments=this.getDepartments.bind(this)
        this.getDepartments();
        this.handleFullname=this.handleFullname.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.handleDepts=this.handleDepts.bind(this);
        this.handlePhone=this.handlePhone.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
    }

    getDepartments(){
      axios.get('http://localhost:5000/deptNames').then(res=>{
        const data=res.data
        const dept=data.map(({name})=>{
          return(`${name}`)
        })
        this.setState({departments:dept});
      }).catch(e=>{
        console.log(e)
      })
    }

    handleFullname(e){
        this.setState({fullname:e.target.value})
      }

    handleEmail(e){
      this.setState({email:e.target.value})
    }

    handlePassword(e){
      this.setState({password:e.target.value})

    }

    handleDepts(e){
      this.setState({department:e.target.value})
    }

    handlePhone(e){
      this.setState({phone:e.target.value})
    }

    handleClick(){
        this.setState((prevState=>({show:!prevState.show})));    
    }

    handleRegister(e){
      if(this.state.fullname===''||this.state.email===''||this.state.password===''||this.state.department===''||this.state.phone===''){
        this.setState({error:true})
      }else{
        this.setState({error:false});
        e.preventDefault();
        axios.post('http://localhost:5000/addWorkers',this.state).then(res=>{
          this.setState({response:res.data.message})
        }).catch(e=>{
          console.log(e)
        })
      }
    }

    handleLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        this.setState({logout:true});
      }


    render(){
        const allDepts=this.state.departments
        const theme = extendTheme({
            fonts: {
              heading: `'Open Sans', sans-serif`,
              body: `'Raleway', sans-serif`,
            },
          })

          if(this.state.logout===true){
            return <Redirect to='/'/>
          }
        return(
            <ChakraProvider theme={theme}>
              <Flex justifyContent='center' mt={3}>
                <Flex direction='row'>
                <ButtonGroup>
                <Link to='/allWorkers'>
                  <Button bg='cyan.400'>View Workers</Button>
                </Link>
                <Link to='/'>
                  <Button bg='red'>Logout</Button>
                </Link>
                </ButtonGroup>    
                </Flex>
                </Flex>
                <Flex justifyContent='center' mt={20}>
                    <Flex direction='column'  border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100' fontWeight='bold'>
                        <Heading align='center'>Registration Form</Heading>
                        <Text  align='center' color='gray.500' fontSize={40}>Guest Registration</Text>
                        <Text pt={5}>fullname</Text>
                        <Input type='text' value={this.state.fullname} onChange={this.handleFullname} />
                        <Text pt={5}>email</Text> 
                        <Input type='email' value={this.state.email} onChange={this.handleEmail} />
                        <Text pt={5}>Password</Text>
                        <InputGroup>
                        <Input type={this.state.show? 'text':'password'} value={this.state.password} onChange={this.handlePassword} borderColor='gray.400'  height={14}/>
                            <InputRightElement  height={14}>
                                <Button onClick={this.handleClick}  backgroundColor='gray.300'>
                                    {this.state.show? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement> 
                        </InputGroup>
                        <Text pt={5}>Department</Text>
                        <Select  onChange={this.handleDepts} height={14} borderColor='gray.400'>
                            <option value={this.state.department}>{this.state.department}</option>
                            <option value={allDepts[0]}>{allDepts[0]}</option>
                            <option  value={allDepts[1]}>{allDepts[1]}</option>
                            <option  value={allDepts[2]}>{allDepts[2]}</option>
                            <option  value={allDepts[3]}>{allDepts[3]}</option>
                            <option  value={allDepts[4]}>{allDepts[4]}</option>
                            <option  value={allDepts[5]}>{allDepts[5]}</option>
                            <option  value={allDepts[6]}>{allDepts[6]}</option>
                        </Select>
                        <Text pt={5}>Phone</Text>
                        <Input type='number' value={this.state.phone} onChange={this.handlePhone} />
                        <Button mt={5}height={14} bg="cyan.400" onClick={this.handleRegister}>Register</Button>
                        <Text color='red' fontSize={20} align="center">{this.state.error? 'fill all the fields':''}</Text>
                        <Text color='cyan.400' fontSize={20} align="center">{this.state.response}</Text>
                    </Flex>
                </Flex>
            </ChakraProvider>
        )
    }
  }

export default WorkersForm;