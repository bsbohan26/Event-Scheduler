from flask import Flask, render_template, redirect, url_for
from werkzeug.urls import url_quote  # If you need url_quote specifically
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.resources import SERVICE_NAME, Resource

app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)

provider = TracerProvider(resource=Resource.create({SERVICE_NAME: "flask-app"}))

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