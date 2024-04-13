
from flask import Flask, request, jsonify, after_this_request, render_template, redirect, url_for
from flask_cors import CORS
import pandas as pd
from flask_restful import Resource, Api

app = Flask(__name__)
from app import routes
CORS(app)


if __name__ == '__main__':
    app.run()
