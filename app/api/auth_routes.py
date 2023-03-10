from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return {**current_user.to_dict(),  "followers": {follower.id: follower.activity_info() for follower in current_user.followed_by}, "follows": {followed.id: followed.activity_info() for followed in current_user.followed}}
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email.ilike(form.data['email'])).first()
        login_user(user)
        return {**user.to_dict(), "followers": {follower.id: follower.activity_info() for follower in user.followed_by}, "follows": {followed.id: followed.activity_info() for followed in user.followed}}

    if "email" in form.errors and form.errors["email"] == ["Invalid Credentials"] or "password" in form.errors and form.errors["password"] == ["Invalid Credentials"]:
        return {"errors": {"serverError": "Invalid Credentials"}}, 401
    return {'errors': {k: v[0] for k, v in form.errors.items()}}, 401


@ auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@ auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            email=form.data['email'],
            password=form.data['password'],
            birthdate=form.data["birthdate"]
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return {**user.to_dict(), "followers": {follower.id: follower.activity_info() for follower in user.followed_by}, "follows": {followed.id: followed.activity_info() for followed in user.followed}}
    return {'errors': {k: v[0] for k, v in form.errors.items()}}, 400


@ auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


@ auth_routes.route("/check-email/<email>")
def check_email(email):
    user = User.query.filter(User.email.ilike(email)).first()
    if (user):
        return jsonify({"email": "User with this email already exits"}), 401
    else:
        return jsonify({"email": "No email found"}), 200
