from flask import Blueprint, render_template

bp = Blueprint('events', __name__)

@bp.route('/events')
def events():
    # In the future, we'll fetch events from a database
    events = []
    return render_template('events.html', events=events) 