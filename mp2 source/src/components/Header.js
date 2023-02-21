    import React, { useState } from "react";
    import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
    import { Menu as MenuIcon } from "@material-ui/icons";
    import { makeStyles } from "@material-ui/core/styles";
    import SideMenu from "./SideMenu";
    import "../index.css";
    import { Button } from "@material-ui/core";
    import firebase from "./firebaseConfig";

    const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    }));

    const Header = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleMenu}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Employee Management
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                style={{ margin: "20px" }}
                onClick={handleLogout}
            >
                Logout
            </Button>
            </Toolbar>
        </AppBar>
        <SideMenu isOpen={isOpen} onClose={toggleMenu} />
        </div>
    );
    };

    export default Header;
