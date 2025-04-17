from core.configs import settings
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

class UserModel(settings.DBBaseModel):
    __tablename__ = "users"

    id: int = Column(Integer(), primary_key=True, autoincrement=True)
    name: str = Column(String(128), nullable=False)
    email: str = Column(String(128), unique=True, nullable=False)
    password_hash: str = Column(String(256), nullable=False)
    created_at: str = Column(String(32))

    accounts = relationship("AccountModel", back_populates="user")

class AccountModel(settings.DBBaseModel):
    __tablename__ = "accounts"

    id: int = Column(Integer(), primary_key=True, autoincrement=True)
    user_id: int = Column(Integer(), ForeignKey("users.id"), nullable=False)
    account_number: str = Column(String(16), unique=True, nullable=False)
    balance: float = Column(Float(), default=0.0)
    created_at: str = Column(String(32))

    user = relationship("UserModel", back_populates="accounts")
    cards = relationship("CardModel", back_populates="account")

class TransactionModel(settings.DBBaseModel):
    __tablename__ = "transactions"

    id: int = Column(Integer(), primary_key=True, autoincrement=True)
    from_account_id: int = Column(Integer(), nullable=False)  
    to_account_id: int = Column(Integer(), nullable=False)
    amount: float = Column(Float(), nullable=False)
    transaction_type: str = Column(String(16), nullable=False)
    created_at: str = Column(String(32))
    image: str = Column(String(255), nullable=True)

class CardModel(settings.DBBaseModel):
    __tablename__ = "cards"

    id: int = Column(Integer(), primary_key=True, autoincrement=True)
    account_id: int = Column(Integer(), ForeignKey("accounts.id"), nullable=False)
    card_number: str = Column(String(16), unique=True, nullable=False)
    card_type: str = Column(String(16), nullable=False)  # e.g., 'credit' or 'debit'
    expiration_date: str = Column(String(5), nullable=False)  # MM/YY
    cvv: str = Column(String(4), nullable=False)

    account = relationship("AccountModel", back_populates="cards")