from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length


class ClubForm(FlaskForm):
    owner_id = IntegerField("Owner id", [DataRequired(), NumberRange(min=1)])
    club_name = StringField(
        "Club Name", [DataRequired(), Length(min=1, max=255)])
    location = StringField("Location", [DataRequired()])
    website = StringField("Website", [DataRequired(), Length(min=0, max=100)])
    sport = StringField("Sport", [DataRequired(), Length(min=1, max=100)])
    type = StringField("Club Type", [DataRequired(), Length(min=1, max=255)])
    description = TextAreaField("Description", [DataRequired()])
    club_image = StringField("Club Image", [DataRequired(
    )], default="https://striveonrender.s3.us-west-2.amazonaws.com/clubDefault.png"),
    club_banner = StringField("Club Banner", [DataRequired(
    )], default="https://striveonrender.s3.us-west-2.amazonaws.com/defaultBanner.png"),
