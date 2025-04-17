from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import all_models
from schemas import all_schemas
from core.deps import get_session

router = APIRouter()

# Create a new user (POST /users)
@router.post("/users", status_code=status.HTTP_201_CREATED, response_model=all_schemas.UserSchema)
async def post_user(user: all_schemas.UserSchema, db: AsyncSession = Depends(get_session)):
    new_user = all_models.UserModel(
        email=user.email,
        password_hash=user.password_hash,
        created_at=user.created_at  # Assuming you pass it in or handle it in your code
    )
    db.add(new_user)
    await db.commit()
    return new_user

# Get all users (GET /users)
@router.get("/users", response_model=List[all_schemas.UserSchema], status_code=status.HTTP_200_OK)
async def get_users(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.UserModel)
        result = await session.execute(query)
        users: List[all_models.UserModel] = result.scalars().all()
        return users

# Get a specific user by ID (GET /users/{id})
@router.get("/users/{id}", response_model=all_schemas.UserSchema, status_code=status.HTTP_302_FOUND)
async def get_user(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.UserModel).filter(all_models.UserModel.id == id)
        result = await session.execute(query)
        user = result.scalar_one_or_none()
        if user:
            return user
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found!")

# Update a user (PUT /users/{id})
@router.put("/users/{id}", response_model=all_schemas.UserSchema, status_code=status.HTTP_202_ACCEPTED)
async def put_user(id: int, user: all_schemas.UserSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.UserModel).filter(all_models.UserModel.id == id)
        result = await session.execute(query)
        user_up = result.scalar_one_or_none()  # up means update
        if user_up:
            user_up.email = user.email
            user_up.password_hash = user.password_hash
            user_up.created_at = user.created_at
            await session.commit()
            return user_up
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found!")

# Delete a user (DELETE /users/{id})
@router.delete("/users/{id}")
async def delete_user(id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(all_models.UserModel).filter(all_models.UserModel.id == id)
        result = await session.execute(query)
        user_del = result.scalar_one_or_none()  # del means delete
        if user_del:
            await session.delete(user_del)
            await session.commit()
            return Response(status.HTTP_204_NO_CONTENT)
        else:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found!")