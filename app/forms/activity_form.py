from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length, Optional


class ActivityForm(FlaskForm):
    user_id = IntegerField("User id", [DataRequired("Owner Id required")])
    distance = FloatField("Distance", [Optional(), NumberRange(min=0)])
    hours = FloatField("Hours", [Optional(), NumberRange(min=0)])
    minutes = FloatField("Minutes", [Optional(), NumberRange(min=0, max=60)])
    seconds = FloatField("Seconds", [Optional(), NumberRange(min=0, max=60)])
    elevation = FloatField("Elevation", [Optional(), NumberRange(max=29029)])
    sport = StringField("Sport", [DataRequired(
        "Please enter a sport"), Length(min=1, max=100)])
    date = DateField("Date", [Optional()])
    time = DateField("Time", [Optional()])
    title = StringField("Title", [Optional()])
    description = StringField("Description", [Optional()])
    private_notes = StringField("Private Notes", [Optional()])
