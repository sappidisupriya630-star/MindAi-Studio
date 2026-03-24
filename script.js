let category = "";
let currentQuestion = 0;
let answers = [];

const questions = {
    career: [
        "Do you enjoy solving logical problems?",
        "Do you like working with computers?",
        "Do you prefer creativity over analysis?",
        "Do you like helping people?",
        "Do you enjoy learning new technologies?"
    ],
    movie: [
        "Do you like action scenes?",
        "Do you enjoy emotional stories?",
        "Do you like sci-fi concepts?",
        "Do you prefer comedy?",
        "Do you like thrill?"
    ],
    food: [
        "Do you like spicy food?",
        "Do you enjoy fast food?",
        "Do you like trying new cuisines?",
        "Do you prefer healthy food?",
        "Do you like sweets?"
    ]
};

function start(cat) {
    category = cat;
    currentQuestion = 0;
    answers = [];

    document.getElementById("categoryBox").classList.add("hidden");
    document.getElementById("questionBox").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    document.getElementById("questionText").innerText =
        questions[category][currentQuestion];

    document.getElementById("progress").innerText =
        `Question ${currentQuestion + 1} of ${questions[category].length}`;
}

function answer(ans) {
    answers.push(ans);
    currentQuestion++;

    if (currentQuestion < questions[category].length) {
        showQuestion();
    } else {
        showResult();
    }
}

/* Voice Input */
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onstart = () => {
        alert("🎤 Listening... Say YES or NO");
    };

    recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript.toLowerCase();

        if (speech.includes("yes")) {
            answer("yes");
        } else if (speech.includes("no")) {
            answer("no");
        } else {
            alert("Say YES or NO clearly");
        }
    };
}

/* Typing Effect */
function typeEffect(el, text) {
    el.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            el.innerHTML += text[i];
            i++;
            setTimeout(typing, 30);
        }
    }
    typing();
}

/* Loading */
function showResult() {
    document.getElementById("questionBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");

    let dots = 0;
    const loading = document.getElementById("loading");

    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        loading.innerText = "Analyzing..." + ".".repeat(dots);
    }, 400);

    setTimeout(() => {
        clearInterval(interval);
        loading.innerText = "";

        let resultText = "You have a unique thinking pattern 🧠";
        let confidence = Math.floor(Math.random() * 20) + 80;

        typeEffect(document.getElementById("result"), resultText);
        document.getElementById("confidence").innerText =
            "Confidence: " + confidence + "%";

    }, 2500);
}
