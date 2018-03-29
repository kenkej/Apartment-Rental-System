import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <div className="container-fluid header">
                <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                    <a className="navbar-brand" >{this.props.headerName}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                        </ul>
                        <a href="/login" className="navbar-text login">
                            Login
                        </a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header