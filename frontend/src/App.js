import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Cities from './pages/Cities';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cities" component={Cities} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
