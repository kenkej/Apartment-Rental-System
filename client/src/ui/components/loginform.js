import React from 'react'

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleLogin(event) {
        event.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username
            })
        })
            .then(res => {
                return res.json();
            })
            .then(result => {
                if (result.failed) {
                    alert('User not existed! Please register!');
                }
                else {
                    if (this.state.password === result[0].password) {
                        alert('Login successfully!');
                    }
                    else {
                        alert('Wrong password!')
                    }
                }
            });

    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username"
                            onChange={this.handleUsernameChange.bind(this)} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                            onChange={this.handlePasswordChange.bind(this)} />
                    </div>
                    <button className="btn btn-primary" onClick={this.handleLogin.bind(this)}>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm