import React from "react";
import axios from "axios";
import {
    ChakraProvider,
    extendTheme,
    Flex, 
    Heading,
    Text,
    Button,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Select,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Portal,
    ButtonGroup
} from "@chakra-ui/react"

import { Link, Redirect } from "react-router-dom";

class AllWorkers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            departments:[],
            department:'',
            error:'',
            data:[],
            logout:false,
            workers:[],
            deptName:''
        }
        this.getDepartments=this.getDepartments.bind(this);
        this.getDepartments();
        this.getWorkers=this.getWorkers.bind(this);
        this.getWorkers();
        this.handleDepts=this.handleDepts.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
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

      getWorkers(){
        axios.get('http://localhost:5000/allWorkers').then(res=>{
          this.setState({workers:res.data});
        }).catch(e=>{
          console.log(e)
        })
      }

      handleDepts(e){
        this.setState({department:e.target.value})
      }

      handleSearch(e){
        if(this.state.department===''){
            this.setState({error:true})
        }else{
            this.setState({error:false});
            e.preventDefault();
            axios.post('http://localhost:5000/deptWorkers', this.state).then(res=>{
                const data=res.data.workersDept[0].Workers
                const deptworkers=data.map((item)=>{
                  return(item)
                })
                this.setState({data:deptworkers})
                this.setState({deptName:res.data.dept})
            }).catch(e=>{
                console.log(e)
            })

        }

      }

      handleDelete(id){
        axios.delete(`http://localhost:5000/idWorkers/${id}`).then(res=>{
           const newData=this.state.data.filter(item=>item.id!==id);
           this.setState({data:newData});
        }).catch(e=>{
            console.log(e)
        })

      }

      handleLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        this.setState({logout:true})
      }


    render(){
        const total=this.state.workers.length
        const dept=this.state.data.length
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
          const allData=this.state.data.map((item,index)=>{
            return(
                <Table variant='striped' colorScheme='blue'>
                <Thead>
                <Tr>
                    <Th fontWeight='extrabold'>SNo</Th>
                    <Th fontWeight='extrabold'>fullname</Th>
                    <Th fontWeight='extrabold'>email</Th>
                    <Th fontWeight='extrabold'>department</Th>
                    <Th fontWeight='extrabold'>isAdmin</Th>
                    <Th fontWeight='extrabold'>phone</Th>
                    <Th fontWeight='extrabold'>status</Th>
                    <Th fontWeight='extrabold'>delete</Th>
                    <Th fontWeight='extrabold'>edit</Th>
                </Tr>
                </Thead>
                <Tbody>
                    <Tr key={item.id}>
                    <Td>{index+1}</Td>
                    <Td>{item.fullname}</Td>
                    <Td>{item.email}</Td>
                    <Td>{this.state.deptName}</Td>
                    <Td>{item.isAdmin}</Td>
                    <Td>{item.phone}</Td>
                    <Td>{item.status}</Td>
                    <Td>
                        <Popover>
                        <PopoverTrigger>
                            <Button bg='red'>DELETE</Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader fontWeight='extrabold'>confirmation</PopoverHeader>
                            <PopoverCloseButton bg='red'/>
                            <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
                            <PopoverFooter  align='center'>
                                <Button colorScheme='cyan' onClick={()=>this.handleDelete(item.id)}>Yes</Button>
                            </PopoverFooter>
                            </PopoverContent>
                        </Portal>
                        </Popover>
                    </Td>

                    <Td>
                    <Popover>
                        <PopoverTrigger>
                            <Button bg='cyan.400'>EDIT</Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>confirmation</PopoverHeader>
                            <PopoverCloseButton bg='red'/>
                            <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
                            <PopoverFooter align='center'>
                            <Link to={`/editWorkers/${item.id}`}>
                            <Button colorScheme='cyan'>Yes</Button>
                            </Link>  
                            </PopoverFooter>
                            </PopoverContent>
                        </Portal>
                        </Popover>
                    </Td>
                    </Tr>
                </Tbody>
            </Table>
            )
          })
        return(
        <ChakraProvider theme={theme}>
            <Flex justifyContent='center' mt={3}>
                <Flex direction='row'>
                <ButtonGroup>
                <Link to='/admin'>
                  <Button bg='cyan.400'>View Guests</Button>
                </Link>
                <Link to='/WorkersForm'>
                  <Button bg='cyan.400'>Register Workers</Button>
                </Link>
                <Button onClick={this.handleLogout} bg='red'>Logout</Button>
                </ButtonGroup>
            </Flex>
            </Flex>
            <Flex justifyContent='center' mt={3}>
            <Flex direction='column' border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100'>
              <Heading color='cyan.700' fontSize='30px' align='center'>Total Workers</Heading>  
              <Text align='center' fontSize='30px' color='red'>{total+1}</Text>
              <Heading color='cyan.600' fontSize='30px'>Department Workers</Heading>
              <Text align='center' fontSize='30px'  color='red'>{dept}</Text>
            </Flex>
            </Flex> 
            <Flex  justifyContent='center' mt={10}>
                <Flex direction='column' border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100'>
                    <Heading align='center'>Workers</Heading>
                    <Text align='center' color='gray.500' fontSize={40}>Fetch Workers</Text>
                    <Text pt={12}><b>Department</b></Text>
                    <Select  onChange={this.handleDepts} height={14} borderColor='gray.600'>
                            <option value={this.state.department}>{this.state.department}</option>
                            <option value={allDepts[0]}>{allDepts[0]}</option>
                            <option  value={allDepts[1]}>{allDepts[1]}</option>
                            <option  value={allDepts[2]}>{allDepts[2]}</option>
                            <option  value={allDepts[3]}>{allDepts[3]}</option>
                            <option  value={allDepts[4]}>{allDepts[4]}</option>
                            <option  value={allDepts[5]}>{allDepts[5]}</option>
                            <option  value={allDepts[6]}>{allDepts[6]}</option>
                    </Select>
                    <Button onClick={this.handleSearch} mt={5} bg='cyan.400 '>SEARCH</Button>
                    <Text color='red'>{this.state.error?'fill the department field':''}</Text>
                </Flex>
            </Flex>
            <Flex justifyContent='center' mt={10}>
                <Flex border='1px' borderColor='cyan.200'  backgroundColor='gray.100'>
                    <TableContainer>
                        {allData}
                    </TableContainer>
                </Flex>
            </Flex>
        </ChakraProvider>

        )
    }
}

export default AllWorkers