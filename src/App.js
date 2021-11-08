import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Commits from "./Components/Commits/Commits";

function App() {
  return (
    <Router>
        <Header/>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/branch" >
            <Home/>
          </Route>
          <Route path="/commits">
            <Commits/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
