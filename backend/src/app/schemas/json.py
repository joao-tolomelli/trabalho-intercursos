from .response import BaseResponseSchema


class JsonResponseSchema(BaseResponseSchema):
    def __init__(self, *args, **kwargs):
        self.status_code = kwargs.pop('status_code', 200)
        super().__init__(*args, **kwargs)
