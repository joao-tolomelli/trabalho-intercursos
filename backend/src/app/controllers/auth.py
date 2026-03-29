import sqlalchemy as sa
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from .. import db, jwt
from ..models.user import User

bp = Blueprint("auth", __name__, url_prefix="/auth")


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


@bp.post("/login")
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return {"message": "Username and password are required."}, 400
    user = User.query.filter_by(username=username).one_or_none()
    if user is None:
        return {"message": "Invalid credentials."}, 401
    if user.check_password(password):
        token = create_access_token(identity=str(user.id))
        return {"message": "Login successful.", "token": token}
    else:
        return {"message": "Invalid credentials."}, 401


@bp.post("/register")
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return {"message": "Username, email and password are required."}, 400

    user = User(username=username, email=email)
    user.set_password(password)

    db.session.add(user)
    try:
        db.session.commit()
    except sa.exc.IntegrityError:
        db.session.rollback()
        return {"message": f"A user with the username '{username}' already exists."}

    return {"message": "User created successfully."}, 201
