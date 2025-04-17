from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import all_models
from schemas import all_schemas
from core.deps import get_session

router = APIRouter()

# Create a new card (POST /cards)
@router.post("/cards", status_code=status.HTTP_201_CREATED, response_model=all_schemas.CardSchema)
async def post_card(card: all_schemas.CardSchema, db: AsyncSession = Depends(get_session)):
    new_card = all_models.CardModel(
        account_id=card.account_id,
        card_number=card.card_number,
        card_type=card.card_type,
        expiration_date=card.expiration_date,
        cvv=card.cvv
    )
    db.add(new_card)
    await db.commit()
    return new_card

# Get all cards (GET /cards)
@router.get("/cards", response_model=List[all_schemas.CardSchema], status_code=status.HTTP_200_OK)
async def get_cards(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.CardModel)
        result = await session.execute(query)
        cards: List[all_models.CardModel] = result.scalars().all()
        return cards

# Get a specific card by ID (GET /cards/{id})
@router.get("/cards/{id}", response_model=all_schemas.CardSchema, status_code=status.HTTP_302_FOUND)
async def get_card(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.CardModel).filter(all_models.CardModel.id == id)
        result = await session.execute(query)
        card = result.scalar_one_or_none()
        if card:
            return card
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found!")

# Update a card (PUT /cards/{id})
@router.put("/cards/{id}", response_model=all_schemas.CardSchema, status_code=status.HTTP_202_ACCEPTED)
async def put_card(id: int, card: all_schemas.CardSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.CardModel).filter(all_models.CardModel.id == id)
        result = await session.execute(query)
        card_up = result.scalar_one_or_none()
        if card_up:
            card_up.account_id = card.account_id
            card_up.card_number = card.card_number
            card_up.card_type = card.card_type
            card_up.expiration_date = card.expiration_date
            card_up.cvv = card.cvv
            await session.commit()
            return card_up
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found!")

# Delete a card (DELETE /cards/{id})
@router.delete("/cards/{id}")
async def delete_card(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.CardModel).filter(all_models.CardModel.id == id)
        result = await session.execute(query)
        card_del = result.scalar_one_or_none()
        if card_del:
            await session.delete(card_del)
            await session.commit()
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found!")
