import React, {Component} from 'react';
import axios from 'axios';
import {Link as RouterLink } from 'react-router-dom';
// Component
import Loading from './../UserComponent/Loading';
import RecipeReviewCard from './../UserComponent/AnimeCard';
// Material UI
import Button from '@material-ui/core/Button';
import Sync from '@material-ui/icons/Sync';
import Completed from '@material-ui/icons/CheckCircle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Movie from '@material-ui/icons/Movie';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
// Additional
import {API_URL} from '../../../constants';

const styles = theme =>({
	NavigateNextIcon:{
		marginLeft: theme.spacing(1),
	},
	fontResponsiveTitle:{
		color:'white',
		fontSize:'18px',
		fontWeight:'600',
		[theme.breakpoints.only('xs')]:{
			fontSize:'12px',
		}
	},
	buttonSeeMore:{
		float:'right',
		marginRight:'10px',
		fontWeight:'bold',
		[theme.breakpoints.only('xs')]:{
			fontSize:'12px',
			marginBottom:'5px',
		}
	},
	buttonSeeMoreComplete:{
		float:'right',
		marginRight:'10px',
		fontWeight:'bold',
		[theme.breakpoints.only('xs')]:{
			fontSize:'12px',
			float:'left',
			marginBottom:'5px',
			marginLeft:'5px',

		}
	}
})

class Anime extends Component {
		state = {
		  complete: [],
		  ongoing: [],
		  movie: [],
          loading: 1
		}

		componentDidMount() {
			const url = `${API_URL}/api/film_limit_enam/`;
        	axios.get(url, {
            onDownloadProgress: (progressEvent) => {
					if(progressEvent.lengthComputable){
						let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						this.setState({loading: this.state.loading+percent});                
					}else{
						this.setState({loading: 100});
					}
	            }
          	}).then((response) => {
          		let complete = [];
          		let movie = [];
          		let ongoing = [];
        		let result = response.data;
        		result.data.forEach(function(row){  
        			switch(row.jenis){
        				case "o":
	        				ongoing.push(row);
	        				break;
	        			case "m":
        					movie.push(row);
        					break;
	        			case "c":
	        				complete.push(row);
	        				break;
	        			default:
	        				break;
	        		}
        		});

        		this.setState({ongoing: ongoing});
        		this.setState({complete: complete});
        		this.setState({movie: movie});
		    });
		}

		render() {        
			return(
	          	<React.Fragment>
	          	<Loading progress={this.state.loading}/>				
				<Grid alignItems="center" justify="center" container style={{marginTop: '10px',backgroundColor:'white',borderRadius:'2px',padding:'10px'}} > 
					<Grid item xs={12} style={{backgroundColor:'#e53935',padding:0,color:'white'}}>
                        <div style={{marginTop:'5px'}}>
                        	<Button disabled style={{color:'white'}} className={this.props.classes.fontResponsiveTitle}>
                        		<Sync />&nbsp;ONGOING ANIME
                        	</Button>
                        	<Button style={{backgroundColor: 'rgb(131, 15, 12)', color: 'white'}} variant="contained" size="small" component={RouterLink} to="/ongoing" className={this.props.classes.buttonSeeMore}>
                        		See More
                        		<NavigateNextIcon className={this.props.classes.NavigateNextIcon}/>
                        	</Button>
                        </div>
					</Grid>
					{this.state.ongoing.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} link={row.kode}/>
						</Grid>
					)}
				</Grid>
				<Grid alignItems="center" justify="center" container style={{marginTop: '10px',backgroundColor:'white',borderRadius:'2px',padding:'10px'}}> 
					<Grid item xs={12} style={{backgroundColor:'#f57f17',padding:0,color:'#e53935'}}>
			            <div style={{marginTop:'5px'}}>
			            	<Button disabled style={{color:'white'}} className={this.props.classes.fontResponsiveTitle}>
			            		<Completed />&nbsp;COMPLETED ANIME SERIES
			            	</Button>
			            	<Button style={{backgroundColor: 'rgb(173, 83, 3)', color: 'white'}} variant="contained" size="small" component={RouterLink} to="/complete" className={this.props.classes.buttonSeeMoreComplete}>
                        		See More
                        		<NavigateNextIcon className={this.props.classes.NavigateNextIcon}/>
                        	</Button>
			            </div>
					</Grid>
					{this.state.complete.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} link={row.kode}/>
						</Grid>
					)}
				</Grid>
				<Grid alignItems="center" justify="center" container style={{marginTop: '10px',backgroundColor:'white',borderRadius:'2px',padding:'10px'}}> 
					<Grid item xs={12} style={{backgroundColor:'#7bc043',padding:0,color:'#e53935'}}>
		                <div style={{marginTop:'5px'}}>
		                	<Button disabled style={{color:'white'}} className={this.props.classes.fontResponsiveTitle}>
		                		<Movie />&nbsp;ANIME MOVIE
		                	</Button>
		                	<Button style={{backgroundColor: 'rgb(75, 132, 29)', color: 'white'}} variant="contained" size="small" component={RouterLink} to="/movie" className={this.props.classes.buttonSeeMore}>
                        		See More
                        		<NavigateNextIcon className={this.props.classes.NavigateNextIcon}/>
                        	</Button>
		                </div>
					</Grid>
					{this.state.movie.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} link={row.kode}/>
						</Grid>
					)}
				</Grid>
				</React.Fragment>
			);
		}
}


export default withStyles(styles)(Anime);