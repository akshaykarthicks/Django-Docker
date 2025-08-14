from django.http import HttpResponse
from ninja import NinjaAPI,Schema
from typing  import Optional
import os

from aicop.crew import aicop as EngineeringTeam

api=NinjaAPI()


class RunRequest(Schema):
    requirements: str
    module_name: str 
    class_name: str 


class RunResponse(Schema):
    result: str
    generated_files: dict




@api.post("/run", response=RunResponse)
def run(request, payload: RunRequest):
    # Ensure output dir exists since your tasks write to output/{module_name}
    os.makedirs("output", exist_ok=True)
    inputs = payload.dict()
    
    # Run the CrewAI generation
    crew_result = EngineeringTeam().crew().kickoff(inputs=inputs)
    
    # Read the generated files
    generated_files = {}
    output_dir = "output"
    module_name = inputs['module_name']
    
    # Try to read the main generated files (removed test files)
    files_to_check = [
        f"{module_name}",  # Main Python module
        "index.html",  # Frontend file
        f"{module_name}_design.md"  # Design document
    ]
    
    for filename in files_to_check:
        file_path = os.path.join(output_dir, filename)
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    generated_files[filename] = f.read()
            except Exception as e:
                generated_files[filename] = f"Error reading file: {str(e)}"
    
    # Return the main Python module as the primary result
    main_code = generated_files.get(module_name, str(crew_result))
    
    return {
        "result": main_code,
        "generated_files": generated_files
    }


@api.get("/health")
def health_check(request):
    return {"status": "healthy", "message": "AICOP API is running"}