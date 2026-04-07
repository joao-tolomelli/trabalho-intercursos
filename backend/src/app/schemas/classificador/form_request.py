from marshmallow import Schema, fields


class ClassificadorFormRequestSchema(Schema):
    atividade_principal = fields.Str(required=True)
    trabalha_sozinho = fields.Str(required=True)
    numero_funcionarios = fields.Str(required=True)
