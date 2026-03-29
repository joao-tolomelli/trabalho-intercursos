from marshmallow import Schema


class BaseResponseSchema(Schema):
    def as_response(self):
        return self.dump(self), self.fields.get('status_code', 200)
