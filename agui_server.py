"""
AG-UI SSE endpoint for multi-agent backend
"""
from fastapi import FastAPI
from adk_agui_middleware import SSEService
from adk_agui_middleware.endpoint import register_agui_endpoint
from adk_agui_middleware.data_model.config import PathConfig, RunnerConfig
from adk_agui_middleware.data_model.context import ConfigContext

# Import the AG-UI handler function from main_agent.agent
from main_agent.agent import handle_agui_message, root_agent



# AG-UI SSE handler: receives user message, routes to root_agent, streams response
async def agui_handler(request, context: ConfigContext):
    user_message = context.input.get('message')
    response_stream = handle_agui_message(user_message)
    async for chunk in response_stream:
        yield chunk

# Create FastAPI app
app = FastAPI(title="AGUI SSE Service", version="1.0.0")

# Create SSEService instance

# AG-UI requires async functions for user_id and session_id
async def get_user_id(content, req):
    return "default-user"

async def get_session_id(content, req):
    return "default-session"

sse_service = SSEService(
    agent=root_agent,  # Pass the root_agent for AG-UI runner
    config_context=ConfigContext(
        app_name="tfs-agui",
        user_id=get_user_id,
        session_id=get_session_id
    ),
    runner_config=RunnerConfig()
)


# Register AG-UI endpoint with FastAPI app (trailing slash)
register_agui_endpoint(app, sse_service, path_config=PathConfig(agui_main_path="/agui/"))

print("Registered routes:")
for route in app.routes:
    print(route.path, route.methods)



import os
from dotenv import load_dotenv
load_dotenv() 

print("VERTEX:", os.getenv("GOOGLE_GENAI_USE_VERTEXAI"))
print("PROJECT:", os.getenv("GOOGLE_CLOUD_PROJECT"))
print("LOCATION:", os.getenv("GOOGLE_CLOUD_LOCATION"))

# Start FastAPI app with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
