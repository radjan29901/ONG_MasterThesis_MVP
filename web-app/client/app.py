#In order to start the server, do export FLASK_APP=app.py
#Then sudo python -m flask run

from flask import Flask, request
from flask import jsonify
#import bs4
from flask import render_template
from flask import Flask, request, send_from_directory, request
from flask import Flask
from flask import render_template
from flask import Flask, request, send_from_directory, request
import os
import sys
import requests
app = Flask(__name__)
server_backend='http://localhost:8081'

@app.route('/')
def hello_world():  
    return render_template('/webapp/index.html')


app = Flask(__name__,static_folder="webapp/template")
#app.config.from_object('config')
application=app
#application.config.from_object('config')



#application=app
appConfig={'JS_FOLDER':'webapp/static/js',
'CSS_FOLDER':'webapp/static/css',
'IMG_FOLDER':'webapp/static/images',
'FONT_FOLDER':'webapp/static/font',
'FONTS_FOLDER':'webapp/static/fonts',
'LESS_FOLDER':'webapp/static/less',
'SCSS_FOLDER':'webapp/static/scss'}

def checkAuth():
    url=server_backend+'/checkAuth'
    r=requests.get(url)
    return r.text

@app.route('/js/<path:path>')
def render_js(path):
    return send_from_directory(os.getcwd()+'/'+appConfig['JS_FOLDER'], path)

@app.route('/css/<path:path>')
def render_css(path):
    pathD=os.getcwd()+'/'+appConfig['CSS_FOLDER']
    print(str(pathD)+"//"+path)
    return send_from_directory(os.getcwd()+'/'+appConfig['CSS_FOLDER'], path)

@app.route('/images/<path:path>')
def render_img(path):
    return send_from_directory(os.getcwd()+'/'+appConfig['IMG_FOLDER'], path)

@app.route('/font/<path:path>')
def render_font(path):
    return send_from_directory(os.getcwd()+'/'+appConfig['FONT_FOLDER'], path)

@app.route('/fonts/<path:path>')
def render_fonts(path):
    return send_from_directory(os.getcwd()+'/'+appConfig['FONTS_FOLDER'], path)

@app.route('/less/<path:path>')
def render_less(path):
    return send_from_directory(os.getcwd()+'/'+appConfig['LESS_FOLDER'], path)

@app.route('/scss/<path:path>')
def render_scss(path):
    return send_from_directory(appConfig['SCSS_FOLDER'], path)

@app.route('/auth')
def render_index():
    return app.send_static_file("index.html")

@app.route('/donator/index')
def render_donator_index():
    if checkAuth()=='false':
        return app.send_static_file("index.html")
    return app.send_static_file("donator/index.html")

@app.route('/donator/history')
def render_donator_history():
    if checkAuth()=='false':
        return app.send_static_file("index.html")
    return app.send_static_file("donator/history.html")

@app.route('/donator/donate')
def render_donator_donate():
    if checkAuth()=='false':
        return app.send_static_file("index.html")
    return app.send_static_file("donator/donate.html")