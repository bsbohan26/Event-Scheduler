from flask import Flask, render_template, redirect, url_for
from werkzeug.urls import url_quote  # If you need url_quote specifically

app = Flask(__name__)

@app.route("/")
def hello():
    return redirect(url_for('team'))

@app.route("/team")
def team():
    # In the future, we'll fetch team data from a database
    team_members = []
    return render_template('team.html', team_members=team_members)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
