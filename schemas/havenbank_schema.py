from typing import Optional
from pydantic import BaseModel as SCBaseModel

# User Schema (Pydantic)
class UserSchema(SCBaseModel):
    id: Optional[int] = None
    name: str
    email: str
    password_hash: str
    created_at: Optional[str] = None  # Timestamp or datetime

    class Config:
        orm_mode = True


# Account Schema (Pydantic)
class AccountSchema(SCBaseModel):
    id: Optional[int] = None
    user_id: int
    account_number: str
    balance: float
    created_at: Optional[str] = None  # Timestamp or datetime

    class Config:
        orm_mode = True


# Transaction Schema (Pydantic)
class TransactionSchema(SCBaseModel):
    id: Optional[int] = None
    from_account_id: int
    to_account_id: int
    amount: float
    transaction_type: str
    created_at: Optional[str] = None
    image: str

    class Config:
        orm_mode = True

class CardSchema(SCBaseModel):
    id: Optional[int] = None
    account_id: int
    card_number: str
    card_type: str
    expiration_date: str
    cvv: str

    class Config:
        orm_mode = True