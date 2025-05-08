from flask import Blueprint, render_template, redirect, url_for

bp = Blueprint('team', __name__)

@bp.route('/')
def index():
    return redirect(url_for('team.team'))

@bp.route('/team')
def team():
    team_members = []
    return render_template('team.html', team_members=team_members) 