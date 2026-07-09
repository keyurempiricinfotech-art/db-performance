QUERY_ID = "Q20-8ad14f02"


def run(conn, notifications):
    with conn.cursor() as cur:
        for notification in notifications:
            cur.execute(
                "SELECT id, user_id, channel FROM notification_preferences WHERE user_id = %s AND enabled = true;",
                (notification.user_id,),
            )
            preferences = cur.fetchall()
            for preference in preferences:
                yield {"notification": notification.id, "preference": preference}
