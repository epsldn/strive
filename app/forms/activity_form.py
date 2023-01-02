from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length


class ActivityForm(FlaskForm):
    pass
