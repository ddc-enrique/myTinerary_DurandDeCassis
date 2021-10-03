import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Cities from './pages/Cities';
import City from './pages/City';
import ConnectionError from "./pages/ConnectionError";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { connect } from 'react-redux';
import usersActions from './redux/actions/usersActions';
import { useEffect } from 'react';
import ReactNotification from 'react-notifications-component';


function App({token, signFromLS}) {
  useEffect (() => {
    let tokenLS = localStorage.getItem("token");
    if (tokenLS) {
      signFromLS(tokenLS)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])
  
  const error = new Error("Page not found");


  return (
    <BrowserRouter>
      <ReactNotification />      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City}/>
        <Route path="/signin" component={ token ? Home : SignIn}/>
        <Route path="/signup" component={ token ? Home : SignUp}/>
        {/* el error es que al estar en esta direccion en el navbar el boton home no queda marcado 
        por la ruta del navlink */}
        <Route path="/pageNotFound" render={ () =>
          <ConnectionError 
            error={error}
            showButton={true}
          />
        } />
        <Redirect to="/pageNotFound" />
         {/* si hago to="/" y entra en el home de todas maneras me renderiza por un instante sign */}
      </Switch>
    </BrowserRouter>
  );
}

const mapDispatchToProps = {
  signIn: usersActions.signIn,
  signFromLS: usersActions.signFromLS,
};

const mapStateToProps = (state) => {
  return{
    token: state.users.token,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
