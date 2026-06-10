export default {
    async fetch(request, env) {
        // Evaluates the request that is recieved from the website
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            });
        }

        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        try {
            // Recieves the image from the website
            const { imageBase64 } = await request.json();

            // Packages the request to send to Openrouter
            const openRouterBody = {
                model: "~google/gemini-flash-latest",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "You are a part of a website called 'Roast my face', I want you to roast the physical appearence, vibe, and potentially surroundings of the person who is within the image, make it short, witty and humorous"
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`
                                }
                            }
                        ]
                    }
                ]
            };

            // Sends the request to Openrouter with the API Key
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://github.com", // OpenRouter likes to know where requests come from
                    "X-Title": "Roast My Face App"
                },
                body: JSON.stringify(openRouterBody)
            });

            const data = await response.json();


            const roastText = data.choices[0].message.content;

            // Sends request back to website
            return new Response(JSON.stringify({ roast: roastText }), {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: "The AI refused to look at you." }), {
                status: 500,
                headers: { "Access-Control-Allow-Origin": "*" }
            });
        }
    }
};