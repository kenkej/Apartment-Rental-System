import React from 'react'
import { Route } from 'react-router-dom'
import Search from './search'
import Login from './loginform'


class Main extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Search} />
                <Route exact path="/login" component={Login} />
            </div>
        )
    }
}

export default Main