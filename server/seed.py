#!/usr/bin/env python3

from random import choice as rc
from faker import Faker

from app import app
from models import db, Player, Team #!Import Classes here

fake = Faker()


#!SEED Team Data
def make_teams():
    #Delete any existing teams from database
    #* Team.query.delete()
    print("Deleted Teams from database....")
    print("Creating Teams for database....")
    team_names = [
        "Kraken", 
        "Avalanche", 
        "Stars", 
        "Canucks", 
        "Burins", 
        "Maple Leafs", 
        "Panthers",
        "Wild"
    ]
    teams = []
    for name in team_names:
        team = Team(name=name)
        teams.append(team)
    
    # db.session.add_all(teams)
    # db.session.commit()
    print(f"{len(teams)} Teams have been seeded into database....\n")
    
        
#!SEED PLAYER DATA 
def make_players():
    #* Player.query.delete()                      
    print("Deleted all players from database....")
    #Get team quantity
    team_qty = len(Team.query.all()) #8 were used 
    players_per_team = 12
    total_players = team_qty * players_per_team
    
    print(f"Creating {players_per_team} players per team for a total of {total_players} players....")
    
    players = []
    for team in range(team_qty):
        for each_player in range(players_per_team):
            player = Player(name=fake.name(), team_ID=team)
            players.append(player)
            # print(f"name:{player.name} | Team_ID:{player.team_ID}")
            
    db.session.add_all(players)
    db.session.commit()
    print(f"{len(total_players)} players have been seeded into database....\n")
    

if __name__ == '__main__':
    with app.app_context():
        make_teams()
        make_players()
