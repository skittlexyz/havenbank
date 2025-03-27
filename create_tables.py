from core.configs import settings
from core.database import engine
from models import all_models

async def create_tables() -> None:
    confirmation: str = input("Create all tables? Existing data will be erased. (y/N) ")

    if confirmation.lower() == "y" or confirmation.lower() == "yes": pass
    elif confirmation.lower() == "n" or confirmation.lower() =="no": return
    else: return

    print("Creating database tables...")
    
    async with engine.begin() as conn:
        await conn.run_sync(settings.DBBaseModel.metadata.drop_all)
        await conn.run_sync(settings.DBBaseModel.metadata.create_all)

    print("Sucessfully ")

if __name__ == "__main__":
    import asyncio

    asyncio.run(create_tables())