from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Club, db, Activity
from app.forms import ClubForm
from datetime import datetime

club_routes = Blueprint("clubs", __name__)


@club_routes.route("/")
# @login_required
def get_clubs():
    clubs = Club.query.all()
    return jsonify({club.id: club.to_dict() for club in clubs}), 200


@club_routes.route("/search", methods=["POST"])
@login_required
def club_search():
    dataDictionary = request.get_json()

    query = Club.query

    if "club_name" in dataDictionary and dataDictionary["club_name"]:
        club_name = dataDictionary["club_name"]
        query = query.filter(Club.club_name.ilike("%" + club_name + "%"))
    if "location" in dataDictionary and dataDictionary["location"]:
        location = dataDictionary["location"]
        query = query.filter(Club.location.ilike("%" + location + "%"))
    if "sport" in dataDictionary and dataDictionary["sport"]:
        sport = dataDictionary["sport"]
        query = query.filter(Club.sport.ilike("%" + sport + "%"))
    if "type" in dataDictionary and dataDictionary["type"]:
        type = dataDictionary["type"]
        query = query.filter(Club.type.ilike("%" + type + "%"))

    clubs = query.order_by(Club.club_name).all()

    return jsonify([club.to_dict() for club in clubs]), 200


@ club_routes.route("/<int:clubId>/join")
@ login_required
def join_club(clubId):
    user = User.query.get(current_user.id)
    club = Club.query.get(clubId)

    if club is None:
        return jsonify({"error": "club not found"}), 404

    if club not in user.clubs:
        user.clubs.append(club)
        db.session.commit()
        return jsonify({"message": "success!"}), 200
    else:
        return jsonify({"error": "User in Club"}), 400


@ club_routes.route("/<int:clubId>/leave")
@ login_required
def leave_club(clubId):
    user = User.query.get(current_user.id)
    club = Club.query.get(clubId)

    if club is None:
        return jsonify({"error": "club not found"}), 404

    if club in user.clubs:
        user.clubs.remove(club)
        db.session.commit()
        return jsonify({"message": "success!"}), 200

    else:
        return jsonify({"error": "User not in club"}), 404


@ club_routes.route("/<int:clubId>/activities")
@ login_required
def get_activities(clubId):
    club = Club.query.get(clubId)

    if club is None:
        return {"error": "Club not found"}, 404

    members = [member.id for member in club.members]

    activities = Activity.query.filter(
        Activity.user_id.in_(members)).filter(Activity.date <= datetime.now()).order_by(Activity.date.desc(), Activity.time.desc()).all()

    return jsonify([activity.to_dict() for activity in activities]), 200


@ club_routes.route("/", methods=["POST"])
@ login_required
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


@ club_routes.route("/<int:clubId>", methods=["PUT"])
@ login_required
def update_club(clubId):
    if clubId not in current_user.to_dict()["owned_clubs"]:
        return {"error": "No club with that ID found"}, 400

    request_json = request.get_json()
    print(request_json)

    if "club_banner" in request_json or "club_image" in request_json:
        club = Club.query.get(clubId)

        if "club_banner" in request_json:
            club.club_banner = request_json["club_banner"]
        if "club_image" in request_json:
            club.club_image = request_json["club_image"]

        db.session.commit()
        return jsonify({"message": "success!", "updatedClub": club.to_dict()}), 200

    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        del form["csrf_token"]
        club = Club.query.get(clubId)
        print("\n")
        print("\n", club.to_dict())
        if club:
            club.club_name = form.data["club_name"]
            club.description = form.data["description"]
            club.location = form.data["location"]
            club.sport = form.data["sport"]
            club.type = form.data["type"]
            club.website = form.data["website"]
            db.session.commit()

            return jsonify({"message": "success!", "updatedClub": club.to_dict()}), 200
        else:
            return {"errors": "No club with that ID found."}, 400
    else:
        return {'errors': {k: v[0] for k, v in form.errors.items()}}, 400


@ club_routes.route("/<int:clubId>", methods=["DELETE"])
@ login_required
def delete_club(clubId):
    if clubId not in current_user.to_dict()["owned_clubs"]:
        return {"error": "No club with that ID found"}, 400
    club = Club.query.get(clubId)
    if not club:
        return {"errors": "No club with that ID found."}, 400
    else:
        db.session.delete(club)
        db.session.commit()
        return {"message": f"Success! Club with id {clubId} deleted"}


@ club_routes.route("/<int:clubId>")
@ login_required
def get_club_info(clubId):
    club = Club.query.get(clubId)
    if (club):
        return club.to_dict(), 200
    else:
        return {"error": "No club found"}, 400
