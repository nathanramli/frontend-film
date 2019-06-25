import React from 'react';
import Grid from '@material-ui/core/Grid';

import {makeStyles} from '@material-ui/core/styles'; 
//Material Ui

const useStyles = makeStyles(theme =>({
	marginText:{
		marginTop:'20px',
		marginLeft:'680px',
		fontSize:'24px',
		fontWeight:'bold',
		padding:'10px',
		width:'500px',
		height:'auto',
		borderRadius:'5px',
		backgroundColor:'white',
		border:'2px solid black',
		
		[theme.breakpoints.only('md')]:{
			fontSize:'28px',
			marginLeft:'auto',
			marginTop:'25px',
			width:'500px',
		},
		[theme.breakpoints.only('sm')]:{
			fontSize:'22px',
			marginLeft:'auto',
			marginTop:'20px',
			width:'300px',
		},
		[theme.breakpoints.only('xs')]:{
			fontSize:'9px',
			marginLeft:'auto',
			marginTop:'10px',
			width:'50px',
		},
	},
	marginTextXs:{
		
	}
}));

export default function NotFound(){
	const classes = useStyles();
	return(
		<Grid container style={{backgroundImage:`url('/404.gif')`,backgroundSize:'100%', backgroundRepeat:'no-repeat', width: '100%', height:'80vh'}}>
			<Grid item xs={12}>
				<div className={`${classes.marginText} ${classes.marginTextXs}`}>
					Maaf halaman tidak tersedia.<br />
					Silahkan kembali ke halaman sebelumnya :)
				</div>
			</Grid>
		</Grid>
	);
}