import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/Authprovider';
import Loader from '../../Component/Loader/Loader';



const MyTask = () => {

    const { user } = useContext(AuthContext)
    const [loader, setLoader] = useState(null);
    // const { data: tasks = [], refetch } = useQuery({
    //     queryKey: ['tasks'],
    //     queryFn: async () => {
    //         try {
    //             const res = await fetch(``, {

    //             });
    //             const data = await res.json();
    //             console.log(data)
    //             return data;
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }

    //     }
    // })

    const { data: tasks = [], refetch } = useQuery({

        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                setLoader(true);
                const res = await fetch(`http://localhost:7000/task/${user?.uid}`, {

                });
                const data = await res.json();
                console.log(data);
                // refetch();
                setLoader(false);

                return data;
            }
            catch (error) {
                console.log(error);
            }

        }
    })

    if (loader) {
        return <Loader></Loader>
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            tasks.map(task => <TableRow key={task._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    aaa
                                </TableCell>
                                <TableCell align="right">aaaaaa</TableCell>
                                <TableCell align="right">aaaa</TableCell>
                                <TableCell align="right">aaaa</TableCell>
                                <TableCell align="right">aaa</TableCell>
                            </TableRow>)
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default MyTask;