import sys

from flask.cli import main as flask_main


def run():
    sys.argv = ["--app src.app", "run", "--debug"]
    flask_main()
