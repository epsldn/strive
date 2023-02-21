from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Club, Activity, db
from datetime import datetime

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:ahtleteId>/request-follow', methods=["POST"])
@login_required
def send_follow_request(ahtleteId):
    user = User.query.get(current_user.id)
    follow_requested = User.query.get(ahtleteId)

    if follow_requested:
        user.requests_sent.append(follow_requested)
        db.session.commit()
        return jsonify({"user": {**current_user.to_dict(),  "followers": {follower.id: follower.activity_info() for follower in current_user.followed_by}, "follows": {followed.id: followed.activity_info() for followed in current_user.followed}}, "success": "Request to follow successfully sent"}), 201
    else:
        return jsonify({"error": "Requested user not found"}), 404


@user_routes.route('/<int:ahtleteId>/accept-follow', methods=["POST"])
@login_required
def accept_follow_request(ahtleteId):
    user = User.query.get(current_user.id)
    requestor = User.query.get(ahtleteId)

    if requestor:
        user.followed_by.append(requestor)
        user.requests.remove(requestor)
        db.session.commit()
        return jsonify({"user": {**current_user.to_dict(),  "followers": {follower.id: follower.activity_info() for follower in current_user.followed_by}, "follows": {followed.id: followed.activity_info() for followed in current_user.followed}}, "success": "Request to follow successfully sent"}), 201
    else:
        return jsonify({"error": "Requested user not found"}), 404


@user_routes.route('/<int:ahtleteId>/unfollow', methods=["DELETE"])
@login_required
def unfollow_user(ahtleteId):
    user = User.query.get(current_user.id)
    unfollowing = User.query.get(ahtleteId)

    if unfollowing:
        user.followed.remove(unfollowing)
        db.session.commit()
        return jsonify({"user": {**current_user.to_dict(),  "followers": {follower.id: follower.activity_info() for follower in current_user.followed_by}, "follows": {followed.id: followed.activity_info() for followed in current_user.followed}}, "success": "Request to follow successfully sent"}), 201
    else:
        return jsonify({"error": "Requested user not found"}), 404


@user_routes.route('/<int:ahtleteId>/request-follow', methods=["DELETE"])
@login_required
def cancel_follow_request(ahtleteId):
    user = User.query.get(current_user.id)
    follow_requested = User.query.get(ahtleteId)

    if follow_requested:
        user.requests_sent.remove(follow_requested)
        db.session.commit()
        return jsonify({"user": {**current_user.to_dict(),  "followers": {follower.id: follower.activity_info() for follower in current_user.followed_by}, "follows": {followed.id: followed.activity_info() for followed in current_user.followed}}, "success": "Request to follow successfully sent"}), 201
    else:
        return jsonify({"error": "Requested user not found"}), 404


@ user_routes.route('/<int:athleteId>')
@ login_required
def find_user(athleteId):
    athlete = User.query.get(athleteId)
    if athlete is None:
        return {"error": "Athlete not found"}

    activities = Activity.query.filter(Activity.user_id == athlete.id).filter(
        Activity.date <= datetime.now()).order_by(Activity.date.desc(), Activity.time.desc()).all()

    return jsonify({**athlete.to_dict(), "activities": [activity.to_dict() for activity in activities], "followers": {follower.id: follower.activity_info() for follower in athlete.followed_by}, "follows": {followed.id: followed.activity_info() for followed in athlete.followed}}), 200
