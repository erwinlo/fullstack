import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

class App extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               isLoggedIn: false
          }
     }

     toggleLogin() {
          this.setState({ isLoggedIn: !this.state.isLoggedIn })
     }

     render() {

          return (
               <>
                    {(this.state.isLoggedIn) ?
                         <Dashboard toggle={() => this.toggleLogin()} />
                         :
                         <Login toggle={() => this.toggleLogin()} />
                    }
               </>
          )
     }
}


export default App;