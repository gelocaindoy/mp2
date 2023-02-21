import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home as HomeIcon, People as PeopleIcon } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const SideMenu = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/employee">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Personal Information" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
