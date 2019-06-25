import React, { Component } from 'react';
import FilmsService from '../../../FilmsService';

// Material UI
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const filmsService = new FilmsService();

class FilmDetail extends Component {
      state = {
        kode: '',
        judul: '',
        judul_alternatif: '',        
        musim_rilis: '',
        jumlah_episode: '',
        mulai_tayang: '',
        selesai_tayang: '',
        studio: '',
        rating: '',
        credit: '',
        deskripsi: '',
        gambar: null,
        jenis: '',
        genre: []
      }

      // componentWillUpdate dipanggil saat akan ada state yang berubah atau diupdate
      // componentWillUpdate dipanggil saat ada state yang telah berubah atau diupdate

      // componentWillMount = Fungsi ini dipanggil sebelum component selesai diload / akan diload
      componentDidMount(){ // Fungsi ini dipanggil ketika component selesai dibuat/OnDocumentSuccessLoad
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
                gambar:c.gambar,
                jenis:c.jenis,
                genre: c.genre
            });
          })
        }
      }

      render() {

        return (
          <Container>
            <Box p={3}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <img src={this.state.gambar} width="500px" alt={this.state.judul}/>
                    </Grid>
                    <Grid item xs={6}>
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
                            <TableCell style={{fontWeight: "bold"}}>Judul Alternatif</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{this.state.judul_alternatif}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Genre</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{this.state.genre}</TableCell>
                          </TableRow>                           
                          <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Musim Rilis</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{this.state.musim_rilis}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Jumlah Episode</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{this.state.jumlah_episode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Mulai Tayang</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{this.state.mulai_tayang}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Selesai Tayang</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{this.state.selesai_tayang}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{fontWeight: "bold"}}>Studio</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{this.state.studio}</TableCell>
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
            </Box>
          </Container>
        );
      }  
}

export default FilmDetail;