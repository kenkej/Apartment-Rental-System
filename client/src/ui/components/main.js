import React from 'react'
import { Route } from 'react-router-dom'
import Search from './search'
import LoginComponent from './loginform'
import RegisterComponent from './registerform'


class Main extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Search} />
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/register" component={RegisterComponent} />
            </div>
        )
    }
}

export default Main