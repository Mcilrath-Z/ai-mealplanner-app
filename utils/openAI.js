import axios from 'axios';

// Replace this with your actual OpenAI API key and endpoint
const OPENAI_API_KEY = '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

export async function openAICompletion(prompt) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'text-davinci-003',  // or other model
        prompt: prompt,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Parse and return the meal plan
    return response.data.choices[0]?.text.split('\n').filter(Boolean).map(item => ({ title: item }));
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
}
