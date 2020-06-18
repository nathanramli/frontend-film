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

class Cari extends Component {
		state = {
		  film: [],
		  keyword: '',
		  current: 0,
		  numpages: 0,
		  nextPageURL: '',
		  prevPageURL: '',
          loading: 1
		}

		componentDidMount() {
			const { location: { search } } = this.props;
	        if(search)
	        {
				let kata = search.substring(search.indexOf('=')+1).replace(/\+/g, ' ');

	        	this.setState({keyword: kata});
				const url = `${API_URL}/api/film_keyword/${kata.replace(/ /g, '__')}/`;
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
			if(this.props.location.search !== prevProps.location.search){
				const { location: { search } } = this.props;
		        if(search)
		        {
					let kata = search.substring(search.indexOf('=')+1).replace(/\+/g, ' ');

		        	this.setState({keyword: kata});
					const url = `${API_URL}/api/film_keyword/${kata.replace(/ /g, '__')}/`;
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

		render() {        

		
			return(
	          	<React.Fragment>
	          	<Loading progress={this.state.loading}/>				
		        <Helmet>
		          <title>Genre {this.state.keyword} Anime Subtitle Indonesia | Fansnime</title>
		          <meta name="description" content={`Pencarian ${this.state.keyword} anime subtitle indonesia. Download 720p 480p 360p 240p Format mkv mp4 + BATCH`} />
		        </Helmet>
				<Grid container style={{marginTop: '10px',backgroundColor:'white',padding:'10px'}}> 
					<Grid item xs={12} style={{padding:'10px', color: '#666'}}>
		             	Hasil pencarian "{this.state.keyword}" kami mencari melalui <b>JUDUL</b> dan <b>DESKRIPSI</b> terkait.
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


export default Cari;