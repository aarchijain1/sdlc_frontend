export const DUMMY_USERS = [
  { id: 1, username: "demo", password: "demo123", name: "Arjun Sharma", role: "Senior Engineer", initials: "AS" },
  { id: 2, username: "admin", password: "admin123", name: "Priya Nair", role: "Engineering Manager", initials: "PN" },
];

export const THINKING_CHAINS = [
  [
    { step: "Understanding context", detail: "Parsing the query to identify SDLC phase, technical domain, and intent...", done: true },
    { step: "Querying knowledge base", detail: "Searching Confluence docs, GitLab history, and Jira tickets for relevant context...", done: true },
    { step: "Cross-referencing integrations", detail: "Checking ServiceNow incidents and Harness pipeline status...", done: true },
    { step: "Synthesising response", detail: "Generating a structured answer aligned with your team's standards and conventions...", done: true },
  ],
  [
    { step: "Analysing codebase patterns", detail: "Scanning repository for architecture patterns, naming conventions, and anti-patterns...", done: true },
    { step: "Running dependency analysis", detail: "Mapping service boundaries, API contracts, and shared libraries...", done: true },
    { step: "Evaluating risk factors", detail: "Identifying 3 potential regression risks based on recent commit history...", done: true },
    { step: "Formulating recommendations", detail: "Drafting prioritised action plan with effort estimates...", done: true },
  ],
  [
    { step: "Retrieving sprint context", detail: "Fetching Sprint 34 board, velocity metrics, and team capacity from Jira...", done: true },
    { step: "Applying planning heuristics", detail: "Using historical velocity data and team availability to optimise allocation...", done: true },
    { step: "Generating plan", detail: "Creating story breakdown with acceptance criteria and dependency mapping...", done: true },
  ],
  [
    { step: "Parsing test requirements", detail: "Extracting testable assertions from the feature specification...", done: true },
    { step: "Identifying edge cases", detail: "Enumerating boundary conditions, null paths, and error scenarios...", done: true },
    { step: "Generating test suite", detail: "Writing unit tests, integration tests, and mocking strategies...", done: true },
    { step: "Validating coverage", detail: "Checking that all acceptance criteria are covered by generated tests...", done: true },
  ],
];

export const AI_RESPONSES = [
  `I've analysed your request across the full SDLC pipeline. Here's what I found:

**Context Summary**
Your query touches the **Architecture & Planning** domains. I've cross-referenced your Confluence documentation and recent Jira activity to provide a contextually accurate answer.

**Recommendations**
1. Start with a lightweight ADR (Architecture Decision Record) to document the current state before making changes
2. Identify the 3–5 most critical service boundaries first — these tend to be where coupling issues emerge
3. Run a dependency audit using the existing Harness pipeline metrics to quantify impact

**Next Steps**
- I can generate a full ADR template for you
- Or I can pull the relevant Jira tickets and organise them by risk level

What would you prefer?`,

  `Based on my analysis of your codebase patterns and team velocity data, here is a **3-phase approach**:

**Phase 1 — Discovery (Days 1–3)**
Audit existing service contracts and identify circular dependencies. I found 4 areas with high coupling based on your GitLab commit history.

**Phase 2 — Refactoring (Sprint 35–36)**
Incrementally extract the identified concerns into well-defined bounded contexts. Estimated: **34 story points**.

**Phase 3 — Validation (Sprint 37)**
Run the full regression suite, validate SLA metrics in staging, and perform a blue/green deployment.

\`\`\`yaml
# Suggested Harness pipeline config
stages:
  - name: lint-and-test
    type: CI
  - name: staging-deploy
    type: CD
    strategy: blueGreen
\`\`\`

Would you like me to create the Jira epic and break it into tickets automatically?`,

  `Great question! Here's a summary of best practices for your scenario:

**QA Automation Strategy**

The test pyramid for this service should look like:
- **70% unit tests** — fast, isolated, focused on business logic
- **20% integration tests** — service boundaries and API contracts
- **10% E2E tests** — critical user journeys only

**Recommended toolchain:**
| Layer | Tool | Coverage Target |
|-------|------|----------------|
| Unit | Jest + ts-jest | > 85% |
| Integration | Supertest | > 70% |
| E2E | Playwright | Top 5 journeys |

I've generated 47 test cases based on your feature spec. Shall I export them to your test management tool?`,

  `I've checked your CI/CD pipeline configuration in Harness. Here's the **optimisation analysis**:

**Current bottlenecks identified:**
1. \`build-stage\` is running lint + test sequentially — parallelising would save ~4 minutes per run
2. Docker layer caching is not configured — add this to reduce image build times by ~60%
3. Staging promotion gate has no automated smoke test — this is a deployment risk

**Proposed improvements:**
\`\`\`yaml
pipeline:
  parallel:
    - stage: lint
    - stage: unit-test
    - stage: type-check
  cache:
    key: "{{ .Branch }}-{{ checksum 'package-lock.json' }}"
    paths: [node_modules, .next/cache]
\`\`\`

Implementing these changes would reduce your average pipeline time from **18 min → ~9 min**. Want me to raise a PR with these changes?`,

  `Sure! Here's a concise answer based on your context:

The **Orchestrator Agent** is the central coordination layer in the Agentic SDLC architecture. It receives requests via the A2A (Agent-to-Agent) protocol from the Planner Agent and routes tasks to specialist agents — Developer, QA, DevOps, Data Engineer, etc.

Each specialist agent communicates with external tools via **MCP (Model Context Protocol)**, ensuring a clean separation between AI reasoning and tool execution.

Think of it as a smart dispatcher that:
- Understands task intent and complexity
- Selects the optimal agent for each subtask
- Aggregates results back into a coherent response
- Maintains task state across multi-step workflows

Is there a specific agent you'd like to explore further?`,
];

let aiIdx = 0;
let thinkIdx = 0;

export const getNextAIResponse = () => AI_RESPONSES[aiIdx++ % AI_RESPONSES.length];
export const getNextThinkingChain = () => THINKING_CHAINS[thinkIdx++ % THINKING_CHAINS.length];

export const SEED_HISTORY = [
  {
    id: "h1",
    title: "Sprint planning for Q1",
    date: "Today",
    messages: [
      { id: "m1", role: "user", content: "Help me plan Sprint 34 with 3 teams", files: [] },
      { id: "m2", role: "assistant", content: AI_RESPONSES[2], thinking: THINKING_CHAINS[2] },
    ],
  },
  {
    id: "h2",
    title: "Architecture refactor strategy",
    date: "Today",
    messages: [
      { id: "m3", role: "user", content: "We need to refactor our auth service", files: [] },
      { id: "m4", role: "assistant", content: AI_RESPONSES[1], thinking: THINKING_CHAINS[1] },
    ],
  },
  {
    id: "h3",
    title: "CI/CD pipeline optimisation",
    date: "Yesterday",
    messages: [
      { id: "m5", role: "user", content: "Our deployments are taking 18 minutes", files: [] },
      { id: "m6", role: "assistant", content: AI_RESPONSES[3], thinking: THINKING_CHAINS[0] },
    ],
  },
  {
    id: "h4",
    title: "QA test strategy",
    date: "Yesterday",
    messages: [
      { id: "m7", role: "user", content: "Generate a QA strategy for the payments module", files: [] },
      { id: "m8", role: "assistant", content: AI_RESPONSES[2], thinking: THINKING_CHAINS[3] },
    ],
  },
  {
    id: "h5",
    title: "Orchestrator agent overview",
    date: "2 days ago",
    messages: [
      { id: "m9", role: "user", content: "Explain how the orchestrator agent works", files: [] },
      { id: "m10", role: "assistant", content: AI_RESPONSES[4], thinking: THINKING_CHAINS[0] },
    ],
  },
];

export const STAT_DATA = [];

export const CAPABILITIES = [
  { icon: "code", title: "Code Intelligence", desc: "AI-assisted reviews, refactoring & generation across your full codebase.", color: "#3B5BDB" },
  { icon: "shield", title: "QA Automation", desc: "Autonomous test generation, execution, and defect triage at scale.", color: "#059669" },
  { icon: "git", title: "CI/CD Optimisation", desc: "Smart pipeline orchestration with predictive failure detection.", color: "#6741D9" },
  { icon: "chart", title: "SDLC Analytics", desc: "Real-time velocity, quality, and delivery insights across teams.", color: "#D97706" },
  { icon: "search", title: "Knowledge Search", desc: "Unified search across Confluence, Jira, GitLab & ServiceNow.", color: "#0891B2" },
  { icon: "bell", title: "Smart Alerts", desc: "Proactive notifications for risks, blockers, and anomalies.", color: "#DC2626" },
];

export const RECENT_ACTIVITY = [
  { icon: "git", title: "PR #247 merged", desc: "Feature: Auth service refactor · by @riya.k", time: "2m ago", color: "#3B5BDB" },
  { icon: "shield", title: "QA Suite completed", desc: "1,204 tests passed · 0 failures on main", time: "18m ago", color: "#059669" },
  { icon: "code", title: "Sprint 34 planned", desc: "42 story points allocated across 3 teams", time: "1h ago", color: "#D97706" },
  { icon: "chart", title: "Prod deployment", desc: "v3.4.1 · Zero-downtime blue/green rollout", time: "3h ago", color: "#6741D9" },
  { icon: "search", title: "Architecture review", desc: "Microservice boundary analysis completed", time: "5h ago", color: "#0891B2" },
];