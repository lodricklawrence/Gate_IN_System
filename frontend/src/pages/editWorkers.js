import React from "react";
import axios from "axios";
import {withRouter,Link,Redirect} from "react-router-dom";
import {
    ChakraProvider,
    Flex,
    Text,
    Heading,
    Input,
    Button,
    extendTheme,
    ButtonGroup,
  } from '@chakra-ui/react'

class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            fullname:'',
            email:'',
            isAdmin:'',
            phone:'',
            status:'',
            error:false,
            response:'',
            logout:false
        }
        this.handleEdit=this.handleEdit.bind(this);
        this.handleEdit();
        this.handleFullname=this.handleFullname.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.handleAdmin=this.handleAdmin.bind(this);
        this.handlePhone=this.handlePhone.bind(this);
        this.handleStatus=this.handleStatus.bind(this);
        this.handleUpdate=this.handleUpdate.bind(this);
    }

    handleEdit(){
        let {id}=this.props.match.params;
        axios.get(`http://localhost:5000/idWorkers/${id}`).then(res=>{
            this.setState({id:res.data.id});
            this.setState({fullname:res.data.fullname});
            this.setState({email:res.data.email});
            this.setState({isAdmin:res.data.isAdmin});
            this.setState({phone:res.data.phone});
            this.setState({status:res.data.status});
        })
    }

    handleFullname(e){
        this.setState({fullname:e.target.value});
    }

    handleEmail(e){
        this.setState({email:e.target.value});

    }

    handleAdmin(e){
        this.setState({isAdmin:e.target.value});

    }

    handlePhone(e){
        this.setState({phone:e.target.value});
    }

    handleStatus(e){
        this.setState({status:e.target.value});
    }

    handleUpdate(e){
        if(this.state.fullname===''||this.state.email===''||this.state.isAdmin===''||this.state.phone===''||this.state.status===''){
            this.setState({error:true})
        }else{
            this.setState({error:false});
            let workerId=this.state.id
            e.preventDefault();
            axios.put(`http://localhost:5000/idWorkers/${workerId}`,this.state).then(res=>{
                this.setState({response:res.data.message})
            }).catch(e=>{
                console.log(e)
            })
        }

    }

    handleLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        this.setState({logout:true})
      }

    render(){
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
                        <Heading align='center'>Editing Form</Heading>
                        <Text  align='center' color='gray.500' fontSize={40}>Workers Details Update</Text>
                        <Text pt={5}>fullname</Text>
                        <Input type='text' value={this.state.fullname} onChange={this.handleFullname} />
                        <Text pt={5}>email</Text> 
                        <Input type='email' value={this.state.email} onChange={this.handleEmail} />
                        <Text pt={5}>isAdmin</Text> 
                        <Input type='text' value={this.state.isAdmin} onChange={this.handleAdmin} />
                        <Text pt={5}>Phone</Text>
                        <Input type='number' value={this.state.phone} onChange={this.handlePhone} />
                        <Text pt={5}>status</Text> 
                        <Input type='text' value={this.state.status} onChange={this.handleStatus} />
                        <Button mt={5}height={14} bg="cyan.400" onClick={this.handleUpdate}>UPDATE</Button>
                        <Text color='red' fontSize={20} align="center">{this.state.error? 'fill all the fields':''}</Text>
                        <Text color='cyan.400' fontSize={20} align="center">{this.state.response}</Text>
                    </Flex>
                </Flex>
            </ChakraProvider>
        )
    }
}

export default withRouter(Edit);