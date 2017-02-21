import * as React from 'react';
import { SendMessageBox } from './SendMessageBox';
import { Socket } from './Socket';

export class Content extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
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
            this.state.messages.push(data.from + ": " + data.text);
            console.log(this.state);
            this.forceUpdate();
        });
    }
    
    render() {
        return  <div>
            <div id="thread_view" className="left" >
                
            </div>
            
            <div className="right">
                <div  id="conv_view">
                    <li id='messages'>{this.state.messages}</li>
                </div>
                <SendMessageBox  id="text_view"/>
            </div>
        </div>;
    }
}
