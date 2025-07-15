# PDF to Word Converter (Flask + LibreOffice + Docker)

A simple Flask API to convert PDF files to Word (.docx) using LibreOffice CLI. Ready for deployment on Render.com or any Docker host.

## Folder Structure

- `main.py` — Flask app (port 8000)
- `requirements.txt` — Python dependencies (Flask only)
- `Dockerfile` — Docker build instructions
- `.dockerignore` — Files to exclude from Docker image

## How to Deploy on Render.com

1. **Push this folder to your GitHub repository.**
2. Go to [Render.com](https://render.com/) and click **"New Web Service"**.
3. Connect your GitHub repo and select this project folder.
4. Render will auto-detect the Dockerfile. Set the port to `8000` in the Render settings.
5. Click **"Create Web Service"**. Wait for the build and deploy to finish.
6. Use the `/pdf-to-word` endpoint to POST a PDF and receive a DOCX file.

### Example API Usage (with curl):

```
curl -F "file=@yourfile.pdf" https://<your-render-url>/pdf-to-word --output output.docx
```

## Local Docker Build & Run

```sh
docker build -t pdf2word-flask .
docker run -p 8000:8000 pdf2word-flask
```

## Add More Tools
- Add new endpoints in `main.py` for more PDF/Word tools.

---

**You only need to push to GitHub and click the Render deploy button. No manual server setup required!**
