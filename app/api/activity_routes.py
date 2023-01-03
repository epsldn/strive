from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Activity, User, db
from app.forms import ActivityForm

activity_routes = Blueprint("activites", __name__)


@activity_routes.route("/")
@login_required
def get_activities():
    members = set()

    [[members.add(member) for member in club.members]
     for club in current_user.clubs]

    activites = []

    [[activites.append(activity.to_dict())
      for activity in member.activities] for member in list(members)]

    return jsonify({activity["id"]: activity for activity in activites})


@activity_routes.route("/", methods=["POST"])
@login_required
def create_activity():
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form["user_id"].data = current_user.id

    if form.validate_on_submit():
        del form["csrf_token"]
        activity = Activity(**form.data)
        db.session.add(activity)
        db.session.commit()
        return jsonify({"message": f"Success! Activity created with id {activity.id}", "activity": activity.to_dict()}), 200
    else:
        return {'errors': {k: v[0] for k, v in form.errors.items()}}, 400
