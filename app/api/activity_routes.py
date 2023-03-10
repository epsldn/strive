from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Activity, User, db
from app.forms import ActivityForm
from datetime import datetime

activity_routes = Blueprint("activites", __name__)


@activity_routes.route("/")
@login_required
def get_activities():
    members = set([current_user])

    [[members.add(member) for member in club.members]
     for club in current_user.clubs]

    activites = Activity.query.filter(Activity.user_id.in_(
        [member.id for member in members])).filter(Activity.date <= datetime.now()).order_by(Activity.date.desc(), Activity.time.desc()).all()

    activites = [activity.to_dict() for activity in activites]

    return jsonify(activites)


@activity_routes.route("/following-activities")
@login_required
def get_following_activities():
    athletes = set([])

    [athletes.add(athlete) for athlete in current_user.followed]

    activites = Activity.query.filter(Activity.user_id.in_(
        [athlete.id for athlete in athletes])).filter(Activity.date <= datetime.now()).order_by(Activity.date.desc(), Activity.time.desc()).all()

    activites = [activity.to_dict() for activity in activites]

    return jsonify(activites)


@activity_routes.route("/", methods=["POST"])
@login_required
def create_activity():
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form["user_id"].data = current_user.id
    time = request.get_json()["time"]
    date = request.get_json()["date"]
    form["time"].data = datetime.strptime(
        time, '%H:%M').time() if time else datetime.now().time()
    if not form["date"].data:
        form["date"].data = datetime.now()
    if form.validate_on_submit():
        del form["csrf_token"]
        activity = Activity(**form.data)
        db.session.add(activity)
        db.session.commit()
        return jsonify({"message": f"Success! Activity created with id {activity.id}", "activity": activity.to_dict()}), 200
    else:
        return {'errors': {k: v[0] for k, v in form.errors.items()}}, 400


@activity_routes.route("/<int:activityId>", methods=["PUT"])
@login_required
def update_activity(activityId):
    activity = Activity.query.get(activityId)

    if activity is None:
        return {"error": "Activity not found"}, 404

    if activity.user_id != current_user.id:
        return {"error": "Activity not found"}, 401

    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form["user_id"].data = current_user.id

    if form.validate_on_submit():
        activity.title = form.data["title"]
        activity.sport = form.data["sport"]
        activity.description = form.data["description"]
        activity.private_notes = form.data["private_notes"]
        activity.extertion = form.data["extertion"]

        db.session.commit()

        return jsonify({"message": f"Success! Activity with an id of {activityId} update", "updatedActivity": activity.to_dict()}), 200
    else:
        return jsonify({'errors': {k: v[0] for k, v in form.errors.items()}}), 400


@activity_routes.route("/<int:activityId>", methods=["DELETE"])
@login_required
def delete_activity(activityId):
    activity = Activity.query.get(activityId)

    if (activity.user_id != current_user.id):
        return {"error": "activity not found"}, 401

    db.session.delete(activity)
    db.session.commit()
    return {"message": f"Success! Activity with id {activityId} deleted."}
