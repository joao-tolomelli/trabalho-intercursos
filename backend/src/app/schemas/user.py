from marshmallow import Schema, fields
from .json import JsonResponseSchema


class UserSchema(JsonResponseSchema):
    id = fields.Int()
    username = fields.String()
    email = fields.String()

class CreateUserSchema(Schema):
    username = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(load_only=True, required=True)

class UpdateUserSchema(Schema):
    email = fields.String(load_only=True, required=True)
