import React from 'react'
import { Route } from 'react-router-dom'
import Search from './search'
import NewHouseComponent from './addnewhouse'


class Main extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Search} />
                <Route exact path="/postahouse" component={NewHouseComponent} />                
            </div>
        )
    }
}

export default Main