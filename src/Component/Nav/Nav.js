import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';




function Nav() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const { user, logout } = useContext(AuthContext);
    // console.log(user);

    const logOut = () => {
        logout();
        setAnchorElUser(null);
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGOO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                                <Link to={'/'} style={{ textDecoration: "none", color: "black" }}>
                                    <Typography textAlign="center">HOME</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/addtask'} style={{ textDecoration: "none", color: "black" }}>
                                    <Typography textAlign="center"> ADD TASK</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/task'} style={{ textDecoration: "none", color: "black" }}>
                                    <Typography textAlign="center">MY TASK</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/complete'} style={{ textDecoration: "none", color: "black" }}>
                                    <Typography textAlign="center"> COMPLETED TASK</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/login'} style={{ textDecoration: "none", color: "black" }}>
                                    <Typography textAlign="center"> LOG IN</Typography>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGOO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem>
                            <Link to={'/'} style={{ textDecoration: "none", color: "black" }}>
                                <Typography textAlign="center">HOME</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to={'/addtask'} style={{ textDecoration: "none", color: "black" }}>
                                <Typography textAlign="center"> ADD TASK</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to={'/task'} style={{ textDecoration: "none", color: "black" }}>
                                <Typography textAlign="center">MY TASK</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to={'/complete'} style={{ textDecoration: "none", color: "black" }}>
                                <Typography textAlign="center"> COMPLETED TASK</Typography>
                            </Link>
                        </MenuItem>

                    </Box>

                    {user?.uid ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.displayName} src={user.photoURL} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"> Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={logOut}>
                                    <Typography textAlign="center"> Log Out</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                        : <MenuItem>
                            <Link to={'/login'} style={{ textDecoration: "none", color: "black" }}>
                                <Typography textAlign="center"> LOG IN</Typography>
                            </Link>
                        </MenuItem>


                    }







                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Nav;