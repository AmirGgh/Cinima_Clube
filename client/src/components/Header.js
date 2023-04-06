import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import authService from "../utils/authService"



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import { AppContext } from "../App";
import { useContext } from "react";
import { useState } from "react";


function Header() {
    const { currPermissions } = useContext(AppContext)
    const vlidePermiss = (per) => {
        return currPermissions.includes(per)
    }
    const [pages, setpages] = useState([])
    // let pages = ['movies', 'subscriptions', 'users'];
    useEffect(() => {
        if (currPermissions) {
            let p = currPermissions.filter((per) => (per === "CRUD Users" || per === "View Subscriptions" || per === 'View Movies')).map((p) => p.split(' ')[1])
            // pages = pages
            setpages(p)
        }

    }, [currPermissions])

    // console.log(pages)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate
    useEffect(() => {
        if (authService.getToken() == null) {
            // navigate('/login')
        }
    }, [])
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
    console.log(authService.getRole())

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TheatersRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                        MOVTV
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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>{page}</Link></Typography>
                                </MenuItem>
                            ))}
                            <MenuItem
                                key="Logout"
                                onClick={() => { handleCloseNavMenu(); authService.reset(); }}
                            >
                                <Link style={{ textDecoration: "none", color: "white" }} to={'/'}>Logout</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <TheatersRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                        MOVTV
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>{page}</Link>
                            </Button>
                        ))}

                    </Box>

                    <Button key="Logout"
                        onClick={() => { authService.reset(); handleCloseNavMenu(); }}
                        sx={{ color: 'white', display: { xs: 'none', md: 'flex' } }}>
                        <Link style={{ textDecoration: "none", color: "white" }} to={'/'} > {authService.getRole()?.toUpperCase()} - Logout</Link>
                    </Button>

                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Header;
