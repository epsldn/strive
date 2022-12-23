from .db import db, environment, SCHEMA, add_prefix_for_prod
from .club import club_members
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    birthdate = db.Column(db.Date, nullable=False)
    profile_picture = db.Column(
        db.String, default="https://striveonrender.s3.us-west-2.amazonaws.com/29215abf55974d0084dcb1b46a1f3c8c.png", nullable=False)
    onboarding = db.Column(db.Boolean, default=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    owned_clubs = db.relationship("Club", back_populates="owner")
    clubs = db.relationship("Club", secondary=club_members,
                            back_populates="members")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            "birthdate": f"{self.birthdate}",
            "joined_clubs": {club.get_id(): {"id": club.to_dict()["id"], "clubImage": club.to_dict()["clubImage"]} for club in self.clubs},
            "owned_clubs": {club.get_id(): club.get_id() for club in self.owned_clubs}
        }
