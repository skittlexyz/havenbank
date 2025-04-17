from pydantic.v1 import BaseSettings
from sqlalchemy.orm import declarative_base

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    DB_URL: str = "mysql+asyncmy://root@127.0.0.1:3306/havenbank" # nome do banco de dados dentro do servidor sql | mysql usa asyncmy, outros servidores usam outras async libs, por exemplo asyncio
    DBBaseModel = declarative_base()

class Config:
    case_sensitive = False
    env_file = "env"

settings = Settings()