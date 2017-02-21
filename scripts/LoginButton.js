// Button.js
import * as React from 'react';
import { Socket } from './Socket';

export class LoginButton extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log('poop');
        FB.getLoginStatus((response) => {
            if (response.status == 'connected') {
                Socket.emit('connect', {
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