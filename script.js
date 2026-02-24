const video = document.getElementById('webcam');
const canvas = document.getElementById('snapshot');
const roastButton = document.getElementById('roast-button');
const roastAnswer = document.getElementById('roast-answer');

/** Webcam - need to ask for permission */

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("USER DENIED CAMERA ACCESS - are they scared?", err);
        roastAnswer.style.display = 'block';
        roastAnswer.innerText = "ERROR: CAMERA PERMISSION DENIED. ARE YOU SCARED??????";
    });

/** Text to Speech */
function speakRoast(text){
    /** Stop any current text to speech */
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slower for dramatic effect
    utterance.pitch = 0.7; // Deeper, more "demonic" tone

    window.speechSynthesis.speak(utterance);
}


/** Button Action */
roastButton.addEventListener('click', async () => {
    roastButton.disabled = true;
    roastButton.innerText = "SUMMONING THE BURN...."
    roastAnswer.style.display = 'block';
    roastAnswer.innerText = "FACE BURNING COMMENCES......."

    /** Takes a screenshot of the webcam */
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    /** Flips image */
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    /** Convert to Base64 data */
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

    try{

        // Middleman for AI API - uses Cloudflare - sends the image over
        const proxyUrl = 'https://faceroastproxy.daniels-bunka8.workers.dev';

        const response = await fetch(proxyUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: base64Image })
        });

        if (!response.ok) {
            throw new Error("Roast not avaliable, you survived this time [Proxy Error]")
        }

        const data = await response.json();
        const roastText = data.roast;

        roastAnswer.innerText = roastText;
        speakRoast(roastText);

        } catch (error) {
        // If anything breaks (no internet, wrong URL, etc.)
        console.error("Ritual Failed:", error);
        roastAnswer.innerText = "Roast not avaliable, you survived this time  (Check your Proxy URL/Internet!)";
        } finally {
        // 5. THE RESET: Allow them to be roasted again
        roastButton.disabled = false;
        roastButton.innerText = "ROAST ME AGAIN";



    }
});
