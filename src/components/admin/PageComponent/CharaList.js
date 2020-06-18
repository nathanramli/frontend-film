import React, { Component } from  'react';
import axios from 'axios';
// Component
import LoadingBar from 'react-top-loading-bar';
import CharacterService  from  '../../../CharacterService';
import FilmsService  from  '../../../FilmsService';
// Material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// Additional
import {API_URL} from '../../../constants';

const  charaService  =  new  CharacterService();
const  filmsService  =  new  FilmsService();

class  CharaList  extends  Component {
  state = {
      judul: '',
      photo: '',
      chara: [],
      nama: '',
      open: false,
      file: "/placeholder.png", 
      gambar: null,
      // pk: '',
      loading: 0
  }

  componentDidMount() {
      const { match: { params } } = this.props;
      if(params && params.pk)
      {
        filmsService.getFilm(params.pk).then((c)=>{
          this.setState({
              judul:c.judul,
              photo:c.gambar
          });
        });

        charaService.getChara(params.pk).then((c)=>{
            this.setState({
              chara: c.data
            });
        });
      }    
  }

  // handleUpdate(pk){
  //   this.setState({loading: 1});
  //   const { match: { params } } = this.props;

  //   let form_data = new FormData();
  //   form_data.append("id_film", params.pk); 
  //   form_data.append("nama", this.state.nama); 
  //   form_data.append("foto", this.state.gambar, this.state.gambar.name);

  //   let url = `${API_URL}/api/chara_detail/${pk}`;
  //   axios.put(url, form_data, {
  //         headers: {
  //           'content-type': 'multipart/form-data'
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           if(progressEvent.lengthComputable){
  //             let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //             this.setState({loading: this.state.loading+percent});     
  //           }else{
  //             this.setState({loading: 100});
  //           }
  //         }
  //   }).then((result)=>{
  //     alert("Character berhasil diedit!");
  //     var  newArr  =  this.state.chara.filter(function(obj) {
  //         return  obj.pk  !==  pk;
  //     });

  //     this.setState({chara:  newArr});

  //     let charaBaru = {
  //       id_film: result.data.id_film,
  //       nama: result.data.nama,
  //       foto: API_URL + result.data.foto,
  //       pk: result.data.pk
  //     }
  //     this.setState(prevState => ({
  //       chara: [...prevState.chara, charaBaru]
  //     }))

  //     this.setState({
  //       nama: '',
  //       gambar: null,
  //       file: "/placeholder.png"
  //     });
  //     document.getElementsByTagName('form')[0].reset();
  //   }).catch(()=>{
  //     alert('Terdapat error pada form/sistem.');
  //     this.setState({loading: 0});
  //   });    
  // }

  handleCreate(){
    this.setState({loading: 1});
    const { match: { params } } = this.props;

    let form_data = new FormData();
    form_data.append("id_film", params.pk); 
    form_data.append("nama", this.state.nama); 
    form_data.append("foto", this.state.gambar, this.state.gambar.name);

    let url = `${API_URL}/api/chara/`;
    axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            if(progressEvent.lengthComputable){
              let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.setState({loading: this.state.loading+percent});     
            }else{
              this.setState({loading: 100});
            }
          }
    }).then((result)=>{
      alert("Character berhasil dibuat!");
      let charaBaru = {
        id_film: result.data.id_film,
        nama: result.data.nama,
        foto: API_URL + result.data.foto,
        pk: result.data.pk
      }
      this.setState(prevState => ({
        chara: [...prevState.chara, charaBaru]
      }))

      this.setState({
        nama: '',
        gambar: null,
        file: "/placeholder.png"
      });
      document.getElementsByTagName('form')[0].reset();
    }).catch(()=>{
      alert('Terdapat error pada form/sistem.');
      this.setState({loading: 0});
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.loading !== 1){
      this.handleCreate();          
    }else{
      alert('Sedang proses mengupload mohon menunggu!');
    }
  }
  toggleClose(){
      this.setState({
        open: false,
        gambar: null,
        file: "/placeholder.png",
        nama: '',
      });
  }
  toggleOpen(){
      this.setState({
        open: true
      });
  }
  // openUpdate(pk){
  //     let data = this.state.chara.filter(function(obj) {
  //         return obj.pk === pk;
  //     });

  //     this.setState({
  //       // nama: data.nama,
  //       pk: data.pk,
  //       file: data.foto,
  //       gambar: data.foto,
  //       open: true
  //     });
  // }
  handleChangeNama(event){
    this.setState({nama: event.target.value});
  }

  handleChangesGambar(event) {
    // if(this.state.file !== "/placeholder.png")
    URL.revokeObjectURL(event.target.files[0]);
    this.setState({gambar: event.target.files[0], file: URL.createObjectURL(event.target.files[0])});
  }
  handleDelete(e,pk){
      charaService.deleteChara(pk).then(()=>{
          var  newArr  =  this.state.chara.filter(function(obj) {
              return  obj.pk  !==  pk;
          });

          this.setState({chara:  newArr});
      });
  }

  render() {

    return (
      <div>
          <LoadingBar progress={this.state.loading} height={3} color="lightblue" />
          <Container>
            <Box p={3}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                      <img src={this.state.photo} width="80%" alt={this.state.judul}/>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: 50}}>
                      <div>{this.state.judul}<Button style={{float: 'right'}} color="primary" variant="contained" onClick={this.toggleOpen.bind(this)}>Tambah Character</Button></div>
                      <div style={{overflowX: 'auto', width: '100%'}}>
                        {this.state.chara.map(row =>
                          <div style={{padding: '14px 40px 14px 16px', display: 'table-cell'}} key={row.nama}>
                            <Card style={{width: 300}}>
                              <CardMedia
                                style={{height: 0, paddingTop: "100%"}}
                                image={row.foto}
                                title={row.nama}
                              />
                              <CardContent>
                                {/*<Fab onClick={() => this.openUpdate(row.pk)} color="primary" size="small" style={{float: 'right'}}><EditIcon style={{fontSize: 20}}/></Fab>*/}
                                <Fab onClick={(e) =>  {if(window.confirm('Anda yakin ingin menghapus character ini?')) this.handleDelete(e,row.pk)} } color="secondary" size="small" style={{float: 'right'}}><DeleteIcon style={{fontSize: 20}}/></Fab>
                                <Typography gutterBottom variant="h6">
                                  {row.nama}
                                </Typography>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Container>
          <Dialog open={this.state.open} onClose={this.toggleClose.bind(this)} fullWidth maxWidth="lg" aria-labelledby="title">
            <form onSubmit={this.handleSubmit.bind(this)}>
            <DialogTitle id="title">{this.state.pk !== "" ? 'Edit' : 'Tambah'} Character</DialogTitle>
            <DialogContent dividers>
                <div style={{textAlign: 'center'}}>
                  <img src={this.state.file} height="300px" alt=""/>
                </div>
                <input id="upload" accept="image/*" onChange={this.handleChangesGambar.bind(this)} type="file" required/>
                <TextField onChange={this.handleChangeNama.bind(this)} label="Nama" margin="normal" value={this.state.nama} fullWidth required/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" color="primary">Tambah</Button>
                <Button type="button" variant="contained" color="secondary" onClick={this.toggleClose.bind(this)}>Tutup</Button>
            </DialogActions>
            </form>
          </Dialog>
        </div>
    );
  }
}
export default CharaList;