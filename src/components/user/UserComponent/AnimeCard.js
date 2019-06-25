import React from 'react';
import {Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Star from '@material-ui/icons/StarRate';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    boxShadow:'none',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  sizeTitle:{
    fontSize:'18px',
    fontWeight:'bold',
    padding:'0px',
    width:'100%',
  },
}));

function AnimeCard(props) {
  const classes = useStyles();


  var tanggal = new Date(props.tanggal);
  tanggal = tanggal.toDateString();
  tanggal = tanggal.split(' ');

  switch(tanggal[0]){
    case 'Mon':
      tanggal[0] = 'Senin';
      break;
    case 'Tue':
      tanggal[0] = 'Selasa';
      break;
    case 'Wed':
      tanggal[0] = 'Rabu';
      break;
    case 'Thu':
      tanggal[0] = 'Kamis';
      break;
    case 'Fri':
      tanggal[0] = 'Jumat';
      break;
    case 'Sat':
      tanggal[0] = 'Sabtu';
      break;
    case 'Sun':
      tanggal[0] = 'Minggu';
      break;
    default:
      break;
  }

  const fullTanggal = tanggal[0] + ', ' + tanggal[2] + ' ' + tanggal[1] + ' ' + tanggal[3]; 

  return (
    <Card className={classes.card}>
      <CardActionArea component={RouterLink} to={'/'+props.link}>
          <CardMedia
            style={{height: 0}}
            className={classes.media}
            image={props.gambar}
            title={props.judul}
          />
          <CardActions>
            <Typography className={classes.sizeTitle}>{props.judul}</Typography>
          </CardActions>
          <Grid container>
            <Grid item xs={12} style={{padding:'10px',fontSize:'14px',color:'#aaa'}}>
              Uploader &#8226; {fullTanggal} <Button disabled style={{padding: 0}}><Star style={{color: 'orange'}}/>{props.rating}</Button>
            </Grid>
          </Grid>
      </CardActionArea>
    </Card>
    );
}

export default AnimeCard;