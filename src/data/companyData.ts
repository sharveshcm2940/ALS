export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  idealFor: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  summary: string;
  focus: string;
  keyActivities: string[];
  outcome: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: string;
  clientIndustry: string;
  challenge: string;
  solution: string;
  technologies: string[];
  outcomes: string[];
  architectureNotes: string;
}

export const COMPANY_DETAILS = {
  name: "ALS Infonet",
  tagline: "Technology. Built around you.",
  subTagline: "Software Solutions & IT Services",
  brandStatement: "Clear thinking. Thoughtful engineering. Dependable solutions.",
  heroSummary:
    "Thoughtfully developed software solutions and IT services designed to help businesses simplify operations, solve problems, and move forward.",
  cinematicStatement: {
    headline: "Less complexity.\nMore clarity.",
    copy: "Every business has different challenges. The right software begins with understanding those challenges and building around what matters.",
  },
  locations: [
    {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      role: "Engineering & Delivery Center",
      zone: "Guindy / OMR Tech Corridor",
      coordinates: "13.0827° N, 80.2707° E",
    },
    {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      role: "Technology & Solutions Hub",
      zone: "Outer Ring Road / Indiranagar",
      coordinates: "12.9716° N, 77.5946° E",
    },
  ],
  email: "contact@alsinfonet.com",
  inquiriesEmail: "projects@alsinfonet.com",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "custom-software",
    number: "01",
    title: "Custom Software Development",
    tagline: "Software designed around specific business processes and operational requirements",
    description:
      "We design and build bespoke software systems that map directly to your operational workflows. Rather than forcing your team into generic off-the-shelf software constraints, we engineer reliable applications with clean data schemas, strict business logic, and longevity in mind.",
    deliverables: [
      "Domain-driven backend architectures and relational data schemas",
      "Secure internal operations portals and role-based administrative consoles",
      "High-throughput transaction and order processing pipelines",
      "API integrations with existing legacy infrastructure",
    ],
    techStack: ["TypeScript", "Node.js", "PostgreSQL", "REST / gRPC", "Docker"],
    idealFor: "Enterprises outgrowing off-the-shelf software or reconciling manual spreadsheet systems.",
  },
  {
    id: "website-design",
    number: "02",
    title: "Website Design & Development",
    tagline: "Professional websites that communicate brand identity, improve usability, and support business goals",
    description:
      "Crafted with editorial discipline, semantic clarity, and speed. We build responsive corporate websites that establish commanding market authority, load in milliseconds, and represent your company with uncompromising quality.",
    deliverables: [
      "Custom responsive design engineered from first principles",
      "Semantic HTML5, WAI-ARIA accessibility, and zero layout shift",
      "Optimized Core Web Vitals and sub-second asset delivery",
      "Structured schema data and search engine visibility",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Semantic HTML5", "Vite"],
    idealFor: "Businesses requiring a distinguished, trustworthy digital presence for enterprise clientele.",
  },
  {
    id: "web-applications",
    number: "03",
    title: "Web Application Development",
    tagline: "Purpose-built applications for business workflows, operational tools, and digital services",
    description:
      "High-performance single-page and progressive web applications engineered for complex everyday tasks. Built with resilient state management, instant search, and predictable user interfaces that keep teams productive.",
    deliverables: [
      "Interactive data tables, real-time filtering, and multi-tenant consoles",
      "Role-based permission hierarchies and secure session management",
      "Offline-tolerant caching and state synchronization",
      "Automated unit, regression, and end-to-end test suites",
    ],
    techStack: ["React 19", "TypeScript", "PostgreSQL", "Tailwind CSS", "WebSocket"],
    idealFor: "Operations teams, customer portals, and B2B SaaS platforms demanding high reliability.",
  },
  {
    id: "business-automation",
    number: "04",
    title: "Business Automation",
    tagline: "Practical solutions that reduce repetitive tasks and streamline operations",
    description:
      "We identify manual bottlenecks across dispatching, invoicing, data reconciliation, and document processing, replacing them with resilient automated services that run quietly in the background.",
    deliverables: [
      "Automated batch processing workers and queue engines",
      "Document generation, parsing, and structured data extraction",
      "Multi-platform database synchronization connectors",
      "Audit logging, failure recovery, and alert dispatchers",
    ],
    techStack: ["Queue Workers", "PostgreSQL", "Python", "Cron Daemons", "Webhook Pipelines"],
    idealFor: "Companies losing administrative hours to repetitive manual entry and cross-checking.",
  },
  {
    id: "it-consulting",
    number: "05",
    title: "IT Consulting & Technical Support",
    tagline: "Technology guidance, implementation assistance, and support aligned with business needs",
    description:
      "Objective architectural evaluations without vendor bias. We assess your existing software stack, security posture, and cloud expenditures to provide straightforward, actionable engineering roadmaps.",
    deliverables: [
      "Codebase health, security, and scalability audits",
      "Technology selection and feasibility assessments",
      "Infrastructure right-sizing and cloud cost containment",
      "Disaster recovery and business continuity architectures",
    ],
    techStack: ["Cloud Architecture", "Linux Systems", "Database Optimization", "Security Auditing"],
    idealFor: "Leadership teams evaluating capital investment or technology restructuring.",
  },
  {
    id: "software-maintenance",
    number: "06",
    title: "Software Maintenance",
    tagline: "Ongoing improvements, troubleshooting, optimization, and feature development",
    description:
      "Long-term stability and active guardianship for existing software assets. We monitor application health, apply security updates, resolve edge-case issues, and incrementally develop new features.",
    deliverables: [
      "Continuous dependency patching and vulnerability triage",
      "Database query profiling, indexing, and memory optimization",
      "Disciplined iterative feature additions and UI refinements",
      "Direct technical escalation SLA with dedicated engineers",
    ],
    techStack: ["CI/CD Pipelines", "Git Version Control", "Monitoring Daemons", "Refactoring"],
    idealFor: "Organizations with mission-critical applications that require steady engineering care.",
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: "01",
    title: "Understand",
    summary: "Discover the business challenge and define the requirements.",
    focus: "Root-cause diagnosis over premature assumptions",
    keyActivities: [
      "Structured interviews with operational stakeholders",
      "Analysis of current workflows and process friction",
      "Definition of functional boundaries and data requirements",
      "Agreement on concrete business success criteria",
    ],
    outcome: "Problem Definition & Requirements Specification Document",
  },
  {
    step: "02",
    title: "Plan",
    summary: "Establish the scope, priorities, and technical direction.",
    focus: "Pragmatic architecture without unnecessary complexity",
    keyActivities: [
      "Relational schema modeling and API contract drafting",
      "Technical stack selection tailored to actual load and scale",
      "Detailed wireframes and user journey maps",
      "Milestone roadmap with clear deliverables and timelines",
    ],
    outcome: "System Architecture Blueprint & Delivery Roadmap",
  },
  {
    step: "03",
    title: "Develop",
    summary: "Implement and test the agreed solution.",
    focus: "Type-safe code, rigorous testing, and disciplined commits",
    keyActivities: [
      "Modular frontend and backend engineering",
      "Edge-case validation and input constraint checking",
      "Continuous milestone previews for early feedback",
      "Security scanning and code quality audits",
    ],
    outcome: "Fully Staged, Tested Release Candidate with Full Documentation",
  },
  {
    step: "04",
    title: "Deliver",
    summary: "Complete the handover and provide any agreed ongoing support.",
    focus: "Smooth deployment and operational independence",
    keyActivities: [
      "Production deployment and environment verification",
      "Operational walkthrough and administrative handover",
      "Post-launch telemetry monitoring and stabilization",
      "Scheduled technical maintenance and support phase",
    ],
    outcome: "Verified Live Production System & Handover Sign-off",
  },
];

export const SELECTED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "supply-chain-dispatch",
    title: "Transit Yard & Fleet Dispatch System",
    category: "Custom Software Development",
    clientIndustry: "Regional Logistics & Transportation",
    challenge:
      "Manual phone calls and paper manifests across 14 freight yards caused vehicle turnaround delays, lost consignment records, and zero real-time visibility.",
    solution:
      "Designed and deployed a centralized, low-latency dispatch console with checkpoint gates, automated bill-of-lading generation, and offline-tolerant yard entry.",
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "React", "Docker"],
    outcomes: [
      "Eliminated 100% of paper manifests across all regional yards",
      "Reduced vehicle turnaround time by 38% within 60 days",
      "Zero system downtime recorded over 18 months of continuous operation",
    ],
    architectureNotes:
      "Engineered with local offline queues ensuring yard checkpoint gates operate without interruption during telecom outages.",
  },
  {
    id: "settlement-reconciliation",
    title: "Financial Settlement & Audit Engine",
    category: "Business Automation",
    clientIndustry: "B2B Financial Services",
    challenge:
      "Daily transaction matching between payment gateways, merchant ledgers, and bank clearing statements required 4 hours of tedious manual cross-checking every morning.",
    solution:
      "Constructed an automated batch reconciliation engine executing deterministic matching rules, discrepancy classification, and instant accounting ledger exports.",
    technologies: ["Python", "PostgreSQL", "React", "Linux Daemon", "Tailwind CSS"],
    outcomes: [
      "Reconciliation runtime reduced from 4 hours to under 45 seconds",
      "Identified and classified 100% of gateway fee discrepancies automatically",
      "Produced immutable cryptographic audit logs for quarterly statutory reviews",
    ],
    architectureNotes:
      "Idempotent processing architecture preventing double-entry or duplicate reconciliation under unexpected system restarts.",
  },
  {
    id: "operations-portal",
    title: "Work-Order & Quality Inspection Hub",
    category: "Web Application Development",
    clientIndustry: "Precision Light Manufacturing",
    challenge:
      "Assembly line supervisors lacked immediate access to revision-controlled technical drawings, resulting in avoidable scrap and delayed quality sign-offs.",
    solution:
      "Created a high-contrast, touch-optimized shop-floor web application providing instant work-order routing, drawing revision lockouts, and live quality checkoffs.",
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "REST API", "PWA"],
    outcomes: [
      "Obsolete drawing revisions completely eradicated on the production floor",
      "Quality rework incidents dropped by 42% across two quarters",
      "Sub-second page rendering verified on low-power touch terminal hardware",
    ],
    architectureNotes:
      "Optimized for high-contrast viewing under industrial ambient lighting with zero external client-side script dependencies.",
  },
  {
    id: "compliance-records",
    title: "Encrypted Document & Records Vault",
    category: "IT Consulting & Technical Support",
    clientIndustry: "Corporate Legal & Governance Advisory",
    challenge:
      "Client maintained an unindexed repository of 250,000+ sensitive corporate filings, creating risk of compliance penalties and sluggish client response times.",
    solution:
      "Architected an encrypted metadata indexing system with role-gated access control, full-text boolean query engine, and automated retention schedule enforcement.",
    technologies: ["PostgreSQL", "Full-Text Search", "TypeScript", "Security Auditing"],
    outcomes: [
      "Document query retrieval reduced from minutes to sub-100ms",
      "Passed independent third-party cybersecurity and privacy audit with zero high-severity findings",
      "Reduced cloud storage footprint by 55% via automated deduplication",
    ],
    architectureNotes:
      "Implemented zero-knowledge field-level encryption for sensitive client governance filings.",
  },
];
