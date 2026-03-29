from ..schemas.error import HttpErrorSchema


class NotFoundError(Exception):
    def __init__(self, message="Recurso não encontrado"):
        self.message = message
        super().__init__(self.message)

    def get_schema(self):
        return HttpErrorSchema().dump({
            "message": self.message,
            "status_code": 404
        })
