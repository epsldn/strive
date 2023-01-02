from app.models import db, Activity, User, environment, SCHEMA
from datetime import date, time


def seed_activities():
    activity1 = Activity(
        user_id=1,
        distance=10.2,
        hours=0,
        minutes=32,
        seconds=12,
        elevation=124,
        sport="Ride",
        date=date(2022, 10, 12),
        time=time(8, 50, 20),
        title="Today I went out for a run",
        description="It was a nice run to be had, it was nice indeed. It was a run.",
        private_notes="I hope they see this and are impressed"
    )
    activity2 = Activity(
        user_id=2,
        distance=23.2,
        hours=1,
        minutes=32,
        seconds=12,
        elevation=14,
        sport="Ice Skate",
        date=date(2022, 7, 12),
        time=time(14, 50, 20),
        title="Today I went out for ice skating",
        description="It was a nice ice skate to be had, it was nice indeed. It was a skate.",
        private_notes="I hope they see this and are impressed"
    )
    activity3 = Activity(
        user_id=1,
        distance=0.2,
        hours=0,
        minutes=2,
        seconds=12,
        elevation=1204,
        sport="Virtual Run",
        title="Today I went out for a run",
        description="It was a nice run to be had, it was nice indeed. It was a run.",
        private_notes="I hope they see this and are impressed"
    )

    db.session.add(activity1)
    db.session.add(activity2)
    db.session.add(activity3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_activities():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM clubs")

    db.session.commit()
