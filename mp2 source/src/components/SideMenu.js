    import React from "react";
    import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
    import {
        Close as CloseIcon,
        // Dashboard as DashboardIcon,
        Person as PersonIcon,
        AccountBalance as AccountBalanceIcon,
        Group as GroupsIcon,
        BusinessCenter as BusinessCenterIcon,
        Description as DescriptionIcon
    } from "@material-ui/icons";
    import { makeStyles } from "@material-ui/core/styles";
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

    const SideMenu = ({ isOpen, onClose }) => {
    const classes = useStyles();

    return (
        <Drawer open={isOpen} onClose={onClose}>
            <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <div className={classes.drawer}>
            <List>
            {/* <ListItem button component={Link} to="/employee/dashboard">
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem> */}
            <ListItem button component={Link} to="/employee">
                <ListItemIcon>
                <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Personal Information" />
            </ListItem>
            <ListItem button component={Link} to="/employee/education">
                <ListItemIcon>
                <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Education" />
            </ListItem>
            <ListItem button component={Link} to="/employee/dependents">
                <ListItemIcon>
                <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Dependents" />
            </ListItem>
            <ListItem button component={Link} to="/employee/work-experience">
                <ListItemIcon>
                <BusinessCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Work Experience" />
            </ListItem>
            <ListItem button component={Link} to="/employee/manageleave">
                <ListItemIcon>
                <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Leave" />
            </ListItem>
            </List>
        </div>
        </Drawer>
    );
    };

    export default SideMenu;
