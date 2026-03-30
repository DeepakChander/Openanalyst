# CrewAI

> Expert in CrewAI - the leading role-based multi-agent framework used by 60% of Fortune 500
companies. Covers agent design with roles and goals, task definition, crew orchestration,
process types (sequential, hierarchical, parallel), memory systems, and flows for complex
workflows. Essential for building collaborative AI agent teams.


**Category:** ai-agents | **Version:** 1.0.0

**Tags:** crewai, multi-agent, agents, orchestration, roles, collaborative-ai

---

## Identity

[object Object]

## Expertise Areas

- Agent definitions (role, goal, backstory)
- Task design and dependencies
- Crew orchestration
- Process types (sequential, hierarchical)
- Memory configuration
- Tool integration
- Flows for complex workflows

## Patterns

### Basic Crew with YAML Config
Define agents and tasks in YAML (recommended)
```
# config/agents.yaml
researcher:
  role: "Senior Research Analyst"
  goal: "Find comprehensive, accurate information on {topic}"
  backstory: |
    You are an expert researcher with years of experience
    in gathering and analyzing information. You're known
    for your thorough and accurate research.
  tools:
    - SerperDevTool
    - WebsiteSearchTool
  verbose: true

writer:
  role: "Content Writer"
  goal: "Create engaging, well-structured content"
  backstory: |
    You are a skilled writer who transforms research
    into compelling narratives. You focus on clarity
    and engagement.
  verbose: true

# config/tasks.yaml
research_task:
  description: |
    Research the topic: {topic}

    Focus on:
    1. Key facts and statistics
    2. Recent developments
    3. Expert opinions
    4. Contrarian viewpoints

    Be thorough and cite sources.
  agent: researcher
  expected_output: |
    A comprehensive research report with:
    - Executive summary
    - Key findings (bulleted)
    - Sources cited

writing_task:
  description: |
    Using the research provided, write an article about {topic}.

    Requirements:
    - 800-1000 words
    - Engaging introduction
    - Clear structure with headers
    - Actionable conclusion
  agent: writer
  expected_output: "A polished article ready for publication"
  context:
    - research_task  # Uses output from research

# crew.py
from crewai import Agent, Task, Crew, Process
from crewai.project import CrewBase, agent, task, crew

@CrewBase
class ContentCrew:
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    @agent
    def researcher(self) -> Agent:
        return Agent(config=self.agents_config['researcher'])

    @agent
    def writer(self) -> Agent:
        return Agent(config=self.agents_config['writer'])

    @task
    def research_task(self) -> Task:
        return Task(config=self.tasks_config['research_task'])

    @task
    def writing_task(self) -> Task:
        return Task(config=self.tasks_config['writing_task'])

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True
        )

# main.py
crew = ContentCrew()
result = crew.crew().kickoff(inputs={"topic": "AI Agents in 2025"})

```

### Hierarchical Process
Manager agent delegates to workers
```
from crewai import Crew, Process

# Define specialized agents
researcher = Agent(
    role="Research Specialist",
    goal="Find accurate information",
    backstory="Expert researcher..."
)

analyst = Agent(
    role="Data Analyst",
    goal="Analyze and interpret data",
    backstory="Expert analyst..."
)

writer = Agent(
    role="Content Writer",
    goal="Create engaging content",
    backstory="Expert writer..."
)

# Hierarchical crew - manager coordinates
crew = Crew(
    agents=[researcher, analyst, writer],
    tasks=[research_task, analysis_task, writing_task],
    process=Process.hierarchical,
    manager_llm=ChatOpenAI(model="gpt-4o"),  # Manager model
    verbose=True
)

# Manager decides:
# - Which agent handles which task
# - When to delegate
# - How to combine results

result = crew.kickoff()

```

### Planning Feature
Generate execution plan before running
```
from crewai import Crew, Process

# Enable planning
crew = Crew(
    agents=[researcher, writer, reviewer],
    tasks=[research, write, review],
    process=Process.sequential,
    planning=True,  # Enable planning
    planning_llm=ChatOpenAI(model="gpt-4o")  # Planner model
)

# With planning enabled:
# 1. CrewAI generates step-by-step plan
# 2. Plan is injected into each task
# 3. Agents see overall structure
# 4. More consistent results

result = crew.kickoff()

# Access the plan
print(crew.plan)

```

### Memory Configuration
Enable agent memory for context
```
from crewai import Crew

# Memory types:
# - Short-term: Within task execution
# - Long-term: Across executions
# - Entity: About specific entities

crew = Crew(
    agents=[...],
    tasks=[...],
    memory=True,  # Enable all memory types
    verbose=True
)

# Custom memory config
from crewai.memory import LongTermMemory, ShortTermMemory

crew = Crew(
    agents=[...],
    tasks=[...],
    memory=True,
    long_term_memory=LongTermMemory(
        storage=CustomStorage()  # Custom backend
    ),
    short_term_memory=ShortTermMemory(
        storage=CustomStorage()
    ),
    embedder={
        "provider": "openai",
        "config": {"model": "text-embedding-3-small"}
    }
)

# Memory helps agents:
# - Remember previous interactions
# - Build on past work
# - Maintain consistency

```

### Flows for Complex Workflows
Event-driven orchestration with state
```
from crewai.flow.flow import Flow, listen, start, and_, or_, router

class ContentFlow(Flow):
    # State persists across steps
    model_config = {"extra": "allow"}

    @start()
    def gather_requirements(self):
        """First step - gather inputs."""
        self.topic = self.inputs.get("topic", "AI")
        self.style = self.inputs.get("style", "professional")
        return {"topic": self.topic}

    @listen(gather_requirements)
    def research(self, requirements):
        """Research after requirements gathered."""
        research_crew = ResearchCrew()
        result = research_crew.crew().kickoff(
            inputs={"topic": requirements["topic"]}
        )
        self.research = result.raw
        return result

    @listen(research)
    def write_content(self, research_result):
        """Write after research complete."""
        writing_crew = WritingCrew()
        result = writing_crew.crew().kickoff(
            inputs={
                "research": self.research,
                "style": self.style
            }
        )
        return result

    @router(write_content)
    def quality_check(self, content):
        """Route based on quality."""
        if self.needs_revision(content):
            return "revise"
        return "publish"

    @listen("revise")
    def revise_content(self):
        """Revision flow."""
        # Re-run writing with feedback
        pass

    @listen("publish")
    def publish_content(self):
        """Final publishing."""
        return {"status": "published", "content": self.content}

# Run flow
flow = ContentFlow()
result = flow.kickoff(inputs={"topic": "AI Agents"})

```

### Custom Tools
Create tools for agents
```
from crewai.tools import BaseTool
from pydantic import BaseModel, Field

# Method 1: Class-based tool
class SearchInput(BaseModel):
    query: str = Field(..., description="Search query")

class WebSearchTool(BaseTool):
    name: str = "web_search"
    description: str = "Search the web for information"
    args_schema: type[BaseModel] = SearchInput

    def _run(self, query: str) -> str:
        # Implementation
        results = search_api.search(query)
        return format_results(results)

# Method 2: Function decorator
from crewai import tool

@tool("Database Query")
def query_database(sql: str) -> str:
    """Execute SQL query and return results."""
    return db.execute(sql)

# Assign tools to agents
researcher = Agent(
    role="Researcher",
    goal="Find information",
    backstory="...",
    tools=[WebSearchTool(), query_database]
)

```


## Anti-Patterns

### Vague Agent Roles
Generic roles without clear expertise
**Why it's bad:** Agent doesn't know its specialty.
Overlapping responsibilities.
Poor task delegation.


### Missing Expected Outputs
Tasks without clear expected_output
**Why it's bad:** Agent doesn't know done criteria.
Inconsistent outputs.
Hard to chain tasks.


### Too Many Agents
Creating agent for every small task
**Why it's bad:** Coordination overhead.
Inconsistent communication.
Slower execution.


### No Task Context
Tasks don't reference previous outputs
**Why it's bad:** Agents work in isolation.
Lost information between tasks.
Redundant work.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `langgraph|state machine|graph` | langgraph | Need explicit state management |
| `observability|tracing` | langfuse | Need LLM observability |
| `structured output|json schema` | structured-output | Need structured responses |

### Receives Work From

- **langgraph**: Converting LangGraph to CrewAI
- **autonomous-agents**: Multi-agent design

### Works Well With

- langgraph
- autonomous-agents
- langfuse
- structured-output

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/ai-agents/crewai/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
