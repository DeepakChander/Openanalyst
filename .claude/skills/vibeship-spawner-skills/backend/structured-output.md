# Structured Output

> Expert in getting reliable, typed outputs from LLMs. Covers JSON mode, function calling,
Instructor library, Outlines for constrained generation, Pydantic validation, and response
format specifications. Essential for building reliable AI applications that integrate with
existing systems. Knows when to use each approach and how to handle edge cases.


**Category:** backend | **Version:** 1.0.0

**Tags:** structured-output, json-mode, function-calling, tool-use, instructor, outlines, pydantic, parsing

---

## Identity

[object Object]

## Expertise Areas

- JSON mode configuration
- Function calling / Tool use
- Instructor library patterns
- Outlines constrained generation
- Pydantic schema design for LLMs
- Response format specifications
- Output validation and retry logic
- Streaming structured outputs

## Patterns

### OpenAI JSON Mode
Native JSON output from OpenAI models
```
from openai import OpenAI
from pydantic import BaseModel
import json

client = OpenAI()

class UserInfo(BaseModel):
    name: str
    age: int
    email: str

# Method 1: JSON mode (requires "json" in prompt)
response = client.chat.completions.create(
    model="gpt-4o",
    response_format={"type": "json_object"},
    messages=[
        {"role": "system", "content": "Extract user info. Respond in JSON."},
        {"role": "user", "content": "John Doe is 30, email john@example.com"}
    ]
)
data = json.loads(response.choices[0].message.content)

# Method 2: Structured Outputs (with schema - RECOMMENDED)
response = client.chat.completions.create(
    model="gpt-4o-2024-08-06",  # Must use compatible model
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "user_info",
            "strict": True,
            "schema": UserInfo.model_json_schema()
        }
    },
    messages=[
        {"role": "user", "content": "John Doe is 30, email john@example.com"}
    ]
)
# Guaranteed to match schema
user = UserInfo.model_validate_json(response.choices[0].message.content)

```

### OpenAI Function Calling
Use tools/functions for structured extraction
```
from openai import OpenAI
from pydantic import BaseModel, Field
import json

client = OpenAI()

class ExtractedData(BaseModel):
    """Data extracted from text."""
    entities: list[str] = Field(description="Named entities found")
    sentiment: str = Field(description="Overall sentiment: positive, negative, neutral")
    summary: str = Field(description="One sentence summary")

# Define as a tool
tools = [
    {
        "type": "function",
        "function": {
            "name": "extract_data",
            "description": "Extract structured data from text",
            "parameters": ExtractedData.model_json_schema()
        }
    }
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Apple announced record profits. Tim Cook was excited."}
    ],
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "extract_data"}}
)

# Parse the function call
tool_call = response.choices[0].message.tool_calls[0]
data = ExtractedData.model_validate_json(tool_call.function.arguments)
print(data.entities)  # ["Apple", "Tim Cook"]

```

### Anthropic Tool Use
Structured output via Claude's tool use
```
import anthropic
from pydantic import BaseModel, Field

client = anthropic.Anthropic()

class Analysis(BaseModel):
    """Analysis result."""
    key_points: list[str] = Field(description="Main points from the text")
    action_items: list[str] = Field(description="Suggested actions")
    priority: str = Field(description="high, medium, or low")

# Define tool from Pydantic model
tools = [
    {
        "name": "provide_analysis",
        "description": "Provide structured analysis of the input",
        "input_schema": Analysis.model_json_schema()
    }
]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=tools,
    tool_choice={"type": "tool", "name": "provide_analysis"},
    messages=[
        {"role": "user", "content": "Review this meeting: We discussed Q4 goals..."}
    ]
)

# Extract tool use block
for block in response.content:
    if block.type == "tool_use":
        analysis = Analysis.model_validate(block.input)
        print(analysis.key_points)

```

### Instructor Library
Pydantic-first structured extraction
```
import instructor
from openai import OpenAI
from pydantic import BaseModel, Field, field_validator
from typing import Optional

# Patch the client
client = instructor.from_openai(OpenAI())

class User(BaseModel):
    name: str
    age: int = Field(ge=0, le=150)  # Validation!
    email: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, v):
        if "@" not in v:
            raise ValueError("Invalid email")
        return v

# Simple extraction with automatic retries
user = client.chat.completions.create(
    model="gpt-4o",
    response_model=User,
    messages=[
        {"role": "user", "content": "John Doe, 30 years, john@example.com"}
    ]
)
print(user.name)  # "John Doe"

# With validation retries
user = client.chat.completions.create(
    model="gpt-4o",
    response_model=User,
    max_retries=3,  # Retry on validation failure
    messages=[
        {"role": "user", "content": "Extract: Jane, age 25, jane.doe@company.org"}
    ]
)

# Streaming partial objects
from instructor import Partial

for partial_user in client.chat.completions.create(
    model="gpt-4o",
    response_model=Partial[User],
    stream=True,
    messages=[{"role": "user", "content": "..."}]
):
    print(partial_user)  # Partial object updates as tokens arrive

# Works with Anthropic too
import anthropic
client = instructor.from_anthropic(anthropic.Anthropic())

```

### Outlines Constrained Generation
Token-level constraints for local models
```
import outlines
from pydantic import BaseModel
from enum import Enum

class Sentiment(str, Enum):
    positive = "positive"
    negative = "negative"
    neutral = "neutral"

class Review(BaseModel):
    sentiment: Sentiment
    score: int  # 1-5
    summary: str

# Load model
model = outlines.models.transformers("mistralai/Mistral-7B-Instruct-v0.2")

# Create structured generator
generator = outlines.generate.json(model, Review)

# Generate - GUARANTEED to match schema
review = generator("Review: This product is amazing! Best purchase ever.")
print(review.sentiment)  # Sentiment.positive

# Regex constraint for specific formats
phone_generator = outlines.generate.regex(
    model,
    r"\(\d{3}\) \d{3}-\d{4}"
)
phone = phone_generator("What's your phone number? Mine is")
# Output: "(555) 123-4567" - guaranteed format

# Choice constraint
choice_generator = outlines.generate.choice(
    model,
    ["yes", "no", "maybe"]
)
answer = choice_generator("Should I buy this? ")  # Only outputs yes/no/maybe

```

### Streaming Structured Output
Stream partial structured data
```
import instructor
from openai import OpenAI
from pydantic import BaseModel
from typing import Optional

client = instructor.from_openai(OpenAI())

class Article(BaseModel):
    title: str
    sections: list[str]
    conclusion: Optional[str] = None

# Stream with partial updates
for partial in client.chat.completions.create(
    model="gpt-4o",
    response_model=instructor.Partial[Article],
    stream=True,
    messages=[
        {"role": "user", "content": "Write an article about AI safety"}
    ]
):
    # partial.title available first
    # partial.sections grows as tokens arrive
    print(f"Title: {partial.title}")
    print(f"Sections so far: {len(partial.sections or [])}")

# OpenAI native streaming with response_format
from openai import OpenAI
import json

client = OpenAI()
stream = client.chat.completions.create(
    model="gpt-4o",
    response_format={"type": "json_object"},
    stream=True,
    messages=[...]
)

full_response = ""
for chunk in stream:
    if chunk.choices[0].delta.content:
        full_response += chunk.choices[0].delta.content
        # Parse partial JSON as it arrives
        try:
            partial = json.loads(full_response)
            print(partial)
        except json.JSONDecodeError:
            pass  # Not complete yet

```

### Validation and Retry Strategies
Handle failures gracefully
```
import instructor
from openai import OpenAI
from pydantic import BaseModel, Field, ValidationError
from tenacity import retry, stop_after_attempt, retry_if_exception_type

client = instructor.from_openai(OpenAI())

class StrictOutput(BaseModel):
    value: int = Field(ge=0, le=100)
    category: str = Field(pattern=r"^[A-Z][a-z]+$")  # Capitalized word

# Method 1: Instructor's built-in retries
result = client.chat.completions.create(
    model="gpt-4o",
    response_model=StrictOutput,
    max_retries=3,  # Automatically retries on validation error
    messages=[...]
)

# Method 2: Custom retry with tenacity
@retry(
    stop=stop_after_attempt(3),
    retry=retry_if_exception_type(ValidationError)
)
def extract_with_retry(text: str) -> StrictOutput:
    return client.chat.completions.create(
        model="gpt-4o",
        response_model=StrictOutput,
        messages=[{"role": "user", "content": text}]
    )

# Method 3: Fallback chain
def extract_with_fallback(text: str) -> dict:
    try:
        # Try strict schema first
        return client.chat.completions.create(
            model="gpt-4o",
            response_model=StrictOutput,
            messages=[{"role": "user", "content": text}]
        ).model_dump()
    except ValidationError:
        # Fall back to JSON mode
        response = OpenAI().chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "Extract data as JSON."},
                {"role": "user", "content": text}
            ]
        )
        return json.loads(response.choices[0].message.content)

# Method 4: Validation hooks in Instructor
def validation_hook(error: ValidationError, attempt: int):
    print(f"Attempt {attempt} failed: {error}")
    # Could log to monitoring, adjust prompt, etc.

result = client.chat.completions.create(
    model="gpt-4o",
    response_model=StrictOutput,
    max_retries=3,
    validation_context={"on_error": validation_hook},
    messages=[...]
)

```


## Anti-Patterns

### Complex Nested Schemas
Deeply nested optional fields and unions
**Why it's bad:** High failure rate with LLMs.
Validation errors hard to debug.
Retries compound token costs.


### No Validation
Trusting raw JSON output without validation
**Why it's bad:** LLMs can output invalid JSON.
Type mismatches crash downstream.
Security vulnerabilities.


### Ignoring Model Capabilities
Using same approach for all models
**Why it's bad:** JSON mode support varies.
Local models need Outlines.
Some models are unreliable.


### Huge Prompts in Schema
Long descriptions in Pydantic fields
**Why it's bad:** Wastes tokens.
Can confuse the model.
Harder to maintain.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `agent|workflow|graph` | langgraph | Need agent orchestration |
| `crew|team|multi-agent` | crewai | Need role-based agents |
| `observability|tracing|monitoring` | langfuse | Need to monitor extraction quality |

### Receives Work From

- **langgraph**: Agent needs structured tool responses
- **crewai**: Agent tasks need structured outputs
- **autonomous-agents**: Agent needs reliable outputs

### Works Well With

- langgraph
- crewai
- langfuse
- autonomous-agents

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/backend/structured-output/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
