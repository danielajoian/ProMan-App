from flask import Flask, render_template, url_for, redirect, request, session
from util import json_response
from database_manager import *
from hash_pass import *

import data_handler

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/g'


#@app.route("/")
#def index():
#    """
#    This is a one-pager which shows all the boards and cards
#    """
#    return render_template('index.html')


@app.route("/")
@app.route("/list")
@app.route("/list/<page>")
def get_homepage(page = 1):
    user = session['username'] if session else None
    return render_template("new-board.html", page=page, user=user)
#return render_template("index.html", page=page, user=user)


@app.route('/sign-up', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        signUp(request.form['username'], hash_password(request.form['password']))
        return redirect('/')
    return render_template('sign-up.html')


@app.route('/sign-in', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and verify_password(request.form['password'], get_password(request.form['username'])):
        session['username'] = request.form['username']
        return redirect('/')
    return render_template('sign-in.html')

@app.route('/sign-out')
def logout():
    session.pop('username', None)
    return redirect('/')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


def main():
    app.run(
    debug=True,
    host="localhost",
    port=5600
    )

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
