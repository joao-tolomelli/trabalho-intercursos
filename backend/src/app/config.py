import os
from datetime import timedelta

from dotenv import load_dotenv

from .utils import get_environment

basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv()


class Config:
    ENVIRONMENT = get_environment()

    SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret-in-production")

    SESSION_COOKIE_NAME = os.getenv("SESSION_COOKIE_NAME", "session")
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_SECURE = bool(os.getenv("SESSION_COOKIE_SECURE", "True"))
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=10)

    SESSION_USER_ID_KEY = "user_id"

    CORS_ORIGINS = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS").split(",")
        if origin.strip()
    ]
    WTF_CSRF_TRUSTED_ORIGINS = CORS_ORIGINS

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or print(
        "Warning: GEMINI_API_KEY is not set. Gemini integration will not work."
    )
