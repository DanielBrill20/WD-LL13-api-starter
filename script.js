/*
🧠 Copilot Helper Notes – Please Follow These Guidelines:

This is a beginner-friendly project. Suggestions should:
- Use plain JavaScript (no frameworks, Canvas, or game libraries).
- Use `fetch()` with `.then()` syntax (not async/await unless requested).
- Prefer `const` and `let`, and keep variable/function names clear and descriptive.
- Use `||` and `&&` in conditionals only when needed – clarity first.
- Break logic into small, readable functions when appropriate.
- Avoid advanced ES6+ features (e.g., destructuring, optional chaining) unless scaffolded.
- Avoid arrow functions unless needed for clarity or brevity.
- Add helpful inline comments, especially around tricky logic or new patterns.

This helps students learn to read, debug, and extend code confidently.
*/

/*
Students — No need to worry about this block! 
It’s just here to help Copilot support you better. 
Start your code below 👇
*/




// Use this script to write your fetch logic
// You'll fetch data from your selected API and display it on the page

// Example placeholder:
console.log("Team activity starter code loaded.");

// Get references to the input, button, and output elements
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const outputDiv = document.getElementById('output');

// Function to display the API response (text and/or image)
function displayAnswer(answer, imageUrl) {
  // Clear previous output
  outputDiv.innerHTML = '';

  // If there's an image, show it
  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Magic 8-Ball answer image';
    img.style.maxWidth = '120px';
    img.style.display = 'block';
    img.style.margin = '0 auto 12px auto';
    outputDiv.appendChild(img);
  }

  // If there's an answer text, show it
  if (answer) {
    const p = document.createElement('p');
    p.textContent = answer;
    p.style.fontSize = '1.2rem';
    p.style.fontWeight = 'bold';
    outputDiv.appendChild(p);
  }
}

// Function to fetch a random answer from the API
function fetchMagic8BallAnswer() {
  // Show loading message
  outputDiv.textContent = 'Shaking the Magic 8-Ball...';

  // Fetch from YesNoWTF API
  fetch('https://yesno.wtf/api')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // The API returns { answer: 'yes'|'no'|'maybe', image: '...' }
      displayAnswer(data.answer, data.image);
    })
    .catch(function(error) {
      outputDiv.textContent = 'Sorry, something went wrong. Please try again!';
    });
}

// Add event listener to the button
askButton.addEventListener('click', function() {
  // Optionally, you could check if the input is empty and prompt the user
  if (questionInput.value.trim() === '') {
    outputDiv.textContent = 'Please enter a question!';
    return;
  }
  fetchMagic8BallAnswer();
  shootComet();
  questionInput.value = '';
});

// Optional: allow pressing Enter to submit
questionInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    askButton.click();
  }
});

// Add emoji stars randomly across the background
function createStarEmojis(count) {
  const starBg = document.getElementById('star-bg');
  starBg.style.position = 'fixed';
  starBg.style.top = '0';
  starBg.style.left = '0';
  starBg.style.width = '100vw';
  starBg.style.height = '100vh';
  starBg.style.pointerEvents = 'none';
  starBg.style.zIndex = '0';

  // Clear any existing stars
  starBg.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    // Use a mix of star emojis for variety
    const stars = ['✨', '⭐', '🌟', '💫'];
    star.textContent = stars[Math.floor(Math.random() * stars.length)];
    star.style.position = 'absolute';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    star.style.opacity = Math.random() * 0.5 + 0.4;
    starBg.appendChild(star);
  }
}

// Create 40 stars on page load
createStarEmojis(40);

// Add a comet emoji that animates across the screen when the button is clicked
function shootComet() {
  const comet = document.createElement('span');
  comet.textContent = '☄️';
  comet.style.position = 'fixed';
  comet.style.right = '-80px'; // Start off screen right
  comet.style.left = '';
  comet.style.top = (Math.random() * 70 + 10) + 'vh'; // Random vertical position
  comet.style.fontSize = '10.5rem';
  comet.style.zIndex = '2';
  comet.style.pointerEvents = 'none';
  comet.style.transition = 'transform 1.2s linear';
  comet.style.transform = 'translateX(0)';
  document.body.appendChild(comet);

  // Force reflow to ensure transition
  void comet.offsetWidth;

  // Animate to left off screen
  comet.style.transform = 'translateX(-110vw)';

  // Remove the comet after animation
  setTimeout(function() {
    comet.remove();
  }, 1300);
}