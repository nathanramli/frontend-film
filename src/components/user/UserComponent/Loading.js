import React from 'react';
import LoadingBar from 'react-top-loading-bar';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	glow: {
		boxShadow: '0 0 8px lightblue',
		backgroundAttachment: 'fixed',
		backgroundImage: 'linear-gradient(90deg,#ee4035 0%,#ee4035 20%, #f37736 20%, #f37736 40%,#fdf498 40%, #fdf498 60%, #7bc043 60%,#7bc043 80%,#0392cf 80% ,#0392cf 100%) !important'
	}
});

export default function Loading(props){
	const classes = useStyles();
	return <LoadingBar progress={props.progress} height={3} className={classes.glow}/>
}
