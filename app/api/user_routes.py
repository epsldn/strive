from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Club, Activity, db
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


@user_routes.route('/<int:ahtleteId>/follow-request')
@login_required
def follow_user(athleteId):
    user = User.query.one_or_none(current_user.id)
    follow_requested = User.query.one_or_none(athleteId)

    if follow_requested:
        follow_requested.requests.append(user)
        db.session.commit()
        return jsonify({"success": "Request to follow successfully sent"}), 201
    else:
        return jsonify({"error": "Requested user not found"}), 404


@user_routes.route('/<int:athleteId>')
@login_required
def find_user(athleteId):
    athlete = User.query.get(athleteId)
    if athlete is None:
        return {"error": "Athlete not found"}

    activities = Activity.query.filter(Activity.user_id == athlete.id).filter(
        Activity.date <= datetime.now()).order_by(Activity.date.desc(), Activity.time.desc()).all()

    return jsonify({**athlete.to_dict(), "activities": [activity.to_dict() for activity in activities]}), 200
