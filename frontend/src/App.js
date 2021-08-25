import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Cities from './pages/Cities';
import City from './pages/City';
import ConnectionError from "./pages/ConnectionError";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const error = new Error("Page not found");

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp} />
        <Route path="/pageNotFound" render={ () =>
          <ConnectionError 
            error={error}
            showButton={true}
          />
        } />
        <Redirect to="/pageNotFound" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
