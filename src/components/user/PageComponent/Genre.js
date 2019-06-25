import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	gridItem:{
		backgroundColor:'transparent',
		textAlign:'center',
		marginTop:'15px',
		padding:'15px',
		marginRight:'10px',
		borderRadius:'2px',
		[theme.breakpoints.only('xs')]:{
			padding:'8px',
			fontSize:'10px',
		}
	}
}));
function Genre(){
	const classes = useStyles();
	const genre = [
		['Action', '#ff5252', 'genre/action'],
		['Adventure', '#ff7474', 'genre/adventure'],
		['Comedy', '#ff4081', 'genre/comedy'],
		['Dementia', '#ff669a', 'genre/dementia'],
		['Demons', '#e040fb', 'genre/demons'],
		['Drama', '#e666fb', 'genre/drama'],
		['Ecchi', '#7c4dff', 'genre/ecchi'],
		['Fantasy', '#9670ff', 'genre/fantasy'],
		['Game', '#536dfe', 'genre/game'],
		['Harem', '#758afe', 'genre/harem'],
		['Historical', '#448aff', 'genre/historical'],
		['Horror', '#69a1ff', 'genre/horror'],
		['Josei', '#40c4ff', 'genre/josei'],
		['Kids', '#66cfff', 'genre/kids'],
		['Magic', '#18ffff', 'genre/magic'],
		['Martial Arts', '#46ffff', 'genre/martial-arts'],
		['Mecha', '#64ffda', 'genre/mecha'],
		['Military', '#83ffe1', 'genre/military'],
		['Music', '#69f0ae', 'genre/music'],
		['Mystery', '#87f3be', 'genre/mystery'],
		['Parody', '#b2ff59', 'genre/parody'],
	    ['Police', '#c1ff7a', 'genre/police'],
        ['Psychological', '#eeff41', 'genre/psychological'],
        ['Romance', '#f1ff67', 'genre/romance'],
        ['Samurai', '#ffff00', 'genre/samurai'],
        ['School', '#ffff33', 'genre/school'],
        ['Sci-Fi', '#ffd740', 'genre/sci-fi'],
        ['Seinen', '#ffdf66', 'genre/seinen'],
        ['Shoujo', '#ffab40', 'genre/shoujo'],
        ['Shoujo Ai', '#ffbb66', 'genre/shoujo-ai'],
        ['Shounen', '#ff6e40', 'genre/shounen'],
        ['Slice Of Life', '#ff8b66', 'genre/slice-of-life'],
        ['Space', '#5635b2', 'genre/space'],
        ['Sports', '#3a4cb1', 'genre/sports'],
        ['Super Power', '#2f60b2', 'genre/super-power'],
        ['Supernatural', '#2c89b2', 'genre/supernatural'],
        ['Thriller', '#b22c5a', 'genre/thriller'],
        ['Vampire', '#9c2caf', 'genre/vampire'],
	 ];
	return(
		<Grid container alignItems="center" justify="center" spacing={0} style={{backgroundColor:'#263238',padding:'20px'}}>
			{genre.map((row, index) =>
				<Grid component={RouterLink} to={{pathname:`/${row[2]}`}} item xs={4} md={2} lg={2} xl={2} key={index} className={classes.gridItem}  style={{border: `3px solid ${row[1]}`,boxShadow: `0 0 10px ${row[1]}`,color:`${row[1]}`,textShadow:'-0px -0px -10px #000,  1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000',textDecoration:'none'}}>
					{row[0]}
				</Grid>
			)}
		</Grid>
	);
}
export default Genre;