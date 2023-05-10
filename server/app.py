from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate

from models import db, Team, Player, Game, User        #!Add models here

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.debug = True

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

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
            return {"message":"Team Deleted"}, 204
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
            return {"message":"Player Deleted"}, 204
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
            return {"message":"game Deleted"}, 204
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

if __name__ == '__main__':
    app.run(port=5555)