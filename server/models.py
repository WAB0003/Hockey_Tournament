from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()

#!Example Class:
# class Movie(db.Model, SerializerMixin):
#     __tablename__ = 'movies'

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String)

# import ipdb; ipdb.set_trace()

#     def __repr__(self):
#         return f'<Movie {self.title}>'
