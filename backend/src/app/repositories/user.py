from .. import db
from ..exceptions.not_found import NotFoundError
from ..models.user import User
from ..schemas.user import CreateUserSchema, UpdateUserSchema


class UserRepository:
    @staticmethod
    def get_user(user_id):
        user = User.query.get(user_id)
        if user is None:
            raise NotFoundError(f"Usuário com ID {user_id} não encontrado.")
        return user

    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def create_user(user_data: CreateUserSchema):
        user = User(**user_data)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def update_user(user_id: int, user_data: UpdateUserSchema):
        """
        Atualizar campos manualmente, mantendo o controle
        sobre quais campos podem ser atualizados pelo usuário.
        """
        user = User.query.get(user_id)
        if user is None:
            raise NotFoundError(f"Usuário com ID {user_id} não encontrado.")
        user.email = user_data.get("email", user.email)
        db.session.commit()
        return user

    @staticmethod
    def delete_user(user_id):
        """
        Pode lançar exceções se o usuário não existir.
        Trate essas exceções na camada de controle/serviço.
        """
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
