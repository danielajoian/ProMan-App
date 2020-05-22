from database import connection_handler
import hash_pass

@connection_handler
def signUp(cursor, username, password):
    cursor.execute("""
        INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s);
    """,
    { 'username': username, 'password': password })


@connection_handler
def get_password(cursor, username):
    cursor.execute("""
        SELECT password
        FROM users
        WHERE username = %(username)s;
    """,
    { 'username': username })
    username = cursor.fetchall()

    if username:
        return username[0]["password"]
    else:
        return None


@connection_handler
def get_id_by_username(cursor, username):
    cursor.execute("""
                    SELECT id FROM users
                    WHERE username = %(username)s  
                    """, {'username': username})
    userid = cursor.fetchall()[0]['id']
    return userid
