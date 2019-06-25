import React from 'react';
import Search from './Search.js';

import {makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Hamburger from '@material-ui/icons/Dehaze';
import Close from '@material-ui/icons/Close';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(theme =>({
  list: {
    width: 250,
  },
  fullList: {
    width: '100',
    height:'100%',
    backgroundImage:`url('/bg-responsive-menu2.png')`,
    backgroundSize:'cover',
  },
  tampilhamburger:{
    [theme.breakpoints.up('sm')]:{
        display:'none',
    },
  },
  hamburgercolor:{
    color:'white',
  },
}));
 
export default function AppBarTest() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >        
      <List>
            <div style={{padding:'5px',float:'right',margin:'10px'}}>
            <Fab size="small" color="secondary" onClick={toggleDrawer('bottom',false)}>
                <Close/>
            </Fab>
            </div>


        {[
            {nama:'Home',link:'/'}, 
            {nama:'Movie',link:'/movie'},
            {nama:'Ongoing',link:'/ongoing'},
            {nama:'Completed',link:'/complete'},
            {nama:'Genre',link:'/genre'},
         ].map((text, index) => (
          <ListItem button key={text.nama} component={RouterLink} to={text.link}>
            <ListItemText primary={text.nama} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div  className={classes.tampilhamburger}>
      <IconButton className={classes.hamburgercolor} onClick={toggleDrawer('bottom', true)}>
        <Hamburger />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
        onOpen={toggleDrawer('bottom', true)}
        className={classes.tampilhamburger}
      >
        <div>
          <Search />
        </div>
        {fullList('bottom')}
      </Drawer>
    </div>
  );
}
