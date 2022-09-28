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
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,PopoverFooter
} from "@chakra-ui/react"

import {Link} from "react-router-dom";
class Approve extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idNo:'',
            date:'',
            error:'',
            data:[]
        }

        this.handleID=this.handleID.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleID(e){
        this.setState({idNo:e.target.value})
    }

    handleDate(e){
        this.setState({date:e.target.value})
    }

    handleSearch(e){
        if(this.state.idNo==='' || this.state.date===''){
            this.setState({error:true})
        }else{
            this.setState({error:false})
            e.preventDefault();
            axios.post('http://localhost:5000/idGuests',this.state).then(res=>{
                this.setState({data:res.data})
            }).catch(e=>{
                console.log(e)
            })
        }

    }

    handleApprove(id){
        axios.put(`http://localhost:5000/idGuests/${id}`).then(res=>{
            const newData=this.state.data.filter(item=>item.id!==id);
            this.setState({data:newData});
        }).catch(e=>{
            console.log(e)
        })
        
        
    }
    render(){
        const allData=this.state.data.map((item)=>{
            return(
                <Table variant='striped' colorScheme='blue'>
                    <Thead>
                    <Tr>
                        <Th fontWeight='extrabold'>idNo</Th>
                        <Th fontWeight='extrabold'>idType</Th>
                        <Th fontWeight='extrabold'>fullname</Th>
                        <Th fontWeight='extrabold'>deptVisited</Th>
                        <Th fontWeight='extrabold'>roomNo</Th>
                        <Th fontWeight='extrabold'>floorNo</Th>
                        <Th fontWeight='extrabold'>isAttended</Th>
                        <Th fontWeight='extrabold'>phone</Th>
                        <Th fontWeight='extrabold'>Clockout</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        <Tr key={item.id}>
                        <Td>{item.idNo}</Td>
                        <Td>{item.idType}</Td>
                        <Td>{item.fullname}</Td>
                        <Td>{item.deptVisited}</Td>
                        <Td>{item.roomNo}</Td>
                        <Td>{item.floorNo}</Td>
                        <Td>{item.isAttended}</Td>
                        <Td>{item.phone}</Td>
                        <Td>
                            <Popover>
                            <PopoverTrigger>
                                <Button bg='cyan.400'>APPROVE</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader fontWeight='extrabold'>confirmation</PopoverHeader>
                                <PopoverCloseButton bg='red'/>
                                <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
                                <PopoverFooter  align='center'>
                                    <Button colorScheme='cyan' onClick={()=>this.handleApprove(item.id)}>Yes</Button>
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
        const theme = extendTheme({
            fonts: {
              heading: `'Open Sans', sans-serif`,
              body: `'Raleway', sans-serif`,
            },
          })
        return(
            <ChakraProvider theme={theme}>
            <Flex justifyContent='center' mt={3}>
                <Flex direction='row'>
                <Link to='/'>
                  <Button bg='cyan.400'>Back to Login</Button>
                </Link>
                </Flex>
              </Flex>
                <Flex justifyContent='center' mt={10}>
                    <Flex direction='column' border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100' fontWeight='bold'>
                        <Heading align='center'>Guests Departure</Heading>
                        <Text align='center' color='gray.500' fontSize={40}>Approve clockOut</Text>
                        <Text pt={12}>ID Number</Text>
                        <Input type='number' value={this.state.idNo} onChange={this.handleID}/>
                        <Text pt={5}>Date</Text>
                        <Input type='date'  value={this.state.date} onChange={this.handleDate} />
                        <Button  mt={5} height={14} bg="cyan.400" onClick={this.handleSearch}>SEARCH</Button>
                        <Text color='red'>{this.state.error?'fill all the fields':''}</Text>
                    </Flex>
                </Flex>
                <Flex justifyContent='center' mt={10}>
                    <Flex border='1px' borderColor='cyan.200'  backgroundColor='gray.100' >
                        <TableContainer>
                            {allData}
                        </TableContainer>
                    </Flex>
                </Flex>
            </ChakraProvider> 
        )
    }
}

export default Approve