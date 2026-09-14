export interface Project {
  id: string;
  code: string;
  title: string;
  category: "Computer Vision & Edge AI" | "Industrial Automation" | "Systems & Cloud Infrastructure" | "Deep Learning & OCR";
  status: "DEPLOYED" | "BENCHMARKED" | "FIELD_TESTED" | "PRODUCTION_READY";
  tagline: string;
  summary: string;
  keyMetric: string;
  keyMetricLabel: string;
  stack: string[];
  specs: Array<{ label: string; value: string }>;
  architecture: {
    input: string;
    processing: string;
    hardwareOrStorage: string;
    output: string;
  };
  highlights: string[];
  simulationType: "emotion" | "rasi" | "thali" | "ocr" | "profiler" | "kyc";
  externalWebsite?: {
    label: string;
    url: string;
    description: string;
  };
}

export const projects: Project[] = [
  {
    id: "emo-rex",
    code: "PRJ-01 // VISION",
    title: "EMO-REX: High-Concurrency Multimodal Emotion Tracker",
    category: "Computer Vision & Edge AI",
    status: "FIELD_TESTED",
    tagline: "Low-latency edge facial expression detection with in-memory Redis state caching.",
    summary: "High-concurrency facial expression analysis pipeline engineered for multi-subject tracking in variable illumination environments. Built during a strict 24-hour hackathon, mitigating database write bottlenecks by introducing an in-memory caching tier.",
    keyMetric: "30 FPS / -40% Latency",
    keyMetricLabel: "Edge Inference Throughput & State-Lookup Optimization",
    stack: ["Python", "OpenCV", "DeepFace", "Redis", "PostgreSQL", "Docker"],
    specs: [
      { label: "Target Frame Rate", value: "30.0 FPS stable" },
      { label: "State Cache Layer", value: "Redis In-Memory Key-Value" },
      { label: "Latency Cut", value: "40% reduction in DB read/write cycles" },
      { label: "Illumination Handling", value: "Adaptive CLAHE Histogram Normalization" },
      { label: "Analytics Store", value: "PostgreSQL Relational Schema" }
    ],
    architecture: {
      input: "RTSP / USB Live Video Feed",
      processing: "Haar + DeepFace Facial Vector Extraction",
      hardwareOrStorage: "Redis In-Memory Cache (TTL: 1.5s)",
      output: "PostgreSQL Long-term Affective Telemetry"
    },
    highlights: [
      "Mitigated severe database bottlenecks under multi-face detection by decoupling raw frame metrics into a high-throughput Redis pipeline.",
      "Engineered adaptive contrast normalization allowing accurate emotion vector clustering across uneven ambient light.",
      "Awarded Hackathon Finalist distinction at NOOB HACKFEST 2024 for full end-to-end MVP demonstration."
    ],
    simulationType: "emotion"
  },
  {
    id: "rasi-feed-plc",
    code: "PRJ-02 // AUTOMATION",
    title: "Rasi Batching Feed PLC Automation System",
    category: "Industrial Automation",
    status: "PRODUCTION_READY",
    tagline: "Deterministic multi-ingredient animal feed batch formulation programmed on ABB AC500 PLC.",
    summary: "Industrial-grade automated raw material scaling and animal feed batching system engineered for Rasi Feeds. Programmed in IEC 61131-3 Structured Text on an ABB AC500 PLC to automate silo gating, load cell weight scaling, pneumatic valve control, and fail-safe safety interlocks.",
    keyMetric: "±0.1% Batch Precision",
    keyMetricLabel: "Automated Multi-Silo Scaling & 95% Manual Elimination",
    stack: ["ABB AC500 PLC", "Structured Text (IEC 61131-3)", "ABB Automation Builder", "Modbus TCP/IP", "Load Cells", "Pneumatic Valves"],
    specs: [
      { label: "Controller Hardware", value: "ABB AC500 PM573 Modular PLC" },
      { label: "Language Standard", value: "IEC 61131-3 Structured Text (ST)" },
      { label: "Batch Scale Inputs", value: "4-Channel Analog Load Cell Amplifiers" },
      { label: "Fieldbus Protocol", value: "Modbus TCP/IP Industrial Network" },
      { label: "Safety Architecture", value: "Emergency Stop Circuit + Dual Software Interlocks" }
    ],
    architecture: {
      input: "Silo Load Cells & Material Level Sensors",
      processing: "ABB AC500 Cyclic ST State Logic (10ms Scan)",
      hardwareOrStorage: "Pneumatic Slide Gates & Mixer Auger Relays",
      output: "SCADA Telemetry & Batch Weight Audit Ledger"
    },
    highlights: [
      "Eliminated manual material scaling discrepancies by 95% across critical high-tonnage feed mixing batches.",
      "Engineered an automated multi-stage feed formula sequencer that coordinates fine and coarse feed gates to prevent overshoot.",
      "Implemented hardware watchdog safety interlocks that halt pneumatic flow instantly upon weight delta anomalies."
    ],
    simulationType: "rasi"
  },
  {
    id: "thali-calorie-vision",
    code: "PRJ-03 // CV-NUTRITION",
    title: "Indian Thali Dish Detection & Calorie Estimation System",
    category: "Computer Vision & Edge AI",
    status: "BENCHMARKED",
    tagline: "Multi-class Indian cuisine segmentation with volumetric density-based nutritional estimation.",
    summary: "Deep learning computer vision system trained to recognize multi-component Indian Thali meals (Roti, Dal, Rice, Paneer Gravy, Sabzi, Curd, Salad). Performs localized instance segmentation, estimates volumetric portion sizes, and calculates caloric and macronutrient values in real time.",
    keyMetric: "93.8% mAP / Real-Time",
    keyMetricLabel: "Multi-Dish Classification & Caloric Assessment Speed",
    stack: ["PyTorch", "YOLOv8", "OpenCV", "Python", "NumPy", "FastAPI"],
    specs: [
      { label: "Target Cuisine", value: "Multi-Dish Indian Thali Platters" },
      { label: "Detected Classes", value: "Roti, Rice, Dal, Paneer Gravy, Mixed Sabzi, Curd, Salad" },
      { label: "Portion Method", value: "Bounding Area + Depth/Volume Heuristic Regression" },
      { label: "Inference Latency", value: "24ms on GPU / 95ms Edge CPU" },
      { label: "Nutritional Output", value: "Total Calories (kcal), Protein, Carbs, Fats (g)" }
    ],
    architecture: {
      input: "High-Angle Overhead Thali Image / Camera",
      processing: "YOLOv8 Instance Segmentation & Color Clustering",
      hardwareOrStorage: "Standardized Nutritional Database (NIN / ICMR)",
      output: "Visual HUD Bounding Map + Macro Breakdown"
    },
    highlights: [
      "Trained on authentic Indian food varieties with high visual variance in gravies, textures, and bowl layouts.",
      "Engineered automated reference-scaling (plate rim diameter) to accurately compute physical portion weights from 2D imagery.",
      "Outputs instant macronutrient split (Carbohydrates, Proteins, Lipids) for clinical dietetics and calorie tracking."
    ],
    simulationType: "thali"
  },
  {
    id: "handwriting-ocr",
    code: "PRJ-04 // DEEP-OCR",
    title: "Handwriting-to-Text OCR & Document Digitization Engine",
    category: "Deep Learning & OCR",
    status: "DEPLOYED",
    tagline: "Offline handwritten manuscript digitization using CRNN sequence modeling with CTC loss.",
    summary: "High-accuracy optical character recognition pipeline engineered to transcribe complex cursive handwritten documents and classroom notes into editable machine text. Leverages adaptive morphological binarization, line-word segmentation, and a convolutional recurrent network with CTC decoding.",
    keyMetric: "92.4% Character Accuracy",
    keyMetricLabel: "Unconstrained Cursive Script Recognition Accuracy",
    stack: ["Python", "PyTorch", "OpenCV", "CRNN", "CTC Loss", "PaddleOCR", "FastAPI"],
    specs: [
      { label: "Model Architecture", value: "CNN Feature Extractor + Bi-LSTM Sequence Decoder" },
      { label: "Transcription Loss", value: "Connectionist Temporal Classification (CTC)" },
      { label: "Preprocessing", value: "Sauvola Binarization & Skew/Deslant Correction" },
      { label: "Segmentation", value: "Horizontal Projection Profile Line Slicing" },
      { label: "Supported Formats", value: "JPG, PNG, Scanned PDF Manuscripts" }
    ],
    architecture: {
      input: "Handwritten Page / Note Scan",
      processing: "OpenCV Line Slicing -> CRNN + Bi-LSTM Text Prediction",
      hardwareOrStorage: "CTC Beam Search Decoder & Vocabulary Trie",
      output: "Structured Plaintext / Markdown & Searchable JSON"
    },
    highlights: [
      "Built a robust preprocessing pipeline applying deslanting and adaptive Sauvola thresholding to handle uneven handwriting strokes.",
      "Achieved 92.4% character accuracy on irregular cursive scripts without relying on rigid grid constraints.",
      "Packaged as a lightweight REST API that exports structured, searchable digital documents from handwritten notes."
    ],
    simulationType: "ocr"
  },
  {
    id: "picam-profiler",
    code: "PRJ-05 // METROLOGY",
    title: "PiCam Micro-Gap Optical Profiler",
    category: "Computer Vision & Edge AI",
    status: "DEPLOYED",
    tagline: "Automated sub-millimeter physical gap measurement with OpenCV perspective calibration.",
    summary: "Industrial computer vision metrology rig replacing manual vernier caliper measurements with zero-contact edge boundary calculations. Uses sub-pixel contouring and calibrated homography to compute physical clearances in real time.",
    keyMetric: "±0.04mm Tolerance",
    keyMetricLabel: "Sub-Millimeter Edge Calibration & Zero-Contact Measurement",
    stack: ["Raspberry Pi 4", "PiCamera v2", "Python", "OpenCV", "NumPy", "Linux"],
    specs: [
      { label: "Measurement Resolution", value: "Sub-millimeter (±0.04mm calibrated)" },
      { label: "Lens Correction", value: "Checkerboard Homography & Distortion Matrix" },
      { label: "Contour Algorithm", value: "Canny + Dual-Sobel Sub-Pixel Interpolation" },
      { label: "Inspection Speed", value: "18 samples / second continuous" },
      { label: "Hardware Host", value: "Raspberry Pi 4B (Debian-based headless)" }
    ],
    architecture: {
      input: "PiCamera 8MP Macro Telephoto Lens",
      processing: "OpenCV Perspective Transform & Edge Contours",
      hardwareOrStorage: "On-device Euclidean Pixel-to-Metric Transform",
      output: "Real-time Digital HUD Tolerance Readout"
    },
    highlights: [
      "Eliminated 100% of human error and manual caliper contact distortion in micro-clearance mechanical inspection.",
      "Integrated dynamic checkerboard calibration targets for real-time field homography compensation.",
      "Direct digital readout with go/no-go industrial tolerance gating and CSV audit log generation."
    ],
    simulationType: "profiler",
    externalWebsite: {
      label: "OM90 Elongation Detector",
      url: "https://om90.in/devices/elongation-detector",
      description: "Official device portal & live deployment specifications created especially for this project."
    }
  },
  {
    id: "kyc-platform",
    code: "PRJ-06 // BACKEND",
    title: "Automated KYC Verification & Security Pipeline",
    category: "Systems & Cloud Infrastructure",
    status: "PRODUCTION_READY",
    tagline: "Dual-tier database architecture decoupling rapid session ingest from encrypted master vaults.",
    summary: "High-security Know Your Customer (KYC) onboarding backend architecture for identity document authentication. Employs a dual-database pattern using embedded SQLite for sub-millisecond local session caching and streaming verified credentials into an encrypted PostgreSQL vault.",
    keyMetric: "<120ms Ingestion",
    keyMetricLabel: "Zero-Timeout Session Drop-off with Dual-Tier Persistence",
    stack: ["Python", "FastAPI", "SQLite", "PostgreSQL", "Cryptography", "Docker"],
    specs: [
      { label: "Architectural Pattern", value: "Dual-tier Database Session Buffer" },
      { label: "Session Store", value: "Embedded SQLite in-memory / WAL mode" },
      { label: "Encrypted Master Vault", value: "PostgreSQL with AES-256 encrypted fields" },
      { label: "Concurrency Model", value: "Async ASGI Event Loop via FastAPI" },
      { label: "Document Ingest", value: "Multi-part streaming upload with hash validation" }
    ],
    architecture: {
      input: "Encrypted Identity Document Upload",
      processing: "Async Hash Validation & Field Extraction",
      hardwareOrStorage: "SQLite High-Speed Buffer -> Master PostgreSQL Vault",
      output: "Cryptographic Attestation Token & Status Webhook"
    },
    highlights: [
      "Eliminated user onboarding timeouts by decoupling volatile network sessions from slow external persistence checks.",
      "Implemented strict database ACID guarantees with transactional rollbacks on invalid cryptographic signatures.",
      "Containerized microservice architecture with automated TLS certificate handling and health telemetry."
    ],
    simulationType: "kyc"
  }
];
