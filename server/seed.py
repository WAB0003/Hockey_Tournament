#!/usr/bin/env python3

#! NEW SEED DATA

from random import choice, randint
from faker import Faker

from app import app
from models import db, Player, Team, Game #!Import Classes here

fake = Faker()


#!SEED Team Data
def make_teams():
    print("_______________TEAMS TABLE______________")
    #Delete any existing teams from database
    Team.query.delete()
    print("Deleted Teams from database....")
    print("Creating Teams for database....")
    team_names = [
        "No Team",
        "Kraken", 
        "Avalanche", 
        "Stars", 
        "Canucks", 
        "Bruins", 
        "Maple Leafs", 
        "Panthers",
        "Wild"
    ]
    teams = []
    for name in team_names:
        team = Team(name=name)
        teams.append(team)
    
    db.session.add_all(teams)
    db.session.commit()
    print(f"{len(teams)} Teams have been seeded into database....\n")
    
    
        
#!SEED PLAYER DATA 
def make_players():
    print("______________PLAYERS TABLE______________")
    Player.query.delete()                      
    print("Deleted all players from database....")
    #Get team quantity
    team_qty = len(Team.query.all()) #8 were used 
    players_per_team = 12
    total_players = team_qty * players_per_team
    
    print(f"Creating {players_per_team} players per team for a total of {total_players} players....")
    
    players = []
    for team in range(1,team_qty+1):
        for each_player in range(players_per_team):
            player = Player(name=fake.name(), team_id=team)
            players.append(player)
            # print(f"name:{player.name} | Team_ID:{player.team_ID}")
            
    db.session.add_all(players)
    db.session.commit()
    print(f"{(total_players)} players have been seeded into database....\n")
    
    
#!SEED GAME DATA
def make_games():
    print("______________GAMES TABLE______________")
    Game.query.delete()                      
    print("Deleted all Games from database....")
    print("Make Game Table with empty values....")
    
    total_games = 7       #!Change input of total games
    
    all_empty_games = []
    for each_game in range(total_games+1):
        empty_game = Game()
   
        all_empty_games.append(empty_game)
    
    db.session.add_all(all_empty_games)
    db.session.commit()
    print(f"{len(all_empty_games)} Games have been seeded into database with No Values....\n")
    
    #*Create values for first 5 games  
    all_teams = Team.query.all()
    all_games = Game.query.all()
    #Game1
    all_games[0].home_points = randint(0,10)
    all_games[0].away_points = randint(0,10)
    all_games[0].mvp_player_id = randint(0,12)
    #*Change for teams
    all_games[0].home_team_id = all_teams[1].id
    all_games[0].away_team_id = all_teams[2].id
    
    db.session.add(all_games[0])
    db.session.commit()
    
    #Game2
    all_games[1].home_points = randint(0,10)
    all_games[1].away_points = randint(0,10)
    all_games[1].mvp_player_id = randint(0,12)
    #*Change for teams
    all_games[1].home_team_id = all_teams[3].id
    all_games[1].away_team_id = all_teams[4].id
    
    db.session.add(all_games[1])
    db.session.commit()
    
    #Game3
    all_games[2].home_points = randint(0,10)
    all_games[2].away_points = randint(0,10)
    all_games[2].mvp_player_id = randint(0,12)
    #*Change for teams
    all_games[2].home_team_id = all_teams[5].id
    all_games[2].away_team_id = all_teams[6].id
    
    db.session.add(all_games[2])
    db.session.commit()
    
    #Game4
    all_games[3].home_points = randint(0,10)
    all_games[3].away_points = randint(0,10)
    all_games[3].mvp_player_id = randint(0,12)
    #*Change for teams
    all_games[3].home_team_id = all_teams[7].id
    all_games[3].away_team_id = all_teams[8].id
    
    #*Game5
    all_games[4].home_team_id = all_teams[0].id
    all_games[4].away_team_id = all_teams[0].id
    
    #*Game6
    all_games[5].home_team_id = all_teams[0].id
    all_games[5].away_team_id = all_teams[0].id
    
    #*Game7
    all_games[6].home_team_id = all_teams[0].id
    all_games[6].away_team_id = all_teams[0].id
    
    #*Game8
    all_games[7].home_team_id = all_teams[0].id
    all_games[7].away_team_id = all_teams[0].id
    
    
    
    db.session.add(all_games[3])
    db.session.commit()
    
    print("Values for first 4 games have been inputed into seed data.....")
    
    # import ipdb; ipdb.set_trace()
    
    

    

if __name__ == '__main__':
    with app.app_context():
        make_teams()
        make_players()
        make_games()


# #! OLD SEED DATA
# from random import choice, randint
# from faker import Faker

# from app import app
# from models import db, Player, Team, Game #!Import Classes here

# fake = Faker()


# #!SEED Team Data
# def make_teams():
#     print("_______________TEAMS TABLE______________")
#     #Delete any existing teams from database
#     Team.query.delete()
#     print("Deleted Teams from database....")
#     print("Creating Teams for database....")
#     team_names = [
#         "No Team",
#         "Kraken", 
#         "Avalanche", 
#         "Stars", 
#         "Canucks", 
#         "Bruins", 
#         "Maple Leafs", 
#         "Panthers",
#         "Wild"
#     ]
#     teams = []
#     for name in team_names:
#         team = Team(name=name)
#         teams.append(team)
    
#     db.session.add_all(teams)
#     db.session.commit()
#     print(f"{len(teams)} Teams have been seeded into database....\n")
    
    
        
# #!SEED PLAYER DATA 
# def make_players():
#     print("______________PLAYERS TABLE______________")
#     Player.query.delete()                      
#     print("Deleted all players from database....")
#     #Get team quantity
#     team_qty = len(Team.query.all()) #8 were used 
#     players_per_team = 12
#     total_players = team_qty * players_per_team
    
#     print(f"Creating {players_per_team} players per team for a total of {total_players} players....")
    
#     players = []
#     for team in range(1,team_qty+1):
#         for each_player in range(players_per_team):
#             player = Player(name=fake.name(), team_id=team)
#             players.append(player)
#             # print(f"name:{player.name} | Team_ID:{player.team_ID}")
            
#     db.session.add_all(players)
#     db.session.commit()
#     print(f"{(total_players)} players have been seeded into database....\n")
    
    
# #!SEED GAME DATA
# def make_games():
#     print("______________GAMES TABLE______________")
#     Game.query.delete()                      
#     print("Deleted all Games from database....")
#     print("Make Game Table with empty values....")
    
#     total_games = 7       #!Change input of total games
    
#     all_empty_games = []
#     for each_game in range(total_games+1):
#         empty_game = Game()
   
#         all_empty_games.append(empty_game)
    
#     db.session.add_all(all_empty_games)
#     db.session.commit()
#     print(f"{len(all_empty_games)} Games have been seeded into database with No Values....\n")
    
#     #*Create values for first 5 games  
#     all_teams = Team.query.all()
#     all_games = Game.query.all()
#     #Game1
#     all_games[0].home_points = randint(0,10)
#     all_games[0].away_points = randint(0,10)
#     all_games[0].mvp_player_id = randint(0,12)
#     #*Change for teams
#     all_games[0].home_team_id = all_teams[1].id
#     all_games[0].away_team_id = all_teams[2].id
    
#     db.session.add(all_games[0])
#     db.session.commit()
    
#     #Game2
#     all_games[1].home_points = randint(0,10)
#     all_games[1].away_points = randint(0,10)
#     all_games[1].mvp_player_id = randint(0,12)
#     #*Change for teams
#     all_games[1].home_team_id = all_teams[3].id
#     all_games[1].away_team_id = all_teams[4].id
    
#     db.session.add(all_games[1])
#     db.session.commit()
    
#     #Game3
#     all_games[2].home_points = randint(0,10)
#     all_games[2].away_points = randint(0,10)
#     all_games[2].mvp_player_id = randint(0,12)
#     #*Change for teams
#     all_games[2].home_team_id = all_teams[5].id
#     all_games[2].away_team_id = all_teams[6].id
    
#     db.session.add(all_games[2])
#     db.session.commit()
    
#     #Game4
#     all_games[3].home_points = randint(0,10)
#     all_games[3].away_points = randint(0,10)
#     all_games[3].mvp_player_id = randint(0,12)
#     #*Change for teams
#     all_games[3].home_team_id = all_teams[7].id
#     all_games[3].away_team_id = all_teams[8].id
    
#     #*Game5
#     all_games[4].home_team_id = all_teams[0].id
#     all_games[4].away_team_id = all_teams[0].id
    
#     #*Game6
#     all_games[5].home_team_id = all_teams[0].id
#     all_games[5].away_team_id = all_teams[0].id
    
#     #*Game7
#     all_games[6].home_team_id = all_teams[0].id
#     all_games[6].away_team_id = all_teams[0].id
    
#     #*Game8
#     all_games[7].home_team_id = all_teams[0].id
#     all_games[7].away_team_id = all_teams[0].id
    
    
    
#     db.session.add(all_games[3])
#     db.session.commit()
    
#     print("Values for first 4 games have been inputed into seed data.....")
    
#     # import ipdb; ipdb.set_trace()
    
    

    

# if __name__ == '__main__':
#     with app.app_context():
#         make_teams()
#         make_players()
#         make_games()
