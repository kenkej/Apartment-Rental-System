import React from 'react'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", confirm: "", passwordConfirmed: {} };
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
        this.changePasswordInputBorder();
    }

    handleConfirmPasswordChange(event) {
        this.setState({ confirm: event.target.value });
        this.changePasswordInputBorder();
    }

    changePasswordInputBorder() {
        if (this.state.password !== this.state.confirm) {
            this.setState({ passwordConfirmed: { borderColor: 'red' } });
        }
        else {
            this.setState({ passwordConfirmed: { borderColor: 'green' } });
        }
    }

    handleRegister(event) {
        event.preventDefault();

    }

    render() {
        return (
            <div className="container registerForm">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username"
                                    onChange={this.handleUsernameChange.bind(this)} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input style={this.state.passwordConfirmed} type="password" className="form-control" id="password" placeholder="Password"
                                    onChange={this.handlePasswordChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                <input style={this.state.passwordConfirmed} type="password" className="form-control" id="password" placeholder="Confirm your password"
                                    onChange={this.handleConfirmPasswordChange.bind(this)} />
                            </div>
                            <button className="btn btn-primary" onClick={this.handleRegister.bind(this)}>Register</button>
                        </form>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        );
    }
}

export default RegisterForm