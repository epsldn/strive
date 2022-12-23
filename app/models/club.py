from models.db import db, environment, SCHEMA, add_prefix_for_prod


class Club(db.Model):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    club_name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    website = db.Column(db.String(100))
    spot = db.Column(db.String(100))
    description = db.Column(db.String)
    club_image = db.Column(db.String)
    club_banner = db.Column(db.String)

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
