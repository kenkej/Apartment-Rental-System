import React from 'react'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", confirm: "", passwordConfirmed: {}, userExisted: { display: 'none' }, existed: false };
    }

    async handleUsernameChange(event) {
        await this.setState({ username: event.target.value });
        this.checkExistedUser();
    }

    checkExistedUser() {
        fetch('/register/' + this.state.username)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(result => {
                if (result.existed) {
                    this.setState({ userExisted: { display: 'block', color: 'red' }, existed: true })
                }
                else {
                    this.setState({ userExisted: { display: 'none' }, existed: false })
                }
            })
    }

    async handlePasswordChange(event) {
        await this.setState({ password: event.target.value });
        this.changePasswordInputBorder();
    }

    async handleConfirmPasswordChange(event) {
        await this.setState({ confirm: event.target.value });
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
        if (this.state.username.length === 0 || this.state.password.length === 0 || this.state.confirm.length === 0) {
            alert('All fields must not be empty!');
            event.preventDefault();
            return;
        }
        if (this.state.password !== this.state.confirm) {
            alert('Password must be confirmed!');
            event.preventDefault();
            return;
        }
        if (this.state.existed) {
            alert('User existed! Please choose another username!');
            event.preventDefault();
            return;
        }
        fetch('/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(res => {
                return res.json();
            })
            .then(result => {
                if (result.success) {
                    alert('Register successfully!');
                }
                else {
                    alert('Register failed!')
                }
            })
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
                                <input required type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username"
                                    onChange={this.handleUsernameChange.bind(this)} />
                                <small id="emailHelp" style={this.state.userExisted}>This user existed already</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input required style={this.state.passwordConfirmed} type="password" className="form-control" id="password" placeholder="Password"
                                    onChange={this.handlePasswordChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                <input required style={this.state.passwordConfirmed} type="password" className="form-control" id="password" placeholder="Confirm your password"
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