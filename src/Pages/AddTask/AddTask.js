
import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../../Context/Authprovider';
import Loader from '../../Component/Loader/Loader';



const theme = createTheme();

export function AddTask() {
    const { user, } = useContext(AuthContext);
    const [loader, setloader] = useState(null);

    const navigate = useNavigate();


    const imageHostingKey = process.env.REACT_APP_imagebb_key;
    // console.log(imageHostingKey)
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const task = data.get('task');
        const details = data.get('details');
        const date = data.get('date');
        setloader(true);
        const imagee = data.get('file');
        console.log(imagee);

        const fromData = new FormData();
        fromData.append('image', imagee)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
        fetch(url, {
            method: 'POST',
            body: fromData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const imgurl = imageData.data.url;
                    console.log(data);
                    const complete = false;
                    savetaskDB(user?.uid, task, details, date, imgurl, complete);



                }
            })
        // console.log({
        //     task: data.get('task'),
        //     details: data.get('details'),
        //     
        //     image: data.get('file'),
        // });


        const savetaskDB = (uid, task, details, date, imgurl, complete) => {
            const tasks = { uid, task, details, date, imgurl, complete };
            fetch(' https://to-do-task-server-soumik825.vercel.app/addtask', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(tasks)
            })
                .then(res => res.json())
                .then(data => {

                    // console.log('save user', data);

                    if (data.acknowledged === true) {
                        navigate('/task');
                        setloader(false)
                    }

                })
        }
    };



    if (loader) {
        return <Loader></Loader>
    }


    // const savetaskDB = (uid, task, details, date, imgurl, complete) => {
    //     const task = { uid, task, details, date, imgurl, complete };
    //     fetch('', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(task)
    //     })
    //         .then(res => res.json())
    //         .then(data => {

    // console.log('save user', data);

    //             if (data.acknowledged === true) {
    //                 navigate('/task');
    // }

    // })


    return (
        <div className='w-[100vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] 2xl:w-[70vw] mx-auto'>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />

                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AddCircleIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Add Your Next Task
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="task"
                                    label="Task Name"
                                    name="task"
                                    autoComplete="task"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="details"
                                    label="Task Details"
                                    type="text"
                                    id="details"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="date"
                                    type="date"
                                    id="date"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="file"
                                    type="file"
                                    id="file"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Confirm Task
                                </Button>

                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default AddTask;