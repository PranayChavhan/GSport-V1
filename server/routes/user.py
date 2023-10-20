from fastapi import APIRouter
from config.db import conn
from models.index import users
from schemas.index import User
user = APIRouter()

@user.get("/")
async def read_data():
    return conn.execute(users.select()).fetchall()


@user.post("/helo")
async def write_data(user: User):
    conn.execute(users.insert().values(
        name=user.name,
        email=user.email,
        password=user.password
    ))
    return conn.execute(users.select()).fetchall()