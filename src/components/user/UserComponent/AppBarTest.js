import React, { Component } from 'react';

import Logo from './../../../assets/image/bg.png';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withRouter } from 'react-router';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import Home from '@material-ui/icons/Home';
import Movie from '@material-ui/icons/Movie';
import Favorite from '@material-ui/icons/Favorite';
import Done from '@material-ui/icons/Done';
import Play from '@material-ui/icons/PlayArrow';
import Hamburger from '@material-ui/icons/Dehaze';
import {Link as RouterLink} from 'react-router-dom';


const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
  hamburgercolor:{
    color:'rgba(0, 0, 0, 0.87)',
    [theme.breakpoints.up('sm')]:{
        display:'none',
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AppBarTest extends Component {
  state = {
    open: false,
    keyword: ''
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit(e){
    e.preventDefault();
    let keyword = this.state.keyword.replace(/ /g, '+');
    this.props.history.push({
      pathname: '/cari',
      search: `?keyword=${keyword}`,
    });

    this.handleClose();
  }

  handleChange(e){
    this.setState({keyword: e.target.value});
  }

  render(){
    return (
      <div >
        <IconButton className={this.props.classes.hamburgercolor} onClick={this.handleClickOpen.bind(this)}>
          <Hamburger />
        </IconButton>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose.bind(this)} TransitionComponent={Transition} >
        <div style={{backgroundImage: `url('${Logo}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%'}}>
        <div style={{height: '50px'}}>
          <Fab color="secondary" onClick={this.handleClose.bind(this)} size="small" style={{margin: '10px', float: 'right'}}>
            <CloseIcon />
          </Fab>
        </div>
          <div style={{padding: 10}}>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <TextField variant="outlined" placeholder="Cari.." style={{width: '79%'}} onChange={this.handleChange.bind(this)}/>
              <Button type="submit" color="primary" size="small" style={{marginTop: '10px'}}><SearchIcon /></Button>
            </form>
          </div>
          <List>        
            <ListItem button component={RouterLink} to='/' onClick={this.handleClose.bind(this)}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={RouterLink} to='/ongoing' onClick={this.handleClose.bind(this)}>
              <ListItemIcon><Play /></ListItemIcon>
              <ListItemText primary='Ongoing' />
            </ListItem>
            <ListItem button component={RouterLink} to='/complete' onClick={this.handleClose.bind(this)}>
              <ListItemIcon><Done /></ListItemIcon>
              <ListItemText primary='Completed' />
            </ListItem>
            <ListItem button component={RouterLink} to='/movie' onClick={this.handleClose.bind(this)}>
              <ListItemIcon><Movie /></ListItemIcon>
              <ListItemText primary='Movie' />
            </ListItem>
            <ListItem button component={RouterLink} to='/genre' onClick={this.handleClose.bind(this)}>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary='Genre' />
            </ListItem>          
          </List>
          </div>
        </Dialog>

      </div>
    );
  }
}
export default withStyles(styles)(withRouter(AppBarTest));