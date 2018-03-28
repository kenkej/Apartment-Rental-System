import React from 'react'
import ReactDOM from 'react-dom'
import Header from './ui/components/header'
import Footer from './ui/components/footer'
import Button from './ui/components/button'
import Search from './ui/components/search'
import './ui/css/main.css'



class Main extends React.Component {

    //rendering main class
    render() {
        //include search_value for the input and house data 
        //main render
        return (<div>
            <Header headerName="House Rent" />
            <div className="container-fluid body">
                <div className="container searchForm">
                    <Search /> 
                </div>
            </div>
            <Footer />
        </div>
        )
    }
}

ReactDOM.render(
    <Main />, document.getElementById('root')
)