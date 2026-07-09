from sqlalchemy import text

QUERY_ID = "Q22-a5c81d73"


def reconcile(session, business_date):
    sql = text(
        "SELECT p.provider, count(*) AS payment_count, sum(p.amount) AS gross_amount "
        "FROM payments p "
        "WHERE p.settled_at::date = :business_date "
        "GROUP BY p.provider ORDER BY gross_amount DESC;"
    )
    return session.execute(sql, {"business_date": business_date}).all()
