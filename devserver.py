from fastapi import FastAPI, Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from time import time


class CreateItem(BaseModel):
    content: str
    language: str | None = None


app = FastAPI()
cache = {}


# 2 of these are wrong but I hate CORS and I don't know which
origins = [
    "http://localhost:5500",
    "http://localhost:8080",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/item")
async def get_item(key: str) -> dict | Response:
    if key in cache:
        return cache[key]

    return Response(None, 404)

@app.post("/api/new")
async def new_item(item: CreateItem) -> dict:
    key = str(round(time() * 1000000))

    cache[key] = item.dict()

    return {"key": key}
