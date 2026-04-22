from flask import Flask, jsonify
from flask_cors import CORS
from flask_wtf.csrf import CSRFError, CSRFProtect

from .config import Config

csrf = CSRFProtect()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    csrf.init_app(app)

    CORS(
        app,
        origins=Config.CORS_ORIGINS,
        supports_credentials=True,
        allow_headers=["Content-Type", "X-CSRFToken"],
    )

    @app.errorhandler(CSRFError)
    def handle_csrf_error(e):
        return jsonify({"message": "CSRF token missing or invalid"}), 403

    from . import hooks, routes

    hooks.register_hooks(app)
    routes.register_blueprints(app)

    return app
