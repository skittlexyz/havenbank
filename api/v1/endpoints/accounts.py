from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import all_models
from schemas import all_schemas
from core.deps import get_session

router = APIRouter()

# Create a new account (POST /accounts)
@router.post("/accounts", status_code=status.HTTP_201_CREATED, response_model=all_schemas.AccountSchema)
async def post_account(account: all_schemas.AccountSchema, db: AsyncSession = Depends(get_session)):
    new_account = all_models.AccountModel(
        user_id=account.user_id,
        account_number=account.account_number,
        balance=account.balance,
        created_at=account.created_at  # Assuming you pass it in or handle it in your code
    )
    db.add(new_account)
    await db.commit()
    return new_account

# Get all accounts (GET /accounts)
@router.get("/accounts", response_model=List[all_schemas.AccountSchema], status_code=status.HTTP_200_OK)
async def get_accounts(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.AccountModel)
        result = await session.execute(query)
        accounts: List[all_models.AccountModel] = result.scalars().all()
        return accounts

# Get a specific account by ID (GET /accounts/{id})
@router.get("/accounts/{id}", response_model=all_schemas.AccountSchema, status_code=status.HTTP_302_FOUND)
async def get_account(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.AccountModel).filter(all_models.AccountModel.id == id)
        result = await session.execute(query)
        account = result.scalar_one_or_none()
        if account:
            return account
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Account not found!")

# Update an account (PUT /accounts/{id})
@router.put("/accounts/{id}", response_model=all_schemas.AccountSchema, status_code=status.HTTP_202_ACCEPTED)
async def put_account(id: int, account: all_schemas.AccountSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.AccountModel).filter(all_models.AccountModel.id == id)
        result = await session.execute(query)
        account_up = result.scalar_one_or_none()  # up means update
        if account_up:
            account_up.user_id = account.user_id
            account_up.account_number = account.account_number
            account_up.balance = account.balance
            account_up.created_at = account.created_at
            await session.commit()
            return account_up
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Account not found!")

# Delete an account (DELETE /accounts/{id})
@router.delete("/accounts/{id}")
async def delete_account(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.AccountModel).filter(all_models.AccountModel.id == id)
        result = await session.execute(query)
        account_del = result.scalar_one_or_none()  # del means delete
        if account_del:
            await session.delete(account_del)
            await session.commit()
            return Response(status.HTTP_204_NO_CONTENT)
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Account not found!")
