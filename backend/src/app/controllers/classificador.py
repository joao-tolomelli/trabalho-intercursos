from flask import Blueprint, request

from app.prompts import ClassificadorPrompts
from app.schemas.classificador import ClassificadorFormRequestSchema
from app.services import GeminiService

bp = Blueprint("classificador", __name__, url_prefix="/classificador")


@bp.post("")
def classificar():
    data = request.get_json()
    schema = ClassificadorFormRequestSchema()
    errors = schema.validate(data)
    if errors:
        return {"errors": errors}, 400

    prompt: str = ClassificadorPrompts.classificar(data)

    resultado: str = GeminiService.generate(prompt)
    return {"resultado": resultado}
