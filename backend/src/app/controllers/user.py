from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    current_user,
    jwt_required,
)

from .. import db
from ..exceptions.not_found import NotFoundError
from ..schemas.user import UpdateUserSchema, UserSchema
from ..services.user import UserService

bp = Blueprint("user", __name__, url_prefix="/user")


@bp.get("")
def get_all():
    users: list[UserSchema] = UserService.get_all_users()
    return jsonify(users)


@bp.get("/<id>")
def get(id):
    try:
        user: UserSchema = UserService.get_by_id(id)
    except NotFoundError as e:
        result = e.get_schema()
        return result
    return user


@bp.put("/<id>")
@jwt_required()
def update(id):
    try:
        if int(id) != current_user.id:
            return {"message": "Você só pode atualizar seu próprio perfil."}, 401

        user: UserSchema = UserService.get_by_id(id)

        data = UpdateUserSchema().load(request.json)
        UserService.update_user(id, data)
    except NotFoundError as e:
        result = e.get_schema()
        return result
    except Exception:
        db.session.rollback()
        return {"message": "Algo deu errado ao atualizar o usuário."}, 400
    return jsonify(UserSchema().dump(user)), 200


@bp.delete("/<id>")
@jwt_required()
def delete(id):
    try:
        if int(id) != current_user.id:
            return {"message": "Você só pode deletar seu próprio usuário."}, 401

        UserService.delete_user(id)
    except Exception:
        db.session.rollback()
        return {"message": "Algo deu errado ao deletar o usuário."}, 400
    return jsonify({"message": "Usuário deletado com sucesso."}), 200
