from fastapi import FastAPI
from core.configs import settings
from api.v1.api import api_router
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost", 
    "http://localhost:8080", 
    "http://localhost:5500", 
    "http://127.0.0.1"
    "http://127.0.0.1:8080"
    "http://127.0.0.1:5500"
]

app = FastAPI(title = "API Havenbank")
app.add_middleware(CORSMiddleware,
               allow_origins = origins, 
               allow_credentials = True, 
               allow_methods = ["POST", "GET", "PUT", "DELETE"],
               allow_headers = ["*"])
app.include_router(api_router, prefix = settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host = "127.0.0.1", port = 8000, log_level = "info", reload = True)