# BioSeq App Upgrade Plan

## Phase 1: Data & Model Upgrade
- [ ] Download CBIS-DDSM dataset for breast cancer images
- [ ] Download NIH ChestX-ray14 or LIDC-IDRI for lung CT scans
- [ ] Update train_breast_cancer_model.py to use transfer learning (EfficientNet/ResNet50) on images
- [ ] Add Grad-CAM implementation for explainability
- [ ] Train new models and save them
- [ ] Update scaler or preprocessing for images

## Phase 2: API Enhancements (Flask → FastAPI)
- [ ] Install FastAPI and dependencies
- [ ] Migrate api/predict.py to FastAPI
- [ ] Add /predict/image endpoint for image uploads
- [ ] Add /predict/csv endpoint for tabular data
- [ ] Add /report/{id} endpoint for PDF generation
- [ ] Implement async support and better docs

## Phase 3: Frontend Enhancements (Next.js)
- [ ] Update dashboard-page.tsx to accept image uploads (JPG, PNG, DICOM)
- [ ] Add drag-and-drop for images with preview
- [ ] Display Grad-CAM heatmap overlay on uploaded images
- [ ] Implement dark/light theme toggle
- [ ] Enhance scan history dashboard
- [ ] Add lung cancer prediction option

## Phase 4: Professional Features
- [ ] Add authentication (NextAuth.js for users/doctors)
- [ ] Implement PDF report generation with patient info
- [ ] Add explainability dashboard showing feature contributions
- [ ] Upgrade chatbot to connect with PubMed API / GPT API for real explanations
- [ ] Add user accounts and past scans storage

## Phase 5: Deployment (Production Ready)
- [ ] Dockerize FastAPI backend
- [ ] Deploy backend to AWS/GCP/Azure
- [ ] Deploy frontend to Vercel (already configured)
- [ ] Set up storage for scans (S3/GCP buckets)
- [ ] Implement CI/CD with GitHub Actions
- [ ] Add environment variables and security

## Current Progress
Starting with Phase 1: Data & Model Upgrade
