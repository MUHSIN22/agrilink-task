import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Commits from "./Components/Commits/Commits";
import AddBtn from "./Components/AddBtn/AddBtn";
import AddRepoPopup from "./Components/Add repo popup/AddRepoPopup";
import { EssentialContext } from "./Assets/EssentialContext";
import { useContext } from "react";

function App() {
  const [essentials, setEssentials] = useContext(EssentialContext)
  return (
    <Router>
        <Header/>
        <AddBtn/>
        {
          essentials &&
          essentials.addRepo ?
          <AddRepoPopup/> : null
        }
        <Switch>
          <Route path="/" exact>
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
