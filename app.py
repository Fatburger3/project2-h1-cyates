# app.py
import os, flask, flask_socketio

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

@app.route('/')
def hello():
    return flask.render_template('index.html')
    
@socketio.on('connect')
def on_connect():
    print 'Someone connected!'
    
@socketio.on('login')
def on_login(data):
    print 'login'
    print data['facebook_user_token']
    
@socketio.on('message')
def on_message(data):
    print 'a message happened'

socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)