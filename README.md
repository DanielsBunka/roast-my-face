# Roast My Face - Website

A web app that I made as a mini project out of boredom. It uses your webcam and sends the image over to an AI model to think of funny and humourous ways to insult your appearance aka **ROAST YOU** and plays them through your browsers text to speech. 

## Live Demo
Here's the link to try it yourself if **YOU'RE BRAVE ENOUGH!!!**
https://danielsbunka.github.io/roast-my-face/

## Features
* **Integrates your Webcam or Phone Camera:** Wrote Javascript code to access your webcam or phone camera through the browser to allow to capture your face
* **Uses a Serverless Backend - Cloudflare Workers** Due to github pages only allowing the hosting of static pages, I had to hide my AI API key by sending requests from the website to a serverless backend (Cloudflare Workers)
* **AI Image Recognition Used:** It uses the latest Gemini Flash Model to recognise the images and come up with the insults/roasts
* **Text to Speech:** The roasts are read out **DIRECTLY TO YOUR FACE**

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Browser APIs:** MediaDevices, Canvas, Web Speech
- **Backend & AI:** Cloudflare Workers, OpenRouter API, Gemini
- **Hosting:** GitHub Pages
