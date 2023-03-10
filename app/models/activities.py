from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date, datetime


class Activity(db.Model):
    __tablename__ = 'activities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod(
                            "users.id"),
                            ondelete="CASCADE"),
                        nullable=False)

    distance = db.Column(db.Float, nullable=False, default=0)
    hours = db.Column(db.Integer, nullable=False, default=0)
    minutes = db.Column(db.Integer, nullable=False, default=0)
    seconds = db.Column(db.Integer, nullable=False, default=0)
    elevation = db.Column(db.Float, nullable=False, default=0)
    sport = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    private_notes = db.Column(db.String(1000), nullable=False)
    extertion = db.Column(db.Integer, nullable=False)

    user = db.relationship(
        "User", back_populates="activities"
    )

    def last_to_dict(self):
        return {
            "distance": self.distance,
            "hours": self.hours,
            "minutes": self.minutes,
            "seconds": self.seconds,
            "elevation": self.elevation,
            "sport": self.sport,
            "date": self.date.strftime("%Y-%m-%d"),
            "time": self.time.strftime("%H:%M:%S"),
            "title": self.title,
            "description": self.description,
            "private_notes": self.private_notes,
            "extertion": self.extertion,
            "id": self.id
        }

    def to_dict(self):
        return {
            "distance": self.distance,
            "hours": self.hours,
            "minutes": self.minutes,
            "seconds": self.seconds,
            "elevation": self.elevation,
            "sport": self.sport,
            "date": self.date.strftime("%Y-%m-%d"),
            "time": self.time.strftime("%H:%M:%S"),
            "title": self.title,
            "description": self.description,
            "private_notes": self.private_notes,
            "user_id": self.user_id,
            "id": self.id,
            "extertion": self.extertion,
            "user": {**self.user.activity_info()}
        }
