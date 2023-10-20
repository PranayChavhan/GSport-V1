from sqlalchemy import create_engine, MetaData

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root@localhost:3308/test"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

meta = MetaData()
conn = engine.connect()
