from flask import Flask, render_template, jsonify, request
import requests
from bs4 import BeautifulSoup
import random
import os
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_traffic', methods=['POST'])
def generate_traffic():
    page = requests.get('https://blog.aquasec.com')
    soup = BeautifulSoup(page.content, 'html.parser')
    images = [img['src'] for img in soup.find_all('img', src=True)]
    selected_images = random.sample(images, 2) if len(images) > 2 else images
    return jsonify(selected_images)

@app.route('/deploy_malware', methods=['POST'])
def deploy_malware():
    eicar_test_file_path = '/tmp/eicar_test_file.txt'
    with open(eicar_test_file_path, 'w') as f:
        f.write('X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*')
    return jsonify({'message': f'Malware simulation deployed at {eicar_test_file_path}.'})

@app.route('/deploy_nmap', methods=['POST'])
def deploy_nmap():
    subprocess.check_call(['apt-get', 'update'])
    subprocess.check_call(['apt-get', 'install', '-y', 'nmap'])
    return jsonify({'message': 'Nmap has been installed.'})

@app.route('/read_passwords', methods=['POST'])
def read_passwords():
    with open('/etc/passwd', 'r') as f:
        content = f.read()
    return jsonify({'content': content})

if __name__ == '__main__':
    app.run(debug=True)
