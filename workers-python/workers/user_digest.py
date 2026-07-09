from sqlalchemy import text

QUERY_ID = "Q3-f61de2a8"


def build_user_digest(session, email):
    sql = text("SELECT id, email, status FROM users WHERE email = :email LIMIT 1;")
    user = session.execute(sql, {"email": email}).first()
    if not user:
        return None
    return {"user": user, "sections": ["orders", "wishlist", "recommendations"]}
