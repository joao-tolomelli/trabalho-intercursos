from flask import jsonify
from marshmallow import Schema
from ..schemas.json import JsonResponseSchema
from ..schemas.response import BaseResponseSchema


def register(app):
    @app.after_request
    def schema_to_response(response):
        if isinstance(response, JsonResponseSchema):
            # Respostas JSON
            return jsonify(response.as_response())
        elif isinstance(response, BaseResponseSchema):
            # Respostas que não são JSON. Arquivos, etc.
            return response.as_response()
        elif (isinstance(response, list)
            and len(response) > 0
            and isinstance(response[0], Schema)):
            # Respostas gerais
            return jsonify(response.dump()), 200
        return response
