from app.models import db, User, environment, SCHEMA
from datetime import date, time


def seed_follow_requests():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    [user1.requests.append(user) for user in [user1, user2, user3]]

    [db.session.add(user) for user in [user2, user3]]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follow_requests():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM follower_requests")

    db.session.commit()
