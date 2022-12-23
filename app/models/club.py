from .db import db, environment, SCHEMA, add_prefix_for_prod

club_members = db.Table("club_members",
                        db.Column("club_id", db.Integer, db.ForeignKey(
                            add_prefix_for_prod("clubs.id"),
                            ondelete="CASCADE")),
                        db.Column("user_id", db.Integer, db.ForeignKey(
                            add_prefix_for_prod("users.id"),
                            ondelete="CASCADE")))


class Club(db.Model):
    __tablename__ = 'clubs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,
                         db.ForeignKey(add_prefix_for_prod(
                             "users.id"),
                             ondelete="CASCADE"),
                         nullable=False)
    club_name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    website = db.Column(db.String(100))
    spot = db.Column(db.String(100))
    description = db.Column(db.String)
    club_image = db.Column(db.String, default="https://striveonrender.s3.us-west-2.amazonaws.com/clubDefault.png", nullable=False)
    club_banner = db.Column(db.String, default="https://striveonrender.s3.us-west-2.amazonaws.com/defaultBanner.png", nullable=False)

    owner = db.relationship(
        "User", back_populates="owned_clubs"
    )

    members = db.relationship(
        "User", secondary=club_members, back_populates="clubs")

    def to_dict(self):
        return {
            "clubName": self.club_name,
            "location": self.location,
            "website": self.website,
            "spot": self.spot,
            "description": self.description,
            "clubImage": self.club_image,
            "clubBanner": self.club_banner
        }