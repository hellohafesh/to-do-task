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
import { Button } from '@mui/material';



const MyTask = () => {

    const { user } = useContext(AuthContext)
    const [loader, setLoader] = useState(null);

    const { data: tasks = [], refetch } = useQuery({

        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                setLoader(true);
                const res = await fetch(`https://to-do-task-server-soumik825.vercel.app/task/${user?.uid}`, {

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

    const deleteDB = id => {
        setLoader(true);
        fetch(`https://to-do-task-server-soumik825.vercel.app/delete/${id}`, {
            method: 'DELETE',


        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    setLoader(false);

                }
            })
        // console.log(id)

    }

    const setcompletedb = id => {
        fetch(`https://to-do-task-server-soumik825.vercel.app/complete/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }




    if (loader) {
        return <Loader></Loader>
    }

    return (
        <div className='min-h-[90vh] w-[100vw] md:w-[90vw] lg:w-[90vw] xl:w-[85vw] 2xl:w-[85vw] mx-auto'>
            {tasks ? <>                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableBody>

                        {
                            tasks?.map(task => <div key={task._id}>
                                {!task.complete ? <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" className='p-0 h-[50px] w-[70px]' scope="row">
                                        {/* <Avatar alt="" src={task.imgurl} /> */}
                                        <img className='h-[50px] w-[70px]' src={task.imgurl} alt="" />

                                    </TableCell>
                                    <TableCell align="right">{task.date}</TableCell>
                                    <TableCell align="right"><Button
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Details
                                    </Button></TableCell>
                                    <TableCell align="right"><Button
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => setcompletedb(task._id)}
                                    >
                                        Complete
                                    </Button></TableCell>
                                    <TableCell align="right"><Button
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Edit
                                    </Button></TableCell>
                                    <TableCell align="right"><Button
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }} onClick={() => deleteDB(task._id)}
                                    >
                                        Delete
                                    </Button></TableCell>
                                </TableRow> : <div className=''> No Data Is Here</div>

                                }
                            </div>
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>  </> : <h1>No Data</h1>
            }


        </div>
    );
}
export default MyTask;