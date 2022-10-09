import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';
import { useEffect } from 'react';
import { styled } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { getUserData, getSortedData } from '../redux/actions/users';

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
    time: string;
}

const Users = () => {
    const userState = useSelector((state: RootState) => state.userRedcers.users);
    const dispatch = useDispatch<AppDispatch>();
  

    useEffect(() => {
       dispatch(getUserData())
    }, [dispatch])
    
    const handleSort = (sortBy:string) => {
        let sortByTime: any = [...userState]
        sortByTime.sort(function (a: any, b: any) {
            let x:any = new Date('1970/01/01 ' + a.time)
            let y:any = new Date('1970/01/01 ' + b.time)
            return  sortBy === 'AMPM' ? x - y : sortBy === 'PMAM' && y - x;
        });
        dispatch(getSortedData(sortByTime))
    }
    return (
        <>
            <DIV>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <Header align="left">Sr no.</Header>
                                <Header align="left">First Name</Header>
                                <Header align="left">Last Name</Header>
                                <Header align="left">Email</Header>
                                <Header align="left">Gender</Header>
                                <Header align="left">IP Address</Header>
                                <Header align="left">
                                    <Flex>
                                        <div>Time</div>
                                        <div>
                                            <div><ArrowDropUpIcon style={{ color: "grey" }} onClick={()=>handleSort('AMPM')} /></div>
                                            <div><ArrowDropDownIcon style={{ color: "grey" }} onClick={()=>handleSort('PMAM')} /></div>
                                        </div>
                                    </Flex>
                                </Header>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userState && userState.map((user: IUser) => {
                                return (
                                    <TableRow
                                        key={user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{user.id}</TableCell>
                                        <TableCell align="left">{user.first_name}</TableCell>
                                        <TableCell align="left">{user.last_name}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="left">{user.gender}</TableCell>
                                        <TableCell align="left">{user.ip_address}</TableCell>
                                        <TableCell align="left">{user.time}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DIV>
        </>
    )
}

export default Users

const DIV = styled(Box)({
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: '#F2F2F2',
    border: 0,
    borderRadius: 1,
    color: 'white',
    padding: '100px 100px',
    '& > div': {
        borderRadius: '20px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
        height: '80vh'
    }
});

const Header = styled(TableCell)({
    fontWeight: 'bold',
    padding: '0px 16px',
});

const Flex = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
