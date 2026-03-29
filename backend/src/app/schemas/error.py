from marshmallow import fields

from .response import BaseResponseSchema


class HttpErrorSchema(BaseResponseSchema):
    message = fields.Str(required=True)
    status_code = fields.Int(required=True)
    details = fields.Dict(keys=fields.Str(), values=fields.Raw(), required=False)

    status_code.default = 400
