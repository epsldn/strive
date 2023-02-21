from app.models import db, Club, User, environment, SCHEMA


def seed_clubs():
    club1 = Club(
        owner_id=1, club_name="austin raiderrrs", location="Austin, TX, USA", sport="footsports", type="club", description="It's a club alright", club_image="http://striveonrender.s3.amazonaws.com/7b6ba0eae10d46bf9074e85102d8ef65.jpg", club_banner="https://striveonrender.s3.us-west-2.amazonaws.com/67c965676ac24cddbb8afdef767786a7.jpg")
    club2 = Club(
        owner_id=1, club_name="Austin Surfers", location="Austin, TX, USA", sport="surfing", type="club", description="It's a surfing club alright", club_image="https://striveonrender.s3.us-west-2.amazonaws.com/18748be3361a46e5a439d6c369099cd2.jpg", club_banner="https://striveonrender.s3.us-west-2.amazonaws.com/a389c241d4ad4fb3b2aa68096d404367.jpg")
    club3 = Club(
        owner_id=3, club_name="dallas kayakers", location="Dallas, TX, USA", sport="kayaking", type="company", description="Where are we even kayaking?", club_image="https://striveonrender.s3.us-west-2.amazonaws.com/be6bb6e39bf94b8384c0e7491738fb8a.jpg", club_banner="https://striveonrender.s3.us-west-2.amazonaws.com/8955cf3371b24c8abc9b6888e03cd6f7.jpg")

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
