from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, TextAreaField, FloatField, TimeField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length, Optional


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
    date = DateField("Date", [Optional()])
    time = TimeField("Time", [Optional()])
    title = StringField("Title", [DataRequired()])
    description = StringField("Description", [Optional()])
    private_notes = StringField("Private Notes", [Optional()])
