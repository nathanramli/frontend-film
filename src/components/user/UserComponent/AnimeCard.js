import React from 'react';
import {Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Star from '@material-ui/icons/StarRate';
import Pencil from '@material-ui/icons/Edit';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    boxShadow:'none',
    '&:hover $rating':{
      boxShadow: 'none'
    },
    '&:hover $creator':{
      boxShadow: 'none'
    },
    '&:hover $star':{
      color: 'yellow'
    }    
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
  creator:{
    marginTop: '-45%',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '30%',
    borderRadius: '0 4px 4px 0',
    fontSize: '13px',
    padding: '1%',
    boxShadow: '0 0 4px black',
    textAlign: 'center',
    transition: 'box-shadow 0.3s',
  },
  rating:{
    marginTop: '-45%',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '21%',
    borderRadius: '0 4px 4px 0',
    fontSize: '14px',
    padding: '1%',
    boxShadow: '0 0 4px black',
    textAlign: 'center',
    transition: 'box-shadow 0.3s',
  },
  star:{
    verticalAlign: 'middle',
    transition: 'color 1s'
  }
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
            title={props.judul}>
            {props.jenis !== "m"
              ? <div className={classes.rating}>{props.rating} <Star className={classes.star}/></div>
              : <div className={classes.creator}>{props.pengarang} <Pencil style={{fontSize: 20}} className={classes.star}/></div>
            }
            </CardMedia>
          <CardActions>
            <Typography className={classes.sizeTitle}>{props.judul}</Typography>
          </CardActions>
          <Grid container>
            <Grid item xs={12} style={{padding:'10px',fontSize:'14px',color:'#aaa'}}>
              {fullTanggal}
            </Grid>
          </Grid>
      </CardActionArea>
    </Card>
    );
}

export default AnimeCard;