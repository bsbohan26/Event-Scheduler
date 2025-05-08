from flask import Flask
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.resources import SERVICE_NAME, Resource

def create_app():
    app = Flask(__name__)
    FlaskInstrumentor().instrument_app(app)

    from .routes import team, events, settings
    app.register_blueprint(team.bp)
    app.register_blueprint(events.bp)
    app.register_blueprint(settings.bp)

    return app 