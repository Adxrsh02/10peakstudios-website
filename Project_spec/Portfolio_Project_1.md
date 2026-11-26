Project One :

Project Card thubmnail Cloudinary Image Path :
https://res.cloudinary.com/lta722n4/image/upload/v1795635391/Thamnail_image_fundus.png


| Field                     | Value                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------ |
| **Project Name**          | Automated Fundus Image Screening: A Deep Learning Approach for Eye Disease Detection |
| **Project Category**      | AI/ML • Computer Vision • Medical Imaging • Deep Learning                            |
| **Status**                | Completed (Research Project)                                                         |
| **Role**                  | AI/ML Engineer & Deep Learning Developer                                             |
| **Organization / Client** | Health Care industry Project                       |
| **Industry**              | Healthcare • HealthTech • Medical AI                                                 |
| **Duration**              | 5 to 6 months *(exact duration not specified in paper)*       |
| **Team Size**             | 4 AI Engineers and 1 Doctor (Phd)                                                      |
| **Project Type**          | Research-Based AI/ML Project                                                         |

| Field                      | Value                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Tech Stack**             | Python, PyTorch/TensorFlow, OpenCV, React and Next js, Transfer Learning, Deep Learning                                                |
| **Frontend**               |       React and next js                                                                                                                |
| **Backend**                | FastAPI Python                                                                                                                         |
| **Programming Languages**  | Python                                                                                                                         |
| **Database**               | ODIR-2019 Dataset and multiple Sources like hospitals and clinics (No traditional database used)                                                                               |
| **AI / ML Stack**          | ResNet-50, ConvNeXtV2-Tiny, Vision Transformer (ViT), Transfer Learning, Multi-Label Classification, Binary Cross-Entropy Loss |
| **Data Engineering Stack** | Image Preprocessing Pipeline, Data Augmentation, Data Normalization, Dataset Management                                        |
| **Cloud Platform**         | Not Specified                                                                                                                  |
| **Architecture**           | End-to-End Deep Learning Pipeline (Preprocessing → Feature Extraction → Multi-Label Classification → Streamlit Deployment)     |
| **Deployment**             | React and Nexxt js -based Web Application (Proposed)                                                                                     |
| Field                      | Value                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
                                                       |




## Key Features:

Automated retinal disease screening
Multi-label eye disease classification
Transfer learning using multiple deep learning models
Image preprocessing pipeline
Image normalization
Background removal
Color normalization
Data augmentation
Real-time prediction interface
Confidence-based prediction visualization
Modular and scalable architecture
Clinical decision support
Resource-efficient deployment using ConvNeXtV2-Tiny
Global context learning using Vision Transformer
Local feature extraction using ResNet-50

## Business Problem

Manual retinal disease diagnosis is time-consuming, subjective, and requires experienced ophthalmologists. Early detection is difficult, especially in rural and resource-constrained healthcare environments, leading to preventable vision loss.

Project Objective

Develop an automated deep learning framework capable of accurately detecting multiple co-existing retinal diseases from fundus images using transfer learning and multi-label classification to support early diagnosis and teleophthalmology.

Target Users
Ophthalmologists
Hospitals
Diagnostic Centers
Rural Healthcare Clinics
Telemedicine Platforms
Medical Researchers


## Performance :

| Metric | ResNet-50 | ConvNeXtV2-Tiny | ViT |
|:---|---:|---:|---:|
| Learning Rate | 0.001 | 0.001 | 0.001 |
| Batch Size | 32.00 | 32.00 | 32.00 |
| Accuracy | 85.82% | 93.41% | 95.96% |
| Precision | 86.67% | 92.14% | 95.02% |
| Recall | 88.21% | 93.88% | 96.44% |
| F1-Score | 87.43% | 92.99% | 95.72% |
 
 Please Create Nice Tabel in UI.

| Field                 | Value                   |
| --------------------- | ----------------------- |
| **Version**           | v1.0                    |
| **GitHub Repository** | https://github.com/Adxrsh02/Automated-Fundus-Disease-Detection |
| **Live Demo**         | Not Available           |
| **Documentation**     | IEEE Research Paper     |
| **Last Updated**      | 2026                    |


Automated Fundus Image Screening is an AI-powered medical imaging system that leverages transfer learning with ResNet-50, ConvNeXtV2-Tiny, and Vision Transformer (ViT) to perform multi-label retinal disease detection from color fundus images. The framework includes an end-to-end preprocessing pipeline, robust feature extraction, and a Streamlit-based prediction interface, achieving 95.96% accuracy on the ODIR-2019 dataset for automated clinical screening and teleophthalmology applications.


## Why ConvNeXtV2-Tiny?

ConvNeXtV2-Tiny is a modern Convolutional Neural Network (CNN) architecture designed for advanced image classification tasks.

ConvNeXtV2-Tiny performs well in medical applications because it:
Extracts fine-grained visual features
Handles high-resolution images
Uses deep convolutional layers
Includes Global Response Normalization (GRN) which improves learning stability.


ConvNeXtV2-Tiny Model Archite Cloudinary Image Link :
https://res.cloudinary.com/lta722n4/image/upload/v1795635701/ConvNeXtV2-Tiny_Model_Architecture..png

Dimensions
4145 × 1913


## Deep Learning-Based Ophthalmic Screening Platform
EyeDetect is an AI-powered retinal disease screening platform that leverages Deep Learning and Computer Vision to analyze retinal fundus images and detect eye diseases at an early stage. The system assists patients and healthcare professionals by providing fast, accurate, and accessible screening for multiple retinal conditions.

The platform utilizes a fine-tuned ConvNeXtV2-Tiny model trained on retinal fundus image datasets to classify various eye diseases with high accuracy. In addition to disease prediction, EyeDetect provides disease information, preventive guidance, AI-assisted insights, and healthcare support resources

Home Page Image Path : Section_images\Projects\Automated_fundus_screening_project\Home_Page_1.jpeg

## Model Learning and Retinal Feature Identification
From fundus images, the model gradually learns patterns such as:

blood vessel abnormalities
optic disc changes
lesions and hemorrhages
exudates and drusen-like patterns
retinal texture variations
disease-specific structural differences

For example:
Glaucoma → optic disc and cup-disc related structural changes
Hypertensive Retinopathy → vessel narrowing and vascular changes

Images of the Exampple of the Fundus Image Features Which learn out=r Model Exactly and train the Model :

Cloudinary Image : https://res.cloudinary.com/lta722n4/image/upload/v1795634469/fundus_image_feature_Example_Image_1.png
Dimensions
1062 × 638

Cloudinary Image : https://res.cloudinary.com/lta722n4/image/upload/v1795634470/fundus_image_feature_Example_Image_2.png
Dimensions
668 × 668

Cloudinary Gloucomar analuysis Image features : https://res.cloudinary.com/lta722n4/image/upload/v1795634472/fundus_image_feature_Example_Image_3_Deep_Learning_For_Glucoma_Detection.png
Dimensions
776 × 848



## Intelligent Retinal Analysis Workflow
The Upload & Analyze module serves as the primary diagnostic interface of EyeDetect. Users can upload retinal fundus images, which are then processed through a fine-tuned ConvNeXtV2-Tiny inference pipeline to generate disease predictions, confidence scores, and clinical insights.

Upload & Analyze Image Path : Section_images\Projects\Automated_fundus_screening_project\Analyze_fundus_image_extractineg_Feature_2.jpg

Result and Disease dettection Path :
Section_images\Projects\Automated_fundus_screening_project\Result_of_fundus_Image_disases_name_3.jpg

Heat Map Visualization Path :
Section_images\Projects\Automated_fundus_screening_project\retinal_Attention_heatmap_compare_Fundu_image_4.jpg



## Workflow Architecture

Retinal Fundus Image
        │
        ▼
Image Upload & Validation
        │
        ▼
Image Preprocessing
(Resize, Normalization)
        │
        ▼
Deep Learning Inference Engine
(ConvNeXtV2-Tiny)
        │
        ▼
Feature Extraction
        │
        ▼
Disease Classification
        │
        ▼
Confidence Score Generation
        │
        ▼
Clinical Risk Assessment
        │
        ▼
Diagnostic Report & Recommendations


## Application Workflow of AI-Based Retinal Fundus Disease Detection System

Cloudinary Image Link : https://res.cloudinary.com/lta722n4/image/upload/v1795634114/Application_Flow_chart.png
Dimensions
3173 × 1389

This flowchart represents the complete workflow of an AI-Based Retinal Fundus Disease Detection System, starting from retinal image acquisition and patient information collection to AI-based disease classification, confidence scoring, and risk assessment. It also includes medical report generation, report sharing, scan history storage, AI chatbot assistance, and doctor support for clinical outcomes.


## RAG-Based Ophthalmology Knowledge Assistant
The Eye Disease Knowledge Assistant is a Retrieval-Augmented Generation (RAG) system designed to provide context-aware, evidence-based responses related to retinal diseases. The chatbot retrieves information from a curated ophthalmology knowledge base and generates accurate, disease-specific answers to support patient awareness and healthcare education.

Unlike traditional chatbots, the system does not rely solely on pretrained model knowledge. Instead, it retrieves relevant medical content from the indexed knowledge repository before generating responses, improving factual accuracy and reducing hallucinations.

Rag Medical ChatBot Eye Cloudinary image Path : 
https://res.cloudinary.com/lta722n4/image/upload/v1795634934/Rag_Medical_chatBot_Eye_5.png

Rag Medical ChatBot Eye dynamic Knowledge Base Interface Cloudinary image Path  : 
https://res.cloudinary.com/lta722n4/image/upload/v1795634934/knowledgebase_chatbot_6.png

## Research Publication

This project has been presented as a research contribution in the field of Medical Artificial Intelligence and Computer Vision.

Publication Details

Title:
Automated Fundus Image Screening: A Deep Learning Approach for Eye Disease Detection

Research Domain:

Deep Learning
Medical Image Analysis
Computer Vision
Ophthalmology AI
Healthcare Technology

Abstract:
This research presents an automated retinal disease screening framework leveraging a fine-tuned ConvNeXtV2-Tiny architecture for fundus image classification. The proposed system aims to assist in the early detection of vision-threatening ocular diseases by combining deep feature extraction, transfer learning, and intelligent diagnostic support. Experimental results demonstrate high classification performance, highlighting the potential of AI-driven ophthalmic screening systems for preventive healthcare applications.

## Research Paper Publish Details 

WCCG 2026 Organizing Committee

World Conference on Cognitive Computing and Generative AI
SKSVMA

Website: https://wccg.in/

Paper Id : 1940

Submission Title - Automated Fundus Image Screening: A Deep Learning Approach for Eye Disease Detection

Also I have Upload For Preview button My Project 
Publish research papere :
C:\Users\Adarsh Korade\OneDrive\Desktop\10PeakStudios\Automated Fundus Image Screening A Deep Learning Approach for Eye Disease Detection.pdf

I want Please you Thinka dn aGive me Nice Preview and Download This reacrcjhpapaer also With The Premium UI.


Also same as Previeew And Downlaod Option Both .


Please build Nice Project Section , 


 Carrefully All images Dimessions and alos carefully Mobile view also Imags 