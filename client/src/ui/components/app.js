import React from 'react'
import Main from './main'
import Header from './header'
import '../css/main.css'


class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}

export default App