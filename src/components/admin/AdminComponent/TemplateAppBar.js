import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Components Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PowerOffIcon from '@material-ui/icons/SettingsPower';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



class TemplateAppBar extends Component {
	state = {
		buka: false,
		nested: false
	}

  render() {
  	// Semua menu
  	const menu = [
  		['Anime', '/admin/film', <ListIcon/>],
  		// ['Tambah Anime', '/admin/film/add', <AddIcon/>],
  	];

    return (
	    <React.Fragment>
			<AppBar position="static">
			<Container>
			  <Toolbar variant="dense">
				<Button onClick={() => this.setState({buka: true})} color="inherit"><MenuIcon/></Button>
			    <Typography style={{marginLeft: 'auto'}} variant="h6">Fans</Typography><SettingsIcon/>ADMIN
			  </Toolbar>
			</Container>
			</AppBar>  

			<Drawer anchor="left" open={this.state.buka} onClose={() => this.setState({buka: false})}>
			<List style={{width: 250}}>
				<ListItem style={{marginBottom: 20, textAlign: 'center'}}>
					<ListItemText>
						FansADMIN
					</ListItemText>
				</ListItem>
				<Divider/>
				{menu.map(value => (
					<ListItem button component={RouterLink} to={value[1]} key={value[1]}>
						<ListItemIcon>{value[2]}</ListItemIcon>
						<ListItemText primary={value[0]}/>
					</ListItem>
				))}
				<ListItem button onClick={() => this.setState({nested: !this.state.nested})}>
					<ListItemIcon>
						<MenuIcon/>
					</ListItemIcon>
					<ListItemText primary="Account"/>{this.state.nested ? <ExpandLess/> : <ExpandMore/> }
				</ListItem>
				<Collapse in={this.state.nested} timeout="auto" unmountOnExit>
					<List component="div" disabledPadding>
						<ListItem button component={RouterLink} to="/admin/profile" style={{paddingLeft: 40}}>
							<ListItemIcon><PersonIcon/></ListItemIcon>
							<ListItemText primary="Profile"/>
						</ListItem>
						<ListItem button component={RouterLink} to="/admin/logout" style={{paddingLeft: 40}}>
							<ListItemIcon style={{color: "red"}}><PowerOffIcon/></ListItemIcon>
							<ListItemText primary="Logout"/>
						</ListItem>
					</List>
				</Collapse>				
			</List>
			</Drawer>
	    </React.Fragment>
    );
  }
}
export default TemplateAppBar;