from flask import Flask, jsonify, make_response, send_from_directory, request
import os
from os.path import exists, join
from DES.des import DES

from constants import CONSTANTS

app = Flask(__name__, static_folder='build')

# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    file_to_serve = path if path and exists(join(app.static_folder, path)) else 'index.html'
    return send_from_directory(app.static_folder, file_to_serve)

@app.route('/encrypt', methods=["POST"])
def encrypt():
    key, iv, password = request.get_json().values()
    if iv == '':
        iv = "\0\0\0\0\0\0\0\0"
    des = DES(password, key, iv)
    ciphertext = des.encrypt()
    return jsonify(ciphertext)

@app.route('/decrypt', methods=["POST"])
def decrypt():
    key, iv, ciphertext = request.get_json().values()
    if iv == '':
        iv = "\0\0\0\0\0\0\0\0"
    des = DES(ciphertext, key, iv)
    text = des.decrypt(ciphertext)
    return jsonify(text)

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
    json_response = jsonify({'error': 'Page not found'})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])

if __name__ == '__main__':
    app.run(debug=True, port=CONSTANTS['PORT'])