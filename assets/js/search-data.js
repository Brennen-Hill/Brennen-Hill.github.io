// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-badger-vision",
          title: 'Badger Vision',
          description: "Hack Midwest Winner and Best Enterprise Scale Business Solution",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Badger-Vision/";
            },},{id: "projects-exosky",
          title: 'Exosky',
          description: "An Exoplanet Constellation Creator and Explorer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Exosky/";
            },},{id: "projects-llm-training",
          title: 'LLM Training',
          description: "Training and fine-tuning an LLM for reasoning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/LLM-Training/";
            },},{id: "projects-quantum-circuit",
          title: 'Quantum Circuit',
          description: "Production-Ready Pattern Matching for Quantum Circuit Optimization.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Quantum-Circuit/";
            },},{id: "projects-quantum-compiler",
          title: 'Quantum Compiler',
          description: "Architecting a Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Quantum_Compiler/";
            },},{id: "projects-sign-language-learner",
          title: 'Sign Language Learner',
          description: "Systematic Analysis of Transfer Learning for Sign Language Recognition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Sign-Language-Learner/";
            },},{id: "projects-vision-representations",
          title: 'Vision Representations',
          description: "Representation Fine-Tuning for Vision-Language Models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Vision-Representations/";
            },},{id: "projects-twg3",
          title: 'TWG3',
          description: "A consolidated report analyzing the codebase, game mechanics, and web portal.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/twg-3-ai-comitee/";
            },},{id: "projects-twg3",
          title: 'TWG3',
          description: "A consolidated report analyzing the codebase, game mechanics, and web portal.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/twg-3-engineer/";
            },},{id: "projects-twg3",
          title: 'TWG3',
          description: "A consolidated report analyzing the codebase, game mechanics, and web portal.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/twg3/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%62%61%68%69%6C%6C%34@%77%69%73%63.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Brennen-Hill", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/Brennen-A-Hill", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=E7N2fXkAAAAJ", "_blank");
        },
      },{
        id: 'social-lab_url',
        title: 'Lab_url',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
