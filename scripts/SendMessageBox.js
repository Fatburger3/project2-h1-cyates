import * as React from 'react';
import { Socket } from './Socket';


export class SendMessageBox extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        Socket.emit('message', {
            'from': 'user',
            'text': document.getElementById('message_box').text,
        });
        console.log('Sent a message');
    }

    render() {
        return ( 
                <form onSubmit={this.handleSubmit} id="message_form">
                    <input type="text" id="message_box"/>
                    <button id="message_button">Send</button>
                </form>
            
        );
    }
}
