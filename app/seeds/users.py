from app.models import db, User, environment, SCHEMA
from datetime import date

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(
        first_name="Tony", last_name="Stark", birthdate=date(1991, 3, 27), email='demo@aa.io', password='password', profile_picture="https://striveonrender.s3.us-west-2.amazonaws.com/0bea7633452d472e8054b665abbfc0c4.jpeg")
    marnie = User(
        first_name="Steve", last_name="Rogers", birthdate=date(1998, 10, 12), email='marnie@aa.io', password='password', profile_picture="https://striveonrender.s3.us-west-2.amazonaws.com/bc59677cd40f4afdaf5b8cfe68db0d12.jpeg")
    bobbie = User(
        first_name="Peter", last_name="Parker",  birthdate=date(2002, 11, 30), email='bobbie@aa.io', password='password', profile_picture="https://striveonrender.s3.us-west-2.amazonaws.com/640f081d9011464ba9c1f4af93b2e814.jpeg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
