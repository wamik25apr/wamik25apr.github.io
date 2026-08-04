export const resume = {
  name: "Khondekar Wamik Hossain",
  role: "Google Cloud Platform Architect",
  photo: "/profile.jpg",
  tagline:
    "10+ years architecting cloud-native platforms across GCP, Azure & OpenShift — Kubernetes, Infrastructure as Code, and SRE.",
  contacts: [
    {
      label: "LinkedIn",
      value: "khondekar-wamik-hossain-11105397",
      href: "https://www.linkedin.com/in/khondekar-wamik-hossain-11105397/",
    },
    { label: "Phone", value: "+91-8967494110", href: "tel:+918967494110" },
    { label: "Email", value: "wamik25apr@gmail.com", href: "mailto:wamik25apr@gmail.com" },
    { label: "Location", value: "Kolkata / Bengaluru, India", href: null },
  ],
  stats: [
    { value: "10+", label: "Years experience" },
    { value: "15+", label: "Microservices on GKE" },
    { value: "99.9%", label: "Platform uptime" },
    { value: "70%", label: "Faster deployments" },
  ],
  summary:
    "Google Cloud Platform Architect with over 10 years of experience architecting and deploying enterprise-grade cloud-native platforms across public, private, and hybrid cloud environments. SME in designing scalable and resilient cloud architectures leveraging GCP (GKE, Cloud Functions, Anthos), container orchestration (Kubernetes, Docker, OpenShift), and Infrastructure as Code (Terraform, ARM Templates, Ansible). Expert in cloud adoption planning, application architecture design, and cloud management with a proven track record of optimizing performance, reducing incident frequency, and accelerating engineering velocity. Adept at leading cross-team technical decisions, evaluating emerging technologies, and facilitating knowledge sharing to enhance team capabilities. Experienced in multi-cloud strategy spanning GCP and Azure, with deep understanding of IaaS, PaaS, and SaaS service models, cloud security best practices, and compliance standards.",
  skills: [
    { group: "Cloud Platforms", items: ["Google Cloud Platform (GCP)", "Microsoft Azure", "OpenShift"] },
    { group: "GCP Services", items: ["GKE", "Cloud Functions", "Cloud Storage", "Anthos", "Cloud IAM"] },
    {
      group: "Container & Orchestration",
      items: ["Kubernetes", "Docker", "OpenShift (OCP 3.11)"],
    },
    { group: "Infrastructure as Code", items: ["ARM Templates", "Ansible", "Terraform"] },
    { group: "CI/CD & DevOps", items: ["Azure DevOps", "Jenkins", "GitOps"] },
    {
      group: "Observability & Monitoring",
      items: ["Dynatrace", "Grafana", "OpenTelemetry", "ELK/EFK Stack", "Nagios"],
    },
    { group: "Programming & Scripting", items: ["Python", "YAML", "HCL", "Bash"] },
    {
      group: "Security & Compliance",
      items: ["Cloud IAM", "Network Policies", "Secrets Management"],
    },
    {
      group: "Architecture Design",
      items: ["Cloud Adoption Planning", "Scalable Microservices", "HA/DR Design"],
    },
  ],
  experience: [
    {
      company: "Cognizant Technology Solutions (CTS)",
      location: "Kolkata, India",
      title: "Cloud Platform Engineer — Reliability & Resiliency (R2)",
      period: "Aug 2022 – Present",
      highlight:
        "Cloud Platform Architect for Walmart's Cloud-Native Platform (WCNP) – GCP/GKE based",
      bullets: [
        "Cloud Architecture & Adoption: Architected and managed the GCP-native cloud platform (GKE, Anthos) hosting 15+ microservices for Walmart's retail workloads, driving cloud adoption strategy and application architecture decisions across multi-team environments.",
        "Scalable & Resilient Design: Engineered proactive observability frameworks using Dynatrace smart alerts and Grafana dashboards, reducing Mean Time to Detect (MTTD) by 40% and ensuring platform resilience at scale.",
        "Container Orchestration: Managed Kubernetes (GKE/Anthos) clusters for production workloads, implementing auto-scaling, resource quotas, and network policies to optimize performance and cost.",
        "Cloud Automation: Built Python-based data sync automation via GCP Cloud Functions to manage complex result onboarding between disparate systems where no prior synchronization existed.",
        "AI-Native Architectures: Architected SRE AI agent systems using the Cotality Agentic SDK (Google ADK) and Gemini 2.5, integrating LLM-powered automation into cloud operations.",
        "Distributed Tracing & Observability: Established OpenTelemetry instrumentation standards across 15+ services, reducing debugging time by 50% and enabling end-to-end transaction visibility.",
        "Performance Optimization: Improved Kafka consumer throughput by 25% via performance profiling and partition rebalancing for high-traffic retail workloads.",
        "Knowledge Sharing: Facilitated technical sessions on GCP architecture best practices, cloud security standards, and observability patterns to cross-functional teams.",
        "Technologies: Kubernetes (GKE/Anthos), GCP Cloud Functions, Dynatrace, Grafana, OpenTelemetry, Kafka, Python, Istio, Gemini AI, LiteLLM",
      ],
    },
    {
      company: "Tata Consultancy Services (TCS)",
      location: "Kolkata, India",
      title: "Cloud Automation Architect (SRE & Cloud Automation)",
      period: "Mar 2021 – Aug 2022",
      bullets: [
        "Cloud Architecture & IaC: Delivered end-to-end Infrastructure as Code for Azure cloud workloads using ARM Templates and Ansible, reducing environment provisioning time from 3 days to under 2 hours — enabling rapid cloud adoption and consistent deployments.",
        "CI/CD Pipeline Design: Designed and managed 12+ Azure DevOps pipelines implementing zero-touch deployment strategies, cutting release cycle time by 60% and ensuring reliable application delivery.",
        "Cloud Management: Automated deployments to achieve 99.5% environment consistency across dev, staging, and production environments, eliminating manual configuration drift.",
        "Cross-Team Collaboration: Engaged with multiple application and infrastructure teams to drive key architectural decisions, facilitating technical sessions on cloud adoption strategies and deployment automation.",
        "Technologies: Azure, ARM Templates, Ansible, Azure DevOps, Jenkins, RHEL",
      ],
    },
    {
      company: "Wipro Limited",
      location: "Bangladesh & Malaysia",
      title: "Lead Platform Engineer — DevOps, Middleware & Operations",
      period: "Nov 2015 – Mar 2021",
      bullets: [
        "Platform Architecture & Management: Managed the production lifecycle of Red Hat OpenShift (OCP 3.11) container platform for a major BFSI client, achieving 99.9% platform uptime across 250+ microservices.",
        "Cloud-Native CI/CD: Architected Jenkins CI/CD pipelines integrating SonarQube -> Nexus -> Docker S2I, reducing service deployment time by 70% and establishing cloud-native delivery patterns.",
        "Observability Implementation: Engineered EFK-stack Kibana dashboards for real-time transaction TPS and success rate tracking, reducing anomaly detection time from 30 minutes to under 2 minutes.",
        "Performance Tuning: Optimized JVM configurations (heap sizing, GC methods, JDBC pooling) for Red Hat Fuse 6.3, improving server stability by 40% through systematic performance analysis.",
        "Infrastructure Monitoring: Implemented Nagios-based proactive monitoring for RHEL infrastructure health, providing 24x7 alerting for critical resource thresholds.",
        "Team Leadership: Led a team of 5 engineers, owning technical decision-making, sprint planning, and mentoring — driving knowledge sharing and process improvements that reduced onboarding ramp time by 30%.",
        "Technologies: OpenShift (OCP 3.11), Red Hat Fuse 6.3, Jenkins, Docker, ELK/EFK Stack, GlusterFS, Nagios, JVM Tuning, RHEL",
      ],
    },
  ],
  certifications: [
    "AZ-305: Designing Microsoft Azure Infrastructure Solutions (Expert)",
    "AZ-104: Microsoft Azure Administrator",
    "Claude Certified Architect – Foundations (Anthropic Academy)",
    "Red Hat Delivery Specialist – PaaS Development & Administration",
    "ITIL V3 Foundation",
  ],
  education: [
    {
      institution: "West Bengal University of Technology",
      year: "2015",
      degree: "B.Tech in Computer Science & Engineering",
      detail: "DGPA: 7.51",
    },
    {
      institution: "Burdwan Municipal High School",
      year: "2010",
      degree: "Higher Secondary (WBCHSE)",
      detail: "70.42%",
    },
    {
      institution: "Burdwan Municipal High School",
      year: "2008",
      degree: "Secondary (WBBSE)",
      detail: "79.33%",
    },
  ],
};
