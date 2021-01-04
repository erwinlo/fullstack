import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

class App extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               userId: null,
               isLoggedIn: false
          }
     }

     logout() {
          this.setState({ isLoggedIn: false })
     }

     login(id) {
          this.setState({ userId: id, isLoggedIn: true })
     }

     render() {

          return (
               <>
                    {(this.state.isLoggedIn) ?
                         <Dashboard logout={() => this.logout()}
                              id={this.state.userId}
                         />
                         :
                         <Login login={(id) => this.login(id)} />
                    }
               </>
          )
     }
}


export default App;