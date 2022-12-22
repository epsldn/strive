from flask import Blueprint, request, jsonify
from app.models import db, User
from flask_login import current_user, login_required
from app.aws_upload import upload_file, file_checker, get_unique_filename

image_routes = Blueprint(__name__, __name__, url_prefix="/images")


@image_routes.route("/user-profile", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not file_checker(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    user = User.query.get(current_user.id or 1)

    user.profileImage = url
    db.session.commit()
    
    return jsonify({"url": url}), 200
