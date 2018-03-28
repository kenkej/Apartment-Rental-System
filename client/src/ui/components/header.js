import React from 'react'
import LoginComponent from './login'

class Header extends React.Component {
    render() {
        return (
            <div className="container-fluid header">
                <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                    <a class="navbar-brand" >{this.props.headerName}</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                        </ul>
                        <LoginComponent />
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header