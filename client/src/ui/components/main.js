import React from 'react'
import { Route } from 'react-router-dom'
import Search from './search'
import NewHouseComponent from './addnewhouse'
import getWeb3 from '../../utils/getWeb3'

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { web3: null }
    }


    componentWillMount() {
        getWeb3
            .then(results => {
                this.setState({ web3: results.web3 });                
            })
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Search} />
                <Route exact path="/postahouse"
                    render={() => <NewHouseComponent web3={this.state.web3}/>} 
                 />
            </div>
        )
    }
}

export default Main