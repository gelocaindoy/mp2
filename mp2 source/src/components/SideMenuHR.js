    import React from "react";
    import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
    import {
        Close as CloseIcon,
        Dashboard as DashboardIcon,
        Person as PersonIcon,
        AccountBalance as AccountBalanceIcon,
        Group as GroupsIcon,
        BusinessCenter as BusinessCenterIcon,
        Description as DescriptionIcon
    } from "@material-ui/icons";
    import { makeStyles } from "@mui/material/styles";
    import { Link } from "react-router-dom";

    const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
    },
    closeIcon: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    }));

    const SideMenuHR = ({ isOpen, onClose }) => {
    const classes = useStyles();

    return (
        <Drawer open={isOpen} onClose={onClose}>
            <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <div className={classes.drawer}>
            <List>
            <ListItem button component={Link} to="/hr/dashboard">
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            </List>
        </div>
        </Drawer>
    );
    };

    export default SideMenuHR;
