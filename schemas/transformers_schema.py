from typing import Optional
from pydantic import BaseModel as SCBaseModel

class TransformersSchema(SCBaseModel):
    id: Optional[int] = None
    name: str
    team: str
    color: str
    age: int

    class Config:
        orm_mode = True