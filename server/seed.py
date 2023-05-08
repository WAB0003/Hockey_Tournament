#!/usr/bin/env python3

from random import choice as rc
from faker import Faker

from app import app
from models import db, Player #!Import Classes here

fake = Faker()
#!Example Seed Data
def make_players():
    # Player.query.delete()                                 #!Delete players from database
    print("deleted all players from database....")
    # import ipdb; ipdb.set_trace()
    range_nubmer = 120
    print(f"Creating {range_nubmer} players for seed....")
    
    players = []
    for i in range(range_nubmer):
        print(i)
        
    

#     Movie.query.delete()
    
#     movies = []
#     for i in range(50):
#         m = Movie(title=fake.sentence(nb_words=4).title())
#         movies.append(m)

#     db.session.add_all(movies)
#     db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        make_players()
