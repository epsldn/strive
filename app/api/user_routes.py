from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Club

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/test")
def test():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    print("")
    print("")
    print("USER TEST", [club.get_id() for club in user1.clubs], [
          club.get_id() for club in user1.owned_clubs])
    print("")
    print("")

    print("USER TEST", [club.get_id() for club in user2.clubs], [
          club.get_id() for club in user2.owned_clubs])
    print("")
    print("")

    print("USER TEST", [club.get_id() for club in user3.clubs], [
          club.get_id() for club in user3.owned_clubs])
    print("")
    print("")

    club1 = Club.query.get(1)
    club2 = Club.query.get(2)
    club3 = Club.query.get(3)

    print("")
    print("")
    print("CLUB TEST", club1.owner.get_id(), [
          member.get_id() for member in club1.members])
    print("")
    print("")
    print("CLUB TEST", club2.owner.get_id(), [
          member.get_id() for member in club2.members])
    print("")
    print("")
    print("CLUB TEST", club3.owner.get_id(), [
          member.get_id() for member in club3.members])
    print("")
    print("")

    return jsonify("DONE TESTING"), 200
