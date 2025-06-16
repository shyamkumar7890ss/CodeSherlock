const apiKey = "jTOCZbLDz1STB33uQrBo6KLmJFPxRrKo"; // Replace with your actual key

async function explainCode() {
  const code = document.getElementById("codeInput").value.trim();
  const output = document.getElementById("output");
  const loading = document.getElementById("loading");

  if (!code) {
    output.innerText = "⚠️ Please enter code to explain.";
    return;
  }

  output.innerText = "";
  loading.style.display = "flex";

  try {
    const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [
          { role: "user", content: `Explain this code in simple terms:\n\n${code}` }
        ],
        temperature: 0.5
      })
    });

    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content;

    output.innerText = explanation || "❌ No explanation received.";
  } catch (err) {
    output.innerText = "❌ Error: " + err.message;
  } finally {
    loading.style.display = "none";
  }
}
