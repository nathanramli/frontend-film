import React, { Component } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Menulink from './MenuLink';

import Logo from './../../../assets/image/logo3.png';

//Material Ui
import AppBar from '@material-ui/core/AppBar';
// import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';


class AppBarUser extends Component{
	// state ={
      // update:[
      //   ["Bokutachi wa Benkyou ga Dekinai"], 
      //   ["Shingeki No Kyojin Season 3 Part II"],
      //   ["Tate No Yusha"],
      //   ["Black Clover"]
      // ]
    // }

  // componentDidMount(){
    // var TxtType = function(el, toRotate, period) {
    //     this.toRotate = toRotate;
    //     this.el = el;
    //     this.loopNum = 0;
    //     this.period = parseInt(period, 10) || 2000;
    //     this.txt = '';
    //     this.tick();
    //     this.isDeleting = false;
    // };

    // TxtType.prototype.tick = function() {
    //     var i = this.loopNum % this.toRotate.length;
    //     var fullTxt = this.toRotate[i][0];

    //     if (this.isDeleting) {
    //     this.txt = fullTxt.substring(0, this.txt.length - 1);
    //     } else {
    //     this.txt = fullTxt.substring(0, this.txt.length + 1);
    //     }

    //     this.el.innerHTML = '<span id="wrap">'+this.txt+'</span>';

    //     var that = this;
    //     var delta = 100 - Math.random() * 100;

    //     if (this.isDeleting) { delta /= 2; }

    //     if (!this.isDeleting && this.txt === fullTxt) {
    //     delta = this.period;
    //     this.isDeleting = true;
    //     } else if (this.isDeleting && this.txt === '') {
    //     this.isDeleting = false;
    //     this.loopNum++;
    //     delta = 500;
    //     }

    //     setTimeout(function() {
    //     that.tick();
    //     }, delta);
    // };

    // var elements = document.getElementById('typewrite');
    // var toRotate = this.state.update;
    // var period = elements.getAttribute('data-period');
    // if (toRotate) {
    //   new TxtType(elements, toRotate, period);
    // }
    // // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = "#typewrite > #wrap { border-right: 2px solid #ccc }";
    // document.body.appendChild(css);
  // } 
    
	render(){
		return(
		<React.Fragment>
      <AppBar position="static" className="topBar">
          {/*<div style={{float: 'left',backgroundColor:'transparent',padding:'3px'}}>
            <Container maxWidth="xl" component="div">
              <b style={{padding:'3px',color:'#444',marginRight:'7px'}}>New Update </b>
              <span id="typewrite" style={{fontWeight:'100', color: '#444'}} data-period="3500">
              </span>
            </Container>
          </div>*/}
          <Link component={RouterLink} style={{marginRight: 'auto', marginLeft: 'auto'}} underline="none" to="/">
            <img src={Logo} width="240px" alt="Fansnime" title="Fansnime"/>
          </Link>
            <span className="fall">Fall Season</span>
       </AppBar>
       <AppBar position="sticky" style={{boxShadow:'none',background:'rgb(255, 222, 201)'}}>
        <Toolbar style={{display:'inline-block'}}>
          <Menulink/>
        </Toolbar>
       </AppBar>
    </React.Fragment>
		)
	}
}
export default AppBarUser;