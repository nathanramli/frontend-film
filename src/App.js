import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import PrivateRoute from "./components/common/PrivateRoute";
import Alerts from "./components/layout/Alerts";
 
import TemplateAppBar from './components/admin/AdminComponent/TemplateAppBar';
import TemplateFooterBar from './components/admin/AdminComponent/TemplateFooterBar';

import AnimeDetail from './components/user/PageComponent/AnimeDetail';
import Categories from './components/user/PageComponent/Categories';
import Genre from './components/user/PageComponent/Genre';
import Jenis from './components/user/PageComponent/Jenis';
import Cari from './components/user/PageComponent/Cari';

import AppBarUser from './components/user/UserComponent/AppBarUser';
import Anime from './components/user/PageComponent/Anime';
import Footer from './components/user/UserComponent/Footer';

import FilmsList from './components/admin/PageComponent/FilmsList';
import FilmCreate from './components/admin/PageComponent/FilmCreate';
import FilmUpdate from './components/admin/PageComponent/FilmUpdate';
import FilmDetail from './components/admin/PageComponent/FilmDetail';
import LinksList from './components/admin/PageComponent/LinksList';
import CharaList from './components/admin/PageComponent/CharaList';
import Login from './components/admin/PageComponent/Login';
// import Register from './components/admin/PageComponent/Register';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const Admin = ({ match }) => (
    <React.Fragment >
    <TemplateAppBar/>
      <Switch>
        <PrivateRoute path={`${match.path}/`} exact component={FilmsList} />
        <PrivateRoute path={`${match.path}/film`} exact component={FilmsList} />
        <PrivateRoute path={`${match.path}/film/add`} exact component={FilmCreate} />
        <PrivateRoute path={`${match.path}/film/detail/:pk`} component={FilmDetail} />
        <PrivateRoute path={`${match.path}/film/update/:pk`} component={FilmUpdate} />
        <PrivateRoute path={`${match.path}/film/link/:pk`} component={LinksList} />
        <PrivateRoute path={`${match.path}/film/chara/:pk`} component={CharaList} />
      </Switch>
    <TemplateFooterBar/>
    </React.Fragment>
);

const useStyles = makeStyles(theme =>({
  containerAnime:{
    backgroundColor:'transparent',
    padding:'0',
    borderRadius:'4px',
    height: 'auto',
    marginTop:'20px',
    marginBottom:'20px',
    [theme.breakpoints.only('xs')]:{
      marginTop:'0px',
      marginBottom:'0px',
    },
  },
}));

function User(props) {
const classes = useStyles();
return (
    <React.Fragment >
      <AppBarUser/>
        <Container maxWidth="lg" component="div" className={classes.containerAnime}>
          <Switch>
            <Route path={props.match.path} exact component={Anime} />
            <Route path={`${props.match.path}genre`} exact component={Genre} />
            <Route path={`${props.match.path}genre/:genre`} exact component={Categories} />
            <Route path={`${props.match.path}ongoing`} exact component={Jenis} />
            <Route path={`${props.match.path}complete`} exact component={Jenis} />
            <Route path={`${props.match.path}movie`} exact component={Jenis} />
            <Route path={`${props.match.path}cari`} component={Cari} />
            <Route path={`${props.match.path}:kode`} component={AnimeDetail} />
          </Switch>
        </Container>
      <Footer />
    </React.Fragment>
);
}

const Content = (props) => (
    <Switch>
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/admin" component={Admin} />
      <Route path="" exact component={User} />
    </Switch>
)

// Kode harus paling bawah
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Alerts/>
          <Content/>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;