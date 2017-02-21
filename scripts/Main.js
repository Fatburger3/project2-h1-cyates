// scripts/Main.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Socket } from './Socket';
import { Content } from './Content';
import { LoginContent } from './Login';

//poop
ReactDOM.render(<Content/>, document.getElementById('content'));

Socket.on('connect', function() {
    console.log('Connecting to the server!');
});