// SELFMAP DASHBOARD - DYNAMIC FUNCTIONALITY & DATA MANAGEMENT

// TEST INFORMATION DATABASE
const TEST_INFO = {
    'iq': {
        name: 'Intelligence Assessment',
        icon: '🧠',
        description: 'Cognitive abilities and reasoning assessment',
        color: '#3b82f6'
    },
    'eq': {
        name: 'Emotional Intelligence',
        icon: '❤️', 
        description: 'Emotional awareness and relationship skills',
        color: '#ec4899'
    },
    'personality': {
        name: 'Personality Assessment',
        icon: '🎭',
        description: 'Deep personality traits and characteristics',
        color: '#8b5cf6'
    },
    'adhd': {
        name: 'ADHD Assessment',
        icon: '⚡',
        description: 'Attention patterns and focus evaluation',
        color: '#f59e0b'
    },
    'stress': {
        name: 'Stress Management',
        icon: '🧘',
        description: 'Stress levels and coping mechanisms',
        color: '#10b981'
    },
    'relationships': {
        name: 'Relationships Analysis',
        icon: '💕',
        description: 'Relationship patterns and communication',
        color: '#06b6d4'
    },
    'motivation': {
        name: 'Motivation Assessment',
        icon: '🚀',
        description: 'Drive patterns and energy sources',
        color: '#f97316'
    },
    'kids': {
        name: 'Kids Development',
        icon: '👶',
        description: 'Child development and learning assessment',
        color: '#a855f7'
    }
};

// SCORE INTERPRETATION BANDS
const SCORE_BANDS = {
    getInterpretation: (score) => {
        if (score >= 75) return "High-performer edge — protect your strengths";
        if (score >= 50) return "Strong trajectory — above average habits";
        if (score >= 25) return "Building momentum — small wins compound";
        return "Starting point — lots of room to grow";
    },
    getBand: (score) => {
        if (score >= 75) return "High Performer";
        if (score >= 50) return "Strong Progress";
        if (score >= 25) return "Building Up";
        return "Getting Started";
    }
};

// TRAINING HABITS DATABASE
const TRAINING_HABITS = {
    'iq': [
        {
            title: "Daily Brain Training",
            description: "Spend 10 minutes on pattern recognition puzzles",
            time: "10 min",
            why: "Strengthens neural pathways for logical thinking"
        },
        {
            title: "Speed Reading Practice",
            description: "Practice rapid text comprehension techniques",
            time: "15 min", 
            why: "Improves processing speed and working memory"
        },
        {
            title: "Chess or Strategy Games",
            description: "Play strategic games that require planning ahead",
            time: "20 min",
            why: "Develops strategic thinking and pattern recognition"
        }
    ],
    'eq': [
        {
            title: "Emotion Check-ins",
            description: "Pause 3 times daily to identify current emotions",
            time: "2 min",
            why: "Builds emotional self-awareness foundation"
        },
        {
            title: "Active Listening Practice",
            description: "Focus fully on one conversation without distractions",
            time: "varies",
            why: "Strengthens empathy and social connection skills"
        },
        {
            title: "Gratitude Reflection",
            description: "Write down 3 things you're grateful for",
            time: "5 min",
            why: "Cultivates positive emotional patterns"
        }
    ],
    'personality': [
        {
            title: "Strengths Journaling",
            description: "Reflect on moments you used your core strengths",
            time: "10 min",
            why: "Reinforces authentic behavior patterns"
        },
        {
            title: "Values Alignment Check",
            description: "Review if today's actions matched your values",
            time: "5 min",
            why: "Builds consistency between beliefs and actions"
        },
        {
            title: "Social Energy Management",
            description: "Plan social vs. solo time based on your personality",
            time: "5 min",
            why: "Optimizes energy and prevents burnout"
        }
    ],
    'adhd': [
        {
            title: "Focus Sprint Sessions",
            description: "25-minute focused work sessions with 5-min breaks",
            time: "30 min",
            why: "Trains sustained attention in manageable chunks"
        },
        {
            title: "Environment Optimization",
            description: "Remove distractions from workspace before starting",
            time: "5 min",
            why: "Reduces cognitive load and external triggers"
        },
        {
            title: "Movement Breaks",
            description: "Take a 2-minute walk every hour",
            time: "2 min",
            why: "Regulates attention and manages hyperactivity"
        }
    ],
    'stress': [
        {
            title: "Deep Breathing Practice",
            description: "4-7-8 breathing technique when feeling overwhelmed",
            time: "5 min",
            why: "Activates parasympathetic nervous system"
        },
        {
            title: "Priority Matrix Review",
            description: "Organize tasks by urgency and importance",
            time: "10 min",
            why: "Reduces mental load and provides clarity"
        },
        {
            title: "Mindfulness Moment",
            description: "Notice 5 things you can see, 4 hear, 3 feel, 2 smell, 1 taste",
            time: "3 min",
            why: "Grounds you in the present moment"
        }
    ],
    'relationships': [
        {
            title: "Appreciation Expression",
            description: "Tell someone specifically what you appreciate about them",
            time: "5 min",
            why: "Strengthens emotional bonds and positive patterns"
        },
        {
            title: "Conflict Style Awareness",
            description: "Reflect on how you handled disagreements today",
            time: "5 min",
            why: "Builds awareness of your relationship patterns"
        },
        {
            title: "Quality Connection Time",
            description: "Have one meaningful conversation without devices",
            time: "15 min",
            why: "Deepens intimacy and communication skills"
        }
    ]
};

// NEXT TEST RECOMMENDATIONS
const NEXT_TEST_RECOMMENDATIONS = {
    'iq': ['eq', 'personality'],
    'eq': ['relationships', 'stress'],
    'personality': ['motivation', 'relationships'],
    'adhd': ['stress', 'motivation'],
    'stress': ['eq', 'motivation'],
    'relationships': ['eq', 'personality'],
    'motivation': ['personality', 'adhd'],
    'kids': ['personality', 'eq']
};

// CURIOSITY TEASERS FOR NEXT TESTS
const TEST_TEASERS = {
    'iq': "Discover how your mind processes complex information and solves problems",
    'eq': "Explore how emotions shape your decisions and relationships",
    'personality': "Uncover the deep patterns that make you uniquely you", 
    'adhd': "Understand your attention patterns and optimize your focus",
    'stress': "Learn your stress triggers and build resilience strategies",
    'relationships': "Reveal your attachment style and communication patterns",
    'motivation': "Identify what truly energizes and drives you forward",
    'kids': "Nurture your child's unique potential and learning style"
};

// GLOBAL STATE
let currentUser = {
    name: null,
    lastTestId: null,
    lastTestScore: null,
    lastTestDate: null,
    completedTests: [],
    streakDays: 0,
    trainingHabits: {},
    plan: 'single'
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadUserData();
    renderDashboard();
    setupEventListeners();
});

// INITIALIZE DASHBOARD
function initializeDashboard() {
    console.log('🚀 Dashboard initializing...');
    
    // Create sample data if none exists
    if (!localStorage.getItem('selfmap_results')) {
        createSampleData();
    }
    
    // Setup animations
    setupAnimations();
}

// CREATE SAMPLE DATA FOR DEMO
function createSampleData() {
    const sampleResults = {
        testId: "iq",
        overall: 72,
        byDimension: {
            "Pattern Recognition": 78,
            "Logical Reasoning": 69,
            "Working Memory": 74,
            "Processing Speed": 68
        },
        takenAt: new Date().toISOString()
    };
    
    localStorage.setItem('selfmap_results', JSON.stringify(sampleResults));
    localStorage.setItem('selfmap_streak', '3');
    localStorage.setItem('selfmap_training_habits', JSON.stringify({}));
}

// LOAD USER DATA FROM STORAGE
function loadUserData() {
    // Load test results
    const resultsData = localStorage.getItem('selfmap_results');
    if (resultsData) {
        const results = JSON.parse(resultsData);
        currentUser.lastTestId = results.testId;
        currentUser.lastTestScore = results.overall;
        currentUser.lastTestDate = results.takenAt;
        currentUser.completedTests = [results.testId];
    }
    
    // Load streak
    const streakData = localStorage.getItem('selfmap_streak');
    if (streakData) {
        currentUser.streakDays = parseInt(streakData);
    }
    
    // Load training habits
    const habitsData = localStorage.getItem('selfmap_training_habits');
    if (habitsData) {
        currentUser.trainingHabits = JSON.parse(habitsData);
    }
    
    // Get plan from URL or payment data
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') || localStorage.getItem('selfmap_plan') || 'single';
    currentUser.plan = plan;
    
    console.log('📊 User data loaded:', currentUser);
}

// RENDER DASHBOARD CONTENT
function renderDashboard() {
    updateGreeting();
    updateStatusChips();
    updateCurrentStats();
    updatePersonalizedPath();
    updateProgressTracker();
    updateNextMission();
    updateTrainingPlan();
    updateStreaksAchievements();
    updateFamilyProfiles();
}

// UPDATE GREETING
function updateGreeting() {
    const greeting = document.getElementById('userGreeting');
    if (greeting) {
        const name = currentUser.name || 'Explorer';
        const timeOfDay = getTimeOfDay();
        greeting.textContent = `${timeOfDay}, ${name}`;
    }
}

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

// UPDATE STATUS CHIPS
function updateStatusChips() {
    const testsCompleted = document.getElementById('testsCompleted');
    if (testsCompleted) {
        const count = currentUser.completedTests.length;
        testsCompleted.textContent = `${count} Test${count !== 1 ? 's' : ''} Completed`;
    }
}

// UPDATE CURRENT STATS
function updateCurrentStats() {
    if (!currentUser.lastTestId || !currentUser.lastTestScore) return;
    
    const testInfo = TEST_INFO[currentUser.lastTestId];
    
    // Update test name
    const lastTestName = document.getElementById('lastTestName');
    if (lastTestName && testInfo) {
        lastTestName.textContent = testInfo.name;
    }
    
    // Update score and interpretation
    const overallScore = document.getElementById('overallScore');
    const scoreInterpretation = document.getElementById('scoreInterpretation');
    const growthBand = document.getElementById('growthBand');
    
    if (overallScore) {
        overallScore.textContent = currentUser.lastTestScore;
        animateScore(overallScore, currentUser.lastTestScore);
    }
    
    if (scoreInterpretation) {
        scoreInterpretation.textContent = SCORE_BANDS.getInterpretation(currentUser.lastTestScore);
    }
    
    if (growthBand) {
        growthBand.textContent = SCORE_BANDS.getBand(currentUser.lastTestScore);
    }
    
    // Update completion date
    const completionDate = document.getElementById('completionDate');
    if (completionDate && currentUser.lastTestDate) {
        const date = new Date(currentUser.lastTestDate);
        const isToday = isDateToday(date);
        completionDate.textContent = isToday ? 'Today' : formatDate(date);
    }
    
    // Animate radial progress
    animateRadialProgress();
}

function animateScore(element, targetScore) {
    let currentScore = 0;
    const increment = targetScore / 50;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        element.textContent = Math.round(currentScore);
    }, 40);
}

function animateRadialProgress() {
    const progressCircle = document.getElementById('progressCircle');
    if (!progressCircle || !currentUser.lastTestScore) return;
    
    const score = currentUser.lastTestScore;
    const circumference = 2 * Math.PI * 80; // radius = 80
    const offset = circumference - (score / 100) * circumference;
    
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
    }, 500);
}

// UPDATE PERSONALIZED PATH
function updatePersonalizedPath() {
    const completedTests = currentUser.completedTests.length;
    
    // Update mission states
    const missions = document.querySelectorAll('.mission-step');
    missions.forEach((mission, index) => {
        const missionNumber = index + 1;
        
        mission.classList.remove('mission-step--completed', 'mission-step--current', 'mission-step--locked');
        
        if (missionNumber === 1 && completedTests > 0) {
            mission.classList.add('mission-step--completed');
        } else if (missionNumber === 2 && completedTests >= 1) {
            mission.classList.add('mission-step--current');
        } else if (missionNumber <= completedTests + 1) {
            mission.classList.add('mission-step--current');
        } else {
            mission.classList.add('mission-step--locked');
        }
    });
}

// UPDATE PROGRESS TRACKER
function updateProgressTracker() {
    const completedCount = currentUser.completedTests.length;
    const totalTests = Object.keys(TEST_INFO).length;
    
    // Update progress bar
    const progressFill = document.getElementById('dimensionsProgress');
    const progressText = document.getElementById('dimensionsText');
    
    if (progressFill) {
        const percentage = (completedCount / totalTests) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${completedCount} / ${totalTests} Dimensions Completed`;
    }
    
    // Render dimensions grid
    renderDimensionsGrid();
    
    // Render radar chart
    renderRadarChart();
}

function renderDimensionsGrid() {
    const container = document.getElementById('dimensionsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(TEST_INFO).forEach(([testId, testInfo]) => {
        const isCompleted = currentUser.completedTests.includes(testId);
        const isGhosted = !isCompleted;
        
        const card = document.createElement('div');
        card.className = `dimension-card ${isCompleted ? 'dimension-card--completed' : ''} ${isGhosted ? 'dimension-card--ghosted' : ''}`;
        
        card.innerHTML = `
            <div class="dimension-card__icon">${testInfo.icon}</div>
            <div class="dimension-card__title">${testInfo.name}</div>
            <div class="dimension-card__status">
                ${isCompleted ? 'Completed' : 'Not Started'}
            </div>
            ${isGhosted ? `<a href="test.html?id=${testId}" class="dimension-card__cta">Take Test</a>` : ''}
        `;
        
        container.appendChild(card);
    });
}

function renderRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background grid
    drawRadarGrid(ctx, centerX, centerY, radius);
    
    // Draw data if available
    if (currentUser.lastTestId) {
        drawRadarData(ctx, centerX, centerY, radius);
    }
}

function drawRadarGrid(ctx, centerX, centerY, radius) {
    const segments = 8; // 8 test dimensions
    const rings = 4; // 4 concentric circles
    
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    
    // Draw concentric circles
    for (let i = 1; i <= rings; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / rings) * i, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    // Draw radial lines
    for (let i = 0; i < segments; i++) {
        const angle = (i * 2 * Math.PI) / segments - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
    }
    
    // Draw labels
    ctx.fillStyle = 'rgba(226, 232, 240, 0.8)';
    ctx.font = '12px SF Pro Text, sans-serif';
    ctx.textAlign = 'center';
    
    const testIds = Object.keys(TEST_INFO);
    testIds.forEach((testId, i) => {
        const angle = (i * 2 * Math.PI) / segments - Math.PI / 2;
        const labelX = centerX + Math.cos(angle) * (radius + 20);
        const labelY = centerY + Math.sin(angle) * (radius + 20);
        
        const testInfo = TEST_INFO[testId];
        ctx.fillText(testInfo.icon + ' ' + testInfo.name.split(' ')[0], labelX, labelY);
    });
}

function drawRadarData(ctx, centerX, centerY, radius) {
    if (!currentUser.lastTestId || !currentUser.lastTestScore) return;
    
    const testIds = Object.keys(TEST_INFO);
    const completedIndex = testIds.indexOf(currentUser.lastTestId);
    
    if (completedIndex === -1) return;
    
    // Create gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
    
    // Draw filled area for completed test
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    
    const angle = (completedIndex * 2 * Math.PI) / testIds.length - Math.PI / 2;
    const distance = (currentUser.lastTestScore / 100) * radius;
    
    // Draw a small slice for the completed test
    const sliceWidth = (2 * Math.PI) / testIds.length;
    const startAngle = angle - sliceWidth / 2;
    const endAngle = angle + sliceWidth / 2;
    
    ctx.arc(centerX, centerY, distance, startAngle, endAngle);
    ctx.closePath();
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw point at the completed test position
    ctx.beginPath();
    ctx.arc(
        centerX + Math.cos(angle) * distance,
        centerY + Math.sin(angle) * distance,
        6, 0, 2 * Math.PI
    );
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// UPDATE NEXT MISSION
function updateNextMission() {
    if (!currentUser.lastTestId) return;
    
    const recommendations = NEXT_TEST_RECOMMENDATIONS[currentUser.lastTestId];
    if (!recommendations || recommendations.length === 0) return;
    
    const nextTestId = recommendations[0];
    const testInfo = TEST_INFO[nextTestId];
    
    if (!testInfo) return;
    
    // Update next mission card
    const icon = document.getElementById('nextTestIcon');
    const title = document.getElementById('nextTestTitle');
    const teaser = document.getElementById('nextTestTeaser');
    const cta = document.getElementById('nextTestCta');
    
    if (icon) icon.textContent = testInfo.icon;
    if (title) title.textContent = testInfo.name;
    if (teaser) teaser.textContent = TEST_TEASERS[nextTestId] || testInfo.description;
    if (cta) cta.href = `test.html?id=${nextTestId}`;
}

// UPDATE TRAINING PLAN
function updateTrainingPlan() {
    const container = document.getElementById('trainingGrid');
    if (!container || !currentUser.lastTestId) return;
    
    const habits = TRAINING_HABITS[currentUser.lastTestId] || [];
    container.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const habitId = `${currentUser.lastTestId}_${index}`;
        const isCompleted = currentUser.trainingHabits[habitId] || false;
        
        const card = document.createElement('div');
        card.className = `training-card ${isCompleted ? 'training-card--completed' : ''}`;
        
        card.innerHTML = `
            <div class="training-card__header">
                <div class="training-card__checkbox ${isCompleted ? 'training-card__checkbox--checked' : ''}" 
                     data-habit="${habitId}"></div>
                <div class="training-card__content">
                    <h3 class="training-card__title">${habit.title}</h3>
                    <p class="training-card__description">${habit.description}</p>
                    <div class="training-card__meta">
                        <span class="training-card__time">⏱️ ${habit.time}</span>
                        <span class="training-card__tooltip" title="${habit.why}">❓ Why this matters</span>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// UPDATE STREAKS & ACHIEVEMENTS
function updateStreaksAchievements() {
    // Update streak counter
    const streakCounter = document.getElementById('streakCounter');
    if (streakCounter) {
        streakCounter.textContent = currentUser.streakDays;
    }
    
    // Show family profiles section if family plan
    updateFamilyProfiles();
}

function updateFamilyProfiles() {
    const familySection = document.getElementById('familyProfiles');
    if (familySection) {
        if (currentUser.plan === 'family') {
            familySection.style.display = 'block';
        } else {
            familySection.style.display = 'none';
        }
    }
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Training habit checkboxes
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('training-card__checkbox')) {
            toggleTrainingHabit(e.target);
        }
    });
    
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
}

function toggleTrainingHabit(checkbox) {
    const habitId = checkbox.dataset.habit;
    const isCurrentlyChecked = checkbox.classList.contains('training-card__checkbox--checked');
    
    // Toggle state
    if (isCurrentlyChecked) {
        checkbox.classList.remove('training-card__checkbox--checked');
        currentUser.trainingHabits[habitId] = false;
    } else {
        checkbox.classList.add('training-card__checkbox--checked');
        currentUser.trainingHabits[habitId] = true;
        
        // Increment streak if this is a new habit completion
        incrementStreak();
    }
    
    // Update parent card
    const card = checkbox.closest('.training-card');
    if (card) {
        card.classList.toggle('training-card--completed', !isCurrentlyChecked);
    }
    
    // Save to localStorage
    localStorage.setItem('selfmap_training_habits', JSON.stringify(currentUser.trainingHabits));
    
    // Add completion animation
    if (!isCurrentlyChecked) {
        addCompletionAnimation(checkbox);
    }
}

function incrementStreak() {
    const today = new Date().toDateString();
    const lastStreakDate = localStorage.getItem('selfmap_last_streak_date');
    
    if (lastStreakDate !== today) {
        currentUser.streakDays += 1;
        localStorage.setItem('selfmap_streak', currentUser.streakDays.toString());
        localStorage.setItem('selfmap_last_streak_date', today);
        
        // Update display
        const streakCounter = document.getElementById('streakCounter');
        if (streakCounter) {
            streakCounter.textContent = currentUser.streakDays;
            addStreakAnimation(streakCounter);
        }
    }
}

function addCompletionAnimation(element) {
    element.style.transform = 'scale(1.2)';
    element.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

function addStreakAnimation(element) {
    element.style.transform = 'scale(1.3)';
    element.style.color = '#10b981';
    element.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 500);
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('navbar__mobile-menu--active');
    }
}

// SETUP ANIMATIONS
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.stats-card, .mission-step, .training-card, .achievement-card, .dimension-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// UTILITY FUNCTIONS
function isDateToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

function formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.navbar__mobile-menu--active');
        if (mobileMenu) {
            mobileMenu.classList.remove('navbar__mobile-menu--active');
        }
    }
    
    // Space key toggles training habit checkboxes when focused
    if (e.key === ' ' && e.target.classList.contains('training-card__checkbox')) {
        e.preventDefault();
        toggleTrainingHabit(e.target);
    }
});

// ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('Dashboard error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// PERFORMANCE MONITORING
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`📊 Dashboard load time: ${loadTime}ms`);
    });
}

console.log('🎯 Dashboard JavaScript loaded successfully!');