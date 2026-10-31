import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3,
  Code2,
  BrainCircuit,
  ArrowUpRight,
  Check,
  Copy,
  Send,
  MapPin,
  Calendar,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  UploadCloud,
  FileText,
  X,
  Paperclip,
  AlertCircle,
  Loader2,
  ExternalLink,
  KeyRound,
} from 'lucide-react';
import { EASINGS, fadeInUpVariants, lineExpandVariants } from './animations/motionVariants';
import { COMPANY_DETAILS } from '../data/companyData';

export type InternshipTrackId = 'data-analytics' | 'full-stack' | 'ai-ml';

interface InternshipRole {
  id: InternshipTrackId;
  title: string;
  badge: string;
  department: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  keyResponsibilities: string[];
  prerequisites: string[];
  techStack: string[];
  duration: string;
  locations: string;
}

const INTERNSHIP_ROLES: InternshipRole[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics Intern',
    badge: 'Quantitative Systems',
    department: 'Business Intelligence & Modeling',
    subtitle: 'ETL Pipelines, BigQuery Warehousing & Operational Metrics',
    icon: BarChart3,
    description:
      'Analyze complex commercial datasets, architect automated ETL pipelines, build performant analytical data models in BigQuery/PostgreSQL, and design high-clarity executive telemetry dashboards.',
    keyResponsibilities: [
      'Write optimized SQL queries and transformation models for reporting pipelines',
      'Design interactive operational dashboards in Metabase, PowerBI, and custom React views',
      'Perform statistical data reconciliation and anomaly audits across operational records',
      'Collaborate with backend engineers to instrument clean analytics logging events',
    ],
    prerequisites: [
      'Strong grasp of SQL (joins, window functions, aggregations, indexing)',
      'Working knowledge of Python for data analysis (Pandas, NumPy)',
      'Familiarity with relational schema design and data visualization principles',
      'Curiosity for business operations and quantitative problem-solving',
    ],
    techStack: ['SQL', 'Python', 'BigQuery', 'PostgreSQL', 'PowerBI / Metabase', 'Pandas'],
    duration: '3 to 6 Months (Flexible with academic schedules)',
    locations: 'Chennai &middot; Bangalore &middot; Hybrid',
  },
  {
    id: 'full-stack',
    title: 'Full Stack Engineering Intern',
    badge: 'Modern Web Architecture',
    department: 'Core Software Systems',
    subtitle: 'TypeScript, React, Node.js & Enterprise Web Platforms',
    icon: Code2,
    description:
      'Build scalable web applications and mission-critical operations consoles. You will write typed, maintainable TypeScript across React frontends and Node.js backend services, with an emphasis on speed and UI fidelity.',
    keyResponsibilities: [
      'Develop modular, responsive web interfaces using React 19, TypeScript, and Tailwind CSS',
      'Architect robust REST and GraphQL API endpoints with Node.js and Express',
      'Integrate relational database models with PostgreSQL, handling migrations and transactions',
      'Implement real-time features, state management, and strict automated validation logic',
    ],
    prerequisites: [
      'Proficiency in modern TypeScript / JavaScript and React fundamentals',
      'Experience building and consuming RESTful web APIs',
      'Foundational understanding of databases (PostgreSQL or MySQL)',
      'Appreciation for clean UI craftsmanship, accessibility, and architectural restraint',
    ],
    techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vite / Next.js'],
    duration: '3 to 6 Months (Flexible with academic schedules)',
    locations: 'Chennai &middot; Bangalore &middot; Hybrid',
  },
  {
    id: 'ai-ml',
    title: 'AI / ML Engineering Intern',
    badge: 'Applied Intelligence',
    department: 'Machine Intelligence & Agents',
    subtitle: 'LLMs, Agentic Workflows, RAG & Machine Learning Models',
    icon: BrainCircuit,
    description:
      'Deploy cutting-edge machine learning and generative AI architectures into commercial software. You will build retrieval-augmented generation (RAG) pipelines, autonomous agent toolchains, and fine-tune models on enterprise corpora.',
    keyResponsibilities: [
      'Integrate frontier LLMs (Gemini, Claude, GPT) with proprietary knowledge bases and vector stores',
      'Engineer deterministic prompt workflows, evaluations, and structured output parsers',
      'Develop applied ML classification, clustering, and predictive time-series models',
      'Optimize latency and cost through embedding caching, semantic routing, and quantization',
    ],
    prerequisites: [
      'Solid command of Python and ML libraries (PyTorch, Scikit-learn, HuggingFace)',
      'Understanding of embedding models, vector databases (Chroma, Pinecone, pgvector), and RAG',
      'Experience with API development and LLM SDKs / agent frameworks',
      'Interest in agentic architectures, function calling, and deterministic verification',
    ],
    techStack: ['Python', 'PyTorch', 'Gemini API', 'Vector DBs', 'LangChain / LlamaIndex', 'FastAPI'],
    duration: '3 to 6 Months (Flexible with academic schedules)',
    locations: 'Chennai &middot; Bangalore &middot; Hybrid',
  },
];

interface UploadedResume {
  filename: string;
  contentType: string;
  base64Content: string;
  size: number;
}

export const CareersSection: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<InternshipTrackId>('data-analytics');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    gradYear: '2026',
    locationPref: 'Chennai',
    githubUrl: '',
    portfolioUrl: '',
    projectHighlights: '',
  });

  const [resumeFile, setResumeFile] = useState<UploadedResume | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeRole = INTERNSHIP_ROLES.find((r) => r.id === selectedTrack) || INTERNSHIP_ROLES[0];

  const handleSelectTrack = (trackId: InternshipTrackId) => {
    setSelectedTrack(trackId);
    const formEl = document.getElementById('internship-application-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB limit. Please upload a smaller document.');
      return;
    }

    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileNameLower = file.name.toLowerCase();
    const isValidExtension = validExtensions.some((ext) => fileNameLower.endsWith(ext));

    if (!isValidExtension && !file.type.includes('pdf') && !file.type.includes('word')) {
      setFileError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }

    setFileError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Content = result.includes(',') ? result.split(',')[1] : result;
      setResumeFile({
        filename: file.name,
        contentType: file.type || 'application/pdf',
        base64Content,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateApplicationSummary = () => {
    return `ALS INFONET INTERNSHIP APPLICATION
--------------------------------------------------
Track: ${activeRole.title} (${activeRole.department})
Applicant Name: ${formData.fullName}
Email: ${formData.email}
Phone / WhatsApp: ${formData.phone}
Education / Degree: ${formData.education} (${formData.gradYear})
Preferred Hub: ${formData.locationPref}
GitHub Profile: ${formData.githubUrl || 'N/A'}
Portfolio / LinkedIn / Resume Link: ${formData.portfolioUrl || 'N/A'}
Attached File: ${resumeFile ? `${resumeFile.filename} (${Math.round(resumeFile.size / 1024)} KB)` : 'None'}

Technical Background & Key Projects:
${formData.projectHighlights || 'No project notes provided.'}
--------------------------------------------------
Target Inbox: ${COMPANY_DETAILS.email}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          track: selectedTrack,
          roleTitle: activeRole.title,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          education: formData.education,
          gradYear: formData.gradYear,
          locationPref: formData.locationPref,
          githubUrl: formData.githubUrl,
          portfolioUrl: formData.portfolioUrl,
          projectHighlights: formData.projectHighlights,
          resume: resumeFile,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || 'Failed to send application email.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Nodemailer submission error:', err);
      setSubmitError(err?.message || 'Unable to connect to the mailing service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectEmailClient = () => {
    const summary = generateApplicationSummary();
    const subject = encodeURIComponent(`Internship Application: ${activeRole.title} - ${formData.fullName}`);
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:${COMPANY_DETAILS.email}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = () => {
    const summary = generateApplicationSummary();
    navigator.clipboard.writeText(summary);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <section
      id="careers"
      aria-labelledby="careers-heading"
      className="bg-[#FAFAFA] text-black py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 border-b border-[#EAEAEA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animated Line */}
        <div className="relative pb-10 mb-16 sm:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.1}
            >
              <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#777777] block mb-4">
                04 / TALENT &amp; APPRENTICESHIP &middot; CAREERS
              </span>
              <h2
                id="careers-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-black max-w-2xl"
              >
                Build real systems. Grow with engineering rigor.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.2}
              className="mt-6 md:mt-0 max-w-md"
            >
              <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
                We offer rigorous, project-backed internships for talented students and emerging
                engineers in Chennai and Bangalore. Work directly on production code, databases, and
                intelligent software architectures.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={lineExpandVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.25}
            className="absolute bottom-0 left-0 right-0 h-px bg-[#EAEAEA]"
          />
        </div>

        {/* 1. Track Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 sm:mb-24">
          {INTERNSHIP_ROLES.map((role, idx) => {
            const isSelected = selectedTrack === role.id;
            const Icon = role.icon;

            return (
              <motion.div
                key={role.id}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.1 + idx * 0.12}
                onClick={() => setSelectedTrack(role.id)}
                className={`p-8 sm:p-10 border transition-all duration-300 flex flex-col justify-between cursor-pointer group relative ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-lg scale-[1.01]'
                    : 'bg-white text-black border-[#EAEAEA] hover:border-black/40 hover:bg-[#FDFDFD]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`w-12 h-12 rounded-none flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-white text-black' : 'bg-black text-white group-hover:scale-105'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 border transition-colors ${
                        isSelected
                          ? 'border-neutral-700 text-neutral-300'
                          : 'border-[#EAEAEA] text-[#777777] group-hover:border-black'
                      }`}
                    >
                      {role.badge}
                    </span>
                  </div>

                  {/* Title & Department */}
                  <div className="mb-4">
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-sans font-medium block mb-1.5 ${
                        isSelected ? 'text-neutral-400' : 'text-[#888888]'
                      }`}
                    >
                      {role.department}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-normal">{role.title}</h3>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm font-sans font-light leading-relaxed mb-6 ${
                      isSelected ? 'text-neutral-300' : 'text-[#666666]'
                    }`}
                  >
                    {role.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {role.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                          isSelected
                            ? 'border-neutral-800 bg-neutral-900 text-neutral-300'
                            : 'border-[#EFEFEF] bg-[#F7F7F7] text-[#555555]'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Meta & Action */}
                <div
                  className={`pt-6 border-t flex items-center justify-between text-xs font-sans ${
                    isSelected ? 'border-neutral-800' : 'border-[#EAEAEA]'
                  }`}
                >
                  <span className={isSelected ? 'text-neutral-400' : 'text-[#777777]'}>
                    3-6 Mo &middot; Stipend Included
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-medium tracking-wider uppercase text-[11px] ${
                      isSelected ? 'text-white' : 'text-black group-hover:translate-x-1 transition-transform'
                    }`}
                  >
                    {isSelected ? 'Selected Track' : 'Select Track'}
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. Focused Internship Application Console */}
        <div id="internship-application-form" className="bg-white border border-[#EAEAEA] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Track Brief & Requirements */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777] block mb-2">
                  Applying For
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-black font-normal">
                  {activeRole.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] font-sans font-light mt-2">
                  {activeRole.subtitle}
                </p>
              </div>

              {/* What you will do */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-black mb-3">
                  Core Responsibilities
                </h4>
                <ul className="space-y-2.5">
                  {activeRole.keyResponsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#555555] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What we look for */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-black mb-3">
                  Candidate Profile &amp; Prerequisites
                </h4>
                <ul className="space-y-2.5">
                  {activeRole.prerequisites.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#555555] font-sans">
                      <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Program Attributes */}
              <div className="pt-6 border-t border-[#EAEAEA] grid grid-cols-2 gap-4 text-xs font-sans text-[#666666]">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-black" />
                  <span>3-6 Months Duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-black" />
                  <span>Chennai / Bangalore / Hybrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-black" />
                  <span>College Credits / Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-black" />
                  <span>PPO Potential for High Impact</span>
                </div>
              </div>

              {/* Direct Help Callout */}
              <div className="p-4 bg-[#FAFAFA] border border-[#EAEAEA] text-xs font-sans text-[#666666] space-y-1.5">
                <span className="font-semibold text-black block">Receiving Inbox:</span>
                <div className="flex items-center gap-2 text-black">
                  <Mail size={13} className="text-neutral-500" />
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-medium hover:underline">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <Phone size={13} className="text-neutral-500" />
                  <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="font-medium hover:underline">
                    {COMPANY_DETAILS.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Interactive Application Form with Resume Upload */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black text-white p-8 sm:p-12 space-y-6"
                >
                  <div className="w-12 h-12 bg-white text-black flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                      Nodemailer Direct Delivery
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-serif font-normal">
                      Delivered to {COMPANY_DETAILS.email}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your application for{' '}
                    <strong>{activeRole.title}</strong>{' '}
                    {resumeFile ? `along with your attached resume (${resumeFile.filename})` : ''} has
                    been dispatched directly to our talent team at{' '}
                    <strong className="text-white">{COMPANY_DETAILS.email}</strong>.
                  </p>

                  <div className="p-4 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto whitespace-pre-wrap max-h-48 leading-relaxed">
                    {generateApplicationSummary()}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="px-5 py-3 border border-white text-white text-xs uppercase tracking-[0.16em] font-sans hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Copy size={13} />
                      <span>{copiedBrief ? 'Copied to Clipboard!' : 'Copy Application Summary'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        handleRemoveResume();
                      }}
                      className="px-5 py-3 text-xs uppercase tracking-[0.16em] font-sans text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                  {submitError && (
                    <div className="p-5 bg-neutral-950 border border-neutral-800 text-white text-xs space-y-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-white mb-1">Gmail SMTP Delivery Notice</div>
                          <p className="text-neutral-300 text-xs leading-relaxed">
                            {submitError}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                          type="button"
                          onClick={handleDirectEmailClient}
                          className="px-4 py-2.5 bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send size={12} />
                          <span>Send Now via Email Client</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="px-4 py-2.5 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-wider hover:text-white hover:border-neutral-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Copy size={12} />
                          <span>{copiedBrief ? 'Copied!' : 'Copy Summary'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Track Selector Radio Pills */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                      Selected Track *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {INTERNSHIP_ROLES.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSelectedTrack(r.id)}
                          className={`px-3 py-2.5 text-xs text-left border transition-colors cursor-pointer ${
                            selectedTrack === r.id
                              ? 'border-black bg-black text-white font-medium'
                              : 'border-[#EAEAEA] bg-[#FAFAFA] text-[#555555] hover:border-black/50'
                          }`}
                        >
                          {r.title.replace(' Intern', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. S. Arvind / Priya Ramesh"
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black font-sans"
                      />
                    </div>
                  </div>

                  {/* Phone & Graduation Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98400 00000"
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        Graduation Year *
                      </label>
                      <select
                        value={formData.gradYear}
                        onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black focus:outline-none focus:border-black font-sans cursor-pointer"
                      >
                        <option value="2025">2025 (Graduated / Final Year)</option>
                        <option value="2026">2026 (Pre-Final Year)</option>
                        <option value="2027">2027 (Sophomore / Second Year)</option>
                        <option value="2028+">2028 or later</option>
                        <option value="Post-Graduate / Working Professional">Post-Graduate / Transitioning</option>
                      </select>
                    </div>
                  </div>

                  {/* College / Degree & Preferred Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        College / Degree *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                        placeholder="e.g. B.Tech CSE, Anna University / IIT / NIT"
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        Location Preference *
                      </label>
                      <select
                        value={formData.locationPref}
                        onChange={(e) => setFormData({ ...formData, locationPref: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black focus:outline-none focus:border-black font-sans cursor-pointer"
                      >
                        <option value="Chennai Hub (Tamil Nadu)">Chennai Hub (Tamil Nadu)</option>
                        <option value="Bangalore Hub (Karnataka)">Bangalore Hub (Karnataka)</option>
                        <option value="Remote / Distributed">Remote / Distributed</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume Upload Box */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium">
                        Resume Document (Attached Directly with Email)
                      </label>
                      <span className="text-[11px] text-[#888888]">PDF, DOC, DOCX up to 5MB</span>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      id="resume-file-input"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {resumeFile ? (
                      <div className="p-4 bg-white border-2 border-black flex items-center justify-between transition-all">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-9 h-9 bg-black text-white flex items-center justify-center shrink-0">
                            <FileText size={18} />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs font-semibold text-black truncate">
                              {resumeFile.filename}
                            </div>
                            <div className="text-[11px] text-[#777777]">
                              {Math.round(resumeFile.size / 1024)} KB &middot; Ready for Nodemailer
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveResume}
                          className="p-1.5 text-[#777777] hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="p-6 border-2 border-dashed border-[#D4D4D4] hover:border-black bg-[#FAFAFA] hover:bg-white text-center cursor-pointer transition-all group"
                      >
                        <UploadCloud
                          size={24}
                          className="mx-auto mb-2 text-[#777777] group-hover:text-black group-hover:scale-110 transition-transform"
                        />
                        <div className="text-xs font-medium text-black">
                          Click to upload resume or drag and drop
                        </div>
                        <div className="text-[11px] text-[#888888] mt-1">
                          Attached automatically to the email sent to contactalsinfonet@gmail.com
                        </div>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                        <AlertCircle size={13} />
                        <span>{fileError}</span>
                      </p>
                    )}
                  </div>

                  {/* URLs: GitHub & Portfolio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        GitHub Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/username"
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                        Portfolio / LinkedIn / Drive Link
                      </label>
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/... or Drive link"
                        className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-3 text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black font-sans"
                      />
                    </div>
                  </div>

                  {/* Project Highlights / Motivation */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.18em] text-[#666666] font-medium block mb-2">
                      Key Technical Projects &amp; Why ALS Infonet *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.projectHighlights}
                      onChange={(e) => setFormData({ ...formData, projectHighlights: e.target.value })}
                      placeholder="Highlight 1 or 2 projects you have built, technologies used, problems solved, or relevant coursework..."
                      className="w-full bg-[#FAFAFA] border border-[#EAEAEA] p-4 text-xs text-black placeholder:text-[#999999] focus:outline-none focus:border-black font-sans leading-relaxed resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-[11px] text-[#777777] font-sans">
                      Target: <strong className="text-black font-medium">{COMPANY_DETAILS.email}</strong> via Nodemailer.
                    </span>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Sending with Nodemailer...</span>
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>Submit via Nodemailer</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
