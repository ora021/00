const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  api_key: "sk-proj-9e4a7iFH90QMoAmRuJtAT3BlbkFJJqMwmQc3t8y1MwuqeDg1",
});
const openai = new OpenAIApi(configuration);

export async function sendMessageToOpenAi(message) {
  const res = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: message,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presense_penalty: 0,
  });
  return res.data.choices[0].text;
}
