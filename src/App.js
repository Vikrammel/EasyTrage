import React from 'react';
//import registerServiceWorker from './registerServiceWorker';

import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
//import { Switch } from '../../../../../../../../../../home/dunixify/.cache/typescript/2.6/node_modules/@types/react-router';

/* maybe make into a separate component and import into each route's component
const Navbar = () => (
    <div>
        <a href = "/Landing"></a>
    </div>
)*/

const Home = () => (
    <div>
        <p>EasyTrage home</p>
    </div>
)

export class App extends React.Component{
    render() {
        return (
            <Router>
                {/*<Route path="/navbar = component={Navbar}">*/}
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        )
    //registerServiceWorker();
    }
}


