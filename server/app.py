from flask import Flask, request, make_response, jsonify, abort, session
from flask_restful import Resource
from werkzeug.exceptions import NotFound, Unauthorized
from flask_cors import CORS
from flask_migrate import Migrate
from config import app, db, api

from models import db, Team, Player, Game, User        #!Add models here

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.debug = True

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

# @app.before_request
# def check_if_logged():
#     open_access_list = [
#         "signup",
#         "login",
#         "logout",
#         "authorized",
#         "productions"
#     ]
#     if (request.endpoint) not in open_access_list and (not session.get("user_id")):
#         raise Unauthorized

@app.route("/")
def home():
    return ""

@app.route("/teams", methods=["GET", "POST"])
def teams():
    if request.method == "GET":
        return [team.to_dict() for team in Team.query.all()]
    elif request.method == "POST":
        fields = request.get_json()
        try:
            team = Team(
                name=fields.get("name"),
                team_ranking=fields.get("team_ranking")
            )
            db.session.add(team)
            db.session.commit()
            return team.to_dict(), 201
        except ValueError:
            return {"error": "400: Validation errors"}, 400    
    
@app.route("/teams/<int:id>", methods=["GET", "DELETE", "PATCH"])
def team_by_id(id):
    team = Team.query.filter(Team.id == id).one_or_none()
    if request.method == "GET":
        if team:
            return team.to_dict()
        else:
            return {"error": "404: Team not found"}, 404
    elif request.method == "DELETE":
        if team:
            db.session.delete(team)
            db.session.commit()
            return {"message":"Team Deleted"}, 200
        return {"error": "404: Team not found"}, 404
    elif request.method == "PATCH":
        fields = request.get_json()
        if fields is None:
            return {"error": "400: Request body missing"}, 400
        if team:
            if "name" in fields:
                team.name = fields["name"]
            if "team_ranking"in fields:
                team.team_ranking = fields["team_ranking"]
            db.session.commit()
            return team.to_dict(), 200
        else:
            return {"error": "404: Team not found"}, 404
        
@app.route("/players", methods=["GET", "POST"])
def players():
    if request.method == "GET":
        return [player.to_dict() for player in Player.query.all()]
    elif request.method == "POST":
        fields = request.get_json()
        try:
            player = Player(
                name=fields.get("name"),
                player_ranking=fields.get("player_ranking"),
                team_id=fields.get("team_id")
            )
            db.session.add(player)
            db.session.commit()
            return player.to_dict(), 201
        except ValueError:
            return {"error": "400: Validation errors"}, 400    
    
@app.route("/players/<int:id>", methods=["GET", "DELETE", "PATCH"])
def player_by_id(id):
    player = Player.query.filter(Player.id == id).one_or_none()
    if request.method == "GET":
        if player:
            return player.to_dict()
        else:
            return {"error": "404: Player not found"}, 404
    elif request.method == "DELETE":
        if player:
            db.session.delete(player)
            db.session.commit()
            return {"message":"Player Deleted"}, 200
        return {"error": "404: Player not found"}, 404
    elif request.method == "PATCH":
        fields = request.get_json()
        if fields is None:
            return {"error": "400: Request body missing"}, 400
        if player:
            if "name" in fields:
                player.name = fields["name"]
            if "player_ranking"in fields:
                player.player_ranking = fields["player_ranking"]
            if "team_id" in fields:
                player.team_id = fields["team_id"]
            db.session.commit()
            return player.to_dict(), 200
        else:
            return {"error": "404: Player not found"}, 404
            
@app.route("/games", methods=["GET", "POST"])
def games():
    if request.method == "GET":
        return [game.to_dict() for game in Game.query.all()]
    elif request.method == "POST":
        fields = request.get_json()
        try:
            game = Game(
                home_team_id=fields.get("home_team_id"),
                away_team_id=fields.get("away_team_id")
            )
            db.session.add(game)
            db.session.commit()
            return game.to_dict(), 201
        except ValueError:
            return {"error": "400: Validation errors"}, 400

@app.route("/games/<int:id>", methods=["GET", "DELETE", "PATCH"])
def game_by_id(id):
    game = Game.query.filter(Game.id == id).one_or_none()
    if request.method == "GET":
        if game:
            return game.to_dict()
        else:
            return {"error": "404: game not found"}, 404
    elif request.method == "DELETE":
        if game:
            db.session.delete(game)
            db.session.commit()
            return {"message":"game Deleted"}, 200
        return {"error": "404: Game not found"}, 404
    elif request.method == "PATCH":
        fields = request.get_json()
        if fields is None:
            return {"error": "400: Request body missing"}, 400
        if game:
            if "home_points" in fields:
                game.home_points = fields["home_points"]
            if "away_points"in fields:
                game.away_points = fields["away_points"]
            if "mvp_player_id" in fields:
                game.mvp_player_id = fields["mvp_player_id"]
            if "home_team_id" in fields:
                game.home_team_id = fields["home_team_id"]
            if "away_team_id" in fields:
                game.away_team_id = fields["away_team_id"]
            db.session.commit()
            return game.to_dict(), 200
        else:
            return {"error": "404: Game not found"}, 404

#! /signup POST Decorator Route
@app.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        fields = request.get_json()
        try:
            new_user = User(
                username=fields.get("username"),
                email=fields.get("email"),
                password_hash=fields.get("password")
            )
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        except ValueError:
            return {"error": "404: This comes from new route in app.py"}, 404

#! /signup POST Resource Route
# class Signup(Resource):
#     def post(self):
#         form_json = request.get_json()
#         new_user = User(
#             username=form_json["username"],
#             email=form_json["email"],
#             password_hash=form_json["password"]
#         )

#         db.session.add(new_user)
#         db.session.commit()
#         # CONNOR SUGGESTION: newestUser = User.query.order_by(User.id.desc()).first()
#         # CONNOR SUGGESTION: session["user_id"] = newestUser.id
#         session["user_id"] = new_user.id
#         # CONNOR SUGGESTION: response = make_response(newestUser.to_dict(), 201)
#         response = make_response(new_user.to_dict(), 201)
#         return response
# api.add_resource(Signup, "/signup")

class Login(Resource):
    def post(self):
        user = User.query.filter_by(username=request.get_json()["username"]).first()
        if user and user.authenticate(request.get_json()["password"]):
            session["user_id"] = user.id
            response = make_response(user.to_dict(), 200)
            return response
        else:
            raise Unauthorized
api.add_resource(Login, "/login")

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session["user_id"]).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            raise Unauthorized
api.add_resource(AuthorizedSession, "/authorized", endpoint="authorized")

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        response = make_response("", 204)
        return response
api.add_resource(Logout, "/logout")

@app.errorhandler(NotFound)
def handle_not_found(e):
    # response = make_response(
    #     "Not Found: Sorry, the resource you're looking for doesn't exist",
    #     404
    # )

    # return response
    return {"error": "Sorry the resource you're looking for doesn't exits"}, 404

@app.errorhandler(Unauthorized)
def handle_unauthorized(e):
    # response = make_response(
    #     {"message": "Unauthorized: You must be logged in to do that"},
    #     401
    # )

    # return response
    return {"error": "Unauthorized: You must be logged in to do that"}, 401


if __name__ == '__main__':
    app.run(port=5555)