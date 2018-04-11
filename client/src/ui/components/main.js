import React from 'react'
import { Route } from 'react-router-dom'
import Search from './search'
import NewHouseComponent from './addnewhouse'
import getWeb3 from '../../utils/getWeb3'
import ApartmentArtifact from '../../smartcontract/build/contracts/ApartmentContract.json'

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            web3: null ,
            ApartmentArtifact
        }
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
                <Route exact path="/"
                    render={() => <Search web3={this.state.web3} artifact={this.state.ApartmentArtifact}/>}
                />
                <Route exact path="/postahouse"
                    render={() => <NewHouseComponent web3={this.state.web3} artifact={this.state.ApartmentArtifact}/>}
                />
            </div>
        )
    }
}

export default Main