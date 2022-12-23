from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Club, db
from app.forms import ClubForm

club_routes = Blueprint("clubs", __name__)


@club_routes.route("/", methods=["POST"])
# @login_required
def create_club():
    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        del form["csrf_token"]
        newClub = Club(**form.data)
        db.session.add(newClub)
        db.session.commit()
        newClub.members.append(newClub.owner)
        print("\n", newClub.members[0].to_dict(), "\n")
        return jsonify(newClub.to_dict()), 200

    else:
        return form.errors, 400
