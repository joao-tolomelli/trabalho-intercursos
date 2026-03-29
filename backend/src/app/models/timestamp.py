from datetime import datetime, timezone

from sqlalchemy.orm import Mapped, mapped_column

from .. import db


class TimestampModel(db.Model):
    __abstract__ = True
    creation_date: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc)
    )
    update_date: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
