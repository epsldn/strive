from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
import datetime


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def date_check(form, field):
    date = field.data
    if date > datetime.date.today():
        raise ValidationError("Birthdate cannot be in the future")
    if date.year < datetime.date.today().year - 150:
        raise ValidationError("Birthdate cannot be over 150 years ago")


class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired("First Name is required"), Length(max=40, message="First Name is too long")])
    last_name = StringField("Last Name", validators=[DataRequired("Last Name is required"), Length(max=40, message="Last Name is too long")])
    email = StringField('email', validators=[
                        DataRequired("Email is required"), user_exists])
    password = StringField('password', validators=[
                           DataRequired("Password is required")])
    birthdate = DateField(
        "birthdate", validators=[DataRequired("Please input your birthdate"), date_check])
