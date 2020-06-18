import React, {Component} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import {Link as RouterLink } from 'react-router-dom';
// Component
import Loading from './../UserComponent/Loading';
import RecipeReviewCard from './../UserComponent/AnimeCard';
// Material UI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Completed from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
// import Movie from '@material-ui/icons/Movie';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import Play from '@material-ui/icons/PlayArrow';
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
			float:'right',
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
        		let result = response.data;

        		this.setState({ongoing: result.ongoing});
        		this.setState({complete: result.complete});
        		this.setState({movie: result.movie});
		    });
		}

		render() {        
			return(
	          	<React.Fragment>
	          	<Loading progress={this.state.loading}/>
	            <Helmet>
				    <meta name="description" content="Tempat Download Anime Sub Indo Terlengkap dan Terbaru dalam Format Mkv dan Mp4 Tersedia 720p 420p 360p 240p + BATCH dengan link Google Drive, Zippyshare" />    

				    <meta property="og:type" content="article" />
				    <meta property="og:title" content="Fansnime | Download Anime Subtitle Indonesia"/>
				    <meta property="og:description" content="Tempat Download Anime Sub Indo Terlengkap dan Terbaru dalam Format Mkv dan Mp4 Tersedia 720p 420p 360p 240p + BATCH dengan link Google Drive, Zippyshare"/>
				    <meta property="og:image" content="%PUBLIC_URL%/favicon.png" />
				    <meta property="og:url" content="https://fansnime.com" />
				    <meta property="og:site_name" content="Fansnime" />    

				    <meta name="twitter:title" content="Fansnime | Download Anime Subtitle Indonesia" />
				    <meta name="twitter:description" content="Tempat Download Anime Sub Indo Terlengkap dan Terbaru dalam Format Mkv dan Mp4 Tersedia 720p 420p 360p 240p + BATCH dengan link Google Drive, Zippyshare" />
				    <meta name="twitter:image" content="%PUBLIC_URL%/favicon.png" />
				    <meta name="twitter:site" content="@fansnimeID" />
				    <meta name="twitter:creator" content="@fansnimeID" />

				    <title>Fansnime | Download Anime Subtitle Indonesia</title>
	            </Helmet>	          	
				<Grid alignItems="center" justify="center" container style={{backgroundColor:'transparent',borderRadius:'2px',padding:'10px'}} > 
					<Grid item xs={12} style={{background:'linear-gradient(to right,  #f98a8b, #f9ced2)',padding:0,color:'white', border: '1px solid rgb(255, 151, 151)'}}>
                        <div style={{marginTop:'5px'}}>
                        	<Button disabled style={{color:'white'}} className={this.props.classes.fontResponsiveTitle}>
                        		ONGOING ANIME
                        	</Button>
                        	<Button style={{backgroundColor: '#fca1b1', color: 'white'}} variant="contained" size="small" component={RouterLink} to="/ongoing" className={this.props.classes.buttonSeeMore}>
                        		See More
                        		<NavigateNextIcon className={this.props.classes.NavigateNextIcon}/>
                        	</Button>
                        </div>
					</Grid>
					{this.state.ongoing.length !== 0 ? this.state.ongoing.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.selesai_tayang} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} jenis={row.jenis} link={row.kode}/>
						</Grid>
					) : this.state.loading === 1 ? <div style={{marginLeft: 'auto', marginRight: 'auto', padding: '100px 0 100px'}}><CircularProgress /></div> :  <h4>Tidak ada anime terkait.</h4>}
				</Grid>
				<Grid alignItems="center" justify="center" container style={{backgroundColor:'transparent',borderRadius:'2px',padding:'10px'}}> 
					<Grid item xs={12} style={{background:'linear-gradient(to right,  #574b90, #9e579d, #fc85ae)',padding:0,color:'#e53935', border: '1px solid rgb(60, 44, 134)'}}>
			            <div style={{marginTop:'5px'}}>
			            	<Button disabled style={{color:'white'}} className={this.props.classes.fontResponsiveTitle}>
			            		COMPLETED ANIME
			            	</Button>
			            	<Button style={{backgroundColor: '#574b90', color: 'white'}} variant="contained" size="small" component={RouterLink} to="/complete" className={this.props.classes.buttonSeeMoreComplete}>
                        		See More
                        		<NavigateNextIcon className={this.props.classes.NavigateNextIcon}/>
                        	</Button>
			            </div>
					</Grid>
					{this.state.complete.length !== 0 ? this.state.complete.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} jenis={row.jenis} link={row.kode}/>
						</Grid>
					) : this.state.loading === 1 ? <div style={{marginLeft: 'auto', marginRight: 'auto', padding: '100px 0 100px'}}><CircularProgress /></div> :  <h4>Tidak ada anime terkait.</h4>}
				</Grid>
				<Grid alignItems="center" justify="center" container style={{backgroundColor:'transparent',borderRadius:'2px',padding:'10px'}}> 
					<Grid item xs={12} style={{background:'linear-gradient(to right, #7098da, #6eb6ff, #90f2ff)',padding:0,color:'#e53935', border: '1px solid rgb(57, 113, 204)'}}>
		                <div style={{marginTop:'5px'}}>
		                	<Button disabled style={{color:'white'}} className={this.props.classes.fontResponsiveTitle}>
		                		ANIME MOVIE
		                	</Button>
		                	<Button style={{backgroundColor: '#7098da', color: 'white'}} variant="contained" size="small" component={RouterLink} to="/movie" className={this.props.classes.buttonSeeMore}>
                        		See More
                        		<NavigateNextIcon className={this.props.classes.NavigateNextIcon}/>
                        	</Button>
		                </div>
					</Grid>
					{this.state.movie.length !== 0 ? this.state.movie.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} pengarang={row.musim_rilis} jenis={row.jenis} link={row.kode}/>
						</Grid>
					) : this.state.loading === 1 ? <div style={{marginLeft: 'auto', marginRight: 'auto', padding: '100px 0 100px'}}><CircularProgress /></div> :  <h4>Tidak ada anime terkait.</h4>}
				</Grid>
				</React.Fragment>
			);
		}
}


export default withStyles(styles)(Anime);