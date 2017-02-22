import flask_sqlalchemy, app, datetime
app.app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://main_user:poopsareawesome@localhost/postgres'
db = flask_sqlalchemy.SQLAlchemy(app.app)
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True) # key
    from_name = db.Column(db.String(20))
    to_name = db.Column(db.String(20))
    text = db.Column(db.String(120))
    send_time = db.Column(db.DateTime)

    def __init__(self, text, from_name, to_name, send_time):
        self.text = text
        self.from_name = from_name
        self.to_name = to_name
        if send_time is None:
            send_time = datetime.datetime.utcnow()
        self.send_time = send_time
        
    def __repr__(self): # what's __repr__?
        return '<Message text: %s>' % self.text