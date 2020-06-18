import React, { Component } from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
// Component
import NotFound from './NotFound';
import LinkDownload from '../UserComponent/LinkDownload';
import Loading from '../UserComponent/Loading';
// Material UI
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Star from '@material-ui/icons/Star';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Additional
import {API_URL} from '../../../constants';

const styles = theme => ({
  glow: {
    boxShadow: '0 0 10px #29d,0 0 5px #29d',
  },
  adsContainer:{
    marginRight: 'auto',
    marginLeft: 'auto',
    height:'880px',
    position:'sticky',
//    position: '-webkit-sticky',
    backgroundColor:'white',
    borderRadius:'2px',
    top:'4rem',
    width: '30%',
    [theme.breakpoints.only('xs')]:{
      width:'100%',
      marginTop:'5px',
    },
    [theme.breakpoints.only('sm')]:{
      width:'100%',
      marginTop:'5px',
    },
  },
  containerDetail:{
      marginRight: 'auto',
      marginLeft: 'auto',
  },
  ads:{
    margin:'10px',
    padding:'10px',
    [theme.breakpoints.only('xs')]:{
      margin:'10px',
      padding:'5px',
    }  
  }
});


class AnimeDetail extends Component {
      state = {
          kode: '',
          judul: '',
          deskripsi:'',
          gambar:'',
          judul_alternatif: '',
          musim_rilis: '',
          jumlah_episode: 0,
          jenis: "",
          mulai_tayang: '',
          selesai_tayang: '',
          studio: '',
          rating: '',
          credit: '',
          admin: '',
          genre: [],
          chara: [],
          link: [],
          id_film: 0,
          loading: 1,
          redirect: false
      }


      componentDidMount(){    
   
        const { match: { params } } = this.props;
        if(params && params.kode)
        {
          const url = `${API_URL}/api/film_by_kode/${params.kode}`;
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
            let row = response.data;
            this.setState({kode:row.film.kode});
            this.setState({judul:row.film.judul});
            this.setState({deskripsi:row.film.deskripsi});
            this.setState({genre:row.film.genre[0].split(',').sort()});
            this.setState({gambar:row.film.gambar});
            this.setState({judul_alternatif:row.film.judul_alternatif});
            this.setState({musim_rilis:row.film.musim_rilis});
            this.setState({jumlah_episode:row.film.jumlah_episode});
            this.setState({mulai_tayang:row.film.mulai_tayang});
            this.setState({selesai_tayang:row.film.selesai_tayang});
            this.setState({studio:row.film.studio});
            this.setState({rating:row.film.rating});
            this.setState({credit:row.film.credit});
            this.setState({admin:row.film.admin});
            this.setState({jenis:row.film.jenis});
            this.setState({chara: row.chara});
            this.setState({link: row.link});
            this.setState({redirect: false});
          }).catch((err) => {
            this.setState({redirect: true});
          });

          var disqus_config = function () {
            this.page.url = "https://fansnime.com/";  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = params.kode; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
          };
          let zz = document.getElementsByTagName("iframe");
          console.log(zz);
          // formalitas supaya ga warning
          disqus_config.toString();

          (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://fansnime-1.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
          })();

          var loadScript = function (src, target) {
            console.log("load script");
            var tag = document.createElement('script');
            tag.type = 'text/javascript';
            tag.setAttribute("data-cfasync", false);
            tag.src = src;
            var body = document.getElementById(target);
            body.appendChild(tag);
          }
         // loadScript("//p370651.clksite.com/adServe/banners?tid=370651_726965_0", "ad1");
         // loadScript("//p370651.clksite.com/adServe/banners?tid=370651_726965_1", "ad2");
          var buatScript = function(target, isi){
            console.log("buat script");
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.setAttribute("data-cfasync", false);
            s.innerHTML = isi;
            document.getElementById(target).appendChild(s);            
          }
          loadScript("//st.bebi.com/bebi_v3.js", "ad1");
          buatScript("ad1", `if(!window.BB_a) { BB_a = [];} if(!window.BB_ind) { BB_ind = 0; } if(!window.BB_r) { BB_r = Math.floor(Math.random()*1000000000)} BB_ind++; BB_a.push({ "pl" : 2008720, "index": BB_ind});`);
          buatScript("ad1", `if(!window.BB_a) { BB_a = [];} if(!window.BB_ind) { BB_ind = 0; } if(!window.BB_r) { BB_r = Math.floor(Math.random()*1000000000)} BB_ind++; BB_a.push({ "pl" : 2008719, "index": BB_ind});`);
        }
        // window.scrollTo({ top:1, behavior: 'smooth', });//Tidak support pada beberapa browser lama
        window.scrollTo(0, 0);
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
          if(genre === genres[i][0]){
            return genres[i][1];
          }
        }
        return "#eee";
      }
      render() {      
        if(this.state.redirect){
          return (
            <NotFound />
          );
        }else{
          return (
            <React.Fragment>
            <Loading progress={this.state.loading}/>
            <Helmet>
              <meta property="og:type" content="article" />
              <meta property="og:title" content={`${this.state.judul !== "" ? this.state.jenis !== "o" ? this.state.judul : this.state.selesai_tayang + ' Subtitle Indonesia' : 'Anime Sub Indo'} | Fansnime`}/>
              <meta property="og:description" content={`Download ${this.state.judul} Sub Indo format Mkv 480p, Mkv 720p, Mp4 720p, Mp4 480p, Mp4 360p, Mp4 240p dan BATCH`}/>
              <meta property="og:image" content="%PUBLIC_URL%/favicon.png" />
              <meta property="og:url" content={`https://fansnime.com/${this.state.kode}`} />
              <meta property="og:site_name" content="Fansnime" />    

              <meta name="twitter:title" content={`${this.state.judul !== "" ? this.state.jenis !== "o" ? this.state.judul : this.state.selesai_tayang + ' Subtitle Indonesia' : 'Anime Sub Indo'} | Fansnime`} />
              <meta name="twitter:description" content={`Download ${this.state.judul} Sub Indo format Mkv 480p, Mkv 720p, Mp4 720p, Mp4 480p, Mp4 360p, Mp4 240p dan BATCH`} />
              <meta name="twitter:image" content="%PUBLIC_URL%/favicon.png" />
              <meta name="twitter:site" content="@fansnimeID" />
              <meta name="twitter:creator" content="@fansnimeID" />

              <title>{this.state.judul !== "" ? this.state.jenis !== "o" ? this.state.judul : this.state.selesai_tayang + ' Subtitle Indonesia' : 'Anime Sub Indo'} | Fansnime</title>
              <meta name="description" content={`Download ${this.state.judul} Sub Indo format Mkv 480p, Mkv 720p, Mp4 720p, Mp4 480p, Mp4 360p, Mp4 240p dan BATCH`} />
            </Helmet>
            <Grid container>
              <Grid item xs={12} md={8} style={{backgroundColor:'#fff',borderRadius:'3px'}} className={this.props.classes.containerDetail}>
                <div title={this.state.judul + ' Subtitle Indonesia'} style={{backgroundImage: `url(${this.state.gambar})`, paddingBottom: '50%', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', boxShadow: '0 0 10px 2px silver', borderRadius: '5px'}}>
                  <div style={{padding: 10}}>
                  {this.state.genre.map(row =>
                    <Chip size='small' key={row} label={row} style={{margin: 2, color: 'black', border: `3px solid ${this.getWarna(row)}`, backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: `0 0 10px ${this.getWarna(row)}`}} />
                  )}
                  </div>
                </div>
                <Container maxWidth="lg" style={{padding: '10px'}}>
                  <h2>{this.state.jenis !== "o" ? this.state.judul : this.state.selesai_tayang} Subtitle Indonesia</h2>
                 <Card style={{marginTop:'10px'}}>
                    <CardContent>
                      <Typography style={{fontSize:'20px'}} gutterBottom>
                        Sinopsis {this.state.judul}
                      </Typography>
                        <hr />
                      <Typography color="textSecondary" style={{whiteSpace: 'pre-wrap'}}>
                          {this.state.deskripsi}
                      </Typography>
                    </CardContent>
                  </Card>

                  {this.state.chara.length !== 0 &&
                  <Card style={{marginTop:'10px', boxShadow: 'none'}}>
                    <CardContent>
                    <Typography variant="h6">Characters</Typography>
                    <div style={{overflowX: 'auto', width: '100%'}}>
                    {this.state.chara.map(row =>
                      <div style={{padding: '14px 10px 14px 16px', display: 'table-cell'}} key={row.pk}>
                        <Card style={{width: 200}}>
                          <CardMedia
                            style={{height: 0, paddingTop: "120%"}}
                            image={row.foto}
                            title={row.nama}>
                            <div style={{backgroundColor: 'rgba( 0, 0, 0, 0.5)', color: 'white', fontFamily: 'Verdana', width: '100%', marginTop: '-15%', padding: 5}}>{row.nama}</div>
                          </CardMedia>
                        </Card>
                      </div>
                      )}
                    </div>                        
                    </CardContent>
                  </Card>
                  }

                  <Card style={{marginTop: 10}}>
                    <CardContent>
                      <Table>
                        <TableHead>
                          <TableRow> 
                            <TableCell colSpan={2}><Typography variant="h5">Informasi Detail {this.state.judul}</Typography></TableCell> 
                          </TableRow> 
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Judul Alternatif</TableCell>
                            <TableCell>{this.state.judul_alternatif}</TableCell>
                          </TableRow>
                          {this.state.jenis !== "m" ?
                            <TableRow>
                              <TableCell>Musim Rilis</TableCell>
                              <TableCell>{this.state.musim_rilis}</TableCell>
                            </TableRow>
                            :
                            <TableRow>
                              <TableCell>Pengarang</TableCell>
                              <TableCell>{this.state.musim_rilis}</TableCell>
                            </TableRow>                            
                          }
                          {this.state.jenis === "c" &&
                            <TableRow>
                              <TableCell>Jumlah Episode</TableCell>
                              <TableCell>{this.state.jumlah_episode}</TableCell>
                            </TableRow>
                          }
                          <TableRow>
                            <TableCell>Tanggal Tayang</TableCell>
                            <TableCell>{this.state.jenis === "c" ? `${this.state.mulai_tayang} - ${this.state.selesai_tayang}` : this.state.mulai_tayang}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Studio yang memproduksi</TableCell>
                            <TableCell>{this.state.studio}</TableCell>
                          </TableRow>                            
                          <TableRow>
                            <TableCell>Rating</TableCell>
                            <TableCell>{this.state.rating} <Star style={{color: 'orange', fontSize: '20px', marginBottom: -4}}/></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Credit</TableCell>
                            <TableCell>{this.state.credit}</TableCell>
                          </TableRow>                            
                          <TableRow>
                            <TableCell style={{border: 'none'}}>Diposting Oleh</TableCell>
                            {this.state.admin === "GotThisR" || this.state.admin === "mandu" ?
                              <TableCell style={{border: 'none'}}>
                                <Tooltip title="Developer">
                                  <Chip style={{color: 'orange', border: '1px solid orange'}} label={this.state.admin} variant="outlined" avatar={<Avatar style={{backgroundColor: 'orange', color: 'white', width:'32px', height: '32px', fontSize: '1rem'}}>{this.state.admin.substr(0, 1).toUpperCase()}</Avatar>}/>
                                </Tooltip>
                              </TableCell>
                            :
                              <TableCell style={{border: 'none'}}>
                                <Tooltip title="Administrator">
                                  <Chip style={{color: '#f50057', border: '1px solid #f50057'}} label={this.state.admin} variant="outlined" avatar={<Avatar style={{backgroundColor: '#c51162', color: 'white', width:'32px', height: '32px', fontSize: '1rem'}}>{this.state.admin.substr(0, 1).toUpperCase()}</Avatar>}/>
                                </Tooltip>
                              </TableCell>
                            }
                          </TableRow>                            
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card style={{marginTop:'10px'}}>
                      <CardContent style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
                        <h3 style={{ color: 'grey' }}>Link Download {this.state.jenis !== "o" ? this.state.judul : this.state.selesai_tayang} Subtitle Indonesia</h3>
                    </CardContent>
                      {this.state.link.map(row => 
                        <LinkDownload key={row.pk} nama_film={this.state.judul} judul={row.judul_link} url1080={row.url1080p[0].split(',')} url720={row.url720p[0].split(',')} url540={row.url540p[0].split(',')} url480={row.url480p[0].split(',')}  url360={row.url360p[0].split(',')} url240={row.url240p[0].split(',')}/>
                      )}
                  </Card>
                </Container>
                <Container maxWidth="lg" style={{marginBottom:'10px'}}>
                  <div id="disqus_thread"></div>                            
                </Container>
              </Grid>
              <div className={this.props.classes.adsContainer} id="mainAds">
                <div  className={this.props.classes.ads} id="ad1">
                </div>
              </div>
            </Grid>
            </React.Fragment>
          );
        }
      }  
}
export default withStyles(styles)(AnimeDetail);