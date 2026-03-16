// === Navigation ===
function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const target = document.getElementById('page-' + page);
    if (target) {
        target.classList.add('active');
    }

    const navBtn = document.querySelector(`.nav-btn[data-page="${page}"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }

    // Close mobile menu
    document.getElementById('main-nav').classList.remove('open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset lesson view when navigating to lessons
    if (page === 'lessons') {
        showCategories();
    }
}

// Nav button clicks
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.page));
});

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('main-nav').classList.toggle('open');
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('menu-toggle');
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
    }
});

// === Daily Word ===
function showDailyWord() {
    const allWords = getAllWords();
    // Use date as seed for consistent daily word
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % allWords.length;
    const word = allWords[index];

    document.getElementById('daily-word-card').innerHTML = `
        <div class="hanzi">${word.hanzi}</div>
        <div class="peng-im">${word.pengim}</div>
        <div class="meaning">${word.meaning}</div>
        ${word.hanviet ? `<div class="han-viet">Hán-Việt: ${word.hanviet}</div>` : ''}
    `;
}

// === Category List ===
function renderCategories() {
    const container = document.getElementById('category-list');
    container.innerHTML = CATEGORIES.map(cat => `
        <div class="category-card" onclick="showLesson('${cat.id}')">
            <div class="cat-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
            <div class="cat-count">${cat.words.length} từ vựng</div>
        </div>
    `).join('');
}

function showCategories() {
    document.getElementById('category-list').classList.remove('hidden');
    document.getElementById('lesson-view').classList.add('hidden');
}

function showLesson(categoryId) {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    if (!cat) return;

    document.getElementById('category-list').classList.add('hidden');
    document.getElementById('lesson-view').classList.remove('hidden');
    document.getElementById('lesson-title').textContent = cat.icon + ' ' + cat.name;

    const container = document.getElementById('lesson-cards');
    container.innerHTML = cat.words.map((w, i) => `
        <div class="vocab-card" onclick="this.classList.toggle('flipped')">
            <span class="flip-hint">nhấn để xem thêm</span>
            <div class="vc-hanzi">${w.hanzi}</div>
            <div class="vc-pengim">${w.pengim}</div>
            <div class="vc-meaning">${w.meaning}</div>
            ${w.hanviet ? `<div class="vc-hanviet">Hán-Việt: ${w.hanviet}</div>` : ''}
            <div class="vc-back">
                ${w.example ? `<div class="vc-example">${w.example}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// === Quiz ===
let quizState = {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false
};

function populateQuizCategories() {
    const select = document.getElementById('quiz-category');
    select.innerHTML = '<option value="all">Tất cả chủ đề</option>';
    CATEGORIES.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`;
    });
}

function startQuiz() {
    const categoryId = document.getElementById('quiz-category').value;
    const quizType = document.getElementById('quiz-type').value;
    const count = parseInt(document.getElementById('quiz-count').value);

    let wordPool;
    if (categoryId === 'all') {
        wordPool = getAllWords();
    } else {
        const cat = CATEGORIES.find(c => c.id === categoryId);
        wordPool = cat ? cat.words.map(w => ({ ...w, category: cat.id, categoryName: cat.name })) : getAllWords();
    }

    if (wordPool.length < 4) {
        alert('Cần ít nhất 4 từ để làm bài kiểm tra.');
        return;
    }

    // Shuffle and pick questions
    const shuffled = shuffleArray([...wordPool]);
    const questionWords = shuffled.slice(0, Math.min(count, shuffled.length));

    quizState = {
        questions: questionWords.map(word => createQuestion(word, wordPool, quizType)),
        currentIndex: 0,
        score: 0,
        answered: false,
        type: quizType
    };

    document.getElementById('quiz-setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');

    showQuestion();
}

function createQuestion(word, pool, type) {
    // Get 3 wrong answers
    const otherWords = pool.filter(w => w.hanzi !== word.hanzi);
    const wrongAnswers = shuffleArray([...otherWords]).slice(0, 3);

    let prompt, promptSub, correctAnswer, answers;

    switch (type) {
        case 'teochew-to-viet':
            prompt = word.pengim;
            promptSub = '';
            correctAnswer = word.meaning;
            answers = shuffleArray([
                { text: word.meaning, correct: true },
                ...wrongAnswers.map(w => ({ text: w.meaning, correct: false }))
            ]);
            break;
        case 'viet-to-teochew':
            prompt = word.meaning;
            promptSub = '';
            correctAnswer = word.hanzi + ' (' + word.pengim + ')';
            answers = shuffleArray([
                { text: word.hanzi + ' (' + word.pengim + ')', correct: true },
                ...wrongAnswers.map(w => ({ text: w.hanzi + ' (' + w.pengim + ')', correct: false }))
            ]);
            break;
        case 'hanzi-to-viet':
            prompt = word.hanzi;
            promptSub = '';
            correctAnswer = word.meaning;
            answers = shuffleArray([
                { text: word.meaning, correct: true },
                ...wrongAnswers.map(w => ({ text: w.meaning, correct: false }))
            ]);
            break;
    }

    return { prompt, promptSub, answers, word };
}

function showQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const total = quizState.questions.length;
    const current = quizState.currentIndex + 1;

    document.getElementById('quiz-progress-text').textContent = `Câu ${current} / ${total}`;
    document.getElementById('quiz-progress-bar').style.width = `${(current / total) * 100}%`;

    let labelText;
    switch (quizState.type) {
        case 'teochew-to-viet': labelText = 'Phiên âm Triều Châu này nghĩa là gì?'; break;
        case 'viet-to-teochew': labelText = 'Tiếng Triều Châu của từ này là gì?'; break;
        case 'hanzi-to-viet': labelText = 'Chữ Hán này nghĩa là gì?'; break;
    }

    document.getElementById('quiz-question').innerHTML = `
        <div class="qq-label">${labelText}</div>
        <div class="qq-prompt">${q.prompt}</div>
        ${q.promptSub ? `<div class="qq-prompt-sub">${q.promptSub}</div>` : ''}
    `;

    document.getElementById('quiz-answers').innerHTML = q.answers.map((a, i) => `
        <button class="quiz-answer-btn" onclick="selectAnswer(${i})">${a.text}</button>
    `).join('');

    document.getElementById('quiz-next').classList.add('hidden');
    quizState.answered = false;
}

function selectAnswer(index) {
    if (quizState.answered) return;
    quizState.answered = true;

    const q = quizState.questions[quizState.currentIndex];
    const buttons = document.querySelectorAll('.quiz-answer-btn');

    buttons.forEach((btn, i) => {
        btn.classList.add('disabled');
        if (q.answers[i].correct) {
            btn.classList.add('correct');
        }
        if (i === index && !q.answers[i].correct) {
            btn.classList.add('wrong');
        }
    });

    if (q.answers[index].correct) {
        quizState.score++;
    }

    // Show next button or finish
    if (quizState.currentIndex < quizState.questions.length - 1) {
        document.getElementById('quiz-next').classList.remove('hidden');
    } else {
        setTimeout(showResults, 800);
    }
}

function nextQuestion() {
    quizState.currentIndex++;
    showQuestion();
}

function showResults() {
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');

    const total = quizState.questions.length;
    const score = quizState.score;
    const percent = Math.round((score / total) * 100);

    let message;
    if (percent >= 90) message = 'Xuất sắc! Bạn giỏi lắm!';
    else if (percent >= 70) message = 'Tốt lắm! Tiếp tục phát huy!';
    else if (percent >= 50) message = 'Khá tốt! Cần ôn tập thêm nhé.';
    else message = 'Cần luyện tập thêm. Đừng nản nhé!';

    document.getElementById('quiz-score').innerHTML = `
        ${score}/${total}
        <span class="score-label">${percent}% - ${message}</span>
    `;
}

function resetQuiz() {
    document.getElementById('quiz-setup').classList.remove('hidden');
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
}

// === Utility ===
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    showDailyWord();
    renderCategories();
    populateQuizCategories();
});
