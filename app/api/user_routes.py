from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Club, Activity
from datetime import datetime

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:athleteId>')
@login_required
def find_user(athleteId):
    athlete = User.query.get(athleteId)
    if athlete is None:
        return {"error": "Athlete not found"}

    activities = Activity.query.filter(Activity.user_id == athlete.id).filter(
        Activity.date <= datetime.now()).order_by(Activity.date.desc(), Activity.time.desc()).all()
        
    print("\n")
    print("\n")
    print(activities)
    print("\n")
    print("\n")

    return jsonify({**athlete.to_dict(), "activities": [activity.to_dict() for activity in activities]}), 200
