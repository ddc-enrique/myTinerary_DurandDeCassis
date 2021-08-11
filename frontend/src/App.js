import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Cities from './pages/Cities';
import City from './pages/City';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
