import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Button, Typography, Backdrop } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { getUserData, getSortedData } from '../redux/actions/users';
import reactlogo from "../assets/react.svg";
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [showClear, setShowClear] = useState<boolean>(false);
    const userState = useSelector((state: RootState) => state.userRedcers.users);
    const { loading } = useSelector((state: RootState) => state.userRedcers);
    const dispatch = useDispatch<AppDispatch>();

    const handleGetUser = () => {
        dispatch(getUserData());
        setShowClear(false);
    }

    const handleSort = (sortBy: string) => {
        let sortByTime: any = [...userState]
        sortByTime.sort(function (a: any, b: any) {
            let x: any = new Date('1970/01/01 ' + a.time)
            let y: any = new Date('1970/01/01 ' + b.time)
            return sortBy === 'AMPM' ? x - y : sortBy === 'PMAM' && y - x;
        });
        dispatch(getSortedData(sortByTime))
        setShowClear(true)
    }

    return (
        <>
            <DIV>
                <Span>
                    <Typography color="#292D32" variant='h4' textAlign="center">User Details Table</Typography>
                    <Button style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', fontWeight:'600' }} variant="outlined" disabled={userState.length > 0} onClick={() => handleGetUser()}>Get Users</Button>
                </Span>
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
                                            <div><ArrowDropUpIcon style={{ color: "grey" }} onClick={() => handleSort('AMPM')} /></div>
                                            <div><ArrowDropDownIcon style={{ color: "grey" }} onClick={() => handleSort('PMAM')} /></div>
                                        </div>
                                        {showClear &&
                                            <div>
                                                <div><ClearIcon style={{ color: "grey" }} onClick={() => handleGetUser()} /></div>
                                            </div>
                                        }
                                    </Flex>
                                </Header>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userState && userState.length > 0 ? userState.map((user: IUser) => {
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
                            }) :
                                (<TableRow style={{ height: '400px' }}>
                                    <TableCell colSpan={7}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img width="50px" src={reactlogo} style={{
                                                color: "grey", objectFit: 'contain',
                                            }} />
                                        </div>
                                        <Typography align="center" style={{ lineHeight: '3.5rem' }}>No Users found</Typography></TableCell>
                                </TableRow>)

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DIV>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Users

const DIV = styled(Box)({
    background: '#F2F2F2',
    border: 0,
    borderRadius: 1,
    color: 'white',
    padding: '50px 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px',
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

const Span = styled('span')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '-webkit-fill-available',
    padding: '5px 15px',
})
