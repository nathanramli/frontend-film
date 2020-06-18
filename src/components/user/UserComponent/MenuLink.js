import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import { withRouter } from 'react-router';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AppBarTest from './AppBarTest';
import './../../../assets/css/MenuLink.css';
import Home from '@material-ui/icons/Home';
import Movie from '@material-ui/icons/Movie';
import Favorite from '@material-ui/icons/Favorite';
import Done from '@material-ui/icons/Done';
import Play from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  search: {
    position: 'relative',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    boxShadow: '0 0 2px gray',
    borderRadius: '8px',
    float:'right',
    marginTop:'5px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'gray',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    
    },

    },
  hidemenu: {
    color:'white',
    float:'left',
    [theme.breakpoints.down('xs')]:{
      display:'none',
    },
  },
  hidesearch:{
    [theme.breakpoints.down('xs')]:{
      display:'none',
    }
  }
});



class Menulink extends Component
{
  state = {
    keyword: '',
  }

  handleSubmit(e){
    e.preventDefault();
    let keyword = this.state.keyword.replace(/ /g, '+');
    this.props.history.push({
      pathname: '/cari',
      search: `?keyword=${keyword}`,
    });
  }

  handleChange(e){
    this.setState({keyword: e.target.value});
  }

  render(){

    return(
      <React.Fragment>
          <AppBarTest />
          <div style={{marginTop:'10px'}}>
          <div className={this.props.classes.hidemenu}>
            <Link className="a" style={{color: '#666'}}  component={RouterLink} variant="button" underline="none" color="textPrimary" to="/">
              <Home style={{verticalAlign: 'middle'}}/> Home
            </Link>
            <Link className="a" style={{color: '#666'}}  component={RouterLink} variant="button" underline="none" color="textPrimary" to="/ongoing">
              <Play style={{verticalAlign: 'middle'}}/> Ongoing
            </Link>
            <Link className="a" style={{color: '#666'}}  component={RouterLink} variant="button" underline="none" color="textPrimary" to="/complete">
              <Done style={{verticalAlign: 'middle'}}/> Completed
            </Link>
            <Link className="a" style={{color: '#666'}}  component={RouterLink} variant="button" underline="none" color="textPrimary" to="/movie">
              <Movie style={{verticalAlign: 'middle'}}/> Movie
            </Link>
            <Link className="a" style={{color: '#666'}}  component={RouterLink} variant="button" underline="none" color="textPrimary" to="/genre">
              <Favorite style={{verticalAlign: 'middle'}}/> Genre
            </Link>
          </div>      

          <div className={this.props.classes.hidesearch}>
            <div className={this.props.classes.search} >
              <div className={this.props.classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <InputBase placeholder="Cari.." classes={{root: this.props.classes.inputRoot,input: this.props.classes.inputInput,}} inputProps={{ 'aria-label': 'Search' }} onChange={this.handleChange.bind(this)} value={this.state.keyword}/>
              </form>
            </div>
          </div>
          </div>
        </React.Fragment>
      );
  }
}


export default withStyles(styles)(withRouter(Menulink));