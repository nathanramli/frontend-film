import React from 'react';


// Material UI
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Movie from '@material-ui/icons/Movie';

function LinkDownload(props){

  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function makeElement(source, pixel) {
    if(source[0] !== ""){
      return (
          <ListItem>
                <ListItemIcon>
                  <Movie />
                </ListItemIcon>
                <ListItemText>
                   <Chip size="small" label={pixel + 'p'} color="primary"/> :&nbsp; 
                  {source.map((row, index) => { 
                    const isi = row.split('|||');
                    return (
                      <React.Fragment key={isi[1]}>
                        <a target="_blank" rel="noopener noreferrer" href={isi[1]}>{isi[0]}</a>{index+1 === source.length ? '' : ' | ' }
                      </React.Fragment>
                    )
                  }
                  )}
                </ListItemText>
          </ListItem>
        );
    }else{
      return null;
    }
  }
  return (
      <List component="nav">
        <ListItem button onClick={handleClick.bind(this)}>
          <ListItemText>
            {props.nama_film} {props.judul.substring(props.judul.lastIndexOf('#')+1)}
          </ListItemText> 
          <ListItemIcon>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItemIcon>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {makeElement(props.url1080.sort(), '1080')}
          {makeElement(props.url720.sort(), '720')}
          {makeElement(props.url540.sort(), '540')}
          {makeElement(props.url480.sort(), '480')}
          {makeElement(props.url360.sort(), '360')}
          {makeElement(props.url240.sort(), '240')}
        </Collapse>
      </List>
    );
}

export default LinkDownload;