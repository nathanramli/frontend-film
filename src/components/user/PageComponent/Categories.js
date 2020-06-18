import React, {Component} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';

import  FilmsService  from  '../../../FilmsService';
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
// Additional
import {API_URL} from '../../../constants';

const  filmsService  =  new  FilmsService();

class Categories extends Component {
		state = {
		  film: [],
		  genre: '',
		  current: 0,
		  numpages: 0,
		  nextPageURL: '',
		  prevPageURL: '',
          loading: 1
		}

		componentDidMount() {
			const { match: { params } } = this.props;
	        if(params && params.genre)
	        {
	        	this.setState({genre: params.genre});
				const url = `${API_URL}/api/film_genre/${params.genre}/`;
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

		getWarna(genre){
			const genres = [
				['Action', '#ff5252'],
				['Adventure', '#ff7474'],
				['Comedy', '#ff4081'],
				['Dementia', '#ff669a'],
				['Demons', '#e040fb'],
				['Drama', '#e666fb'],
				['Ecchi', '#7c4dff'],
				['Fantasy', '#9670ff'],
				['Game', '#536dfe'],
				['Harem', '#758afe'],
				['Historical', '#448aff'],
				['Horror', '#69a1ff'],
				['Josei', '#40c4ff'],
				['Kids', '#66cfff'],
				['Magic', '#18ffff'],
				['Martial Arts', '#46ffff'],
				['Mecha', '#64ffda'],
				['Military', '#83ffe1'],
				['Music', '#69f0ae'],
				['Mystery', '#87f3be'],
				['Parody', '#b2ff59'],
			    ['Police', '#c1ff7a'],
		        ['Psychological', '#eeff41'],
		        ['Romance', '#f1ff67'],
		        ['Samurai', '#ffff00'],
		        ['School', '#ffff33'],
		        ['Sci-Fi', '#ffd740'],
		        ['Seinen', '#ffdf66'],
		        ['Shoujo', '#ffab40'],
		        ['Shoujo Ai', '#ffbb66'],
		        ['Shounen', '#ff6e40'],
		        ['Slice Of Life', '#ff8b66'],
		        ['Space', '#5635b2'],
		        ['Sports', '#3a4cb1'],
		        ['Super Power', '#2f60b2'],
		        ['Supernatural', '#2c89b2'],
		        ['Thriller', '#b22c5a'],
		        ['Vampire', '#9c2caf'],
			 ];	
	        for (var i = 0; i < genres.length; i++) {
	          if(genre === genres[i][0].toLowerCase().replace(/[ ]/g, '-')){
	            return genres[i][1];
	          }
	        }
	        return "#eee";			 
		}

		render() {        

		
			return(
	          	<React.Fragment>
	          	<Loading progress={this.state.loading}/>				
		        <Helmet>	
	              <meta property="og:type" content="article" />
	              <meta property="og:title" content={`Genre ${this.state.genre} Anime Subtitle Indonesia | Fansnime`}/>
	              <meta property="og:description" content={`Genre ${this.state.genre} anime subtitle indonesia. Download 720p 480p 360p 240p Format mkv mp4 + BATCH`}/>
	              <meta property="og:image" content="%PUBLIC_URL%/favicon.png" />
	              <meta property="og:url" content={`https://fansnime.com/genre/${this.state.genre}`} />
	              <meta property="og:site_name" content="Fansnime" />    

	              <meta name="twitter:title" content={`Genre ${this.state.genre} Anime Subtitle Indonesia | Fansnime`} />
	              <meta name="twitter:description" content={`Genre ${this.state.genre} anime subtitle indonesia. Download 720p 480p 360p 240p Format mkv mp4 + BATCH`} />
	              <meta name="twitter:image" content="%PUBLIC_URL%/favicon.png" />
	              <meta name="twitter:site" content="@fansnimeID" />
	              <meta name="twitter:creator" content="@fansnimeID" />

		          <title>Genre {this.state.genre} Anime Subtitle Indonesia | Fansnime</title>
		          <meta name="description" content={`Genre ${this.state.genre} anime subtitle indonesia. Download 720p 480p 360p 240p Format mkv mp4 + BATCH`} />
		        </Helmet>
				<Grid container style={{marginTop: '10px',backgroundColor:'white',borderRadius:'2px',padding:'10px'}}> 
					<Grid item xs={12} style={{padding:'10px',backgroundColor:'rgb(38, 50, 56)',border: `3px solid ${this.getWarna(this.state.genre)}`,boxShadow: `0 0 10px ${this.getWarna(this.state.genre)}`}}>
		                <div style={{marginTop:'2px',textAlign:'center',color:`${this.getWarna(this.state.genre)}`,fontWeight:'bold',fontSize:'24px'}}>
			             	{this.state.genre.toUpperCase().replace(/[^a-zA-Z ]/g, ' ')}
			            </div>
					</Grid>
					{this.state.film.length !== 0 ? this.state.film.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} link={row.kode}/>
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


export default Categories;