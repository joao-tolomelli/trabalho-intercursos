from google import genai
from google.genai import types

from ..config import Config


class GeminiService:
    @staticmethod
    def generate(data: str) -> str:
        client = genai.Client(
            api_key=Config.GEMINI_API_KEY,
        )

        model = "gemini-2.5-flash-lite"
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=data),
                ],
            ),
        ]
        generate_content_config = types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=16000,
            thinking_config=types.ThinkingConfig(
                thinking_budget=0,
            ),
            safety_settings=[
                types.SafetySetting(
                    category="HARM_CATEGORY_HARASSMENT",
                    threshold="BLOCK_LOW_AND_ABOVE",  # Block most
                ),
                types.SafetySetting(
                    category="HARM_CATEGORY_HATE_SPEECH",
                    threshold="BLOCK_LOW_AND_ABOVE",  # Block most
                ),
                types.SafetySetting(
                    category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold="BLOCK_LOW_AND_ABOVE",  # Block most
                ),
                types.SafetySetting(
                    category="HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold="BLOCK_LOW_AND_ABOVE",  # Block most
                ),
            ],
            response_mime_type="application/json",
            response_schema=genai.types.Schema(
                type=genai.types.Type.OBJECT,
                required=["classificacao", "setor", "cnae_estimado"],
                properties={
                    "classificacao": genai.types.Schema(
                        type=genai.types.Type.STRING,
                    ),
                    "setor": genai.types.Schema(
                        type=genai.types.Type.STRING,
                    ),
                    "cnae_estimado": genai.types.Schema(
                        type=genai.types.Type.STRING,
                    ),
                    "justificativa": genai.types.Schema(
                        type=genai.types.Type.STRING,
                    ),
                },
            ),
        )

        chunks = []
        for chunk in client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
        ):
            print(chunk.text, end="")
            chunks.append(chunk)

        return "".join(chunk.text for chunk in chunks)
