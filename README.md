
# Document Retrieval & Q&A Application

## Overview
Doc-RAG is a full-stack application that enables semantic search, retrieval-augmented generation (RAG), and interactive question-answering over scientific documents.  
It combines a powerful **FastAPI backend** for document ingestion, embedding, and querying with a sleek **React frontend** deployed on Vercel.

---

## Features

### Backend
- Upload and index scientific documents with semantic embeddings using `sentence-transformers`.
- Query interface leveraging OpenAI's language models to generate precise answers based on retrieved content.
- Modular, well-structured FastAPI endpoints: Upload, Query, Metadata.
- Efficient model caching and environment variable configuration for smooth deployment.
- Vector store integration for fast similarity search.

### Frontend
- Responsive React UI to upload documents and ask questions.
- Real-time interaction with backend APIs for search and answer display.
- Clean design with usability and performance in mind.

### Deployment
- Backend deployed on **Hugging Face Spaces** (Python environment, no Docker needed).
- Frontend deployed on **Vercel** for fast, global delivery.
- Codebase managed and versioned on **GitHub** with CI/CD for seamless updates.

---

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- Git
- OpenAI API Key

---

### Backend Setup (Local)

1. Clone backend repo:
    ```bash
    git clone https://github.com/YourUsername/PanScience-Backend.git
    cd PanScience-Backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate   # Linux/macOS
    venv\Scripts\activate      # Windows
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set environment variables (replace with your actual key):
    ```bash
    export OPENAI_API_KEY="your_openai_api_key"
    ```

5. Run the backend server:
    ```bash
    uvicorn app.api.main:app --host 0.0.0.0 --port 7860 --reload
    ```

---

### Frontend Setup (Local)

1. Clone frontend repo:
    ```bash
    git clone https://github.com/YourUsername/PanScience-Frontend.git
    cd PanScience-Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set backend API URL in `.env` file or directly in the frontend config (e.g., REACT_APP_API_URL):
    ```
    REACT_APP_API_URL=http://localhost:7860
    ```

4. Start frontend development server:
    ```bash
    npm start
    ```

---

## Deployment Guide

### Backend Deployment on Hugging Face Spaces

1. Push your backend code to a Hugging Face repo named **exactly as your space**.
2. Configure the space to use the **Python SDK** (no Docker).
3. Add your `OPENAI_API_KEY` in the space settings as a secret environment variable.
4. Make sure your `app.py` entrypoint runs:
    ```python
    import uvicorn

    if __name__ == "__main__":
        uvicorn.run("app.api.main:app", host="0.0.0.0", port=7860)
    ```
5. The space will auto-build and deploy your backend.

### Frontend Deployment on Vercel

1. Push your frontend code to GitHub.
2. Connect the GitHub repo to Vercel.
3. Set environment variables on Vercel for the API backend URL.
4. Deploy and access your live frontend.

---

## Environment Variables

| Variable         | Description                           | Required? |
|------------------|-----------------------------------|-----------|
| OPENAI_API_KEY   | OpenAI API key for LLM access       | Yes       |
| REACT_APP_API_URL | Backend API URL (frontend only)      | Yes       |

---

## Project Structure

````

PanScience-Backend/
├── app/
│   ├── api/
│   ├── services/
│   ├── models/
│   ├── db/
│   ├── main.py
├── requirements.txt
├── app.py                 # Uvicorn entrypoint for Hugging Face
PanScience-Frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
├── package.json
├── .env                   # API URL config

```

---

## Troubleshooting & Tips

- **NumPy version conflicts:** Use `numpy<2` to avoid compatibility issues.
- **OpenAI errors:** Confirm your API key is set correctly in environment variables.
- **Model cache issues:** Ensure cache directories are writable or set cache environment variables.
- **CORS Errors:** Configure CORS middleware in backend or use proxy in frontend during development.

---

## Contribution Guidelines

- Fork the repos and create feature branches.
- Follow consistent code style and add tests.
- Submit pull requests for review.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions, feedback, or support, contact:  
**Anmol Mani Dubey** — anmolkumardubey1@gmail.com  
GitHub: [AnmolManiDubey](https://github.com/AnmolManiDubey)  

---

```

Would you like me to generate separate README files for frontend and backend too? Or help with any other docs?
