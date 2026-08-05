#import "template.typ": *

#set page(
  margin: (
    left: 5mm,
    right: 5mm,
    top: 4mm,
    bottom: 4mm
  ),
)

#set text(font: "Mulish", size: 8.5pt)
#set par(spacing: 0.35em, leading: 0.35em)

#show: project.with(
  theme: rgb("#0F83C0"),
  name: "Khondekar Wamik Hossain",
  contact: (
    contact(
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/khondekar-wamik-hossain-11105397/"
    ),
    contact(
      text: "+91-8967494110",
      link: "tel:+918967494110"
    ),
    contact(
      text: "wamik25apr@gmail.com",
      link: "mailto:wamik25apr@gmail.com"
    ),
    contact(
      text: "Kolkata, India",
      link: none
    )
  ),
  main: (
    section(
      title: "Professional Summary",
      content: (
        subSection(
          content: [
            Reliability and Platform Engineering leader with over 10 years of experience architecting enterprise-grade cloud-native platforms and DevSecOps ecosystems. Expert in driving system resilience through proactive observability frameworks, automated Infrastructure as Code (IaC), and high-scale container orchestration. Proven track record of reducing incident frequency and accelerating engineering velocity by integrating AI-native agentic workflows and MCP (Model Context Protocol) server pipelines into production environments.
          ]
        ),
      )
    ),
    section(
      title: "Experience",
      content: (
        subSection(
          title: "Cognizant Technology Solutions (CTS)",
          titleEnd: "Kolkata, India",
          subTitle: "Production Engineer — Reliability & Resiliency (R2)",
          subTitleEnd: "(Aug 2022 – Present)",
          content: [
            *Walmart Cloud-Native Platform (WCNP) & Cotality*
            #list(
              [*Agentic AI & LLM Orchestration:* Engineered an SRE AI agent architecture using the Cotality Agentic SDK (built on Google ADK) and Gemini 2.5 Flash/Pro, routed through a LiteLLM AI Gateway.],
              [*MCP Server Implementation:* Developed Model Context Protocol (MCP) servers to expose diagnostic tools and incident resources to AI agents, utilizing OpenInference tracing and OpenTelemetry for full-stack agent observability.],
              [*Observability & Incident Reduction:* Reduced Mean Time to Detect (MTTD) by 40% by engineering a proactive observability layer with Dynatrace smart alerts and Grafana dashboards, eliminating reactive firefighting for critical services.],
              [*Scalability & Performance:* Improved Kafka consumer throughput by 25% via performance profiling and partition rebalancing, directly increasing reliability for high-traffic retail workloads.],
              [*Distributed Tracing:* Established OpenTelemetry instrumentation standards (auto/manual/hybrid) across 15+ services, reducing debugging time by 50% through comprehensive tracing coverage.],
              [*AI-Driven SDLC:* Implemented the BMAD-METHOD for agentic development, utilizing specialized AI agents (Architect, Developer, UX) to automate the pipeline from PRD generation to story implementation.],
              [*Cloud Automation:* Built Python-based data sync automation via GCP Cloud Functions to manage complex result onboarding between disparate systems where no prior synchronization existed.],
              [*Technologies:* Kubernetes (GKE/Anthos), Cotality Agentic SDK, MCP Framework, LiteLLM, Gemini 2.5, OpenTelemetry, OpenInference, Dynatrace, Grafana, Kafka, Python, Istio]
            )
          ]
        ),
        subSection(
          title: "Tata Consultancy Services (TCS)",
          titleEnd: "Kolkata, India",
          subTitle: "Cloud Automation Engineer (SRE & Cloud Automation)",
          subTitleEnd: "(Mar 2021 – Aug 2022)",
          content: list(
            [*Scalable Infrastructure:* Delivered end-to-end IaC for Azure workloads using ARM Templates and Ansible, reducing environment provisioning time from 3 days to under 2 hours.],
            [*Reliable CI/CD:* Built and managed 12+ Azure DevOps pipelines, enabling zero-touch deployment and cutting release cycle time by 60%.],
            [*Environment Consistency:* Automated deployments to achieve 99.5% environment consistency across dev, staging, and production, eliminating manual configuration drift.],
            [*Technologies:* Azure, ARM Templates, Ansible, Azure DevOps, Jenkins, RHEL]
          )
        ),
        subSection(
          title: "Wipro Limited",
          titleEnd: "Bangladesh & Malaysia",
          subTitle: "Lead DevOps, Middleware & Operations Engineer",
          subTitleEnd: "(Nov 2015 – Mar 2021)",
          content: list(
            [*High Availability:* Managed the production lifecycle of OpenShift (OCP 3.11) for a major BFSI client, achieving 99.9% platform uptime for 250+ microservices.],
            [*CI/CD Optimization:* Architected a Jenkins CI/CD pipeline (SonarQube -> Nexus -> Docker S2I) that reduced service deployment time by 70%.],
            [*Observability:* Engineered EFK-stack Kibana dashboards to track real-time transaction TPS and success rates, reducing anomaly detection time from 30 minutes to under 2 minutes.],
            [*Storage Management:* Administered Gluster storage volumes via Heketi, managing the creation, expansion, and deletion of volumes for stateful container workloads.],
            [*Performance Tuning:* Optimized JVM settings (heap sizing, GC methods, JDBC pool) for Red Hat Fuse 6.3, eliminating native memory errors and improving server stability by 40%.],
            [*Proactive Monitoring:* Configured Nagios dashboards for RHEL health (CPU, Memory, Disk, Heap), providing 24/7 proactive alerting for critical infrastructure thresholds.],
            [*Service Reliability:* Maintained 24x7 availability for mission-critical production applications, consistently meeting strict SLA commitments.],
            [*Standardization:* Authored technical runbooks and process documentation that reduced onboarding ramp time for new engineers by 30%.],
            [*Technologies:* OpenShift (OCP 3.11), Red Hat Fuse 6.3, Jenkins, Docker, ELK/EFK Stack, GlusterFS, Heketi, Spring Boot, Apache Camel, Nagios, JVM Tuning, RHEL]
          )
        )
      )
    ),
    section(
      title: "Certifications",
      content: (
        subSection(
          content: list(
            [*AZ-305:* Designing Microsoft Azure Infrastructure Solutions (Expert)],
            [*AZ-104:* Microsoft Azure Administrator],
            [*Claude Certified Architect – Foundations* (Anthropic Academy)],
            [*Red Hat Delivery Specialist* – PaaS Development & Administration],
            [*ITIL V3 Foundation*]
          )
        ),
      )
    ),
    section(
      title: "Education",
      content: (
        subSection(
          title: "West Bengal University of Technology",
          titleEnd: "2015",
          subTitle: "B.Tech in Computer Science & Engineering",
          subTitleEnd: "DGPA: 7.51",
        ),
        subSection(
          title: "Burdwan Municipal High School",
          titleEnd: "2010",
          subTitle: "Higher Secondary",
          subTitleEnd: "70.42%",
        ),
        subSection(
          title: "Burdwan Municipal High School",
          titleEnd: "2008",
          subTitle: "Madhyamik Pariksha",
          subTitleEnd: "79.33%",
        ),
      )
    )
  ),
  sidebar: (),
)
