from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates, sessionmaker
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy()

class Team(db.Model, SerializerMixin):
    __tablename__ = "teams"

    serialize_rules = ("-created_at", "-updated_at", "-players.team", "-games.team")

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

    def __repr__(self):
        return f"Team: {self.name} <{self.id}>"

class Player(db.Model, SerializerMixin):
    __tablename__ = "players"

    serialize_rules = ("-created_at", "-updated_at", "-team.players", "-mvp_games.player")

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

    def __repr__(self):
        return f"Player: {self.name} <{self.id}>"

class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    serialize_rules = ("-created_at", "-updated_at", "-team.games", "-player.games")

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    home_points = db.Column(db.Integer)
    away_points = db.Column(db.Integer)
    
    mvp_player_id = db.Column(db.Integer, db.ForeignKey("players.id"))
    home_team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))
    away_team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))

    home_team = db.relationship("Team", foreign_keys=[home_team_id], back_populates="home_games")
    away_team = db.relationship("Team", foreign_keys=[away_team_id], back_populates="away_games")
    mvp_player = db.relationship("Player", back_populates="mvp_games")

    def __repr__(self):
        return f"Game: {self.id}"
    
    # Advanced repr -- need to figure out
    # def __repr__(self):
    #     home_team = session.query(Team).filter(Team.id == self.home_team_id).one_or_none()
    #     away_team = session.query(Team).filter(Team.id == self.away_team_id).one_or_none()
    #     return f"Game: {self.id} -- Home: {home_team.name}, Away: {away_team.name}"

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

    # Password stuff
    # @hybrid_property
    # def password_hash(self):
    #     return self._password_hash
    
    # @password_hash.setter
    # def password_hash(self, password):
    #     password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    #     print(password_hash)
    #     self._password_hash = password_hash.decode('utf-8')

    def __repr__(self):
        return f"User: <username:{self.username}>"