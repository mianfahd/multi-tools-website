import os
import tempfile
from flask import Flask, request, send_file, jsonify
from werkzeug.utils import secure_filename
import subprocess

app = Flask(__name__)
UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/pdf-to-word', methods=['POST'])
def pdf_to_word():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(pdf_path)
        docx_filename = filename.rsplit('.', 1)[0] + '.docx'
        docx_path = os.path.join(app.config['UPLOAD_FOLDER'], docx_filename)
        try:
            result = subprocess.run([
                'libreoffice', '--headless', '--convert-to', 'docx', '--outdir', app.config['UPLOAD_FOLDER'], pdf_path
            ], capture_output=True, text=True)
            if result.returncode != 0:
                return jsonify({'error': f'LibreOffice conversion failed: {result.stderr}'}), 500
            if not os.path.exists(docx_path):
                return jsonify({'error': 'Conversion failed. Output file not found.'}), 500
            return send_file(docx_path, as_attachment=True, download_name=docx_filename)
        finally:
            if os.path.exists(pdf_path):
                os.remove(pdf_path)
            if os.path.exists(docx_path):
                os.remove(docx_path)
    else:
        return jsonify({'error': 'Invalid file type. Only PDF allowed.'}), 400

@app.route('/')
def index():
    return 'PDF to Word Converter Backend is running.'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
