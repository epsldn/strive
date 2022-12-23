from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Club, db
from app.forms import ClubForm

club_routes = Blueprint("clubs", __name__)


@club_routes.route("/")
# @login_required
def get_clubs():
    clubs = Club.query.all()
    return jsonify({club.id: club.to_dict() for club in clubs}), 200

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
        db.session.commit()
        return jsonify(newClub.to_dict()), 200
    else:
        return {'errors': {k: v[0] for k, v in form.errors.items()}}, 400


@club_routes.route("/<int:clubId>")
# @login_required
def get_club_info(clubId):
    club = Club.query.get(clubId)
    if (club):
        return club.to_dict(), 200
    else:
        return {"error": "No club found"}, 400
