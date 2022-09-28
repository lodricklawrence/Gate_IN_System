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
import {Redirect } from "react-router-dom";

class Workers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            departments:[],
            deptVisited:'',
            error:'',
            data:[],
            response:'',
            logout:false
        }
        this.getDepartments=this.getDepartments.bind(this);
        this.getDepartments();
        this.handleDepts=this.handleDepts.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handleDeny=this.handleDeny.bind(this);
        this.handleConfirm=this.handleConfirm.bind(this);
        this.handleLogout=this.handleLogout.bind(this)
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

      handleDepts(e){
        this.setState({deptVisited:e.target.value})
      }

      handleSearch(e){
        if(this.state.deptVisited===''){
            this.setState({error:true})
        }else{
            this.setState({error:false});
            e.preventDefault();
            const token=localStorage.getItem('token')
            axios.post('http://localhost:5000/deptGuests', this.state,{ headers: {"Authorization" : `${token}`} }).then(res=>{
                this.setState({data:res.data});
                this.setState({response:res.data.message});
            }).catch(e=>{
                console.log(e)
            })

        }

      }

      handleDeny(id){
        axios.put(`http://localhost:5000/notAttendGuest/${id}`).then(res=>{
            const newData=this.state.data.filter(item=>item.id!==id);
            this.setState({data:newData})
        }).catch(e=>{
            console.log(e)
        })
      }

      handleConfirm(id){
        axios.put(`http://localhost:5000/attendGuest/${id}`).then(res=>{
            const newData=this.state.data.filter(item=>item.id!==id);
            this.setState({data:newData})
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
        const allDepts=this.state.departments
        const theme = extendTheme({
            fonts: {
              heading: `'Open Sans', sans-serif`,
              body: `'Raleway', sans-serif`,
            },
          })

          if(this.state.logout===true || this.state.response==='Not found'){
            return <Redirect to='/'/>
          }
          const allData=this.state.data.map((item)=>{
            return(
                <Table variant='striped' colorScheme='blue'>
                <Thead>
                <Tr>
                    <Th fontWeight='extrabold'>idNo</Th>
                    <Th fontWeight='extrabold'>idType</Th>
                    <Th fontWeight='extrabold'>fullname</Th>
                    <Th fontWeight='extrabold'>deptVisited</Th>
                    <Th fontWeight='extrabold'>phone</Th>
                    <Th fontWeight='extrabold'>Not Attended</Th>
                    <Th fontWeight='extrabold'>Attended</Th>


                  
                </Tr>
                </Thead>
                <Tbody>
                    <Tr key={item.id}>
                    <Td>{item.idNo}</Td>
                    <Td>{item.idType}</Td>
                    <Td>{item.fullname}</Td>
                    <Td>{item.deptVisited}</Td>
                    <Td>{item.phone}</Td>
                    <Td>
                        <Popover>
                        <PopoverTrigger>
                            <Button bg='red'>DENY</Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader fontWeight='extrabold'>confirmation</PopoverHeader>
                            <PopoverCloseButton bg='red'/>
                            <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
                            <PopoverFooter  align='center'>
                                <Button colorScheme='cyan' onClick={()=>this.handleDeny(item.id)}>Yes</Button>
                            </PopoverFooter>
                            </PopoverContent>
                        </Portal>
                        </Popover>
                    </Td>

                    <Td>
                    <Popover>
                        <PopoverTrigger>
                            <Button bg='cyan.400'>CONFIRM</Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>confirmation</PopoverHeader>
                            <PopoverCloseButton bg='red'/>
                            <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
                            <PopoverFooter align='center'>
                            <Button colorScheme='cyan' onClick={()=>this.handleConfirm(item.id)}>Yes</Button>
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
                <Button onClick={this.handleLogout} bg='red'>Logout</Button>
                </ButtonGroup>
            </Flex>
            </Flex> 
            <Flex  justifyContent='center' mt={10}>
                <Flex direction='column' border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100'>
                    <Heading align='center'>Guests</Heading>
                    <Text align='center' color='gray.500' fontSize={40}>Attend Guests</Text>
                    <Text pt={12}><b>Department</b></Text>
                    <Select  onChange={this.handleDepts} height={14} borderColor='gray.600'>
                            <option value={this.state.deptVisited}>{this.state.deptVisited}</option>
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

export default Workers