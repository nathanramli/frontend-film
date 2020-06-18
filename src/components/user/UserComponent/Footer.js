import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme =>({
  containerFooter:{
  	backgroundColor:'#2e3133',
  	height:'auto',
  	marginBottom:'0px',
  	padding:'1px',
    borderWidth: '4px 0 4px 0', 
    borderStyle: 'solid', 
    borderImage: 'linear-gradient(90deg,#ee4035 0%,#ee4035 20%, #f37736 20%, #f37736 40%,#fdf498 40%, #fdf498 60%, #7bc043 60%,#7bc043 80%,#0392cf 80% ,#0392cf 100%) 1',
  },
  facebook:{
    fontWeight: 400,
    color: '#878b8d',
    backgroundColor: 'transparent',
    '&:hover':{
      color: 'white',
      backgroundColor: '#3b5998',
    }
  },
  twitter:{
    fontWeight: 400,
    color: '#878b8d',
    backgroundColor: 'transparent',
    '&:hover':{
      color: 'white',
      backgroundColor: '#1da1f2',
    }
  },
  divGan:{
  	marginTop:'20px',
  	textAlign:'center',
  	 color:'white',
  	fontWeight:'bold',
  	fontSize:'24px',
  },
  divGan2:{
  	marginTop:'20px',
  	padding: 10,
  	textAlign:'left',
    color:'silver',
  	fontWeight:'bold',
  	fontSize:'14px',
  }
}));
const Footer = () =>{
	const classes = useStyles();
	return(
		<Container maxWidth="xl" component="div" className={classes.containerFooter}>
	    	<div className={classes.divGan}>
        We <img src="/favicon.png" width={50} alt="Love" style={{verticalAlign: 'middle'}} /> Fansnime
	    	</div>
        <div style={{textAlign: 'center', color: 'white', padding: 10}}>
          "Kenyamanan pengguna adalah Prioritas kami."<br/>
          Fansnime berdiri dibawah naungan FansGroup yang juga menyediakan beberapa konten untuk anda penikmat :<br/><br/>
          Drama Korea (Coming Soon) <a href="/" target="_blank" rel="noopener noreferrer"><Chip style={{marginBottom: 10}} label="FansDrakor" color="primary" /></a><br/>
          Anime <a href="https://fansnime.com/" target="_blank" rel="noopener noreferrer"><Chip label="FansNime" color="secondary" /></a><br/><br/>
          <Button href="https://www.facebook.com/fansnimeID/" target="_blank" component="a" size="small" className={classes.facebook}>Facebook</Button> &bull; <Button size="small" className={classes.twitter}>Twitter</Button>
        </div>
	    	<div className={classes.divGan2}>
	    		Copyright &copy; 2019, Developed by FansGroup &bull; Contact admin@fansnime.com
	    	</div>
	    </Container> 
	);
}

export default Footer;
