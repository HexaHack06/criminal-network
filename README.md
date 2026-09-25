# Netra Intelligence — AI-Powered Criminal Network Analysis Platform

> **Smart India Hackathon (SIH26189)**: Advanced AI & Graph Analytics Platform for Law Enforcement, Intelligence Agencies, and Criminal Syndicate Investigation.

---

## 📌 Executive Overview

**Netra Intelligence** is an enterprise-grade investigation and intelligence platform designed to assist law enforcement agencies in uncovering, mapping, and dismantling complex criminal syndicates, illicit financial flows, narcotics distribution networks, and coordinated organized crime rings.

The platform ingests multi-source data (FIR records, Call Detail Records/CDR, financial transactions, vehicle movements, and surveillance reports) to automatically reconstruct criminal relationships, identify high-centrality key figures, track cross-border logistics, and flag high-risk behavioral patterns in real time.

---

## 🚀 Key Modules & Capabilities

- **Investigation Dashboard**: Real-time KPI metrics, active syndicate monitoring, multi-stream activity charts, and prioritized investigation indicators.
- **Case Management Dossiers**: Comprehensive case tracking with lead investigator assignments, priority tiers (Critical, High, Medium, Low), and entity link tallies.
- **Interactive Network Graph**: Dynamic graph visualization powered by Cytoscape / SVG engine for entity-relationship mapping, community cluster detection, and shortest connection pathfinding.
- **Entity Directory & Profiles**: Deep dossier inspection covering suspects, registered phones, tracked vehicles, shell companies, and associated bank accounts with risk scores.
- **Evidence Vault**: Chain-of-custody tracking with automated entity extraction from FIRs, CDR batches, bank statements, and ANPR vehicle logs.
- **Investigation Chronology & Timeline**: Synchronized multi-case temporal sequence tracking meetings, phone calls, and structured money trails.
- **Geographic Intelligence Map**:
  - **Indian Reference Map (WGS-84)**: Vector geographic reference map displaying all 35 Indian states and union territories, coastal boundaries, water bodies, and tactical graticule grids.
  - **Auto-Zoom & Centering**: Smooth camera glide and magnification (2.4x) when selecting operational sites.
  - **Street / GIS Map Mode**: Interactive Leaflet GIS mode with street-level tiling.
- **Pattern Detection & Alerts**: Automated pattern matching for rapid transaction layering, shared phone relays, repeated location overlaps, and cross-case criminal overlaps.
- **Cross-Case Intelligence**: High-confidence correlation engine identifying hidden links across distinct police jurisdictions.
- **Netra AI Assistant**: Autonomous natural language investigative assistant capable of summarizing case files, assessing entity risk, and suggesting next investigative steps.
- **Audit & Governance**: Immutable audit logs capturing user actions, exports, and access levels for strict evidence admissibility.

---

## 🛠️ Technology Stack

- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS Design System
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Visualization**: Recharts, Leaflet, SVG Vector Projections
- **Bundler & Tooling**: Vite, Oxlint

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HexaHack06/criminal-network.git
   cd criminal-network
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🔒 Security & Data Privacy Notice

*Netra Intelligence is a prototype built for the Smart India Hackathon. All criminal profiles, vehicle registration plates, phone numbers, and transactional records presented in the prototype are synthetic/mock data created solely for demonstration and research purposes.*
