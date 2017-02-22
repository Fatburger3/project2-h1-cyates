import * as React from 'react';
import { Socket } from './Socket';
import { LoginContent } from './Login';

export class Content extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            'username': 0,
            'isLoggedIn': 0,
            'messages': [],
        };
    }
    
    componentDidMount() {
        
        Socket.on('update', (data) => {
            this.setState(data);
        });
        
        Socket.on('message', (data) => {
            console.log(data);
            console.log(data.from + ": " + data.text);
            var state_messages = this.state.messages;
            state_messages.push(data.from + ": " + data.text);
            this.setState({messages: state_messages});
            console.log(this.state);
            this.forceUpdate();
        });
        
        Socket.on('valid login', (data) => {
            console.log('valid login');
            console.log(data.username);
            this.setState({
                'username': data.username,
                'isLoggedIn': 1,
            });
            this.forceUpdate();
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        Socket.emit('message', {
            'from': 'user',
            'to': 'user',
            'text': document.getElementById('message_box').value,
        });
        console.log('Sent a message');
    }
    
    render() {
        if(this.state.isLoggedIn === 0) return (
            <LoginContent/>
            );
            
        var messages =[];
        for (var message of this.state['messages']) {
            console.log(message);
            var item = <li key={message}>{message}</li>;
            messages.push(item);
        }
        
        return  <div>
            <div id="thread_view" className="left" >
                
            </div>
            
            <div className="right">
                <div  id="conv_view">
                    <li id='messages'>{messages}</li>
                </div>
                <form onSubmit={this.handleSubmit} id="message_form">
                    <textarea id="message_box"/>
                    <button id="message_button">Send</button>
                </form>
            </div>
        </div>;
    }
}
