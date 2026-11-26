---
published: true
slug: 'automated-fundus-image-screening'
title: 'Automated Fundus Image Screening: A Deep Learning Approach for Eye Disease Detection'
tagline: 'AI-powered multi-label retinal disease screening combining ConvNeXtV2-Tiny, Vision Transformers, and RAG clinical guidance.'
shortDescription: 'End-to-end medical imaging and ophthalmology screening system trained on ODIR-2019 to detect multiple co-existing retinal diseases and surface evidence-based RAG insights.'
inShort: '10PeakStudio engineered an automated retinal fundus screening framework combining transfer learning (ResNet-50, ConvNeXtV2-Tiny, Vision Transformer) with an ophthalmology RAG assistant. Evaluated on the ODIR-2019 benchmark, the pipeline achieves up to 95.96% accuracy across multi-label ocular conditions to support teleophthalmology workflows.'

type: 'in-house'
clientName: null
clientPermission: false
status: 'Completed'
statusNote: 'WCCG 2026 Research'
disclaimer: 'Research project. Not a certified medical device and not for clinical diagnosis.'
industry: 'Healthcare'
capabilities:
  - 'AI & Automation'
  - 'Web Apps & SaaS'
complexity: 'Advanced'
platform: 'Python AI Pipeline & Web Screening Interface'
role: 'AI/ML Architecture, Model Benchmarking & Full-Stack Integration'
year: 2026
duration: '5 to 6 months'
# [CONFIRM]: specify individual studio contributors in teamMembers if you want personal profile credits shown on the page.
teamSummary: '4 AI Engineers and 1 PhD Medical Advisor'
teamMembers: []
featured: true
order: 1

thumbnail:
  url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795635391/Thamnail_image_fundus.png'
  alt: 'Automated retinal fundus image screening interface and multi-label ophthalmic detection preview'
  width: 1200
  height: 750

heroImage:
  url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795635391/Thamnail_image_fundus.png'
  alt: 'EyeDetect Automated Fundus Image Screening system hero visual'
  width: 1200
  height: 750

# [CONFIRM]: clarify exact training framework used (PyTorch or TensorFlow) and whether the UI screenshots use Streamlit or Next.js before adding cloud/framework tags.
techStack:
  frontend:
    - 'React'
    - 'Next.js'
    - 'Streamlit'
  backend:
    - 'FastAPI'
    - 'Python'
  aiMl:
    - 'ConvNeXtV2-Tiny'
    - 'Vision Transformer (ViT)'
    - 'ResNet-50'
    - 'OpenCV'
    - 'Transfer Learning'
    - 'Multi-Label Classification'
    - 'RAG Architecture'
  database:
    - 'ODIR-2019 Dataset'
  cloud: []
  deployment: []
  devops: []
  tools:
    - 'Binary Cross-Entropy Loss'
    - 'Data Augmentation'

architecture:
  summary: 'Retinal fundus upload -> image validation & color normalization -> deep learning feature extraction -> multi-label classification & confidence scoring -> clinical report + RAG ophthalmology assistant.'
  diagrams:
    - url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795635701/ConvNeXtV2-Tiny_Model_Architecture..png'
      alt: 'ConvNeXtV2-Tiny deep learning model architecture showing convolutional stages and Global Response Normalization'
      caption: 'ConvNeXtV2-Tiny Model Architecture (4145 × 1913)'
      width: 4145
      height: 1913
    - url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795634114/Application_Flow_chart.png'
      alt: 'End-to-end application flowchart from retinal image upload to disease classification, reporting, and RAG chatbot support'
      caption: 'Application Workflow of the AI-Based Retinal Fundus Disease Detection System (3173 × 1389)'
      width: 3173
      height: 1389
  mermaid: |
    flowchart TD
      Img["Retinal Fundus Image"] --> Val["Image Upload & Validation"]
      Val --> Prep["Preprocessing (Resize & Color Normalization)"]
      Prep --> Engine["Inference Engine (ConvNeXtV2-Tiny / ViT)"]
      Engine --> Feat["Feature Extraction"]
      Feat --> Cls["Multi-Label Disease Classification"]
      Cls --> Score["Confidence Score & Risk Assessment"]
      Score --> Report["Diagnostic Report & RAG Insights"]

# [CONFIRM]: 4 UI screenshots referenced under local Section_images\ (Home_Page_1.jpeg, Analyze_...2.jpg, Result_...3.jpg, retinal_Attention_heatmap_...4.jpg) were omitted because they are not uploaded to Cloudinary yet.
gallery:
  - url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795634469/fundus_image_feature_Example_Image_1.png'
    alt: 'Fundus image example highlighting retinal vascular and optic disc structures extracted during model training'
    caption: 'Retinal Structural Feature Identification — Sample 1'
    label: 'Model'
    device: 'none'
    width: 1062
    height: 638
  - url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795634470/fundus_image_feature_Example_Image_2.png'
    alt: 'Close-up fundus sample showing exudates, lesions, and macular texture patterns analyzed by ConvNeXtV2-Tiny'
    caption: 'Lesion & Macular Texture Feature Map — Sample 2'
    label: 'Model'
    device: 'none'
    width: 668
    height: 668
  - url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795634472/fundus_image_feature_Example_Image_3_Deep_Learning_For_Glucoma_Detection.png'
    alt: 'Glaucoma analysis example illustrating optic disc and cup-to-disc structural indicators'
    caption: 'Glaucoma Optic Disc & Cup-Disc Analysis'
    label: 'Analytics'
    device: 'none'
    width: 776
    height: 848
  - url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795634934/Rag_Medical_chatBot_Eye_5.png'
    alt: 'EyeDetect RAG-based ophthalmology medical chatbot interface answering retinal disease questions'
    caption: 'RAG-Based Ophthalmology Knowledge Assistant Interface'
    label: 'AI & RAG'
    device: 'desktop'
    width: 1280
    height: 800
  - url: 'https://res.cloudinary.com/lta722n4/image/upload/v1795634934/knowledgebase_chatbot_6.png'
    alt: 'Dynamic ophthalmology knowledge base indexing and retrieval view inside the EyeDetect assistant'
    caption: 'Dynamic Ophthalmology Knowledge Base Interface'
    label: 'AI & RAG'
    device: 'desktop'
    width: 1280
    height: 800

video: null
githubUrl: 'https://github.com/Adxrsh02/Automated-Fundus-Disease-Detection'
liveUrl: null

metrics:
  - value: '95.96%'
    label: 'ViT Benchmark Accuracy'
    context: 'ODIR-2019 validation dataset'
    confirmed: true
  - value: '93.41%'
    label: 'ConvNeXtV2-Tiny Accuracy'
    context: 'Resource-efficient model on ODIR-2019'
    confirmed: true
  - value: '96.44%'
    label: 'Peak Recall (ViT)'
    context: 'Multi-label ocular benchmark'
    confirmed: true
  - value: '95.72%'
    label: 'Peak F1-Score (ViT)'
    context: 'Balanced precision and recall'
    confirmed: true

publication:
  title: 'Automated Fundus Image Screening: A Deep Learning Approach for Eye Disease Detection'
  venue: 'WCCG 2026 — World Conference on Cognitive Computing and Generative AI (SKSVMA)'
  paperId: '1940'
  venueUrl: 'https://wccg.in/'
  abstract: 'This research presents an automated retinal disease screening framework leveraging a fine-tuned ConvNeXtV2-Tiny architecture alongside ResNet-50 and Vision Transformer baselines for fundus image classification. The proposed system aims to assist in early detection of vision-threatening ocular diseases by combining deep feature extraction, transfer learning, and intelligent RAG diagnostic support.'
  pdfUrl: '/papers/automated-fundus-image-screening-wccg-2026.pdf'

seo:
  title: 'Automated Fundus Image Screening AI'
  description: "Engineering case study of 10PeakStudio's multi-label retinal fundus screening AI using ConvNeXtV2-Tiny, Vision Transformers, and RAG clinical assistance."
---

## Project Overview

Automated Fundus Image Screening (**EyeDetect**) is an AI-powered medical imaging system that leverages transfer learning with **ResNet-50**, **ConvNeXtV2-Tiny**, and **Vision Transformer (ViT)** to perform multi-label retinal disease detection from color fundus images. The framework pairs an end-to-end OpenCV preprocessing pipeline with a **FastAPI** and **Streamlit / Next.js** prediction experience, backed by a Retrieval-Augmented Generation (RAG) ophthalmology assistant for evidence-grounded clinical education.

## Problem Statement

Manual retinal disease diagnosis is time-consuming, subjective, and depends heavily on experienced ophthalmologists. Early screening is especially difficult in rural and resource-constrained healthcare environments, increasing the risk of preventable vision loss.

## Business Objective

Develop an automated, modular deep learning framework capable of detecting multiple co-existing retinal diseases from standard fundus photography using transfer learning and multi-label classification—supporting teleophthalmology platforms, diagnostic centers, medical researchers, and rural clinics.

### Target Users

- Ophthalmologists and diagnostic centers
- Hospitals and telemedicine platforms
- Rural healthcare clinics
- Medical AI researchers

## Solution

We designed an end-to-end computer vision and clinical support pipeline that standardizes heterogeneous fundus photographs before multi-label classification:

1. **Standardized Preprocessing:** Resizes images uniformly, strips dark circular background borders, normalizes color balance across camera hardware, and applies targeted data augmentation.
2. **Comparative Backbone Evaluation:** Trains and benchmarks three transfer learning architectures (**ResNet-50**, **ConvNeXtV2-Tiny**, and **Vision Transformer**) under identical hyperparameters (`Learning Rate: 0.001`, `Batch Size: 32`) using Binary Cross-Entropy Loss on the **ODIR-2019** dataset.
3. **Production-Oriented Architecture Selection:** Uses **ConvNeXtV2-Tiny** with Global Response Normalization (GRN) for balanced resource efficiency and high-resolution spatial sensitivity, paired with an indexed **RAG Ophthalmology Knowledge Assistant**.

## Features

- **Automated retinal disease screening**: Rapid inference pipeline designed for early multi-condition triage from color fundus uploads.
- **Multi-label eye disease classification**: Detects co-existing ocular pathologies simultaneously via Binary Cross-Entropy optimization.
- **Transfer learning model suite**: Benchmarks ResNet-50 (local features), ConvNeXtV2-Tiny (efficient fine-grained CNN), and ViT (global attention).
- **Image preprocessing & normalization**: Automated background cropping, color balance normalization, and augmentation pipeline using OpenCV.
- **Confidence-based prediction interface**: Real-time risk assessment and per-condition probability readouts for operator transparency.
- **RAG ophthalmology assistant**: Context-aware medical Q&A grounded in an indexed ophthalmology repository to minimize LLM hallucinations.

## Performance

All three architectures were evaluated using identical training hyperparameters (`Learning Rate: 0.001`, `Batch Size: 32`) on the multi-source **ODIR-2019** ophthalmic dataset:

| Metric        | ResNet-50 | ConvNeXtV2-Tiny | Vision Transformer (ViT) |
| :------------ | --------: | --------------: | -----------------------: |
| Learning Rate |     0.001 |           0.001 |                    0.001 |
| Batch Size    |     32.00 |           32.00 |                    32.00 |
| Accuracy      |    85.82% |          93.41% |               **95.96%** |
| Precision     |    86.67% |          92.14% |               **95.02%** |
| Recall        |    88.21% |          93.88% |               **96.44%** |
| F1-Score      |    87.43% |          92.99% |               **95.72%** |

## Why ConvNeXtV2-Tiny?

ConvNeXtV2-Tiny bridges classical convolutional inductive biases with modern vision transformer scaling properties, making it strongly suited for constrained clinical deployments:

- Extracts fine-grained micro-lesion, exudate, and vascular features without heavy transformer memory overhead.
- Handles high-resolution retinal scans cleanly through deep convolutional stages.
- Incorporates **Global Response Normalization (GRN)** to prevent feature collapse and stabilize multi-label training.

## Model Learning and Retinal Feature Identification

During training on clinical fundus imagery, the deep learning backbones learn distinct pathological markers:

- **Glaucoma:** Optic disc morphology and cup-to-disc ratio structural changes.
- **Hypertensive Retinopathy:** Arteriolar narrowing and vascular bifurcation anomalies.
- **General Retinal Pathologies:** Micro-aneurysms, hemorrhages, hard exudates, and drusen-like macular texture variations.

## RAG-Based Ophthalmology Knowledge Assistant

The **Eye Disease Knowledge Assistant** uses Retrieval-Augmented Generation (RAG) so responses never rely solely on ungrounded pretrained weights. Instead, queries retrieve curated ophthalmology guidance from an indexed knowledge repository before synthesis—improving factual accuracy, transparency, and patient education outcomes.
