from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Activity, User, db
import json
activity_routes = Blueprint("activites", __name__)


@activity_routes.route("/")
@login_required
def get_activities():
    print([club.get_members() for club in current_user.clubs])
    print([club.members for club in current_user.clubs])
    print(current_user.clubs)

    test = set()

    [[test.add(member) for member in club.members]
     for club in current_user.clubs]
    print(test)
    return "HELLO"
