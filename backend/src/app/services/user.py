from ..models.user import User
from ..repositories.user import UserRepository
from ..schemas.user import UpdateUserSchema, UserSchema


class UserService:
    @staticmethod
    def get_all_users():
        users: list[User] = UserRepository.get_all_users()
        return UserSchema(many=True).dump(users)

    @staticmethod
    def get_by_id(user_id):
        user: User = UserRepository.get_user(user_id)
        if user is None:
            return None
        return UserSchema().dump(user)

    @staticmethod
    def update_user(user_id, user_data):
        user_data = UpdateUserSchema().load(user_data)
        user = UserRepository.update_user(user_id, user_data)
        return UserSchema().dump(user)

    @staticmethod
    def delete_user(user_id):
        UserRepository.delete_user(user_id)
