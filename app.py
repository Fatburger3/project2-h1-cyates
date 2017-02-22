# app.py
import os, flask, flask_socketio, models, flask_sqlalchemy, random
app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://main_user:poopsareawesome@localhost/postgres'
db = flask_sqlalchemy.SQLAlchemy(app)

@app.route('/')
def hello():
    return flask.render_template('index.html')
    
@socketio.on('connect')
def on_connect():
    print 'Someone connected!'
    
@socketio.on('login')
def on_login():
    print 'login'
    flask_socketio.emit('valid login', {
        'username': random.randint(1,9999)
    })
@socketio.on('get messages')
def on_get_messages(data):
    print 'get messages'
    
@socketio.on('message')
def on_message(data):
    print 'a message happened'
    print 'from:', data['from']
    print 'to:', data['to']
    print 'text:', data['text']
    
if __name__ == '__main__': # __name__!
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )