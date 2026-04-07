from flask import Blueprint
from flask_wtf.csrf import generate_csrf

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.get("/csrf-token")
def get_csrf_token():
    token = generate_csrf()
    return {"csrf_token": token}
