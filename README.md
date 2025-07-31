# Bioseeq 

This project is a web application for cancer detection from medical images and datasets. It includes a Next.js frontend and a Flask API backend that uses a trained neural network model for breast cancer prediction.

## Features

- Upload medical scan images or CSV datasets for analysis.
- AI-powered cancer detection with confidence scores.
- Grad-CAM visualization placeholder for model interpretability.
- Scan history with detailed reports and download option.
- Medical terminology chatbot for user assistance.

## Setup Instructions

### Backend (Flask API)

1. Ensure Python 3.8+ is installed.
2. Install dependencies:
   ```
   pip install -r requirements.txt
   pip install tensorflow flask flask-cors pandas joblib
   ```
3. Train the breast cancer model (optional if model already trained):
   ```
   python train_breast_cancer_model.py
   ```
4. Run the Flask API server:
   ```
   python api/predict.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend (Next.js)

1. Ensure Node.js 16+ and pnpm are installed.
2. Install dependencies:
   ```
   pnpm install
   ```
3. Run the development server:
   ```
   pnpm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## Usage

- Upload medical scan images or CSV files for cancer prediction.
- View detailed analysis results and download diagnosis reports.
- Use the chatbot for medical terminology assistance.

## Notes

- The Grad-CAM visualization is currently a placeholder and can be enhanced.
- The breast cancer model is trained on a sample dataset and may require further tuning for production use.

## License

This project is open source and available under the MIT License.
