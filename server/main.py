from fastapi import FastAPI
from routes.index import user
app = FastAPI()

# @app.get("/")
# def read_something():
#     return {"msg":"Hello World"}

app.include_router(user)