from app.models import db, Club, User, environment, SCHEMA


def seed_clubs():
    club1 = Club(
        owner_id=1, club_name="austin raiderrrs", location="Austin, Texas", sport="Running", type="Club", description="It's a club alright")
    club2 = Club(
        owner_id=1, club_name="austin munchers", location="Austin, Texas", sport="Soccer", type="Club", description="It's a soccer club alright")
    club3 = Club(
        owner_id=3, club_name="dallas kayakers", location="Dallas, Texas", sport="Kayaking", type="Company", description="Where are we even kayaking?")

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    club1.members = [user1, user2, user3]
    club2.members = [user2, user3]
    club3.members = [user1, user2, user3]

    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_clubs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM clubs")

    db.session.commit()
