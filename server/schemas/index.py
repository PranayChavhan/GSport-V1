from pydantic import BaseModel
import datetime
from typing import Optional, Any
import enum



class Token(BaseModel):
    token: str
    
class PhoneNumber(BaseModel):
    phone_number: str
    
class ValidateCode(Token):
    code: str
    
class Message(BaseModel):
    message: str
    
    
    
class User(BaseModel):
    email_id: str
    full_name: str
    phone_no:str

class Player(BaseModel):
    name: str
    email_id: str
    mobile_number: str
    dob: datetime.date
    password: str

class Organizer(BaseModel):
    name: str
    email_id: str
    mobile_number: str
    password: str
    
class Wishlist(BaseModel):
    user_id: str
    tournament_id: str

class Tournament(BaseModel):
    id:str
    name: str
    about: str
    organizer_id: str
    organizer_name: str
    organizer_info: str
    start_date: datetime.datetime
    end_date: datetime.datetime
    is_payment_done: bool = False
    image:str
    payment_id: str
    is_active: bool = True

class Commentry(BaseModel):
    comment: str
    
    
class Sports_contest(BaseModel):
    name: str
    
class match(BaseModel):
    match_details: str
    sports_contest_id: str
class Tournament_Games(BaseModel):
    name: str
    info: str = None
    tournament_id :str
    participation_fees: int
    prize_pool: int
    max_teams: int
    team_size: int
    min_girls: int
    min_boys: int
    open_to: int
    total_rounds: int
    type: int
    # if type is 2 i.e league or gourp tournament
    num_groups: int = None
    teams_per_group: int = None
    # if type 2 ends
    min_age: int
    max_age: int
    avg_duration: int
    start_date: datetime.datetime
    end_date: datetime.datetime
    

class Document(BaseModel):
    user_id: str
    document_type: str
    document_url: str

class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None

class Login(BaseModel):
    # email_id: str
    # password: str
    phone_no: int

class GenericResponseModel(BaseModel):
    """Generic response model for all responses"""
    api_id: Optional[str] = None
    status: Optional[str]
    message: Optional[str]
    data: Any = None
    status_code: Optional[int] = None

class Teams(BaseModel):
    name: str
    admin_id: str
    tournament_id: str
    tournament_game_id: str
    no_of_boys: int
    no_of_girls: int
    verified: bool = False
    payment_id: str
    matches: int
    win: int
    loose: int
    points: int
    score: int
    image:str

class TeamPlayers(BaseModel):
    team_id: str
    player_id: str

class Umpires(BaseModel):
    user_id: str
    game_id: str

class Grounds(BaseModel):
    name: str
    game_id: str
    location: Optional[str] = None

class Winners(BaseModel):
    winner_id: str
    points: int
    nr: float

class Losers(BaseModel):
    loser_id: str
    points: int
    nr: float


class Vtb(BaseModel):
    team_id: str
    scored_by: str
    points: int
    fixture_id: int


class GoalsType(str, enum.Enum):
    NORMAL_GOAL = "Normal Goal"
    FREE_KICK = "Free Kick"
    OWN_GOAL = "Own Goal"
    HEADER = "Header"
    PENALTY = "Penalty"

class Football_Goals(BaseModel):
    team_id: str
    scored_by: str
    assist_by: str=None
    goal_type: GoalsType
    fixture_id: int
    minute: int

class Football_Cards(BaseModel):
    fixture_id: int
    team_id: str
    player_id: str
    reason: str
    card_type: str
    minute: int

class Football_Shootout(BaseModel):
    fixture_id: int
    team_id: str
    player_id: str
    number: int
    # 1 - scored   0 -missed
    result: int

class Football_Time(BaseModel):
    fixture_id: int
    duration: int
    time_type: str
    total_goals_scored: int
    total_yellow_cards: int
    total_red_cards: int




    