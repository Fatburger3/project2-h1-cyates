import * as React from 'react';
import { Socket } from './Socket';

class LoginButton extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log('poop');
        FB.getLoginStatus((response) => {
            console.log(response);
            if (response.status == 'connected') {
                Socket.emit('login', {
                    'facebook_user_token': response.authResponse.accessToken,
                });
            }
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button>Log in</button>
            </form>
        );
    }
}

export class LoginContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'numbers': []
        };
    }
    componentDidMount() {
        Socket.on('all numbers', (data) => {
            this.setState({
                'numbers': data['numbers']
            });
        });
    }
    render() {
        return <div>
            <h1 id="status">Potato</h1>
                <div
                    className="fb-login-button"
                    data-max-rows="1"
                    data-size="medium"
                    data-show-faces="false"
                    data-auto-logout-link="true"
                    >
                </div>
                <br/>
                <LoginButton/>
            <span>
            </span>
        </div>;
    }
}