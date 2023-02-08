from .db import db, environment, SCHEMA, add_prefix_for_prod
from .club import club_members
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


followers = db.Table("followers",
                     db.Column("follower_id", db.Integer,
                               db.ForeignKey("users.id")),
                     db.Column("followed_id", db.Integer,
                               db.ForeignKey("users.id"))
                     )

follow_requests = db.Table("follow_requests",
                           db.Column("requested_id", db.Integer,
                                     db.ForeignKey("users.id")),
                           db.Column("requestor_id", db.Integer,
                                     db.ForeignKey("users.id"))
                           )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    birthdate = db.Column(db.Date, nullable=False)
    profile_picture = db.Column(
        db.String, default="https://striveonrender.s3.us-west-2.amazonaws.com/29215abf55974d0084dcb1b46a1f3c8c.png", nullable=False)
    onboarding = db.Column(db.Boolean, default=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    owned_clubs = db.relationship("Club",
                                  back_populates="owner")

    clubs = db.relationship("Club",
                            secondary=club_members,
                            back_populates="members")

    activities = db.relationship("Activity",
                                 back_populates="user")

    requests = db.relationship(
        "User",
        secondary=follow_requests,
        primaryjoin=(follow_requests.c.requested_id == id),
        secondaryjoin=(follow_requests.c.requestor_id == id),
        backref="follow_requests"
    )

    requests_sent = db.relationship(
        "User",
        secondary=follow_requests,
        primaryjoin=(follow_requests.c.requestor_id == id),
        secondaryjoin=(follow_requests.c.requested_id == id),
        overlaps="follow_requests"
    )

    followed = db.relationship(
        "User",
        secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref="followers"
    )

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
            "joined_clubs": {club.get_id(): {"id": club.to_dict()["id"], "clubImage": club.to_dict()["clubImage"], "clubName": club.to_dict()["clubName"]} for club in self.clubs},
            "owned_clubs": {club.get_id(): club.get_id() for club in self.owned_clubs},
            "total_activitites": len(self.activities),
            "last_activity": self.activities[-1].last_to_dict() if self.activities else None,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profilePicture": self.profile_picture,
        }

    def activity_info(self):
        return {
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profilePicture": self.profile_picture,
            "id": self.id
        }
