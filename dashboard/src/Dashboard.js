import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login';
import Project from './Project';

function Dashboard() {
  return (
    <Router>
    <div>
        <Route exact path="/login" render={() => <Login/>} />
        <Route exact path="/project" render={() => <Project authorized={true}/>} />
    </div>
</Router>
  );
}

export default Dashboard;
