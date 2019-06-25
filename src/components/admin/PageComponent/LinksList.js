import React, { Component } from  'react';
import axios from  'axios';
import LinksService  from  '../../../LinksService';
import FilmsService  from  '../../../FilmsService';

import {API_URL} from '../../../constants';

import LoadingBar from 'react-top-loading-bar';
// Material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const  linksService  =  new  LinksService();
const  filmsService  =  new  FilmsService();

class  LinksList  extends  Component {
  state = {
      kode: '',
      judul: '',
      jumlah_episode: '',
      rating: '',
      credit: '',    
      deskripsi: '',    
      gambar: '',
      links: [],
      open: false,
      episode: '',
      url1080p: [],
      url720p: [],
      url540p: [],
      url480p: [],
      url360p: [],
      url240p: [],
      type: '1080',
      loading: 0
  }

  componentDidMount() {
      const { match: { params } } = this.props;
      if(params && params.pk)
      {
        filmsService.getFilm(params.pk).then((c)=>{
          this.setState({
              kode:c.kode,
              judul:c.judul,
              jumlah_episode:c.jumlah_episode,
              rating:c.rating,
              credit:c.credit,
              deskripsi:c.deskripsi,
              gambar:c.gambar
          });
        });

        linksService.getLinks(params.pk).then((c)=>{
            this.setState({
              links: c.data
            });
        });
      }    
  }
  handleChangeEpisode(event){
    this.setState({episode: event.target.value});
  }
  handleInput1080JudulChange(event, index){
    let value = "";
    let isilink = [...this.state.url1080p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = event.target.value + '|||' + isi[1];
    }else{
      value = event.target.value + '|||';
    }
    isilink[index] = value;
    this.setState({url1080p: isilink});
  }
  handleInput1080LinkChange(event, index){
    let value = "";
    let isilink = [...this.state.url1080p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = isi[0] + '|||' + event.target.value;
    }else{
      value = '|||' + event.target.value;
    }
    isilink[index] = value;
    this.setState({url1080p: isilink});
  }  
  handleInput720JudulChange(event, index){
    let value = "";
    let isilink = [...this.state.url720p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = event.target.value + '|||' + isi[1];
    }else{
      value = event.target.value + '|||';
    }
    isilink[index] = value;
    this.setState({url720p: isilink});
  }
  handleInput720LinkChange(event, index){
    let value = "";
    let isilink = [...this.state.url720p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = isi[0] + '|||' + event.target.value;
    }else{
      value = '|||' + event.target.value;
    }
    isilink[index] = value;
    this.setState({url720p: isilink});
  }  
    handleInput540JudulChange(event, index){
    let value = "";
    let isilink = [...this.state.url540p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = event.target.value + '|||' + isi[1];
    }else{
      value = event.target.value + '|||';
    }
    isilink[index] = value;
    this.setState({url540p: isilink});
  }
  handleInput540LinkChange(event, index){
    let value = "";
    let isilink = [...this.state.url540p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = isi[0] + '|||' + event.target.value;
    }else{
      value = '|||' + event.target.value;
    }
    isilink[index] = value;
    this.setState({url540p: isilink});
  }  
    handleInput480JudulChange(event, index){
    let value = "";
    let isilink = [...this.state.url480p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = event.target.value + '|||' + isi[1];
    }else{
      value = event.target.value + '|||';
    }
    isilink[index] = value;
    this.setState({url480p: isilink});
  }
  handleInput480LinkChange(event, index){
    let value = "";
    let isilink = [...this.state.url480p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = isi[0] + '|||' + event.target.value;
    }else{
      value = '|||' + event.target.value;
    }
    isilink[index] = value;
    this.setState({url480p: isilink});
  }  
    handleInput360JudulChange(event, index){
    let value = "";
    let isilink = [...this.state.url360p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = event.target.value + '|||' + isi[1];
    }else{
      value = event.target.value + '|||';
    }
    isilink[index] = value;
    this.setState({url360p: isilink});
  }
  handleInput360LinkChange(event, index){
    let value = "";
    let isilink = [...this.state.url360p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = isi[0] + '|||' + event.target.value;
    }else{
      value = '|||' + event.target.value;
    }
    isilink[index] = value;
    this.setState({url360p: isilink});
  }    
  handleInput240JudulChange(event, index){
    let value = "";
    let isilink = [...this.state.url240p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = event.target.value + '|||' + isi[1];
    }else{
      value = event.target.value + '|||';
    }
    isilink[index] = value;
    this.setState({url240p: isilink});
  }
  handleInput240LinkChange(event, index){
    let value = "";
    let isilink = [...this.state.url240p];

    if(isilink[index] !== ""){
      let isi = isilink[index].split('|||');
      value = isi[0] + '|||' + event.target.value;
    }else{
      value = '|||' + event.target.value;
    }
    isilink[index] = value;
    this.setState({url240p: isilink});
  }  
  toggleClose(){
      this.setState({
        open: false
      });
  }
  toggleOpen(){
      this.setState({
        open: true
      });
  }
  pecahVariabel(variabel){
    return variabel.split("|||");
  }
  addInput(){
    switch(this.state.type){
      case '1080':
        this.setState({url1080p: [...this.state.url1080p, ""]});
        break;    
      case '720':
        this.setState({url720p: [...this.state.url720p, ""]});
        break;    
      case '540':
        this.setState({url540p: [...this.state.url540p, ""]});
        break;    
      case '480':
        this.setState({url480p: [...this.state.url480p, ""]});
        break;    
      case '360':
        this.setState({url360p: [...this.state.url360p, ""]});
        break;    
      case '240':
        this.setState({url240p: [...this.state.url240p, ""]});
        break;    
      default:
        this.setState({url1080p: [...this.state.url1080p, ""]});
        break;
    }
  }

  handleCreate(){
    this.setState({loading: 1});
    const { match: { params } } = this.props;

    let form_data = new FormData();
    form_data.append("id_film", params.pk);
    form_data.append("judul_link", this.state.episode);
    form_data.append("url1080p", this.state.url1080p);
    form_data.append("url720p", this.state.url720p);
    form_data.append("url540p", this.state.url540p);
    form_data.append("url480p", this.state.url480p);
    form_data.append("url360p", this.state.url360p);
    form_data.append("url240p", this.state.url240p);

    let url = `${API_URL}/api/link/`;
    axios.post(url, form_data, {
        onUploadProgress: (progressEvent) => {
          if(progressEvent.lengthComputable){
            let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            this.setState({loading: this.state.loading+percent});     
          }else{
            this.setState({loading: 100});
          }
        }
    }).then((result)=>{
      alert("Link berhasil dibuat!");
      this.setState(prevState => ({
        links: [...prevState.links, result.data]
      }));
      this.setState({
        episode: [],
        url1080p: [],
        url720p: [],
        url540p: [],
        url480p: [],
        url360p: [],
        url240p: []
      });
      document.getElementsByTagName('form')[0].reset();
    }).catch(()=>{
      alert('Terdapat error pada form/sistem.');
      this.setState({loading: 0});
    });
  }

  aksiSubmit(event){
    event.preventDefault();

    if(this.state.loading !== 1){
      this.handleCreate();          
    }else{
      alert('Sedang proses mengupload mohon menunggu!');
    }
  }

  aksiHapus(index, pixel){
    switch(pixel){
      case '1080':
        this.state.url1080p.splice(index, 1);
        this.setState({url1080p: this.state.url1080p});
        break;    
      case '720':
        this.state.url720p.splice(index, 1);
        this.setState({url720p: this.state.url720p});
        break;    
      case '540':
        this.state.url540p.splice(index, 1);
        this.setState({url540p: this.state.url540p});
        break;    
      case '480':
        this.state.url480p.splice(index, 1);
        this.setState({url480p: this.state.url480p});
        break;    
      case '360':
        this.state.url360p.splice(index, 1);
        this.setState({url360p: this.state.url360p});
        break;    
      case '240':
        this.state.url240p.splice(index, 1);
        this.setState({url240p: this.state.url240p});
        break;    
      default:
        break;      
      }
  }

  gantiType(e){
    this.setState({type: e.target.value});
  }

  hapusEpisode(e, pk){
    linksService.deleteLink(pk).then(()=>{
        var  newArr  =  this.state.links.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        this.setState({links:  newArr})
    });    
  }
  render() {

    return (
        <Container>
          <LoadingBar progress={this.state.loading} height={3} color="lightblue" />
          <Box p={3}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} style={{textAlign: "center"}}>
                    <img src={this.state.gambar} width="80%" alt={this.state.judul}/>
                  </Grid>
                  <Grid item xs={12} style={{marginTop: 50}}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{fontWeight: "bold"}}>Kode</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>{this.state.kode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{fontWeight: "bold"}}>Judul</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>{this.state.judul}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{fontWeight: "bold"}}>Jumlah Episode</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>{this.state.jumlah_episode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{fontWeight: "bold"}}>Rating</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>{this.state.rating}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{fontWeight: "bold"}}>Credit</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>{this.state.credit}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{fontWeight: "bold"}}>Deskripsi</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>{this.state.deskripsi}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{marginTop: 20}}>
              <CardContent>
                <Typography variant="h5">Link Download</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Episode</TableCell>
                      <TableCell>1080p</TableCell>
                      <TableCell>720p</TableCell>
                      <TableCell>540p</TableCell>
                      <TableCell>480p</TableCell>
                      <TableCell>360p</TableCell>
                      <TableCell>240p</TableCell>
                      <TableCell><Button size="small" variant="contained" color="primary" onClick={this.toggleOpen.bind(this)}>Add Eps.</Button></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.links.map(row =>
                      <TableRow key={row.pk}>
                        <TableCell>{row.pk}</TableCell>
                        <TableCell>{row.judul_link}</TableCell>
                        <TableCell>{row.url1080p[0] !== "" ? 'Ada' : 'Tidak ada'}</TableCell>
                        <TableCell>{row.url720p[0] !== "" ? 'Ada' : 'Tidak ada'}</TableCell>
                        <TableCell>{row.url540p[0] !== "" ? 'Ada' : 'Tidak ada'}</TableCell>
                        <TableCell>{row.url480p[0] !== "" ? 'Ada' : 'Tidak ada'}</TableCell>
                        <TableCell>{row.url360p[0] !== "" ? 'Ada' : 'Tidak ada'}</TableCell>
                        <TableCell>{row.url240p[0] !== "" ? 'Ada' : 'Tidak ada'}</TableCell>
                        <TableCell><Button size="small" color="secondary" variant="contained" onClick={(e) => this.hapusEpisode(e, row.pk)}><DeleteIcon/></Button></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Box>
          <Dialog open={this.state.open} onClose={this.toggleClose.bind(this)} fullWidth maxWidth="lg" aria-labelledby="title">
            <form onSubmit={this.aksiSubmit.bind(this)}>
            <DialogTitle id="title">Tambah Link Download</DialogTitle>
            <DialogContent dividers>
                <TextField onChange={this.handleChangeEpisode.bind(this)} label="Judul Episode" helperText="Gunakan tagar(#) untuk mengurutkan misal: #01#Episode 1." margin="normal" fullWidth required/>
                <div style={{padding: 30}}>
                  Daftar Link Download
                  <Fab size="small" color="primary" style={{float: 'right'}} onClick={(e) => this.addInput(e)}>+</Fab>
                  <FormControl style={{float: 'right'}}>
                    <Select value={this.state.type} onChange={this.gantiType.bind(this)} displayEmpty>
                      <MenuItem value="1080">1080p</MenuItem>
                      <MenuItem value="720">720p</MenuItem>
                      <MenuItem value="540">540p</MenuItem>
                      <MenuItem value="480">480p</MenuItem>
                      <MenuItem value="360">360p</MenuItem>
                      <MenuItem value="240">240p</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{marginBottom: 10, borderBottom: '1px solid black', borderTop: '1px solid black'}}>1080P
                {this.state.url1080p.map((link, index) => {
                  const isi = link.split('|||');
                    return (
                        <div key={index} style={{width: '100%', marginTop: 10}}>
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput1080JudulChange(e, index)} placeholder="Judul link. contoh: Google Drive" value={isi[0]} required/>&nbsp;-&nbsp;
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput1080LinkChange(e, index)} placeholder="Link. contoh: http://google.com/" value={isi[1]} required/>
                          <Button size="small" color="secondary" variant="contained" onClick={() => this.aksiHapus(index, '1080')}>Hapus</Button>
                        </div>
                    )
                  }
                )}
                </div>
                <div style={{marginBottom: 10, borderBottom: '1px solid black', borderTop: '1px solid black'}}>
                720P
                {this.state.url720p.map((link, index) => {
                  const isi = link.split('|||');
                    return (
                        <div key={index} style={{width: '100%', marginTop: 10}}>
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput720JudulChange(e, index)} placeholder="Judul link. contoh: Google Drive" value={isi[0]} required/>&nbsp;-&nbsp;
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput720LinkChange(e, index)} placeholder="Link. contoh: http://google.com/" value={isi[1]} required/>
                          <Button size="small" color="secondary" variant="contained" onClick={() => this.aksiHapus(index, '720')}>Hapus</Button>
                        </div>
                    )
                  }
                )}
                </div>
                <div style={{marginBottom: 10, borderBottom: '1px solid black', borderTop: '1px solid black'}}>
                540P
                {this.state.url540p.map((link, index) => {
                  const isi = link.split('|||');
                    return (
                        <div key={index} style={{width: '100%', marginTop: 10}}>
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput540JudulChange(e, index)} placeholder="Judul link. contoh: Google Drive" value={isi[0]} required/>&nbsp;-&nbsp;
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput540LinkChange(e, index)} placeholder="Link. contoh: http://google.com/" value={isi[1]} required/>
                          <Button size="small" color="secondary" variant="contained" onClick={() => this.aksiHapus(index, '540')}>Hapus</Button>
                        </div>
                    )
                  }
                )}                
                </div>
                <div style={{marginBottom: 10, borderBottom: '1px solid black', borderTop: '1px solid black'}}>
                480P
                {this.state.url480p.map((link, index) => {
                  const isi = link.split('|||');
                    return (
                        <div key={index} style={{width: '100%', marginTop: 10}}>
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput480JudulChange(e, index)} placeholder="Judul link. contoh: Google Drive" value={isi[0]} required/>&nbsp;-&nbsp;
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput480LinkChange(e, index)} placeholder="Link. contoh: http://google.com/" value={isi[1]} required/>
                          <Button size="small" color="secondary" variant="contained" onClick={() => this.aksiHapus(index, '480')}>Hapus</Button>
                        </div>
                    )
                  }
                )}
                </div>
                <div style={{marginBottom: 10, borderBottom: '1px solid black', borderTop: '1px solid black'}}>
                360P
                {this.state.url360p.map((link, index) => {
                  const isi = link.split('|||');
                    return (
                        <div key={index} style={{width: '100%', marginTop: 10}}>
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput360JudulChange(e, index)} placeholder="Judul link. contoh: Google Drive" value={isi[0]} required/>&nbsp;-&nbsp;
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput360LinkChange(e, index)} placeholder="Link. contoh: http://google.com/" value={isi[1]} required/>
                          <Button size="small" color="secondary" variant="contained" onClick={() => this.aksiHapus(index, '360')}>Hapus</Button>
                        </div>
                    )
                  }
                )}
                </div>
                <div style={{marginBottom: 10, borderBottom: '1px solid black', borderTop: '1px solid black'}}>
                240P
                {this.state.url240p.map((link, index) => {
                  const isi = link.split('|||');
                    return (
                        <div key={index} style={{width: '100%', marginTop: 10}}>
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput240JudulChange(e, index)} placeholder="Judul link. contoh: Google Drive" value={isi[0]} required/>&nbsp;-&nbsp;
                          <TextField style={{width: '40%'}} onChange={(e) => this.handleInput240LinkChange(e, index)} placeholder="Link. contoh: http://google.com/" value={isi[1]} required/>
                          <Button size="small" color="secondary" variant="contained" onClick={() => this.aksiHapus(index, '240')}>Hapus</Button>
                        </div>
                    )
                  }
                )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" color="primary">Tambah</Button>
            </DialogActions>
            </form>
          </Dialog>
        </Container>
    );
  }
}
export default LinksList;