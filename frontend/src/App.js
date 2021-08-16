// import 'aos/dist/aos.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Cities from './pages/Cities';
import City from './pages/City';
import './App.css';
import ConnectionError from "./pages/ConnectionError";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City}/>
        <Route path="/pageNotFound" render={ () =>
          <ConnectionError 
            errorMessage="Page not found"
            showButton={true}
          />
        } />
        <Redirect to="/pageNotFound" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
