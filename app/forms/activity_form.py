from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, FloatField, TimeField
from wtforms.validators import DataRequired, NumberRange, Length, Optional


class ActivityForm(FlaskForm):
    user_id = IntegerField("User id", [DataRequired("User Id required")])
    distance = FloatField("Distance", [Optional(), NumberRange(min=0)])
    hours = IntegerField("Hours", [Optional(), NumberRange(min=0)])
    minutes = IntegerField("Minutes", [Optional(), NumberRange(min=0, max=60)])
    seconds = IntegerField("Seconds", [Optional(), NumberRange(min=0, max=60)])
    elevation = FloatField("Elevation", [Optional(), NumberRange(max=29029)])
    extertion = IntegerField(
        "Extertion level", [Optional(), NumberRange(min=1, max=10)])
    sport = StringField("Sport", [DataRequired(
        "Please enter a sport"), Length(min=1, max=100)])
    date = DateField("Date")
    time = TimeField("Time")
    title = StringField("Title", [DataRequired(), Length(
        max=100, message=("Please keep your message under 100 characters"))])
    description = StringField("Description", [Optional(), Length(
        max=1000, message="Please keep your description under 1000 characters")])
    private_notes = StringField("Private Notes", [Optional(), Length(
        max=1000, message="Please keep your private notes under 1000 characters")])
