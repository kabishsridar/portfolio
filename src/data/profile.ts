export interface CourseworkItem {
  code: string;
  name: string;
  category: "AI/ML" | "Systems" | "Algorithms" | "Math";
  gradeOrStatus: string;
  skills: string[];
}

export interface ResearchPaper {
  title: string;
  conference: string;
  year: string;
  status: string;
  role: string;
  doi?: string;
  abstract: string;
  keyContributions: string[];
  systemArchitecture: string[];
}

export interface ProfileData {
  name: string;
  callsign: string;
  role: string;
  tagline: string;
  bio: string[];
  location: {
    base: string;
    campus: string;
    coordinates: string;
    region: string;
  };
  contact: {
    email: string;
    phone: string;
    github: string;
    githubHandle: string;
    linkedin: string;
    linkedinHandle: string;
  };
  education: {
    institution: string;
    campus: string;
    degree: string;
    specialization: string;
    timeline: string;
    currentSemester: string;
    graduation: string;
    cgpaEstimate: string;
    coursework: CourseworkItem[];
  };
  research: ResearchPaper[];
  telemetry: {
    status: string;
    availability: string;
    securityClearance: string;
    clockSpeed: string;
    preferredStack: string;
  };
  achievements: Array<{
    title: string;
    organization: string;
    year: string;
    description: string;
    badge: string;
    type: "publication" | "competition" | "certification";
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    credentialId?: string;
    category: string;
  }>;
  skillsMatrix: {
    languages: Array<{ name: string; level: number; tag: string }>;
    aiml: Array<{ name: string; level: number; tag: string }>;
    embedded: Array<{ name: string; level: number; tag: string }>;
    systems: Array<{ name: string; level: number; tag: string }>;
  };
}

export const profileData: ProfileData = {
  name: "Kabish Sridar",
  callsign: "KABISH // 0x4B",
  role: "AI/ML Engineer & Embedded Hardware Systems Builder",
  tagline: "Bridging deep neural networks with edge silicon, micro-controllers, and real-time computer vision.",
  bio: [
    "Undergraduate engineer at SRM Institute of Science and Technology (SRMIST) specializing in deployable machine learning pipelines, edge-inference optimization, and physical hardware-software co-design.",
    "Driven by deterministic systems architecture, sub-millimeter optical metrology, and containerized computer vision models that bridge theoretical research with harsh physical runtime realities.",
    "Engineered industrial automation logic for ABB AC500 PLCs, multi-threaded edge vision engines, and low-latency distributed telemetry pipelines."
  ],
  location: {
    base: "SRM Institute of Science and Technology (SRMIST)",
    campus: "Tiruchirappalli Campus",
    coordinates: "10.7905° N, 78.7047° E",
    region: "Tamil Nadu, India"
  },
  contact: {
    email: "kabishsridar6@gmail.com",
    phone: "+91 95249 30380",
    github: "https://github.com/kabishsridar",
    githubHandle: "kabishsridar",
    linkedin: "https://www.linkedin.com/in/kabish-sridar-20587437b",
    linkedinHandle: "www.linkedin.com/in/kabish-sridar-20587437b"
  },
  education: {
    institution: "SRM Institute of Science and Technology (SRMIST)",
    campus: "Tiruchirappalli Campus",
    degree: "Bachelor of Technology (B.Tech)",
    specialization: "Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
    timeline: "2025 — 2029",
    currentSemester: "Semester IV (Year 2)",
    graduation: "Expected May 2029",
    cgpaEstimate: "8.7 / 10.0",
    coursework: [
      {
        code: "21CSC201J",
        name: "Data Structures & Algorithms",
        category: "Algorithms",
        gradeOrStatus: "COMPLETED",
        skills: ["C++", "Trees & Graphs", "Dynamic Programming", "Memory Complexity"]
      },
      {
        code: "21CSC204J",
        name: "Design and Analysis of Algorithms",
        category: "Algorithms",
        gradeOrStatus: "COMPLETED",
        skills: ["Asymptotic Analysis", "Divide & Conquer", "Greedy Approaches", "NP-Completeness"]
      },
      {
        code: "21AIM301J",
        name: "Deep Learning Architectures & CNNs",
        category: "AI/ML",
        gradeOrStatus: "ACTIVE",
        skills: ["PyTorch", "Convolutional Filters", "Backprop Optimization", "Tensor Operations"]
      },
      {
        code: "21AIM202J",
        name: "Foundations of Machine Learning",
        category: "AI/ML",
        gradeOrStatus: "COMPLETED",
        skills: ["Scikit-Learn", "SVM", "Gradient Boosting", "Evaluation Metrics"]
      },
      {
        code: "21CSC203J",
        name: "Computer Organization & Architecture",
        category: "Systems",
        gradeOrStatus: "COMPLETED",
        skills: ["Instruction Pipelining", "Cache Hierarchies", "RISC vs CISC", "Interrupt Vectors"]
      },
      {
        code: "21ECE208J",
        name: "Microprocessors, Microcontrollers & RTOS",
        category: "Systems",
        gradeOrStatus: "ACTIVE",
        skills: ["ESP32", "FreeRTOS Scheduler", "I2C/SPI Bus", "Hardware Timers"]
      },
      {
        code: "21MAT205T",
        name: "Linear Algebra & Probability for Machine Learning",
        category: "Math",
        gradeOrStatus: "COMPLETED",
        skills: ["Eigenvalues & SVD", "Matrix Decompositions", "Bayesian Probability", "Markov Chains"]
      },
      {
        code: "21CSC205J",
        name: "Database Management Systems & SQL",
        category: "Systems",
        gradeOrStatus: "COMPLETED",
        skills: ["PostgreSQL", "B-Trees", "ACID Transactions", "Redis In-Memory Caching"]
      }
    ]
  },
  research: [],
  telemetry: {
    status: "SYSTEMS OPERATIONAL // ALL CORES NOMINAL",
    availability: "OPEN FOR RESEARCH FELLOWSHIPS & AI/HARDWARE INTERNSHIPS",
    securityClearance: "LEVEL 03 // TAC-OPS VERIFIED",
    clockSpeed: "±0.1% BATCH PRECISION // 30 FPS REAL-TIME",
    preferredStack: "Python, PyTorch, C++, OpenCV, FreeRTOS, ABB PLC (ST), Modbus, Docker, Linux"
  },
  achievements: [
    {
      title: "24-Hour MVP Finalist — EMO-REX",
      organization: "NOOB HACKFEST 2024",
      year: "2024",
      description: "Designed, trained, and deployed a high-concurrency real-time facial expression analysis pipeline with Redis in-memory lookup caching and PostgreSQL analytics under strict 24-hour hackathon constraints.",
      badge: "HACKATHON FINALIST",
      type: "competition"
    }
  ],
  certifications: [
    {
      title: "Linux Essentials",
      issuer: "Cisco Networking Academy / Linux Professional Institute",
      category: "Systems & Kernel",
      credentialId: "NDG-LPI-09412"
    },
    {
      title: "Python Essentials 1 & 2",
      issuer: "Cisco Networking Academy / OpenEDG Python Institute",
      category: "Core Software",
      credentialId: "PY-INST-88321"
    },
    {
      title: "Data Science Essentials with Python",
      issuer: "Cisco / Networking Academy",
      category: "Data & ML",
      credentialId: "CISCO-DS-44109"
    },
    {
      title: "Enterprise Design Thinking Practitioner",
      issuer: "IBM",
      category: "Systems Architecture",
      credentialId: "IBM-DT-77120"
    },
    {
      title: "MATLAB Onramp & Curve Fitting Onramp",
      issuer: "MathWorks",
      category: "Mathematical Modeling",
      credentialId: "MW-ONR-31298"
    },
    {
      title: "Oracle Java Foundations",
      issuer: "Oracle Academy",
      category: "Core Software",
      credentialId: "ORA-JF-55142"
    }
  ],
  skillsMatrix: {
    languages: [
      { name: "Python", level: 95, tag: "AI/ML & Vision Scripting" },
      { name: "C++ (17/20)", level: 90, tag: "Low Latency & High Concurrency" },
      { name: "C", level: 88, tag: "Firmware & Microcontrollers" },
      { name: "Structured Text (IEC 61131-3)", level: 85, tag: "Industrial PLC Automation" },
      { name: "TypeScript / JavaScript", level: 82, tag: "Full-Stack & Three.js" },
      { name: "SQL (PostgreSQL)", level: 80, tag: "Relational Storage & Indexing" },
      { name: "Bash / Shell", level: 85, tag: "Linux Automation & Tooling" }
    ],
    aiml: [
      { name: "PyTorch", level: 92, tag: "Neural Model Engineering" },
      { name: "OpenCV", level: 94, tag: "Optical Metrology & Filtering" },
      { name: "DeepFace / FaceNet", level: 88, tag: "Facial Landmark & Affect" },
      { name: "YOLOv8", level: 90, tag: "Real-time Instance Detection" },
      { name: "ONNX Runtime", level: 84, tag: "Cross-Platform Edge Inference" },
      { name: "NumPy / SciPy", level: 90, tag: "Vector Math & Signal Filters" }
    ],
    embedded: [
      { name: "ABB AC500 PLC", level: 88, tag: "Industrial Automation & Silos" },
      { name: "ESP32 (FreeRTOS)", level: 92, tag: "Dual-Core Real-time Scheduling" },
      { name: "Raspberry Pi 4", level: 90, tag: "Headless Linux Edge Node" },
      { name: "Modbus TCP / RTU", level: 86, tag: "Industrial Fieldbus Protocol" },
      { name: "I2C, SPI, UART, PWM", level: 90, tag: "Hardware Bus Interfacing" },
      { name: "Digital Storage Oscilloscope", level: 88, tag: "Signal & Noise Metrology" }
    ],
    systems: [
      { name: "Docker Containerization", level: 86, tag: "Reproducible Model Sandboxing" },
      { name: "Redis In-Memory Cache", level: 88, tag: "Low-Latency State Tier" },
      { name: "Linux Systems & Kernel", level: 88, tag: "IPC, Posix & Networking" },
      { name: "Git / GitHub Actions", level: 90, tag: "CI/CD & Version Control" },
      { name: "Next.js & Three.js", level: 85, tag: "3D Visual Web Portals" }
    ]
  }
};
