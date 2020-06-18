import React, {Component} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
// Component
import Loading from './../UserComponent/Loading';
import RecipeReviewCard from './../UserComponent/AnimeCard';
// Material UI
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import {withStyles} from '@material-ui/core/styles';
// Additional
import  FilmsService  from  '../../../FilmsService';
import {API_URL} from '../../../constants';

const  filmsService  =  new  FilmsService();

const styles = theme =>({
	NavigateNextIcon:{
		marginLeft: theme.spacing(1),
	}
})

class Jenis extends Component {
		state = {
		  film: [],
		  current: 0,
		  numpages: 0,
		  nextPageURL: '',
		  prevPageURL: '',
          loading: 1
		}

		componentDidMount(){
			if(this.props.match && this.props.match.path)
	        {
	        	this.setState({loading: 1});
				const url = `${API_URL}/api/film_jenis/${this.props.match.path.charAt(1).toLowerCase()}/`;
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
	        		this.setState({film: response.data.data});
	        		this.setState({numpages: response.data.numpages});
	        		this.setState({current: response.data.current});
	        		this.setState({nextPageURL: response.data.nextlink});
	        		this.setState({prevPageURL: response.data.prevlink});
			    });
			}
		}

		componentDidUpdate(prevProps){
			if(this.props.match.path !== prevProps.match.path){
	        	this.setState({loading: 1});
        		this.setState({film: []});
        		this.setState({numpages: 0});
        		this.setState({current: 0});
        		this.setState({nextPageURL: ''});
        		this.setState({prevPageURL: ''});

				const url = `${API_URL}/api/film_jenis/${this.props.match.path.charAt(1).toLowerCase()}/`;
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
	        		this.setState({film: response.data.data});
	        		this.setState({numpages: response.data.numpages});
	        		this.setState({current: response.data.current});
	        		this.setState({nextPageURL: response.data.nextlink});
	        		this.setState({prevPageURL: response.data.prevlink});
			    });				
			}
		}

		nextPage(){
		  filmsService.getFilmsByURL(this.state.nextPageURL).then((result) => {
		      this.setState({ film: result.data, nextPageURL:  result.nextlink, prevPageURL:  result.prevlink, current: result.current})
		  });
		}

		prevPage(){
		  filmsService.getFilmsByURL(this.state.prevPageURL).then((result) => {
		      this.setState({ film: result.data, nextPageURL:  result.nextlink, prevPageURL:  result.prevlink, current: result.current})
		  });
		}

		getBanner(){
			switch(this.props.match.path.charAt(1).toLowerCase()){
				case "c":
					return ( <Grid item xs={12} style={{background:'linear-gradient(to right,  #574b90, #9e579d, #fc85ae)',padding:'10px',color:'#e53935', border: '1px solid rgb(60, 44, 134)'}}>
			            <div style={{marginTop:'2px',textAlign:'center',color:'white',fontWeight:'bold',fontSize:'24px'}}>
			            	Completed Anime Series
			            </div>
					</Grid> );
				case "m":
					return ( <Grid item xs={12} style={{background:'linear-gradient(to right, #7098da, #6eb6ff, #90f2ff)',padding:'10px',color:'#e53935', border: '1px solid rgb(57, 113, 204)'}}>
			            <div style={{marginTop:'2px',textAlign:'center',color:'white',fontWeight:'bold',fontSize:'24px'}}>
			             	Movie Anime Series
			            </div>
					</Grid>	);					
				case "o":
					return ( <Grid item xs={12} style={{background:'linear-gradient(to right,  #f98a8b, #f9ced2)',padding:'10px',color:'#e53935', border: '1px solid rgb(255, 151, 151)'}}>
			            <div style={{marginTop:'2px',textAlign:'center',color:'white',fontWeight:'bold',fontSize:'24px'}}>
			             	Ongoing Anime Series
			            </div>
					</Grid> );
				default:
					break;
			}	
		}

		render() {        
			return(
	          	<React.Fragment>
	          	<Loading progress={this.state.loading}/>				
		        <Helmet>
	              <meta property="og:type" content="article" />
	              <meta property="og:title" content={`${this.props.match.path.charAt(1).toUpperCase() + this.props.match.path.substring(2)} Anime Series Anime Subtitle Indonesia | Fansnime`}/>
	              <meta property="og:description" content={`Daftar ${this.props.match.path.charAt(1).toUpperCase() + this.props.match.path.substring(2)} Anime Series Subtitle Indonesia. Download 720p 480p 360p 240p Format mkv mp4 + BATCH`}/>
	              <meta property="og:image" content="%PUBLIC_URL%/favicon.png" />
	              <meta property="og:url" content={`https://fansnime.com${this.props.match.path}`} />
	              <meta property="og:site_name" content="Fansnime" />    

	              <meta name="twitter:title" content={`${this.props.match.path.charAt(1).toUpperCase() + this.props.match.path.substring(2)} Anime Series Anime Subtitle Indonesia | Fansnime`} />
	              <meta name="twitter:description" content={`Daftar ${this.props.match.path.charAt(1).toUpperCase() + this.props.match.path.substring(2)} Anime Series Subtitle Indonesia. Download 720p 480p 360p 240p Format mkv mp4 + BATCH`} />
	              <meta name="twitter:image" content="%PUBLIC_URL%/favicon.png" />
	              <meta name="twitter:site" content="@fansnimeID" />
	              <meta name="twitter:creator" content="@fansnimeID" />

		          <title>{this.props.match.path.charAt(1).toUpperCase() + this.props.match.path.substring(2)} Anime Series Anime Subtitle Indonesia | Fansnime</title>
		          <meta name="description" content={`Daftar ${this.props.match.path.charAt(1).toUpperCase() + this.props.match.path.substring(2)} Anime Series Subtitle Indonesia. Download 720p 480p 360p 240p Format mkv mp4 + BATCH`} />
		        </Helmet>
				<Grid container style={{marginTop: '10px',backgroundColor:'white',borderRadius:'2px',padding:'10px'}}> 
					{this.getBanner()}
					{this.state.film.length !== 0 ? this.state.film.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							{this.props.match.path.charAt(1).toLowerCase() === "m" 
							?
								<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} pengarang={row.musim_rilis} link={row.kode} jenis={row.jenis}/>
							:
								<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} link={row.kode}/>
							}
						</Grid>
					) : this.state.loading === 1 ? <div style={{marginLeft: 'auto', marginRight: 'auto', padding: '100px 0 100px'}}><CircularProgress /></div> :  <h4>Tidak ada anime terkait.</h4>}
				</Grid>
				<Grid container style={{marginTop: '10px',backgroundColor:'white',borderRadius:'2px',padding:'10px'}}>
					<Fab onClick={this.prevPage.bind(this)} size="small" color="secondary"><LeftIcon/></Fab>&nbsp;
					<Chip style={{marginTop: 'auto', marginBottom: 'auto', backgroundColor: 'transparent', border: '2px solid black'}} label={`${this.state.current} dari ${this.state.numpages}`} />&nbsp;
					<Fab onClick={this.nextPage.bind(this)} size="small" color="primary"><RightIcon/></Fab>
				</Grid>				
				</React.Fragment>
			);
		}
}


export default withStyles(styles)(Jenis);