# Ch. Monesh Archan — Developer Portfolio

A modern, high-performance personal developer portfolio engineered with a sleek, dark futuristic aesthetic. Built with vanilla HTML5, CSS3, and JavaScript, prioritizing visual excellence, accessibility, responsiveness, and clean code structure.

---

## 🌟 Highlights & Features

- **Dark Futuristic Aesthetic**: Carefully crafted dark palette (`#030712`, `#080f1d`) complemented by radiant cyan (`#00e5ff`) and warm gold (`#ffd166`) accents.
- **Dynamic Particle Canvas**: High-performance HTML5 canvas animation with particle connections and pulsing ambient glow orbs. Automatically scales particle counts for mobile performance and respects `prefers-reduced-motion`.
- **Responsive Architecture**: Fluid grid and flex layouts thoroughly styled for screens from 320px mobile devices to 4K displays.
- **Accessible & Semantic**: Semantic HTML5 landmark structure (`header`, `nav`, `main`, `section`, `article`, `footer`), keyboard focus rings, ARIA accessibility attributes, and skip-to-content links.
- **No Arbitrary Percentage Bars**: Categorized, honest skill groups (Programming, AI/ML, Software Development, IoT/Embedded, Tools, Languages).
- **Interactive Capabilities**:
  - Category filtering for engineering projects (All, AI & NLP, IoT & Embedded).
  - One-click email copying with toast notification feedback.
  - Interactive contact form with client-side validation and mailto routing.
  - Active section scrollspy highlighting in header navigation.
  - Mobile drawer navigation with smooth hamburger icon morphing.

---

## 📂 Project Structure

```
prot/
├── index.html                   # Primary entry point
├── Monesh_Archan_Portfolio.html # Standalone mirror file for local offline viewing
├── css/
│   └── style.css                # Modular design system, variables, components & responsive queries
├── js/
│   └── script.js                # Canvas engine, navigation, filters, copy toast & contact handling
├── assets/
│   ├── profile.webp             # High-resolution optimized profile portrait
│   ├── resume.pdf               # [TODO] Add your resume PDF here to activate download button
│   └── projects/                # Directory for future project screenshots and diagrams
├── Monesh_Archan_Portfolio.backup.html # Untouched backup of the original single-file portfolio
└── README.md                    # Documentation & customization guide
```

---

## 🚀 How to Run Locally

Because this project is built using native web technologies (HTML, CSS, JavaScript), no heavy build steps, package managers, or compilers are required.

### Method 1: Using Python (Recommended)
Open your terminal in this directory and run:
```bash
python -m http.server 3000
```
Then navigate to: `http://localhost:3000`

### Method 2: Using Node.js
If you have Node.js installed:
```bash
npx serve . -p 3000
```
Then navigate to: `http://localhost:3000`

### Method 3: Direct File Opening
Double-click `index.html` or `Monesh_Archan_Portfolio.html` directly in your file explorer to view it in any modern browser (Chrome, Edge, Firefox, Safari).

---

## ✏️ How to Customize Your Personal Information

All placeholders are marked with `TODO` comments in the codebase. Here is how to update them:

### 1. Add Your GitHub Profile Link
In `index.html` (and `Monesh_Archan_Portfolio.html`), locate the GitHub contact card (around line 430):
```html
<!-- TODO: Replace YOUR_GITHUB_URL with your actual GitHub profile link -->
<a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
  github.com/your-username
</a>
```

### 2. Add Your LinkedIn Profile Link
In `index.html`, locate the LinkedIn contact card (around line 443):
```html
<!-- TODO: Replace YOUR_LINKEDIN_URL with your actual LinkedIn profile link -->
<a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
  linkedin.com/in/your-username
</a>
```

### 3. Add Your Resume PDF
1. Place your resume PDF in the `assets/` folder and name it `resume.pdf`.
2. In `index.html` (around line 454), update the button to:
```html
<a href="assets/resume.pdf" download="Monesh_Archan_Resume.pdf" class="btn btn-ghost btn-sm">
  Download Resume (PDF)
</a>
```

### 4. Link Project Source Repositories & Demos
In the `<section id="projects">` block:
- Replace the disabled placeholder buttons with your actual GitHub repository links:
```html
<a href="https://github.com/your-username/ai-resume-analyzer" target="_blank" class="btn btn-ghost btn-sm">
  GitHub Repo
</a>
```

---

## 🌐 Free Deployment Instructions

### Deploy to GitHub Pages (Fastest)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete developer portfolio redesign"
   ```
2. Create a new GitHub repository named `portfolio` (or `<your-username>.github.io`).
3. Link your remote repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** > **Pages** > Select `Branch: main` and `/ (root)` > Click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io/portfolio/`!

### Deploy to Vercel or Netlify
- Drag and drop this folder directly into [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com). It will deploy instantaneously without any configuration.

---

## 📈 Recommended Next Steps

- [ ] Add your actual GitHub and LinkedIn URLs to `index.html`.
- [ ] Export your latest resume to `assets/resume.pdf`.
- [ ] Create public GitHub repositories for `AI Resume Analyzer`, `AEROMED-AI`, and `Smart Blind Stick – IoT` with descriptive `README.md` files.
- [ ] Add screenshots or hardware photos to `assets/projects/` as you document your builds.
- [ ] Share your live URL on LinkedIn and your GitHub profile bio!
