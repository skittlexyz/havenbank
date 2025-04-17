from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import all_models
from schemas import all_schemas
from core.deps import get_session

router = APIRouter()

# Create a new transaction (POST /transactions)
@router.post("/transactions", status_code=status.HTTP_201_CREATED, response_model=all_schemas.TransactionSchema)
async def post_transaction(transaction: all_schemas.TransactionSchema, db: AsyncSession = Depends(get_session)):
    new_transaction = all_models.TransactionModel(
        from_account_id=transaction.from_account_id,
        to_account_id=transaction.to_account_id,
        amount=transaction.amount,
        transaction_type=transaction.transaction_type,
        created_at=transaction.created_at  # Assuming you pass it in or handle it in your code
    )
    db.add(new_transaction)
    await db.commit()
    return new_transaction

# Get all transactions (GET /transactions)
@router.get("/transactions", response_model=List[all_schemas.TransactionSchema], status_code=status.HTTP_200_OK)
async def get_transactions(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransactionModel)
        result = await session.execute(query)
        transactions: List[all_models.TransactionModel] = result.scalars().all()
        return transactions

# Get a specific transaction by ID (GET /transactions/{id})
@router.get("/transactions/{id}", response_model=all_schemas.TransactionSchema, status_code=status.HTTP_302_FOUND)
async def get_transaction(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransactionModel).filter(all_models.TransactionModel.id == id)
        result = await session.execute(query)
        transaction = result.scalar_one_or_none()
        if transaction:
            return transaction
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found!")

# Update a transaction (PUT /transactions/{id})
@router.put("/transactions/{id}", response_model=all_schemas.TransactionSchema, status_code=status.HTTP_202_ACCEPTED)
async def put_transaction(id: int, transaction: all_schemas.TransactionSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransactionModel).filter(all_models.TransactionModel.id == id)
        result = await session.execute(query)
        transaction_up = result.scalar_one_or_none()  # up means update
        if transaction_up:
            transaction_up.from_account_id = transaction.from_account_id
            transaction_up.to_account_id = transaction.to_account_id
            transaction_up.amount = transaction.amount
            transaction_up.transaction_type = transaction.transaction_type
            transaction_up.created_at = transaction.created_at
            await session.commit()
            return transaction_up
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found!")

# Delete a transaction (DELETE /transactions/{id})
@router.delete("/transactions/{id}")
async def delete_transaction(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransactionModel).filter(all_models.TransactionModel.id == id)
        result = await session.execute(query)
        transaction_del = result.scalar_one_or_none()  # del means delete
        if transaction_del:
            await session.delete(transaction_del)
            await session.commit()
            return Response(status.HTTP_204_NO_CONTENT)
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found!")
