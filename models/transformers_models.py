from core.configs import settings
from sqlalchemy import Column, String, Integer, Float

class TransformersModel(settings.DBBaseModel):
    __tablename__ = "characters" # nome da tabela do banco de dados representada por esse model

    id: int = Column(Integer(), primary_key = True, autoincrement = True)
    name: str = Column(String(128), nullable = False)
    team: str = Column(String(16), nullable = False)
    color: str = Column(String(16))
    age: int = Column(Integer())