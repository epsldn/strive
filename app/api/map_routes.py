from flask import Blueprint, jsonify, request
from flask_login import login_required
import requests
import os

# https://maps.googleapis.com/maps/api/place/autocomplete/json
#   ?input=Paris
#   &types=geocode
#   &key=YOUR_API_KEY


map_routes = Blueprint("maps", __name__)


@map_routes.route("/city-search")
# @login_required
def city_search():
    search = request.get_json()["search"]
    places_key = os.getenv("GOOGLE_MAPS")
    url = f"https://maps.googleapis.com/maps/api/place/autocomplete/json?input={search}&&types=%28cities%29&key={places_key}"
    data = requests.get(url)
    return data.json()
