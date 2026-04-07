from flask import Blueprint, request

from .controllers import auth, classificador

bp = Blueprint("index", __name__, url_prefix="")


@bp.get("/")
def index():
    return "Hello, world!"


@bp.get("/health")
def health():
    return "Healthy", 200


@bp.post("/echo")
def echo():
    message = request.json.get("message", "")
    return {"message": message}


def register_blueprints(app):
    """
    Registre todos os blueprints aqui
    """
    app.register_blueprint(bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(classificador.bp)
