import { Switch, Route } from 'react-router-dom';


import Main from './components/main';
import SelectedCrypto from './components/selectedCrypto';
import Login from './components/login';
import Register from './components/register';
import UserProfile from './components/userProfile';


function App() {
  return (
    <div className="App">
       <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/more/:id" exact component={SelectedCrypto} />]
        <Route path="/user/login" exact component={Login}/>
        <Route path="/user/register" exact component={Register}/>
        <Route path="/user/profile" exact component={UserProfile}/>
      </Switch>
    </div>
  );
}

export default App;
