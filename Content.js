import * as React from 'react';
import { SendMessageBox } from './SendMessageBox';
import { Socket } from './Socket';

export class Content extends React.Component {
    render() {
        return  <div>
            <div id="thread_view" className="left" >
                
            </div>
            
            <div className="right">
                <div  id="conv_view">
                    
                </div>
                <SendMessageBox  id="text_view"/>
            </div>
        </div>;
    }
}
