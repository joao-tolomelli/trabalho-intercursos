import logging
import os


def raise_if_default(key, value, default):
    """
    Lança um aviso ou erro se o valor de configuração for o padrão.
    """
    if value != default:
        return value

    match value:
        case "PRODUCTION":
            raise Exception(
                f"Usar o valor padrão para '{key}' não é permitido em produção."
            )
        case "DEVELOPMENT":
            logging.warning(
                f"Você está usando o valor padrão para '{key}'."
                " Isso só é permitido em ambientes de desenvolvimento"
                " e deve ser alterado para produção."
            )
    return value


def get_environment():
    env = os.environ.get("FLASK_ENV", "DEVELOPMENT")
    match env:
        case "PRODUCTION":
            logging.info("Executando em modo PRODUÇÃO.")
        case "DEVELOPMENT":
            logging.info("Executando em modo DESENVOLVIMENTO.")
        case _:
            raise Exception(
                f"Valor desconhecido para FLASK_ENV: '{env}'."
                " Os valores permitidos são 'PRODUCTION' e 'DEVELOPMENT'."
            )
