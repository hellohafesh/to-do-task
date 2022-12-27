import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { Copyright } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link to={'/'} color="inherit" >
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function StickyFooter() {
    return (

        <Copyright />

    );
}

export default Footer;