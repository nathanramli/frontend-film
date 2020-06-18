import React, { Component } from 'react';
import axios from 'axios';
import FilmsService from '../../../FilmsService';

import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoadingBar from 'react-top-loading-bar';
// Material UI
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
// Additional
import {API_URL} from '../../../constants';

const filmsService = new FilmsService();

class FilmCreate extends Component {

      state = {
          kode: '',
          judul: '',
          judul_alternatif: '',
          musim_rilis: '',
          jumlah_episode: 0,
          mulai_tayang: '',
          selesai_tayang: '',
          studio: '',
          rating: '',
          credit: '',
          deskripsi: '',
          genre: [],
          jenis: "c",
          loading: 0
      };

      static propTypes = {
        auth: PropTypes.object.isRequired
      };

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          filmsService.getFilm(params.pk).then((c)=>{
            this.setState({
                kode:c.kode,
                judul:c.judul,
                judul_alternatif:c.judul_alternatif,
                musim_rilis:c.musim_rilis,
                jumlah_episode:c.jumlah_episode,
                mulai_tayang:c.mulai_tayang,
                selesai_tayang:c.selesai_tayang,
                studio:c.studio,
                rating:c.rating,
                credit:c.credit,
                deskripsi:c.deskripsi,
                jenis:c.jenis,
                genre: c.genre[0].split(',')
            });
          })
        }
      }      

      handleUpdate(){
        const { match: { params } } = this.props;

        this.setState({loading: 1});
        let form_data = new FormData();
        form_data.append("kode", this.state.kode);
        form_data.append("judul", this.state.judul);
        form_data.append("judul_alternatif", this.state.judul_alternatif);
        form_data.append("musim_rilis", this.state.musim_rilis);
        form_data.append("jumlah_episode", this.state.jumlah_episode);
        form_data.append("mulai_tayang", this.state.mulai_tayang);
        form_data.append("selesai_tayang", this.state.selesai_tayang);
        form_data.append("studio", this.state.studio);
        form_data.append("rating", this.state.rating);
        form_data.append("credit", this.state.credit);
        form_data.append("deskripsi", this.state.deskripsi);
        form_data.append("jenis", this.state.jenis);
        form_data.append("genre", this.state.genre);
        form_data.append("admin", this.props.auth.user.username);

        let url = `${API_URL}/api/film/${params.pk}`;
        axios.put(url, form_data, {
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
          alert("Film berhasil diupdate!");
        }).catch(()=>{
          alert('Terdapat error pada form/sistem.');
          this.setState({loading: 0});

        });
      }
      handleSubmit(event) {
        event.preventDefault();
        if(this.state.loading !== 1){
          this.handleUpdate();          
        }else{
          alert('Sedang proses mengupload mohon menunggu!');
        }
      }
      handleChangesKode(event) {
        this.setState({kode: event.target.value});
      }
      handleChangesJudul(event) {
        this.setState({judul: event.target.value});
      }
      handleChangesJudulAlternatif(event) {
        this.setState({judul_alternatif: event.target.value});
      }
      handleChangesMusimRilis(event) {
        this.setState({musim_rilis: event.target.value});
      }
      handleChangesJumlahEpisode(event) {
        this.setState({jumlah_episode: event.target.value});
      }
      handleChangesMulaiTayang(event) {
        this.setState({mulai_tayang: event.target.value});
      }
      handleChangesSelesaiTayang(event) {
        this.setState({selesai_tayang: event.target.value});
      }
      handleChangesStudio(event) {
        this.setState({studio: event.target.value});
      }
      handleChangesRating(event) {
        this.setState({rating: event.target.value});
      }
      handleChangesCredit(event) {
        this.setState({credit: event.target.value});
      }
      handleChangesDeskripsi(event) {
        this.setState({deskripsi: event.target.value});
      }
      handleChangesJenis(event) {
        if(event.target.value !== 'c'){
          this.setState({jumlah_episode: 0});
        }
        this.setState({jenis: event.target.value});
      }      
      handleChangesGenre(event) {
        this.setState({genre: event.target.value});
      }

      render() {
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

        return (
            <Container>
            <LoadingBar progress={this.state.loading} height={3} color="lightblue" />
              <Box p={3}>
                <Card>
                  <CardContent>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField select label="Jenis Anime" onChange={this.handleChangesJenis.bind(this)} value={this.state.jenis} fullWidth required>
                          <MenuItem key="c" value="c">Complete</MenuItem>
                          <MenuItem key="o" value="o">On Going</MenuItem>
                          <MenuItem key="m" value="m">Movie</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Kode" margin="normal" onChange={this.handleChangesKode.bind(this)}  value={this.state.kode} fullWidth placeholder="Contoh: naruto-sub-indo (Samarkan sedikit kata-katanya)" helperText="Jangan gunakan spasi (Ini untuk urlnya nanti)(Samarkan kata-katanya. Contoh: nartos-sub-indo" required/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Judul" margin="normal" onChange={this.handleChangesJudul.bind(this)}  value={this.state.judul} helperText="Kalau judul panjang, isi dengan judul inti/singkat aja. judul lengkap tulis di judul alternatif" fullWidth required/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Judul Alternatif" margin="normal" onChange={this.handleChangesJudulAlternatif.bind(this)}  value={this.state.judul_alternatif} fullWidth helperText="Judul panjang atau judul lain dari anime ini (Kalau hanya satu judul samakan dengan judul)" required/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label={this.state.jenis === "m" ? "Pengarang" : "Musim Rilis"} margin="normal"  value={this.state.musim_rilis} onChange={this.handleChangesMusimRilis.bind(this)} placeholder={this.state.jenis === "m" ? "Contoh: Makoto Shinkai" : "Contoh: Spring 2019"} fullWidth required/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Jumlah Episode" margin="normal" onChange={this.handleChangesJumlahEpisode.bind(this)} value={this.state.jumlah_episode} type="number" inputProps={{step: 1, max: 1000, min: 0}} helperText="Kosongkan atau tulis 0 jika belum tamat" variant={this.state.jenis !== 'c' ? 'filled' : 'standard'} disabled={this.state.jenis !== 'c' ? true : false} fullWidth required/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Mulai Tayang" margin="normal" onChange={this.handleChangesMulaiTayang.bind(this)} value={this.state.mulai_tayang} placeholder="Contoh: 1 Januari 2019 / Januari 2019" fullWidth required/>
                      </Grid>
                     <Grid item xs={12}>
                        <TextField label={this.state.jenis === "o" ? "Judul Untuk Update" : "Selesai Tayang"} value={this.state.selesai_tayang} margin="normal" onChange={this.handleChangesSelesaiTayang.bind(this)} placeholder={this.state.jenis === "o" ? "Contoh: Naruto Shippuden (Episode 10) atau Naruto Shippuden (Episode 1-10)" : "Contoh: 1 Desember 2019 / Desember 2019"} helperText={this.state.jenis === "o" ? "Contoh: Naruto Shippuden (Episode 10) atau Naruto Shippuden (Episode 1-10)" : ""} required fullWidth/>
                      </Grid>
                     <Grid item xs={12}>
                        <TextField label="Studio" margin="normal" onChange={this.handleChangesStudio.bind(this)} value={this.state.studio} fullWidth/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Rating" margin="normal" onChange={this.handleChangesRating.bind(this)} value={this.state.rating} type="number" helperText="0.0 - 10.0 (lihat dari rating MyAnimeList)" inputProps={{step: 0.01, max: 10, min: 0}} placeholder="Contoh: 7.70" fullWidth required/>
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>Genre</InputLabel>
                        <Select multiple fullWidth value={this.state.genre} onChange={this.handleChangesGenre.bind(this)} renderValue={selected => (
                            <div>
                            {selected.map(value => (
                              <Chip key={value} label={value} />
                              ))}
                            </div>
                          )} required>
                          {genres.map(name => (
                            <MenuItem key={name[0]} value={name[0]} style={{color: `${name[1]}`}}>
                              {name[0]}
                            </MenuItem>
                            ))}
                        </Select>
                      </Grid>                      
                      <Grid item xs={12}>
                        <TextField label="Credit" margin="normal" variant="outlined" onChange={this.handleChangesCredit.bind(this)} value={this.state.credit} fullWidth multiline rows="2" placeholder="Contoh: awsubs, animedotid & decoder" required/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Deskripsi" margin="normal" variant="outlined" onChange={this.handleChangesDeskripsi.bind(this)} value={this.state.deskripsi} fullWidth multiline rows="4" required/>
                      </Grid>
                      <div style={{borderTop: '1px solid black', marginLeft: 60, marginRight: 60, width: '100%'}} />
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Tambah</Button>
                      </Grid>
                    </Grid>
                  </form>
                  </CardContent>
              </Card>
              </Box>
            </Container>
        );
      }  
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(FilmCreate);