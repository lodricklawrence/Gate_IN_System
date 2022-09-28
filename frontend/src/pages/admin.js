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
    Select,
    ButtonGroup,
} from "@chakra-ui/react" 
import { Link, Redirect } from "react-router-dom";

class AllGuests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            departments:[],
            deptVisited:'',
            date:'',
            data:[],
            error:'',
            adminStatus:localStorage.getItem('admin'),
            response:'',
            logout:false
        }
        this.getDepartments=this.getDepartments.bind(this);
        this.getDepartments();
        this.handleDepts=this.handleDepts.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
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

      handleDepts(e){
        this.setState({deptVisited:e.target.value})
      }

      handleDate(e){
        this.setState({date:e.target.value})
      }

      handleSearch(e){
        if(this.state.deptVisited==='' || this.state.date===''){
            this.setState({error:true})
        }else{
            this.setState({error:false})
            e.preventDefault();
            const token=localStorage.getItem('token')
            axios.post('http://localhost:5000/getDeptGuests',this.state,{ headers: {"Authorization" : `${token}`} }).then(res=>{
                this.setState({data:res.data})
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
        const allDepts=this.state.departments
        const total=this.state.data.length;
        if(this.state.logout===true || this.state.adminStatus==='false' || this.state.response==='Not found'){
            return <Redirect to='/'/>
          }
        const allData=this.state.data.map((item,index)=>{
            return(
                <Table variant='striped' colorScheme='blue'>
                    <Thead>
                    <Tr>
                        <Th fontWeight='extrabold'>SNo</Th>
                        <Th fontWeight='extrabold'>idNo</Th>
                        <Th fontWeight='extrabold'>idType</Th>
                        <Th fontWeight='extrabold'>fullname</Th>
                        <Th fontWeight='extrabold'>deptVisited</Th>
                        <Th fontWeight='extrabold'>date</Th>
                        <Th fontWeight='extrabold'>clockIN</Th>
                        <Th fontWeight='extrabold'>isAttended</Th>
                        <Th fontWeight='extrabold'>isAttendedTime</Th>
                        <Th fontWeight='extrabold'>phone</Th>
                        <Th fontWeight='extrabold'>isDeparture</Th>
                        <Th fontWeight='extrabold'>clockOUT</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        <Tr key={item.id}>
                        <Td>{index+1}</Td>
                        <Td>{item.idNo}</Td>
                        <Td>{item.idType}</Td>
                        <Td>{item.fullname}</Td>
                        <Td>{item.deptVisited}</Td>
                        <Td>{item.date}</Td>
                        <Td>{item.arrival}</Td>
                        <Td>{item.isAttended}</Td>
                        <Td>{item.isAttendedTime}</Td>
                        <Td>{item.phone}</Td>
                        <Td>{item.isDeparture}</Td>
                        <Td>{item.departure}</Td>
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
                        <ButtonGroup>
                        <Link to='/allWorkers'>
                        <Button  bg='cyan.400'>View Workers</Button>
                        </Link>
                        <Button onClick={this.handleLogout} bg='red'>Logout</Button>
                        </ButtonGroup>
                    </Flex>
                </Flex>
                <Flex justifyContent='center' mt={7}>
                <Flex direction='column' border='1px' borderColor='gray.400' backgroundColor='gray.100'>
                <Heading align='center' color='cyan.400' fontSize='30px'>No of Guests</Heading>
                <Text align='center' fontSize='30px' color='red'>{total}</Text>
                </Flex>
                </Flex>
                <Flex justifyContent='center' mt={10}>
                    <Flex direction='column' border='1px' p={12} borderColor='gray.400'  backgroundColor='gray.100' fontWeight='bold'>
                        <Heading>Search Guests</Heading>
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
                        <Input type='date'  value={this.state.date} onChange={this.handleDate} />
                        <Button  mt={5} height={14} bg="cyan.400" onClick={this.handleSearch}>SEARCH</Button>
                        <Text color='red'>{this.state.error?'fill all the fields':''}</Text>
                    </Flex>
                </Flex>
                <Flex justifyContent='center' mt={10}>
                    <Flex border='1px' borderColor='cyan.200' backgroundColor='gray.100' maxWidth={1200}>
                        <TableContainer>
                            {allData}
                        </TableContainer>
                    </Flex>
                </Flex>
            </ChakraProvider>
        )
    }
}

export default AllGuests;