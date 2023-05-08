from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy()

class Team(db.Model, SerializerMixin):
    __tablename__ = "teams"

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    total_points = db.Column(db.Integer)
    games_won = db.Column(db.Integer)
    team_ranking = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

class Player(db.Model, SerializerMixin):
    __tablename__ = "players"

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    total_points = db.Column(db.Integer)
    times_mvp = db.Column(db.Integer)
    player_ranking = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    team_ID = db.Column(db.Integer, db.ForeignKey("team.id"))

class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    home_points = db.Column(db.Integer)
    away_points = db.Column(db.Integer)
    
    mvp_player_id = db.Column(db.Integer, db.ForeignKey("player.id"))
    team_id = db.Column(db.Integer, db.ForeignKey("team.id"))

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String)