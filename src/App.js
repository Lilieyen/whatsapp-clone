import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useStateValue } from "./StateProvider"


function App() {
  // pulling user from the datalayer
  /* eslint-disable*/
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />      
      ) : (
        <div className="app__body">
        <Router>
            <Sidebar />
            <Switch>
            <Route path="/rooms/:roomId"> {/* for pulling the parameter (roomid) also, don't show the chats if there's no roomId*/}
            <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
        </div>
      )}
     
    </div>
  );
}

export default App;
