from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import subprocess
import requests
from bs4 import BeautifulSoup
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_traffic', methods=['POST'])
def generate_traffic():
    try:
        page = requests.get('https://blogs.aquasec.com')
        soup = BeautifulSoup(page.content, 'html.parser')
        images = [img['src'] for img in soup.find_all('img') if img.get('src') and 'uploads' in img['src']]
        selected_images = random.sample(images, 2)
        return jsonify({'images': selected_images}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/deploy_malware', methods=['POST'])
def deploy_malware():
    try:
        if not os.path.exists('/tmp'):
            os.makedirs('/tmp')
        with open('/tmp/eicar.txt', 'w') as f:
            f.write('X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*')
        return jsonify({'message': 'Malware test file created in /tmp.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/deploy_nmap', methods=['POST'])
def deploy_nmap():
    try:
        result = subprocess.run(['apt-get', 'install', '-y', 'nmap'], capture_output=True, text=True)
        return jsonify({'message': result.stdout if result.stdout else result.stderr}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/read_passwords', methods=['POST'])
def read_passwords():
    try:
        with open('/etc/passwd', 'r') as f:
            content = f.read()
        return jsonify({'content': content}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
