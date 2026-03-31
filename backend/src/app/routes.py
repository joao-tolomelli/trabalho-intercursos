from flask import Blueprint

from .controllers import auth, user

bp = Blueprint("index", __name__, url_prefix="")


@bp.get("/")
def index():
    return "Hello, world!"

@bp.get("/health")
def health():
    return "Healthy", 200


def register_blueprints(app):
    """
    Registre todos os blueprints aqui
    """
    app.register_blueprint(bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(user.bp)
