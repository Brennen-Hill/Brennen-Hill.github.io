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
        },{id: "projects-embodied-ai",
          title: 'Embodied AI',
          description: "Robust Robotic State Estimation via Manifold Disentanglement for Embodied AI on the Edge.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Embodied-AI/";
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
              window.location.href = "/projects/Quantum-Compiler/";
            },},{id: "projects-rl-skating",
          title: 'RL Skating',
          description: "Reinforcement Learning for Quadruped Roller Skating.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/RL-Skating/";
            },},{id: "projects-robotics-platform",
          title: 'Robotics Platform',
          description: "3D Robotic Simulation &amp; Analysis Platform",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Robotics-Platform/";
            },},{id: "projects-sign-language-learner",
          title: 'Sign Language Learner',
          description: "Systematic Analysis of Transfer Learning for Sign Language Recognition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Sign-Language-Learner/";
            },},{id: "projects-research-amp-developement-in-embodied-ai-and-robotics",
          title: 'Research &amp;amp; Developement in Embodied AI and Robotics',
          description: "Stealth-Mode Startup",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Stealth-Startup/";
            },},{id: "projects-thunder-warrior",
          title: 'Thunder Warrior',
          description: "The game mechanics, web portal, and systems of a massive multiplayer game.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Thunder-Warrior/";
            },},{id: "projects-vision-language-representations",
          title: 'Vision-Language Representations',
          description: "Representation Fine-Tuning for Vision-Language Models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Vision-Representations/";
            },},{id: "projects-badger-vision",
          title: 'Badger Vision',
          description: "Hack Midwest Winner and Best Enterprise Scale Business Solution",
          section: "Projects",handler: () => {
              window.location.href = "/projects/badger-vision/";
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
