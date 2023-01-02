from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

activity_routes = Blueprint("activites", __name__)


@activity_routes.route("/")
def get_activities():
    return "HELLO"
