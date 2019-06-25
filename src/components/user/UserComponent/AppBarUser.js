import React, { Component } from 'react';
import Menulink from './MenuLink';

//Material Ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class AppBarUser extends Component{
	state ={
      menu:[
        {id:'1',nama:'Home',link:'/',state:'this.state.animeList'},
        {id:'2',nama:'Movie',link:'/movie'},
        {id:'3',nama:'Ongoing',link:'/ongoing'},
        {id:'4',nama:'Completed',link:'/complete'},
        {id:'5',nama:'Genre',link:'/genre'},
      ]
    }
	render(){
		return(
		<React.Fragment>
      <AppBar position="static" style={{boxShadow:'none',alignItems:'center',background:'linear-gradient(to top left, #fe9c8f 0%,#fec8c1 100%)'}}>
          <img src="/logo2.png" width="240px" alt="Fansnime"/>
       </AppBar>
       <AppBar position="sticky" style={{boxShadow:'none',background:'linear-gradient(-90deg,#fe9c8f,#feb2a8)'}}>
        <Toolbar style={{display:'inline-block'}}>
          <Menulink menuMenu={this.state.menu}/>
        </Toolbar>
       </AppBar>
    </React.Fragment>
		)
	}
}
export default AppBarUser;