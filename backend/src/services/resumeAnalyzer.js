const TECHNICAL_SKILLS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'React',
  'Angular',
  'Vue',
  'Node.js',
  'Express',
  'Next.js',
  'Django',
  'Flask',
  'Spring Boot',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'GraphQL',
  'REST API',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Git',
  'CI/CD',
  'Linux',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Sass',
  'Webpack',
  'Vite',
  'Jest',
  'Cypress',
  'Agile',
  'Scrum',
  'Machine Learning',
  'TensorFlow',
  'PyTorch',
  'Data Structures',
  'Algorithms',
  'System Design',
  'Microservices',
  'SQL',
  'NoSQL',
  'Firebase',
  'Elasticsearch',
  'Kafka',
  'RabbitMQ',
  'Nginx',
  'Terraform',
  'Ansible',
  'Jenkins',
  'GitHub Actions',
  'Figma',
  'Tableau',
  'Power BI',
  'Pandas',
  'NumPy',
  'Spark',
  'Hadoop',
  'Blockchain',
  'Solidity',
  'WebSocket',
  'OAuth',
  'JWT',
  'Unit Testing',
  'TDD',
];

const SECTION_PATTERNS = {
  contact: [
    /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/,
    /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/,
    /\blinkedin\.com\/[\w-]+\b/i,
    /\bgithub\.com\/[\w-]+\b/i,
  ],
  experience: [
    /\b(?:work\s+)?experience\b/i,
    /\bprofessional\s+experience\b/i,
    /\bemployment\s+history\b/i,
    /\bwork\s+history\b/i,
  ],
  education: [
    /\beducation\b/i,
    /\bacademic\s+background\b/i,
    /\bqualifications\b/i,
    /\bdegree\b/i,
    /\buniversity\b/i,
    /\bcollege\b/i,
  ],
  projects: [
    /\bprojects?\b/i,
    /\bpersonal\s+projects?\b/i,
    /\bportfolio\b/i,
    /\bkey\s+projects?\b/i,
  ],
};

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractSkills(text) {
  const normalized = text.toLowerCase();
  const detected = [];

  for (const skill of TECHNICAL_SKILLS) {
    const pattern = new RegExp(`\\b${escapeRegex(skill.toLowerCase())}\\b`, 'i');
    if (pattern.test(normalized)) {
      detected.push(skill);
    }
  }

  return detected;
}

export function detectMissingSkills(detectedSkills) {
  const detectedSet = new Set(detectedSkills.map((skill) => skill.toLowerCase()));
  const prioritySkills = [
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'Git',
    'SQL',
    'MongoDB',
    'Docker',
    'AWS',
    'TypeScript',
    'REST API',
    'System Design',
  ];

  return prioritySkills.filter((skill) => !detectedSet.has(skill.toLowerCase()));
}

function hasSection(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

export function detectSections(text) {
  return {
    hasContact: hasSection(text, SECTION_PATTERNS.contact),
    hasExperience: hasSection(text, SECTION_PATTERNS.experience),
    hasEducation: hasSection(text, SECTION_PATTERNS.education),
    hasProjects: hasSection(text, SECTION_PATTERNS.projects),
  };
}

export function calculateAtsScore(text, detectedSkills) {
  const sections = detectSections(text);
  let score = 0;

  if (sections.hasContact) score += 15;
  if (sections.hasExperience) score += 20;
  if (sections.hasEducation) score += 15;
  if (sections.hasProjects) score += 15;

  const skillCount = detectedSkills.length;
  if (skillCount >= 10) score += 35;
  else if (skillCount >= 7) score += 28;
  else if (skillCount >= 5) score += 22;
  else if (skillCount >= 3) score += 15;
  else if (skillCount >= 1) score += 8;

  return Math.min(100, score);
}

export function generateStrengths(sections, detectedSkills, atsScore) {
  const strengths = [];

  if (sections.hasContact) {
    strengths.push('Contact information is clearly present, making it easy for recruiters to reach you.');
  }

  if (sections.hasExperience) {
    strengths.push('Work experience section is included, which helps ATS systems match your background to roles.');
  }

  if (sections.hasEducation) {
    strengths.push('Education section is present, providing important academic credentials.');
  }

  if (sections.hasProjects) {
    strengths.push('Projects section showcases hands-on work and practical skills beyond employment history.');
  }

  if (detectedSkills.length >= 7) {
    strengths.push(`Strong technical keyword coverage with ${detectedSkills.length} relevant skills detected.`);
  } else if (detectedSkills.length >= 3) {
    strengths.push(`Good foundation of technical skills with ${detectedSkills.length} keywords identified.`);
  }

  if (atsScore >= 75) {
    strengths.push('Overall resume structure aligns well with common ATS parsing requirements.');
  }

  if (strengths.length === 0) {
    strengths.push('Resume uploaded successfully — follow the improvement suggestions to boost your ATS score.');
  }

  return strengths;
}

export function generateImprovements(sections, detectedSkills, missingSkills) {
  const improvements = [];

  if (!sections.hasContact) {
    improvements.push('Add contact details including email, phone number, and LinkedIn or GitHub profile links.');
  }

  if (!sections.hasExperience) {
    improvements.push('Include a clearly labeled Work Experience section with job titles, companies, and dates.');
  }

  if (!sections.hasEducation) {
    improvements.push('Add an Education section listing your degree, institution, and graduation year.');
  }

  if (!sections.hasProjects) {
    improvements.push('Add a Projects section to highlight personal or academic work that demonstrates your skills.');
  }

  if (detectedSkills.length < 5) {
    improvements.push('Increase technical keyword density by listing relevant tools, languages, and frameworks.');
  }

  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 5).join(', ');
    improvements.push(`Consider adding in-demand skills you may have but haven't listed: ${topMissing}.`);
  }

  improvements.push('Use standard section headings (Experience, Education, Skills, Projects) for better ATS parsing.');
  improvements.push('Quantify achievements with metrics (e.g., "Reduced load time by 40%" or "Managed team of 5").');

  return improvements;
}

export function analyzeResume(text) {
  const extractedText = normalizeText(text);
  const detectedSkills = extractSkills(extractedText);
  const missingSkills = detectMissingSkills(detectedSkills);
  const sections = detectSections(extractedText);
  const atsScore = calculateAtsScore(extractedText, detectedSkills);
  const strengths = generateStrengths(sections, detectedSkills, atsScore);
  const improvements = generateImprovements(sections, detectedSkills, missingSkills);

  return {
    extractedText,
    atsScore,
    detectedSkills,
    missingSkills,
    strengths,
    improvements,
  };
}
