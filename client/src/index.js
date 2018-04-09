import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router } from 'react-router-dom'
import App from './ui/components/app'

ReactDOM.render(
    (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root')
)