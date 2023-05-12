# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

# db = SQLAlchemy()

class Team(db.Model, SerializerMixin):
    __tablename__ = "teams"

    # serialize_rules = ("-created_at", "-updated_at", "-players.team", "home_games")----> Wally's Code Originally
    # serialize_rules = ("-created_at", "-updated_at", "-players.team", "-home_games.home_team", "-away_games.away_team")----> Code im playing aroudn with
    serialize_rules = ("-created_at", 
                       "-updated_at",
                       
                       "-players.team", 
                       "-players.mvp_games",
                    
                       "-home_games.home_team",
                       "-home_games.away_team",
                       "-home_games.home_team_id", 
                       "-home_games.away_team_id",
                       "-home_games.mvp_player_id",
                       "-home_games.mvp_player",
                          
                       "-away_games.home_team",
                       "-away_games.away_team",
                       "-away_games.home_team_id", 
                       "-away_games.away_team_id",
                       "-away_games.mvp_player_id",
                       "-away_games.mvp_player",
                       )     
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    total_points = db.Column(db.Integer)
    games_won = db.Column(db.Integer)
    team_ranking = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    home_games = db.relationship("Game", foreign_keys="Game.home_team_id", back_populates="home_team")
    away_games = db.relationship("Game", foreign_keys="Game.away_team_id", back_populates="away_team")
    players = db.relationship("Player", back_populates="team")

    # @validates("name")
    # def validate_name(self, key, name):
    #     if name == True:
    #         return name
    #     raise ValueError("Team name can not be blank")
    
    # @validates("team_ranking")
    # def validate_team_ranking(self, key, team_ranking):
    #     if team_ranking >= 0 and team_ranking <= 11:
    #         return team_ranking
    #     raise ValueError("Team must have a ranking between 1 and 10")

    def __repr__(self):
        return f"Team: {self.name} <{self.id}>"
    
class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    # serialize_rules = ("-created_at", "-updated_at", "-team.games", "-player.games", "-home_team", "-away_team")
    serialize_rules = ("-created_at", 
                       "-updated_at",
                       
                       "-mvp_player_id",
                       "-mvp_player.mvp_games",
                       "-mvp_player.player_ranking",
                       "-mvp_player.team",
                       "-mvp_player.team_id",
                       "-mvp_player.times_mvp",
                       "-mvp_player.total_points",
                       
                       "-home_team_id",
                       "-home_team.away_games",
                       "-home_team.games_won",
                       "-home_team.home_games",
                       "-home_team.away_games",
                       "-home_team.players",
                       "-home_team.team_ranking",
                       "-home_team.total_points",
                       
                       "-away_team_id",
                       "-away_team.away_games",
                       "-away_team.games_won",
                       "-away_team.home_games",
                       "-away_team.away_games",
                       "-away_team.players",
                       "-away_team.team_ranking",
                       "-away_team.total_points",)

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    home_points = db.Column(db.Integer)
    away_points = db.Column(db.Integer)
    
    mvp_player_id = db.Column(db.Integer, db.ForeignKey("players.id"))
    home_team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))
    away_team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))

    home_team = db.relationship("Team", foreign_keys=[home_team_id], back_populates="home_games")
    away_team = db.relationship("Team", foreign_keys=[away_team_id], back_populates="away_games")
    mvp_player = db.relationship("Player", back_populates="mvp_games")

    # @validates("home_team_id")
    # def validate_home_team_id(self, key, home_team_id):
    #     if home_team_id == True:
    #         return home_team_id
    #     raise ValueError("You need to supply a home team")
    
    # @validates("away_team_id")
    # def validate_away_team_id(self, key, away_team_id):
    #     if away_team_id == True:
    #         return away_team_id
    #     raise ValueError("You need to supply an away team")

    def __repr__(self):
        return f"Game: {self.id}"
    
    # Advanced repr -- need to figure out
    # def __repr__(self):
    #     home_team = session.query(Team).filter(Team.id == self.home_team_id).one_or_none()
    #     away_team = session.query(Team).filter(Team.id == self.away_team_id).one_or_none()
    #     return f"Game: {self.id} -- Home: {home_team.name}, Away: {away_team.name}"

class Player(db.Model, SerializerMixin):
    __tablename__ = "players"

    # serialize_rules = ("-created_at", "-updated_at", "-team.players", "-mvp_games.mvp_player")
    serialize_rules = ("-created_at", 
                       "-updated_at",
                        
                       "-team.players", 
                       "-team.away_games", 
                       "-team.home_games", 
                       "-team.games_won",
                       "-team.team_ranking", 
                       "-team.total_points",
                       "-mvp_games.mvp_player")

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    total_points = db.Column(db.Integer)
    times_mvp = db.Column(db.Integer)
    player_ranking = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))

    team = db.relationship("Team", back_populates="players")
    mvp_games = db.relationship("Game", back_populates="mvp_player")

    # @validates("name")
    # def validate_name(self, key, name):
    #     if name == True:
    #         return name
    #     raise ValueError("Player name can not be blank")
    
    # @validates("player_ranking")
    # def validate_player_ranking(self, key, player_ranking):
    #     if player_ranking >= 0 and player_ranking <= 11:
    #         return player_ranking
    #     raise ValueError("Player must have a ranking between 1 and 10")

    def __repr__(self):
        return f"Player: {self.name} <{self.id}>"

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        print(password_hash)
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"User: <username:{self.username}>"