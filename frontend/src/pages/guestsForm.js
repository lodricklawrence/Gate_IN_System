import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {
    ChakraProvider,
    Flex,
    Text,
    Heading,
    Input,
    Button,
    extendTheme,
    Select,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
  } from '@chakra-ui/react'

  class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
          idNo:'',
          idType:'',
          fullname:'',
          deptVisited:'',
          date:'',
          phone:'',
          departments:[],
          error:'',
          response:'',
          floor:'',
          room:''
          
        }
        this.getDepartments=this.getDepartments.bind(this)
        this.getDepartments();
        this.handleID=this.handleID.bind(this);
        this.handleIDType=this.handleIDType.bind(this);
        this.handleFullname=this.handleFullname.bind(this);
        this.handleDepts=this.handleDepts.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.handlePhone=this.handlePhone.bind(this);
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

    handleID(e){
      this.setState({idNo:e.target.value})
    }

    handleIDType(e){
      this.setState({idType:e.target.value})

    }

    handleFullname(e){
      this.setState({fullname:e.target.value})

    }

    handleDepts(e){
      this.setState({deptVisited:e.target.value})
    }

    handleDate(e){
      this.setState({date:e.target.value})
    }

    handlePhone(e){
      this.setState({phone:e.target.value})
    }

    handleRegister(e){
      if(this.state.idNo===''||this.state.idType===''||this.state.fullname===''||this.state.deptVisited===''||this.state.date===''||this.state.phone===''){
        this.setState({error:true})
      }else{
        this.setState({error:false});
        e.preventDefault();
        axios.post('http://localhost:5000/addGuests',this.state).then(res=>{
          this.setState({floor:res.data.addGuests.floorNo})
          this.setState({room:res.data.addGuests.roomNo})
          this.setState({response:res.data.message})
        }).catch(e=>{
          console.log(e)
        })
      }
    }

    render(){
        const allDepts=this.state.departments
        const theme = extendTheme({
            fonts: {
              heading: `'Open Sans', sans-serif`,
              body: `'Raleway', sans-serif`,
            },
          })

            if(this.state.response){
             
              return   <ChakraProvider>
              <Alert
                    status='success'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                    width='500px'
                    marginX='500px'
                  >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} color='blue.400'  fontSize={20}>
                  {this.state.response}
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                 <Text fontWeight='bold'>floorNo:{this.state.floor}</Text>
                 <Text fontWeight='bold'>roomNo: {this.state.room}</Text>
                </AlertDescription>
                <Link to='/'><Text color='blue' pt={5}>Back to Home page</Text></Link>
              </Alert>
              </ChakraProvider>
              
          }
        return(
            <ChakraProvider theme={theme}>
              <Flex justifyContent='center' mt={3}>
                <Flex direction='row'>
                <Link to='/'>
                  <Button bg='cyan.400'>Back to Login</Button>
                </Link>
                </Flex>

              </Flex>
                <Flex justifyContent='center' mt={20}>
                    <Flex direction='column'  border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100' fontWeight='bold'>
                        <Heading align='center'>Registration Form</Heading>
                        <Text  align='center' color='gray.500' fontSize={40}>Guest Registration</Text>
                        <Text pt={12}>ID Number</Text>
                        <Input type='number' value={this.state.idNo} onChange={this.handleID}/>
                        <Text pt={5}>ID Type</Text>
                        <Input type='text' value={this.state.idType} onChange={this.handleIDType} />
                        <Text pt={5}>Fullname</Text> 
                        <Input type='text' value={this.state.fullname} onChange={this.handleFullname} />
                        <Text pt={5}>Department Visited</Text>
                        <Select  onChange={this.handleDepts} height={14} borderColor='gray.400'>
                            <option value={this.state.deptVisited}>{this.state.deptVisited}</option>
                            <option value={allDepts[0]}>{allDepts[0]}</option>
                            <option  value={allDepts[1]}>{allDepts[1]}</option>
                            <option  value={allDepts[2]}>{allDepts[2]}</option>
                            <option  value={allDepts[3]}>{allDepts[3]}</option>
                            <option  value={allDepts[4]}>{allDepts[4]}</option>
                            <option  value={allDepts[5]}>{allDepts[5]}</option>
                            <option  value={allDepts[6]}>{allDepts[6]}</option>
                        </Select>
                        <Text pt={5}>Date</Text>
                        <Input type='date' onChange={this.handleDate}/>
                        <Text pt={5}>Phone</Text>
                        <Input type='number' onChange={this.handlePhone}/>
                        <Button mt={5}height={14} bg="cyan.400" onClick={this.handleRegister}>Register</Button>
                        <Text color='red' fontSize={20} align="center">{this.state.error? 'fill all the fields':''}</Text>
                    </Flex>
                </Flex>
            </ChakraProvider>
        )
    }
  }

export default Form;