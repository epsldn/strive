from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length


class ClubForm(FlaskForm):
    owner_id = IntegerField(
        "Owner id", [DataRequired("Enter the owners id."), NumberRange(min=1)])
    club_name = StringField(
        "Club Name", [DataRequired("Club name must be between 1 and 255 characters."), Length(min=1, max=100)])
    location = StringField(
        "Location", [DataRequired("Please enter your city and state.")])
    website = StringField("Website", [Length(min=0, max=100)])
    sport = StringField("Sport", [DataRequired(
        "Please enter a sport"), Length(min=1, max=100)])
    type = StringField("Club Type", [DataRequired(
        "Please enter the type of club this is."), Length(min=1, max=255)])
    description = TextAreaField(
        "Description", [DataRequired("Please enter a valid description"), Length(max=1000)])
    club_image = StringField(
        "Club Image"),
    club_banner = StringField(
        "Club Banner"),
