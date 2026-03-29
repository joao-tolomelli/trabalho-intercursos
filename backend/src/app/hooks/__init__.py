from . import schema_to_response


def register_hooks(app):
    schema_to_response.register(app)
