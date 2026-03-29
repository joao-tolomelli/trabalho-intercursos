import os

from dotenv import load_dotenv

from .utils import get_environment, raise_if_default

basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv()


class Config:
    ENVIRONMENT = get_environment()
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL"
    ) or "sqlite:///" + os.path.join(basedir, "app.db")
    JWT_SECRET_KEY = raise_if_default(
        "JWT_SECRET_KEY",
        os.environ.get("JWT_SECRET_KEY", "super-secret"),
        "super-secret",
    )
