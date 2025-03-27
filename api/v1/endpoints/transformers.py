from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import all_models
from schemas import all_schemas
from core.deps import get_session

router = APIRouter()

@router.post("/", status_code = status.HTTP_201_CREATED, response_model = all_schemas.TransformersSchema)
async def post_transformer(transformer: all_schemas.TransformersSchema, db: AsyncSession = Depends(get_session)):
    new_character = all_models.TransformersModel(
        name = transformer.name,
        team = transformer.team,
        color = transformer.color,
        age = transformer.age
    )
    db.add(new_character)
    await db.commit()
    return new_character

@router.get("/", response_model = List[all_schemas.TransformersSchema], status_code = status.HTTP_200_OK)
async def get_transformers(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransformersModel)
        result = await session.execute(query)
        characters: List[all_models.TransformersModel] = result.scalars().all()
        return characters

@router.get("/{id}", response_model = all_schemas.TransformersSchema, status_code = status.HTTP_302_FOUND)
async def get_transformer(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransformersModel).filter(all_models.TransformersModel.id == id)
        result = await session.execute(query)
        character = result.scalar_one_or_none()
        if character: return character
        else: raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Character not found!")

@router.put("/{id}", response_model = all_schemas.TransformersSchema, status_code = status.HTTP_202_ACCEPTED)
async def put_transformer(id: int, transformer: all_schemas.TransformersSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransformersModel).filter(all_models.TransformersModel.id == id)
        result = await session.execute(query)
        character_up = result.scalar_one_or_none() # up significa update
        if character_up:
            character_up.name = transformer.name
            character_up.team = transformer.team
            character_up.color = transformer.color
            character_up.age = transformer.age
            await session.commit()
            return character_up
        else: raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Character not found!")

@router.delete("/{id}")
async def delete_transformer(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.TransformersModel).filter(all_models.TransformersModel.id == id)
        result = await session.execute(query)
        character_del = result.scalar_one_or_none() # del significa delete
        if character_del:
            await session.delete(character_del)
            await session.commit()
            return Response(status.HTTP_204_NO_CONTENT)
        else: raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Character not found!")
