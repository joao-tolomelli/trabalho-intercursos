from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from .config import Config

db: SQLAlchemy = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(
        app,
        origins=Config.CORS_ORIGINS,
        supports_credentials=True,
        allow_headers=["Content-Type"],
    )

    from . import hooks, routes

    hooks.register_hooks(app)
    routes.register_blueprints(app)

    return app
