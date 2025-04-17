from fastapi import APIRouter
from api.v1.endpoints import users, accounts, transactions, cards

api_router = APIRouter()

api_router.include_router(users.router, tags=["Users"])
api_router.include_router(accounts.router, tags=["Accounts"])
api_router.include_router(transactions.router, tags=["Transactions"])
api_router.include_router(cards.router, tags=["Cards"])