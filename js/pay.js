// SELFMAP PAYMENT PAGE - DYNAMIC FUNCTIONALITY

// PRICING CONSTANTS
const PRICING = {
    single: {
        monthly: 19.99,
        yearly: null
    },
    growth: {
        monthly: 17.99,
        yearly: 179.99  // 2 months free
    },
    family: {
        monthly: 29.99,
        yearly: 299.99  // 2 months free
    }
};

const VAT_RATE = 0.21; // 21% VAT for EU

// TEST INFORMATION
const TEST_INFO = {
    'adhd': {
        name: 'ADHD Assessment',
        icon: '🧠',
        description: 'Comprehensive attention and hyperactivity evaluation'
    },
    'eq': {
        name: 'Emotional Intelligence Test',
        icon: '❤️',
        description: 'Measure your emotional awareness and skills'
    },
    'iq': {
        name: 'IQ Test',
        icon: '🔍',
        description: 'Cognitive abilities and reasoning assessment'
    },
    'kids': {
        name: 'Kids Development Test',
        icon: '👶',
        description: 'Child development and learning assessment'
    },
    'motivation': {
        name: 'Motivation Assessment',
        icon: '⚡',
        description: 'Discover your drive and motivational patterns'
    },
    'personality': {
        name: 'Personality Test',
        icon: '🎭',
        description: 'Deep personality traits and characteristics'
    },
    'relationships': {
        name: 'Relationships Assessment',
        icon: '💕',
        description: 'Relationship patterns and communication styles'
    },
    'stress': {
        name: 'Stress Management Test',
        icon: '🧘',
        description: 'Stress levels and coping mechanisms evaluation'
    }
};

// GLOBAL STATE
let currentPlan = 'growth';
let currentBilling = 'monthly';
let currentStep = 1;
let appliedCoupon = null;
let orderData = {};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    updatePricing();
    updateOrderSummary();
});

// INITIALIZE PAGE WITH DYNAMIC CONTENT
function initializePage() {
    // Get test ID from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('test') || localStorage.getItem('currentTest') || 'personality';
    
    // Update test-specific content
    updateTestContent(testId);
    
    // Set default selected plan
    selectPlan('growth');
    
    // Initialize checkout steps
    showStep(1);
    
    // Setup mobile detection
    checkMobileView();
}

// UPDATE TEST-SPECIFIC CONTENT
function updateTestContent(testId) {
    const testInfo = TEST_INFO[testId] || TEST_INFO['personality'];
    
    // Update test name placeholders
    const testNameElements = document.querySelectorAll('.test-name-placeholder');
    testNameElements.forEach(el => {
        el.textContent = testInfo.name;
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-unlock__headline');
    if (heroTitle) {
        heroTitle.innerHTML = `Unlock Your Complete<br><span class="gradient-text">${testInfo.name}</span> Results`;
    }
    
    const heroSubtitle = document.querySelector('.hero-unlock__subheadline');
    if (heroSubtitle) {
        heroSubtitle.textContent = `Get your personalized ${testInfo.name.toLowerCase()} report with actionable insights, detailed analysis, and growth recommendations.`;
    }
    
    // Update unlock preview items
    updateUnlockPreview(testId);
    
    // Store current test
    localStorage.setItem('currentTest', testId);
}

// UPDATE UNLOCK PREVIEW BASED ON TEST TYPE
function updateUnlockPreview(testId) {
    const unlockGrid = document.querySelector('.unlock-grid');
    if (!unlockGrid) return;
    
    const previewItems = {
        'personality': [
            { icon: '📊', text: 'Detailed personality breakdown across 5 major dimensions' },
            { icon: '💡', text: 'Personalized growth recommendations and action steps' },
            { icon: '🎯', text: 'Career compatibility and relationship insights' },
            { icon: '📈', text: 'Strengths analysis and development opportunities' }
        ],
        'iq': [
            { icon: '🧩', text: 'Complete cognitive abilities assessment and breakdown' },
            { icon: '📊', text: 'Detailed analysis of logical, spatial, and verbal reasoning' },
            { icon: '🎓', text: 'Learning style recommendations and study strategies' },
            { icon: '💼', text: 'Career paths that match your cognitive strengths' }
        ],
        'eq': [
            { icon: '❤️', text: 'Emotional intelligence score and detailed breakdown' },
            { icon: '🗣️', text: 'Communication patterns and relationship insights' },
            { icon: '🧘', text: 'Emotional regulation strategies and techniques' },
            { icon: '👥', text: 'Leadership potential and social skills analysis' }
        ],
        'adhd': [
            { icon: '🧠', text: 'Comprehensive ADHD traits assessment and analysis' },
            { icon: '⚡', text: 'Attention patterns and focus optimization strategies' },
            { icon: '🎯', text: 'Personalized productivity and organization tips' },
            { icon: '💪', text: 'Strengths identification and leveraging techniques' }
        ],
        'stress': [
            { icon: '📈', text: 'Complete stress levels analysis and patterns' },
            { icon: '🧘', text: 'Personalized stress management and coping strategies' },
            { icon: '⚖️', text: 'Work-life balance recommendations and techniques' },
            { icon: '🌱', text: 'Resilience building and wellness action plan' }
        ],
        'motivation': [
            { icon: '⚡', text: 'Deep motivation drivers and energy source analysis' },
            { icon: '🎯', text: 'Goal-setting strategies aligned with your motivation style' },
            { icon: '🚀', text: 'Productivity optimization and peak performance tips' },
            { icon: '🔥', text: 'Maintaining long-term motivation and avoiding burnout' }
        ],
        'relationships': [
            { icon: '💕', text: 'Relationship patterns and attachment style analysis' },
            { icon: '💬', text: 'Communication preferences and conflict resolution style' },
            { icon: '🤝', text: 'Compatibility insights and partner matching guidance' },
            { icon: '💡', text: 'Relationship improvement strategies and action steps' }
        ],
        'kids': [
            { icon: '👶', text: 'Comprehensive child development assessment report' },
            { icon: '🎨', text: 'Learning style identification and educational recommendations' },
            { icon: '🌟', text: 'Strengths and talents recognition with nurturing tips' },
            { icon: '📚', text: 'Personalized parenting strategies and activity suggestions' }
        ]
    };
    
    const items = previewItems[testId] || previewItems['personality'];
    
    unlockGrid.innerHTML = items.map(item => `
        <div class="unlock-item">
            <div class="unlock-item__icon">${item.icon}</div>
            <div class="unlock-item__content">
                <p class="unlock-item__text">${item.text}</p>
            </div>
        </div>
    `).join('');
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Billing toggle
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', handleBillingToggle);
    }
    
    // Plan selection
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            const planType = card.dataset.plan;
            if (planType) {
                selectPlan(planType);
            }
        });
    });
    
    // Plan CTA buttons
    const planButtons = document.querySelectorAll('.plan-card__cta');
    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const planType = button.closest('.plan-card').dataset.plan;
            if (planType) {
                selectPlan(planType);
                scrollToCheckout();
            }
        });
    });
    
    // Checkout navigation
    const nextButton = document.querySelector('.checkout__next');
    if (nextButton) {
        nextButton.addEventListener('click', nextStep);
    }
    
    const completeButton = document.querySelector('.checkout__complete');
    if (completeButton) {
        completeButton.addEventListener('click', completePayment);
    }
    
    // Mobile CTA
    const mobileCTA = document.querySelector('.mobile-cta-button');
    if (mobileCTA) {
        mobileCTA.addEventListener('click', scrollToCheckout);
    }
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
    
    // Coupon application
    const couponApply = document.querySelector('.coupon-apply');
    if (couponApply) {
        couponApply.addEventListener('click', applyCoupon);
    }
    
    // SSO buttons
    const ssoButtons = document.querySelectorAll('.sso-button');
    ssoButtons.forEach(button => {
        button.addEventListener('click', handleSSO);
    });
    
    // Form validation
    const checkoutForm = document.querySelector('.checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('input', validateForm);
    }
}

// BILLING TOGGLE HANDLER
function handleBillingToggle(e) {
    currentBilling = e.target.checked ? 'yearly' : 'monthly';
    updatePricing();
    updateOrderSummary();
    
    // Animate price changes
    const priceElements = document.querySelectorAll('.plan-card__amount');
    priceElements.forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    });
}

// UPDATE PRICING DISPLAY
function updatePricing() {
    Object.keys(PRICING).forEach(planType => {
        const card = document.querySelector(`[data-plan="${planType}"]`);
        if (!card) return;
        
        const priceAmount = card.querySelector('.plan-card__amount');
        const pricePeriod = card.querySelector('.plan-card__period');
        const ctaButton = card.querySelector('.plan-card__cta');
        
        if (planType === 'single') {
            // Single purchase - only monthly option
            priceAmount.textContent = PRICING[planType].monthly.toFixed(0);
            pricePeriod.textContent = 'one-time';
            ctaButton.textContent = 'Get Instant Access';
        } else {
            const price = PRICING[planType][currentBilling];
            if (price) {
                priceAmount.textContent = price.toFixed(0);
                pricePeriod.textContent = currentBilling === 'yearly' ? '/year' : '/month';
                
                const savings = currentBilling === 'yearly' ? '2 months free!' : '';
                const upgradeHint = card.querySelector('.plan-card__upgrade-hint');
                if (upgradeHint) {
                    upgradeHint.textContent = savings;
                }
            }
            
            ctaButton.textContent = currentBilling === 'yearly' ? 
                'Start Annual Plan' : 'Start Monthly Plan';
        }
    });
    
    // Update billing toggle labels
    const monthlyLabel = document.querySelector('[data-billing="monthly"]');
    const yearlyLabel = document.querySelector('[data-billing="yearly"]');
    
    if (monthlyLabel) {
        monthlyLabel.classList.toggle('billing-toggle__label--active', currentBilling === 'monthly');
    }
    if (yearlyLabel) {
        yearlyLabel.classList.toggle('billing-toggle__label--active', currentBilling === 'yearly');
    }
}

// PLAN SELECTION
function selectPlan(planType) {
    currentPlan = planType;
    
    // Update visual selection
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.classList.remove('plan-card--selected');
        if (card.dataset.plan === planType) {
            card.classList.add('plan-card--selected');
        }
    });
    
    // Update order summary
    updateOrderSummary();
    
    // For single plan, force monthly billing
    if (planType === 'single') {
        currentBilling = 'monthly';
        const billingToggle = document.getElementById('billing-toggle');
        if (billingToggle) {
            billingToggle.checked = false;
        }
        updatePricing();
    }
}

// UPDATE ORDER SUMMARY
function updateOrderSummary() {
    const planName = document.querySelector('.order-plan-name');
    const planPrice = document.querySelector('.order-plan-price');
    const discountRow = document.querySelector('.order-discount');
    const vatAmount = document.querySelector('.order-vat-amount');
    const totalAmount = document.querySelector('.order-total-amount');
    
    if (!planName || !planPrice || !totalAmount) return;
    
    // Get current plan info
    const planInfo = {
        single: 'SelfMap Single Report',
        growth: 'SelfMap Growth Pass',
        family: 'SelfMap Family Plan'
    };
    
    const basePrice = PRICING[currentPlan][currentBilling] || PRICING[currentPlan].monthly;
    let finalPrice = basePrice;
    
    // Apply coupon discount
    if (appliedCoupon) {
        const discount = appliedCoupon.type === 'percentage' ? 
            basePrice * (appliedCoupon.value / 100) :
            appliedCoupon.value;
        finalPrice = Math.max(0, basePrice - discount);
        
        if (discountRow) {
            discountRow.style.display = 'flex';
            discountRow.querySelector('.order-discount-amount').textContent = 
                `-€${discount.toFixed(2)}`;
        }
    } else if (discountRow) {
        discountRow.style.display = 'none';
    }
    
    const vat = finalPrice * VAT_RATE;
    const total = finalPrice + vat;
    
    // Update display
    planName.textContent = planInfo[currentPlan];
    planPrice.textContent = `€${basePrice.toFixed(2)}`;
    
    if (vatAmount) {
        vatAmount.textContent = `€${vat.toFixed(2)}`;
    }
    
    totalAmount.textContent = `€${total.toFixed(2)}`;
    
    // Store order data
    orderData = {
        plan: currentPlan,
        billing: currentBilling,
        basePrice: basePrice,
        discount: appliedCoupon ? basePrice - finalPrice : 0,
        vat: vat,
        total: total,
        coupon: appliedCoupon
    };
}

// CHECKOUT STEPS
function showStep(stepNumber) {
    currentStep = stepNumber;
    
    // Hide all steps
    const steps = document.querySelectorAll('.checkout__step');
    steps.forEach(step => {
        step.classList.remove('checkout__step--active');
    });
    
    // Show current step
    const activeStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (activeStep) {
        activeStep.classList.add('checkout__step--active');
    }
    
    // Update step indicators (if you add them later)
    updateStepIndicators(stepNumber);
}

function nextStep() {
    if (currentStep === 1) {
        if (validateStep1()) {
            showStep(2);
        }
    }
}

function validateStep1() {
    const email = document.getElementById('email')?.value;
    const firstName = document.getElementById('first-name')?.value;
    const lastName = document.getElementById('last-name')?.value;
    const country = document.getElementById('country')?.value;
    const terms = document.getElementById('terms-checkbox')?.checked;
    
    if (!email || !firstName || !lastName || !country || !terms) {
        alert('Please fill in all required fields and accept the terms.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

function validateStep2() {
    const cardNumber = document.getElementById('card-number')?.value;
    const expiryDate = document.getElementById('expiry-date')?.value;
    const cvv = document.getElementById('cvv')?.value;
    const cardName = document.getElementById('card-name')?.value;
    
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
        alert('Please fill in all payment details.');
        return false;
    }
    
    // Basic card validation (you'd want more robust validation in production)
    if (cardNumber.replace(/\s/g, '').length < 13) {
        alert('Please enter a valid card number.');
        return false;
    }
    
    return true;
}

// COMPLETE PAYMENT
async function completePayment() {
    if (!validateStep2()) {
        return;
    }
    
    const button = document.querySelector('.checkout__complete');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.disabled = true;
    button.innerHTML = '<span>Processing...</span><div class="spinner"></div>';
    
    try {
        // Simulate payment processing
        await simulatePayment();
        
        // Success - redirect to results
        showPaymentSuccess();
        
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
        
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

async function simulatePayment() {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 95% success rate for demo
            if (Math.random() > 0.05) {
                resolve();
            } else {
                reject(new Error('Payment processing failed'));
            }
        }, 2000);
    });
}

function showPaymentSuccess() {
    // Store completion data
    const completionData = {
        ...orderData,
        timestamp: Date.now(),
        testId: localStorage.getItem('currentTest')
    };
    
    localStorage.setItem('paymentCompleted', JSON.stringify(completionData));
    localStorage.setItem('selfmap_plan', currentPlan);
    
    // Redirect to dashboard page
    window.location.href = `dashboard.html?test=${localStorage.getItem('currentTest')}&plan=${currentPlan}`;
}

// COUPON APPLICATION
function applyCoupon() {
    const couponInput = document.getElementById('coupon-code');
    const couponCode = couponInput?.value?.trim().toUpperCase();
    
    if (!couponCode) return;
    
    // Mock coupon validation
    const validCoupons = {
        'WELCOME10': { type: 'percentage', value: 10, description: '10% off' },
        'SAVE5': { type: 'fixed', value: 5, description: '€5 off' },
        'NEWUSER': { type: 'percentage', value: 15, description: '15% off' },
        'FAMILY20': { type: 'percentage', value: 20, description: '20% off' }
    };
    
    if (validCoupons[couponCode]) {
        appliedCoupon = {
            code: couponCode,
            ...validCoupons[couponCode]
        };
        
        updateOrderSummary();
        
        // Show success message
        const couponApply = document.querySelector('.coupon-apply');
        if (couponApply) {
            couponApply.textContent = 'Applied!';
            couponApply.style.background = '#10b981';
            setTimeout(() => {
                couponApply.textContent = 'Apply';
                couponApply.style.background = '';
            }, 2000);
        }
        
        couponInput.value = '';
    } else {
        alert('Invalid coupon code. Please try again.');
    }
}

// SSO HANDLERS
function handleSSO(e) {
    const provider = e.currentTarget.dataset.provider;
    
    // Mock SSO - in real implementation, redirect to OAuth provider
    alert(`SSO login with ${provider} would redirect to authentication provider.`);
    
    // For demo, simulate successful login
    setTimeout(() => {
        // Pre-fill user info
        document.getElementById('email').value = 'user@example.com';
        document.getElementById('first-name').value = 'John';
        document.getElementById('last-name').value = 'Doe';
        document.getElementById('country').value = 'Netherlands';
        
        // Move to payment step
        showStep(2);
    }, 1000);
}

// FAQ ACCORDION
function toggleFAQ(e) {
    const faqItem = e.currentTarget.closest('.faq-item');
    const isOpen = faqItem.classList.contains('faq-item--open');
    
    // Close all FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        item.classList.remove('faq-item--open');
    });
    
    // Open clicked item if it wasn't already open
    if (!isOpen) {
        faqItem.classList.add('faq-item--open');
    }
}

// UTILITY FUNCTIONS
function scrollToCheckout() {
    const checkoutSection = document.querySelector('.checkout');
    if (checkoutSection) {
        checkoutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function updateStepIndicators(currentStep) {
    // This function can be expanded if you add visual step indicators
    console.log(`Current step: ${currentStep}`);
}

function validateForm(e) {
    // Real-time form validation feedback
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('form-input--valid', 'form-input--invalid');
    
    // Validate based on field type
    let isValid = false;
    
    switch (field.type) {
        case 'email':
            isValid = isValidEmail(value);
            break;
        case 'text':
            isValid = value.length >= 2;
            break;
        case 'select-one':
            isValid = value !== '';
            break;
        default:
            isValid = value.length > 0;
    }
    
    // Apply validation class
    if (value.length > 0) {
        field.classList.add(isValid ? 'form-input--valid' : 'form-input--invalid');
    }
}

function checkMobileView() {
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth < mobileBreakpoint;
    
    // Toggle mobile CTA dock visibility
    const mobileCTADock = document.querySelector('.mobile-cta-dock');
    if (mobileCTADock) {
        mobileCTADock.style.display = isMobile ? 'block' : 'none';
    }
}

// RESPONSIVE HANDLERS
window.addEventListener('resize', checkMobileView);

// SMOOTH SCROLLING FOR NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ANIMATION ON SCROLL (OPTIONAL)
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
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.value-item, .plan-card, .unlock-item, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    // Escape key closes FAQ items
    if (e.key === 'Escape') {
        const openFaqItems = document.querySelectorAll('.faq-item--open');
        openFaqItems.forEach(item => {
            item.classList.remove('faq-item--open');
        });
    }
    
    // Enter key on plan cards selects them
    if (e.key === 'Enter' && e.target.classList.contains('plan-card')) {
        const planType = e.target.dataset.plan;
        if (planType) {
            selectPlan(planType);
        }
    }
});

// FORM AUTO-FORMATTING
document.addEventListener('input', (e) => {
    const field = e.target;
    
    // Auto-format card number
    if (field.id === 'card-number') {
        let value = field.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        field.value = formattedValue;
    }
    
    // Auto-format expiry date
    if (field.id === 'expiry-date') {
        let value = field.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        field.value = value;
    }
    
    // CVV formatting
    if (field.id === 'cvv') {
        field.value = field.value.replace(/\D/g, '').substring(0, 4);
    }
});

// ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// PERFORMANCE MONITORING
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}