import React, {Component} from 'react';

class GoogleAuth extends Component {
    state = { isSignedIn: null }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '376458410096-4lkeqrlofti876326v0m8itiifibffff.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    logout = () => {
        this.auth.signOut();
        this.onAuthChange();
    }

    login = () => {
        this.auth.signIn();
        this.onAuthChange();
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    renderButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.logout} className="ui red google button">
                    <i className="google icon"></i>
                    Logout
                </button>
            );
        } else {
            return (
                <button onClick={this.login} className="ui red google button">
                    <i className="google icon"></i>
                    Login with google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderButton()}</div>
    }
}

export default GoogleAuth;