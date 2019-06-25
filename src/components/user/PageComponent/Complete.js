import React, {Component} from 'react';
import axios from 'axios';
// Component
import Loading from './../UserComponent/Loading';
import RecipeReviewCard from './../UserComponent/AnimeCard';
// Material UI
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
// Additional
import {API_URL} from '../../../constants';


const styles = theme =>({
	NavigateNextIcon:{
		marginLeft: theme.spacing(1),
	}
})

class Complete extends Component {
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
				<Grid container style={{marginTop: '10px',backgroundColor:'white',borderRadius:'2px',padding:'10px'}}> 
					<Grid item xs={12} style={{backgroundColor:'#f57f17',padding:'10px',color:'#e53935'}}>
			            <div style={{marginTop:'2px',textAlign:'center',color:'white',fontWeight:'bold',fontSize:'24px'}}>
			             COMPLETED ANIME SERIES			            	
			            </div>
					</Grid>
					{this.state.complete.map(row => 
						<Grid item xs={12} sm={6} md={4} lg={3} key={row.pk} style={{padding: 10}}>
							<RecipeReviewCard judul={row.judul} gambar={row.gambar.indexOf('http') !== -1 ? row.gambar : API_URL + '/media/' + row.gambar} tanggal={row.tanggal_post} rating={row.rating} link={row.kode}/>
						</Grid>
					)}
				</Grid>
				</React.Fragment>
			);
		}
}


export default withStyles(styles)(Complete);