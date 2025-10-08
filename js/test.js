/* ===========================
   SELFMAP TEST RUNNER JS
   Universal Test Engine with Autosave & Scoring
   
   TO INTEGRATE WITH REAL DATA:
   - Replace TESTS constant with JSON file fetch
   - Connect to backend API for persistent storage
   - Add user profile management
   =========================== */

// ===========================
// TEST DATA REGISTRY
// ===========================

const TESTS = {
  iq: {
    id: "iq",
    title: "Intelligence (IQ & Cognitive)",
    icon: "../assets/img/tests/IQ.png",
    time: 8,
    type: "single",
    instructions: "Choose the best answer. Work quickly but carefully.",
    items: [
      { id:"iq_v1", dimension:"Verbal",   prompt:"Which word is the odd one out?  apple, pear, carrot, plum", options:["apple","pear","carrot","plum"], answer:2 },
      { id:"iq_v2", dimension:"Verbal",   prompt:"ANTIDOTE is to POISON as REMEDY is to …", options:["illness","medicine","doctor","injury"], answer:0 },
      { id:"iq_v3", dimension:"Verbal",   prompt:'Choose the best synonym for "lucid".', options:["dull","clear","angry","heavy"], answer:1 },
      { id:"iq_v4", dimension:"Verbal",   prompt:"If all zorks are lumas and some lumas are bips, then some zorks are bips. True?", options:["True","False"], answer:0 },
      { id:"iq_v5", dimension:"Verbal",   prompt:"Which completes the analogy? canvas : painter :: stage : ____", options:["musician","actor","author","sculptor"], answer:1 },
      { id:"iq_v6", dimension:"Verbal",   prompt:"Rearrange to form a word: 'R E V S E R E'.", options:["REVERSE","RESERVE","REVERES","SERVEER"], answer:1 },
      { id:"iq_n1", dimension:"Numerical",prompt:"Which number completes the sequence? 3, 6, 9, 12, __", options:["13","14","15","18"], answer:2 },
      { id:"iq_n2", dimension:"Numerical",prompt:"What is 12 × 13?", options:["132","144","156","169"], answer:2 },
      { id:"iq_n3", dimension:"Numerical",prompt:"If a shirt is discounted 20% from $50, the sale price is…", options:["$30","$35","$38","$40"], answer:3 },
      { id:"iq_n4", dimension:"Numerical",prompt:"The average of 8 and 14 is…", options:["9","10","11","12"], answer:2 },
      { id:"iq_l1", dimension:"Logic",    prompt:"Five people sit in a row. A is left of B. C is right of B. D is between A and B. Which is true?", options:[
        "Order is A D B C (E anywhere)","B is left of A","C is left of A","D is right of C"], answer:0 },
      { id:"iq_l2", dimension:"Logic",    prompt:"A clock shows 3:15. The angle between hour and minute hands is…", options:["0°","7.5°","22.5°","37.5°"], answer:2 },
      { id:"iq_l3", dimension:"Logic",    prompt:"If all statements here are false, how many true statements are there?", options:["0","1","2","Impossible"], answer:3 },
      { id:"iq_l4", dimension:"Logic",    prompt:"Which pattern continues? 2, 4, 8, 16, 32, __", options:["48","54","64","72"], answer:2 }
    ],
    scoring: { method: "sumWeightedCorrect" }
  },

  adhd: {
    id: "adhd",
    title: "ADHD & Attention Profile",
    icon: "../assets/img/tests/ADHD.png",
    time: 5,
    type: "likert",
    instructions: "Rate how often each statement describes you over the last 6 months.",
    items: [
      { id:"ad1", dimension:"Inattention", prompt:"I lose track of details or make careless mistakes." },
      { id:"ad2", dimension:"Inattention", prompt:"I struggle to sustain attention on tasks." },
      { id:"ad3", dimension:"Inattention", prompt:"I avoid tasks that require sustained mental effort." },
      { id:"ad4", dimension:"Impulsivity", prompt:"I act before thinking through the consequences." },
      { id:"ad5", dimension:"Impulsivity", prompt:"I interrupt or finish people's sentences." },
      { id:"ad6", dimension:"Impulsivity", prompt:"I feel restless or 'on the go'." },
      { id:"ad7", dimension:"ExecFunction",prompt:"I have trouble organizing tasks or materials." },
      { id:"ad8", dimension:"ExecFunction",prompt:"I forget appointments, deadlines, or items I need." },
      { id:"ad9", dimension:"ExecFunction",prompt:"I struggle to start tasks even when they matter." },
      { id:"ad10",dimension:"Inattention", prompt:"I get easily distracted by unrelated thoughts or stimuli." },
      { id:"ad11",dimension:"Impulsivity", prompt:"I make quick decisions I later reconsider." },
      { id:"ad12",dimension:"ExecFunction",prompt:"I have difficulty following multi-step instructions." }
    ],
    scoring: { method:"likertDimensions" }
  },

  eq: {
    id: "eq",
    title: "Emotional Intelligence (EQ)",
    icon: "../assets/img/tests/EQ.png",
    time: 6,
    type: "likert",
    instructions: "Answer honestly; there are no right or wrong answers.",
    items: [
      { id:"eq1", dimension:"Awareness",  prompt:"I can label what I'm feeling in the moment." },
      { id:"eq2", dimension:"Awareness",  prompt:"I notice physical signals (tension, heartbeat) that reflect my emotions." },
      { id:"eq3", dimension:"Regulation", prompt:"I can calm myself when stressed or upset." },
      { id:"eq4", dimension:"Regulation", prompt:"I pause before reacting when emotions run high." },
      { id:"eq5", dimension:"Empathy",    prompt:"I recognize how situations might feel for others." },
      { id:"eq6", dimension:"Empathy",    prompt:"People say I listen without judgment." },
      { id:"eq7", dimension:"Social",     prompt:"I communicate clearly even in difficult conversations." },
      { id:"eq8", dimension:"Social",     prompt:"I build trust and repair it when needed." },
      { id:"eq9", dimension:"Awareness",  prompt:"I know my emotional triggers." },
      { id:"eq10",dimension:"Regulation", prompt:"I return to baseline quickly after a setback." },
      { id:"eq11",dimension:"Empathy",    prompt:"I pick up subtle non-verbal cues." },
      { id:"eq12",dimension:"Social",     prompt:"I give feedback in a way that can be heard." }
    ],
    scoring: { method:"likertDimensions" }
  },

  stress: {
    id: "stress",
    title: "Stress & Burnout Risk",
    icon: "../assets/img/tests/Stress.png",
    time: 4,
    type: "likert",
    instructions: "Think about the last 2–4 weeks.",
    items: [
      { id:"st1", dimension:"Exhaustion", prompt:"I feel emotionally drained after most days." },
      { id:"st2", dimension:"Exhaustion", prompt:"Simple tasks feel disproportionately taxing." },
      { id:"st3", dimension:"Overload",   prompt:"My workload or responsibilities feel unmanageable." },
      { id:"st4", dimension:"Overload",   prompt:"I struggle to switch off from work or study." },
      { id:"st5", dimension:"Recovery",   prompt:"I take short breaks that truly restore me." },
      { id:"st6", dimension:"Recovery",   prompt:"I protect time for exercise, play, or reflection." },
      { id:"st7", dimension:"Sleep",      prompt:"Stress disrupts my sleep quality." },
      { id:"st8", dimension:"Sleep",      prompt:"I wake unrefreshed or with racing thoughts." },
      { id:"st9", dimension:"Overload",   prompt:"I feel guilty when I rest." },
      { id:"st10",dimension:"Recovery",   prompt:"I end the day with at least one relaxing ritual." }
    ],
    scoring: { method:"likertDimensions", reverse:["st5","st6","st10"] }
  },

  attach: {
    id: "attach",
    title: "Attachment Style",
    icon: "../assets/img/tests/relationships.png",
    time: 6,
    type: "likert",
    instructions: "Think about close relationships (romantic or closest friends/family).",
    items: [
      { id:"at1",  dimension:"Anxiety",   prompt:"I worry partners will stop caring about me." },
      { id:"at2",  dimension:"Anxiety",   prompt:"I need frequent reassurance to feel secure." },
      { id:"at3",  dimension:"Avoidance", prompt:"I'm uncomfortable depending on others." },
      { id:"at4",  dimension:"Avoidance", prompt:"I prefer not to talk about feelings." },
      { id:"at5",  dimension:"Security",  prompt:"I can be close to others without losing myself." },
      { id:"at6",  dimension:"Security",  prompt:"I trust people who earn my trust over time." },
      { id:"at7",  dimension:"Anxiety",   prompt:"I fear being abandoned." },
      { id:"at8",  dimension:"Avoidance", prompt:"I keep emotional distance even with loved ones." },
      { id:"at9",  dimension:"Security",  prompt:"I handle conflict without withdrawing or attacking." },
      { id:"at10", dimension:"Anxiety",   prompt:"I read too much into small signs of disinterest." },
      { id:"at11", dimension:"Avoidance", prompt:"I'm uneasy with intimacy or need for support." },
      { id:"at12", dimension:"Security",  prompt:"I can ask for what I need directly." }
    ],
    scoring: { method:"likertDimensions", reverse:["at5","at6","at9","at12"] }
  },

  motivation: {
    id: "motivation",
    title: "Motivation & Growth",
    icon: "../assets/img/tests/motivation.png",
    time: 5,
    type: "likert",
    instructions: "Rate how much each statement describes your usual behavior.",
    items: [
      { id:"mo1", dimension:"Drive",        prompt:"I feel energized by ambitious goals." },
      { id:"mo2", dimension:"Drive",        prompt:"I regularly pursue challenges that stretch me." },
      { id:"mo3", dimension:"Discipline",   prompt:"I keep working even when motivation dips." },
      { id:"mo4", dimension:"Discipline",   prompt:"I plan my week and stick to it." },
      { id:"mo5", dimension:"Mindset",      prompt:"I believe abilities grow with deliberate practice." },
      { id:"mo6", dimension:"Mindset",      prompt:"Setbacks are feedback, not failure." },
      { id:"mo7", dimension:"Drive",        prompt:"I start tasks promptly rather than waiting." },
      { id:"mo8", dimension:"Discipline",   prompt:"I remove distractions when I need to focus." },
      { id:"mo9", dimension:"Mindset",      prompt:"I actively seek critique to improve." },
      { id:"mo10",dimension:"Discipline",   prompt:"I finish what I start." }
    ],
    scoring: { method:"likertDimensions" }
  },

  personality: {
    id: "personality",
    title: "Personality Snapshot (Big Five)",
    icon: "../assets/img/tests/Personality.png",
    time: 7,
    type: "likert",
    instructions: "Describe how you typically are.",
    items: [
      { id:"p1",  dimension:"Openness",     prompt:"I enjoy exploring new ideas and experiences." },
      { id:"p2",  dimension:"Openness",     prompt:"I notice patterns and connections others miss." },
      { id:"p3",  dimension:"Openness",     prompt:"I prefer routine over novelty." },
      { id:"p4",  dimension:"Openness",     prompt:"Art, music, or nature move me deeply." },
      { id:"p5",  dimension:"Conscientiousness", prompt:"I am reliable and follow through on commitments." },
      { id:"p6",  dimension:"Conscientiousness", prompt:"I keep my spaces and files organized." },
      { id:"p7",  dimension:"Conscientiousness", prompt:"I leave tasks until the last minute." },
      { id:"p8",  dimension:"Conscientiousness", prompt:"I set goals and track progress." },
      { id:"p9",  dimension:"Extraversion", prompt:"I gain energy from being around people." },
      { id:"p10", dimension:"Extraversion", prompt:"I speak up easily in groups." },
      { id:"p11", dimension:"Extraversion", prompt:"I prefer solitary activities most of the time." },
      { id:"p12", dimension:"Extraversion", prompt:"I seek excitement and variety in social life." },
      { id:"p13", dimension:"Agreeableness", prompt:"I try to see things from others' perspectives." },
      { id:"p14", dimension:"Agreeableness", prompt:"I am polite even when I disagree." },
      { id:"p15", dimension:"Agreeableness", prompt:"I can be blunt or critical without softening it." },
      { id:"p16", dimension:"Agreeableness", prompt:"People find me cooperative." },
      { id:"p17", dimension:"Neuroticism",  prompt:"I worry about things more than most people." },
      { id:"p18", dimension:"Neuroticism",  prompt:"I get irritated or moody easily." },
      { id:"p19", dimension:"Neuroticism",  prompt:"I remain calm under pressure." },
      { id:"p20", dimension:"Neuroticism",  prompt:"I ruminate on mistakes." }
    ],
    scoring: { method:"likertDimensions", reverse:["p3","p7","p11","p15","p19"] }
  },

  kids: {
    id: "kids",
    title: "Kids Zone (Learning & Creativity)",
    icon: "../assets/img/tests/Kids.png",
    time: 4,
    type: "likert",
    instructions: "Answer as a parent/guardian observing the child (ages ~6–12).",
    items: [
      { id:"k1", dimension:"LearningStyle", prompt:"Learns best with pictures, diagrams, or color-coding." },
      { id:"k2", dimension:"LearningStyle", prompt:"Remembers well when hearing stories or explanations." },
      { id:"k3", dimension:"LearningStyle", prompt:"Learns best by doing, building, or moving." },
      { id:"k4", dimension:"Creativity",    prompt:"Invents games, stories, or solutions spontaneously." },
      { id:"k5", dimension:"Creativity",    prompt:"Combines ideas from different topics in original ways." },
      { id:"k6", dimension:"Creativity",    prompt:"Asks unusual 'what if' questions." },
      { id:"k7", dimension:"SelfReg",       prompt:"Stays focused for age-appropriate periods." },
      { id:"k8", dimension:"SelfReg",       prompt:"Can transition between activities without meltdowns." },
      { id:"k9", dimension:"SelfReg",       prompt:"Uses simple strategies to calm down when upset." },
      { id:"k10",dimension:"LearningStyle", prompt:"Enjoys explaining what they've learned to others." },
      { id:"k11",dimension:"SelfReg",       prompt:"Follows multi-step instructions for their age." },
      { id:"k12",dimension:"Creativity",    prompt:"Keeps experimenting even if the first idea fails." }
    ],
    scoring: { method:"likertDimensions" }
  }
};

// ===========================
// MOTIVATIONAL MESSAGES
// ===========================

const MOTIVATION_MESSAGES = [
  "Great focus!",
  "You're doing amazing!",
  "Keep up the momentum!",
  "Nice progress!",
  "Almost there!",
  "You're on track!",
  "Excellent work!",
  "Stay focused!",
  "You've got this!",
  "Making great strides!"
];

// ===========================
// MAIN TEST RUNNER CLASS
// ===========================

class TestRunner {
  constructor() {
    this.currentTest = null;
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.testId = null;
    this.profileId = 'default'; // In real app, get from user session
    this.motivationInterval = null;
    
    this.init();
  }

  // ===========================
  // INITIALIZATION
  // ===========================

  async init() {
    try {
      this.showLoading();
      this.setupEventListeners();
      this.setupMobileMenu();
      this.setupKeyboardNavigation();
      
      // Get test ID from URL
      this.testId = this.getTestIdFromURL();
      
      if (!this.testId || !TESTS[this.testId]) {
        this.showError();
        return;
      }

      // Load test data
      this.currentTest = TESTS[this.testId];
      
      // Load saved progress
      this.loadProgress();
      
      // Initialize UI
      this.initializeTest();
      this.hideLoading();
      
      // Start motivation messages
      this.startMotivationMessages();
      
    } catch (error) {
      console.error('Failed to initialize test:', error);
      this.showError();
    }
  }

  getTestIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  loadProgress() {
    const savedData = localStorage.getItem(`test_${this.profileId}_${this.testId}`);
    if (savedData) {
      const { answers, questionIndex } = JSON.parse(savedData);
      this.answers = answers || {};
      this.currentQuestionIndex = questionIndex || 0;
    }
  }

  saveProgress() {
    const progressData = {
      answers: this.answers,
      questionIndex: this.currentQuestionIndex,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`test_${this.profileId}_${this.testId}`, JSON.stringify(progressData));
  }

  // ===========================
  // UI INITIALIZATION
  // ===========================

  initializeTest() {
    // Set test header info
    document.getElementById('test-icon').src = this.currentTest.icon;
    document.getElementById('test-icon').alt = `${this.currentTest.title} Icon`;
    document.getElementById('test-title').textContent = this.currentTest.title;
    document.getElementById('time-estimate').textContent = `~${this.currentTest.time} min`;
    
    // Initialize progress
    this.updateProgress();
    this.createProgressNodes();
    
    // Show first question
    this.showQuestion(this.currentQuestionIndex);
    
    // Update page title
    document.title = `${this.currentTest.title} - SelfMap Growth Hub`;
  }

  createProgressNodes() {
    const nodesContainer = document.getElementById('progress-nodes');
    nodesContainer.innerHTML = '';
    
    this.currentTest.items.forEach((_, index) => {
      const node = document.createElement('div');
      node.className = 'progress-node';
      node.setAttribute('aria-label', `Question ${index + 1}`);
      
      if (this.answers[this.currentTest.items[index].id]) {
        node.classList.add('completed');
      }
      if (index === this.currentQuestionIndex) {
        node.classList.add('current');
      }
      
      nodesContainer.appendChild(node);
    });
  }

  updateProgress() {
    const totalQuestions = this.currentTest.items.length;
    const currentQuestion = this.currentQuestionIndex + 1;
    const progress = (this.currentQuestionIndex / totalQuestions) * 100;
    
    // Update progress circle
    const progressFill = document.querySelector('.progress-circle__fill');
    if (progressFill) {
      progressFill.style.strokeDashoffset = 100 - progress;
    }
    
    // Update progress text
    const progressText = document.getElementById('progress-text');
    if (progressText) {
      progressText.textContent = `Q${currentQuestion} of ${totalQuestions}`;
    }
    
    // Update mobile progress bar
    document.documentElement.style.setProperty('--progress-width', `${progress}%`);
    
    // Update progress nodes
    this.updateProgressNodes();
  }

  updateProgressNodes() {
    const nodes = document.querySelectorAll('.progress-node');
    nodes.forEach((node, index) => {
      node.classList.remove('completed', 'current');
      
      if (this.answers[this.currentTest.items[index].id]) {
        node.classList.add('completed');
      }
      if (index === this.currentQuestionIndex) {
        node.classList.add('current');
      }
    });
  }

  // ===========================
  // MOTIVATION MESSAGES
  // ===========================
  
  getMotivationMessage(questionIndex) {
    const motivations = [
      "Stay focused",
      "Trust your instincts", 
      "You're doing great",
      "Keep going strong",
      "Almost there",
      "Excellent progress",
      "Stay confident",
      "You've got this",
      "Keep it up",
      "Nearly finished",
      "Final stretch",
      "Outstanding work"
    ];
    return motivations[questionIndex % motivations.length];
  }
  
  addMotivationText(questionIndex) {
    // Remove existing motivation if any
    const existingMotivation = document.querySelector('.question-motivation');
    if (existingMotivation) {
      existingMotivation.remove();
    }
    
    // Create new motivation element
    const motivation = document.createElement('div');
    motivation.className = 'question-motivation';
    motivation.textContent = this.getMotivationMessage(questionIndex);
    
    // Insert before question prompt
    const questionPrompt = document.querySelector('.question-prompt');
    if (questionPrompt) {
      questionPrompt.parentNode.insertBefore(motivation, questionPrompt);
    }
  }

  // ===========================
  // QUESTION DISPLAY
  // ===========================

  showQuestion(index) {
    const question = this.currentTest.items[index];
    if (!question) return;

    // Add micro motivation text
    this.addMotivationText(index);
    
    // Update question content
    document.getElementById('current-question').textContent = question.prompt;
    
    // Handle question image for image-single type
    const imageContainer = document.getElementById('question-image');
    if (question.image) {
      document.getElementById('question-img').src = question.image;
      document.getElementById('question-img').alt = 'Question illustration';
      imageContainer.style.display = 'block';
    } else {
      imageContainer.style.display = 'none';
    }

    // Clear and rebuild answer options
    this.renderAnswerOptions(question);
    
    // Update navigation buttons
    this.updateNavigationButtons();
    
    // Update progress
    this.updateProgress();
    
    // Announce to screen readers
    this.announceQuestion(question);
    
    // Focus management
    setTimeout(() => {
      const firstOption = document.querySelector('.answer-options input, .answer-options .choice-option');
      if (firstOption) {
        firstOption.focus();
      }
      
      // Re-check scrollable state for mobile
      if (window.innerWidth <= 768) {
        const questionCard = document.querySelector('.question-card');
        if (questionCard) {
          if (questionCard.scrollHeight > questionCard.clientHeight) {
            questionCard.classList.add('scrollable');
          } else {
            questionCard.classList.remove('scrollable');
          }
        }
      }
    }, 100);
  }

  renderAnswerOptions(question) {
    const container = document.getElementById('answer-options');
    container.innerHTML = '';
    
    if (this.currentTest.type === 'likert') {
      this.renderLikertScale(container, question);
    } else if (this.currentTest.type === 'single' || this.currentTest.type === 'image-single') {
      this.renderMultipleChoice(container, question);
    }
  }

  renderLikertScale(container, question) {
    container.className = 'answer-options answer-options--likert';
    
    const scales = this.currentTest.scoring.scales || {
      "1": "Never", 
      "2": "Rarely", 
      "3": "Sometimes", 
      "4": "Often", 
      "5": "Always"
    };
    
    // Use question.scale if available, otherwise default to [1,2,3,4,5]
    const scaleValues = question.scale || [1, 2, 3, 4, 5];
    
    scaleValues.forEach(value => {
      const option = document.createElement('label');
      option.className = 'likert-option';
      
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question_${question.id}`;
      input.value = value;
      input.className = 'likert-radio';
      input.setAttribute('data-value', value);
      
      if (this.answers[question.id] == value) {
        input.checked = true;
      }
      
      input.addEventListener('change', () => {
        this.handleAnswer(question.id, value);
      });
      
      const label = document.createElement('span');
      label.className = 'likert-label';
      label.textContent = scales[value.toString()];
      
      option.appendChild(input);
      option.appendChild(label);
      container.appendChild(option);
    });
  }

  renderMultipleChoice(container, question) {
    container.className = 'answer-options answer-options--choice';
    
    question.options.forEach((optionText, index) => {
      const option = document.createElement('div');
      option.className = 'choice-option';
      option.setAttribute('role', 'radio');
      option.setAttribute('aria-checked', this.answers[question.id] == index ? 'true' : 'false');
      option.setAttribute('tabindex', '0');
      
      if (this.answers[question.id] == index) {
        option.classList.add('selected');
      }
      
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question_${question.id}`;
      input.value = index;
      input.className = 'choice-radio';
      input.id = `choice_${question.id}_${index}`;
      
      if (this.answers[question.id] == index) {
        input.checked = true;
      }
      
      input.addEventListener('change', () => {
        this.handleAnswer(question.id, index);
      });
      
      const text = document.createElement('span');
      text.className = 'choice-text';
      text.textContent = optionText;
      
      option.addEventListener('click', () => {
        input.checked = true;
        this.handleAnswer(question.id, index);
      });
      
      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          input.checked = true;
          this.handleAnswer(question.id, index);
        }
      });
      
      option.appendChild(input);
      option.appendChild(text);
      container.appendChild(option);
    });
  }

  // ===========================
  // ANSWER HANDLING
  // ===========================

  handleAnswer(questionId, value) {
    this.answers[questionId] = value;
    
    // Update UI
    this.updateSelectedOption();
    this.updateNavigationButtons();
    this.updateProgressNodes();
    
    // Auto-save
    this.saveProgress();
    
    // Announce to screen readers
    this.announceToScreenReader('Answer recorded');
  }

  updateSelectedOption() {
    // Update choice options styling
    const choiceOptions = document.querySelectorAll('.choice-option');
    choiceOptions.forEach(option => {
      const input = option.querySelector('input');
      if (input.checked) {
        option.classList.add('selected');
        option.setAttribute('aria-checked', 'true');
      } else {
        option.classList.remove('selected');
        option.setAttribute('aria-checked', 'false');
      }
    });
  }

  updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Previous button
    prevBtn.disabled = this.currentQuestionIndex === 0;
    
    // Next button
    const currentQuestion = this.currentTest.items[this.currentQuestionIndex];
    const hasAnswer = this.answers[currentQuestion.id] !== undefined;
    nextBtn.disabled = !hasAnswer;
    
    // Update next button text for last question
    if (this.currentQuestionIndex === this.currentTest.items.length - 1) {
      nextBtn.innerHTML = 'Submit <span class="question-controls__icon">✓</span>';
    } else {
      nextBtn.innerHTML = 'Next <span class="question-controls__icon">→</span>';
    }
  }

  // ===========================
  // NAVIGATION
  // ===========================

  goToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showQuestion(this.currentQuestionIndex);
    }
  }

  goToNextQuestion() {
    const currentQuestion = this.currentTest.items[this.currentQuestionIndex];
    
    // Validate answer exists
    if (this.answers[currentQuestion.id] === undefined) {
      this.announceToScreenReader('Please select an answer before continuing');
      return;
    }

    // Check if this is the last question
    if (this.currentQuestionIndex === this.currentTest.items.length - 1) {
      this.submitTest();
      return;
    }

    // Go to next question
    this.currentQuestionIndex++;
    this.showQuestion(this.currentQuestionIndex);
  }

  // ===========================
  // TEST SUBMISSION & SCORING
  // ===========================

  async submitTest() {
    try {
      // Show loading
      this.showLoading('Processing your results...');
      
      // Calculate scores
      const scores = this.calculateScores();
      
      // Create result object
      const result = {
        testId: this.testId,
        profileId: this.profileId,
        answers: this.answers,
        scores: scores,
        completedAt: new Date().toISOString(),
        duration: this.calculateDuration()
      };
      
      // Save result
      this.saveResult(result);
      
      // Clear saved progress
      localStorage.removeItem(`test_${this.profileId}_${this.testId}`);
      
      // Redirect to payment page (bypassing teaser)
      setTimeout(() => {
        window.location.href = `pay.html?test=${this.testId}`;
      }, 1500);
      
    } catch (error) {
      console.error('Failed to submit test:', error);
      this.announceToScreenReader('Error submitting test. Please try again.');
      this.hideLoading();
    }
  }

  calculateScores() {
    const scoring = this.currentTest.scoring;
    const scores = {};

    switch (scoring.method) {
      case 'sumLikert':
        return this.calculateLikertScores(scoring);
      
      case 'correctCount':
        return this.calculateCorrectCount();
      
      case 'weightedSum':
        return this.calculateWeightedSum(scoring.weights);
      
      case 'categorical':
        return this.calculateCategorical(scoring.categories);
      
      case 'profile':
        return this.calculateProfile(scoring.dimensions);
      
      default:
        return { total: Object.keys(this.answers).length };
    }
  }

  calculateLikertScores(scoring) {
    const dimensionScores = {};
    const dimensionCounts = {};
    
    // Initialize dimensions
    scoring.dimensions.forEach(dim => {
      dimensionScores[dim] = 0;
      dimensionCounts[dim] = 0;
    });

    this.currentTest.items.forEach(item => {
      const answer = parseInt(this.answers[item.id]);
      if (isNaN(answer)) return;
      
      let score = answer;
      
      // Handle reverse scoring
      if (item.reverse) {
        score = 6 - answer; // Reverse 1-5 scale
      }
      
      dimensionScores[item.dimension] += score;
      dimensionCounts[item.dimension]++;
    });

    // Calculate averages
    const results = {};
    scoring.dimensions.forEach(dim => {
      if (dimensionCounts[dim] > 0) {
        results[dim] = dimensionScores[dim] / dimensionCounts[dim];
      } else {
        results[dim] = 0;
      }
    });

    // Calculate total average
    results.total = Object.values(results).reduce((sum, val) => sum + val, 0) / scoring.dimensions.length;
    
    return results;
  }

  calculateCorrectCount() {
    let correct = 0;
    this.currentTest.items.forEach(item => {
      if (parseInt(this.answers[item.id]) === item.correct) {
        correct++;
      }
    });
    
    return {
      correct: correct,
      total: this.currentTest.items.length,
      percentage: (correct / this.currentTest.items.length) * 100
    };
  }

  calculateWeightedSum(weights) {
    let total = 0;
    this.currentTest.items.forEach((item, index) => {
      const answer = parseInt(this.answers[item.id]) || 0;
      const weight = weights[index] || 1;
      total += answer * weight;
    });
    
    return { total: total, normalized: total / this.currentTest.items.length };
  }

  calculateCategorical(categories) {
    const categoryCounts = {};
    categories.forEach(cat => categoryCounts[cat] = 0);
    
    this.currentTest.items.forEach((item, index) => {
      const answerIndex = parseInt(this.answers[item.id]);
      if (!isNaN(answerIndex) && categories[answerIndex]) {
        categoryCounts[categories[answerIndex]]++;
      }
    });
    
    return categoryCounts;
  }

  calculateProfile(dimensions) {
    const profile = {};
    
    this.currentTest.items.forEach((item, index) => {
      const dimension = dimensions[index];
      const answer = this.answers[item.id];
      
      if (dimension && answer !== undefined) {
        profile[dimension] = item.options[answer] || answer;
      }
    });
    
    return profile;
  }

  calculateDuration() {
    const savedData = localStorage.getItem(`test_${this.profileId}_${this.testId}`);
    if (savedData) {
      const { timestamp } = JSON.parse(savedData);
      const startTime = new Date(timestamp);
      const endTime = new Date();
      return Math.round((endTime - startTime) / 1000); // seconds
    }
    return 0;
  }

  saveResult(result) {
    // Save to localStorage (in real app, send to backend)
    const results = JSON.parse(localStorage.getItem('test_results') || '[]');
    results.push(result);
    localStorage.setItem('test_results', JSON.stringify(results));
  }

  // ===========================
  // EVENT LISTENERS
  // ===========================

  setupEventListeners() {
    // Navigation buttons
    document.getElementById('prev-btn').addEventListener('click', () => {
      this.goToPreviousQuestion();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      this.goToNextQuestion();
    });

    // Save & Exit button
    document.getElementById('save-exit').addEventListener('click', () => {
      this.showExitModal();
    });

    // Modal buttons
    document.getElementById('modal-continue').addEventListener('click', () => {
      this.hideExitModal();
    });

    document.getElementById('modal-exit').addEventListener('click', () => {
      this.exitTest();
    });

    // Navbar CTA
    const navbarCTAs = document.querySelectorAll('.navbar__cta, .navbar__mobile-cta');
    navbarCTAs.forEach(cta => {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        this.showExitModal();
      });
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Prevent default for navigation keys
      if (['ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        const activeElement = document.activeElement;
        
        // If focus is on an input or button, let default behavior happen
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'BUTTON') {
          return;
        }
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (!document.getElementById('prev-btn').disabled) {
            this.goToPreviousQuestion();
          }
          break;
          
        case 'ArrowRight':
        case 'Enter':
          e.preventDefault();
          if (!document.getElementById('next-btn').disabled) {
            this.goToNextQuestion();
          }
          break;

        case 'Escape':
          e.preventDefault();
          this.showExitModal();
          break;
      }

      // Numeric keys for Likert scale
      if (this.currentTest.type === 'likert' && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const currentQuestion = this.currentTest.items[this.currentQuestionIndex];
        const value = parseInt(e.key);
        
        if (currentQuestion.scale.includes(value)) {
          const radio = document.querySelector(`input[name="question_${currentQuestion.id}"][value="${value}"]`);
          if (radio) {
            radio.checked = true;
            this.handleAnswer(currentQuestion.id, value);
          }
        }
      }
    });
  }

  // ===========================
  // MOBILE MENU
  // ===========================

  setupMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  openMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    
    mobileMenu.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-menu-open');
    
    this.animateHamburger(true);
  }

  closeMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
    
    this.animateHamburger(false);
  }

  animateHamburger(isOpen) {
    const lines = document.querySelectorAll('.navbar__hamburger-line');
    
    if (isOpen) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      lines[0].style.transform = 'none';
      lines[1].style.opacity = '1';
      lines[2].style.transform = 'none';
    }
  }

  // ===========================
  // MOTIVATIONAL MESSAGES
  // ===========================

  startMotivationMessages() {
    let messageIndex = 0;
    
    this.motivationInterval = setInterval(() => {
      const text = document.getElementById('motivation-text');
      if (text) {
        text.style.opacity = '0';
        
        setTimeout(() => {
          text.textContent = MOTIVATION_MESSAGES[messageIndex];
          text.style.opacity = '0.8';
          messageIndex = (messageIndex + 1) % MOTIVATION_MESSAGES.length;
        }, 300);
      }
    }, 4000);
  }

  // ===========================
  // UI STATES
  // ===========================

  showLoading(message = 'Loading your test...') {
    const overlay = document.getElementById('loading-overlay');
    const text = overlay.querySelector('.loading-text');
    text.textContent = message;
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
  }

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  }

  showError() {
    document.getElementById('error-state').style.display = 'flex';
  }

  showExitModal() {
    const modal = document.getElementById('exit-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Focus the continue button
    document.getElementById('modal-continue').focus();
  }

  hideExitModal() {
    const modal = document.getElementById('exit-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
  }

  exitTest() {
    // Save current progress
    this.saveProgress();
    
    // Redirect to tests library
    window.location.href = 'tests.html';
  }

  // ===========================
  // ACCESSIBILITY
  // ===========================

  announceQuestion(question) {
    const announcement = `Question ${this.currentQuestionIndex + 1} of ${this.currentTest.items.length}: ${question.prompt}`;
    this.announceToScreenReader(announcement);
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  // ===========================
  // CLEANUP
  // ===========================

  destroy() {
    if (this.motivationInterval) {
      clearInterval(this.motivationInterval);
    }
  }
}

// ===========================
// MOBILE UX ENHANCEMENTS
// ===========================

function initializeMobileEnhancements() {
  // Only apply on mobile devices
  if (window.innerWidth <= 768) {
    // Add scroll detection for question cards
    const checkScrollable = () => {
      const questionCard = document.querySelector('.question-card');
      if (questionCard) {
        if (questionCard.scrollHeight > questionCard.clientHeight) {
          questionCard.classList.add('scrollable');
        } else {
          questionCard.classList.remove('scrollable');
        }
      }
    };
    
    // Check initially and on resize
    setTimeout(checkScrollable, 100);
    window.addEventListener('resize', checkScrollable);
    
    // BULLETPROOF navigation fixing
    const navigation = document.querySelector('.question-navigation');
    if (navigation) {
      // Force navigation to stay fixed - prevent any JavaScript interference
      const forceFixedNavigation = () => {
        navigation.style.cssText = `
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 99999 !important;
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          background: var(--surface-darker) !important;
          backdrop-filter: blur(20px) !important;
          border-top: 2px solid var(--accent-blue) !important;
          padding: var(--spacing-sm) !important;
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.5) !important;
        `;
      };
      
      // Apply immediately
      forceFixedNavigation();
      
      // Re-apply every 100ms to override any interference
      setInterval(forceFixedNavigation, 50); // More aggressive forcing
      
      // Also force on scroll and resize
      window.addEventListener('scroll', forceFixedNavigation);
      window.addEventListener('resize', forceFixedNavigation);
      document.addEventListener('DOMContentLoaded', forceFixedNavigation);
      
      // Track navigation usage for hints
      const buttons = navigation.querySelectorAll('.nav-button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          navigation.classList.add('used');
        });
      });
    }
    
    // Add mobile-specific touch improvements
    document.body.classList.add('mobile-device');
  }
}

// ===========================
// INITIALIZATION
// ===========================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.testRunner = new TestRunner();
    initializeMobileEnhancements();
  });
} else {
  window.testRunner = new TestRunner();
  initializeMobileEnhancements();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.testRunner) {
    window.testRunner.destroy();
  }
});

// Handle page visibility for motivation messages
document.addEventListener('visibilitychange', () => {
  if (window.testRunner) {
    if (document.hidden) {
      if (window.testRunner.motivationInterval) {
        clearInterval(window.testRunner.motivationInterval);
      }
    } else {
      window.testRunner.startMotivationMessages();
    }
  }
});