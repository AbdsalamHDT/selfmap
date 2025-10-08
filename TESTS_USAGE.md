# SelfMap Growth Hub - Tests System Usage Guide

## Quick Start

### Starting Tests
1. Open `tests.html` - Interactive test selection interface
2. Click any test in the constellation or timeline view
3. You'll be automatically taken to the test runner

### Direct Test Access
You can also go directly to any test using: `test.html?id=TEST_ID`

**Available Test IDs:**
- `iq` - Intelligence (IQ & Cognitive) - 14 questions, ~8 min
- `eq` - Emotional Intelligence - 12 questions, ~6 min  
- `adhd` - ADHD & Attention Profile - 12 questions, ~5 min
- `stress` - Stress & Burnout Risk - 10 questions, ~4 min
- `attach` - Attachment Style - 12 questions, ~6 min
- `motivation` - Motivation & Growth - 10 questions, ~5 min
- `personality` - Big Five Personality - 20 questions, ~7 min
- `kids` - Kids Zone (Learning & Creativity) - 12 questions, ~4 min

## Running Locally
**Important**: These files must be served through a web server, not opened directly in the browser.

### Method 1: Node.js http-server
```bash
cd "C:\Users\abdo\Downloads\SelfMap - Design"
npx http-server -p 8000
```
Then visit: `http://localhost:8000/tests.html`

### Method 2: Python server
```bash
cd "C:\Users\abdo\Downloads\SelfMap - Design"  
python -m http.server 8000
```
Then visit: `http://localhost:8000/tests.html`

## Key Features
- ✅ **Complete Test System**: 8 professional psychological assessments
- ✅ **Interactive UI**: Constellation-style test selection with smooth transitions
- ✅ **Universal Runner**: Handles all question types (Likert, multiple choice, etc.)
- ✅ **Auto-save**: Progress automatically saved to localStorage
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Accessibility**: Full keyboard navigation and screen reader support
- ✅ **Visual Consistency**: Matches homepage design exactly

## Troubleshooting
**Q: I see only a preloader when visiting test.html**  
A: You need to include a test ID parameter: `test.html?id=eq`

**Q: Clicking tests in the library doesn't navigate to the runner**  
A: Make sure you're running through a web server (see "Running Locally" above)

**Q: Tests don't save my progress**  
A: Progress is saved to localStorage automatically. Make sure you're not in private/incognito mode.