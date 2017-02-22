import * as React from 'react';
import { Socket } from './Socket';
import { LoginContent } from './Login';

export class Content extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            'username': 0,
            'is_logged_in': 0,
            'messages': [],
            'all_users': []
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
            state_messages.push(
                <li key= {data.id}>
                    <h3>{data.from}:</h3>
                    <p>{data.text}</p>
                </li>
            );
            this.setState({messages: state_messages});
            console.log(this.state);
            this.forceUpdate();
        });
        Socket.on('add user', (data) => {
            console.log(data);
            var state_all_users = this.state.all_users;
            state_all_users.push(data);
            this.setState({
                all_users: state_all_users
            });
        });
        
        Socket.on('valid login', (data) => {
            console.log('valid login');
            console.log(data.username);
            this.setState({
                'username': data.username,
                'is_logged_in': 1,
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
        if(this.state.is_logged_in === 0) return (<LoginContent/>);
        
        var all_users=[];
        for (var user of this.state['all_users']) {
            console.log(user);
            var item = <li key={user}>{user}</li>;
            all_users.push(item);
        }
        
        return  <div>
            <div id="thread_view" className="left" >
                <ul>{this.state.all_users}</ul>
            </div>
            
            <div className="right">
                <div  id="conv_view">
                    <ul id='messages'>{this.state.messages}</ul>
                </div>
                <form onSubmit={this.handleSubmit} id="message_form">
                    <textarea id="message_box"/>
                    <button id="message_button">Send</button>
                </form>
            </div>
        </div>;
    }
}
