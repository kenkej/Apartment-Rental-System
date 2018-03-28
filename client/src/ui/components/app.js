import React from 'react'
import Main from './main'
import Header from './header'
import Footer from './footer'
import '../css/main.css'


class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default App