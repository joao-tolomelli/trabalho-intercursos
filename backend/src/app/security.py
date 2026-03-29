from functools import wraps
from typing import Any, Callable, TypeVar

from flask import session

from .config import Config

F = TypeVar("F", bound=Callable[..., Any])
SESSION_USER_ID_KEY = Config.SESSION_USER_ID_KEY


def login_user(user_id: int | str) -> None:
    session[SESSION_USER_ID_KEY] = str(user_id)
    session.permanent = True


def logout_user() -> None:
    session.pop(SESSION_USER_ID_KEY, None)


def get_current_user_id() -> str | None:
    return session.get(SESSION_USER_ID_KEY)


def is_authenticated() -> bool:
    return SESSION_USER_ID_KEY in session


def login_required(view_func: F) -> F:
    @wraps(view_func)
    def wrapped(*args: Any, **kwargs: Any):
        if not is_authenticated():
            return {"message": "Authentication required."}, 401
        return view_func(*args, **kwargs)

    return wrapped  # type: ignore[return-value]
