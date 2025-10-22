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
        },{id: "projects-quantum-compiler",
          title: 'Quantum Compiler',
          description: "Architecting a Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Assembly/";
            },},{id: "projects-quantum-compiler",
          title: 'Quantum Compiler',
          description: "A Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Assembly2/";
            },},{id: "projects-badger-vision",
          title: 'Badger Vision',
          description: "Hack Midwest Winner and Best Enterprise Scale Business Solution",
          section: "Projects",handler: () => {
              window.location.href = "/projects/BadgerVision/";
            },},{id: "projects-roller-rl",
          title: 'Roller RL',
          description: "Reinforcement Learning for Quadruped Roller Skating.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Bot/";
            },},{id: "projects-roller-rl-2",
          title: 'Roller RL 2',
          description: "Reinforcement Learning for Quadruped Roller Skating.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Bot2/";
            },},{id: "projects-roller-rl-3",
          title: 'Roller RL 3',
          description: "Reinforcement Learning for Quadruped Roller Skating.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Bot3/";
            },},{id: "projects-roller-rl-4",
          title: 'Roller RL 4',
          description: "Reinforcement Learning for Quadruped Roller Skating.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Bot4/";
            },},{id: "projects-exosky",
          title: 'Exosky',
          description: "An Exoplanet Constellation Creator and Explorer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Exosky/";
            },},{id: "projects-llm-training",
          title: 'LLM Training',
          description: "Training and fine-tuning an LLM",
          section: "Projects",handler: () => {
              window.location.href = "/projects/LLMTraining/";
            },},{id: "projects-marl-procgen",
          title: 'MARL ProcGen',
          description: "Training defenders and an adversarial level generator simultaneously.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/MarlProcGen/";
            },},{id: "projects-quantum-circuit",
          title: 'Quantum Circuit',
          description: "Production-Ready Pattern Matching for Quantum Circuit Optimization.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/QuantumCircuit/";
            },},{id: "projects-sign-language-learner",
          title: 'Sign Language Learner',
          description: "Systematic Analysis of Transfer Learning for Sign Language Alphabet Recognition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/SignLanguageLearner/";
            },},{id: "projects-twg2",
          title: 'TWG2',
          description: "An exhaustive compilation of all project data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/TW2/";
            },},{id: "projects-twg",
          title: 'TWG',
          description: "Thunder Warrior: Genesis",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ThunderWarrior/";
            },},{id: "projects-vision-representations",
          title: 'Vision Representations',
          description: "Representation Fine-Tuning for Vision-Language Models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Vis/";
            },},{id: "projects-twg3",
          title: 'TWG3',
          description: "A consolidated report analyzing the codebase, game mechanics, and web portal.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/twg3/";
            },},{id: "projects-twg4",
          title: 'TWG4',
          description: "An exhaustive compilation of all project data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/twg4/";
            },},{id: "projects-vision-representations-2",
          title: 'Vision Representations 2',
          description: "Representation Fine-Tuning for Vision-Language Models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vis2/";
            },},{id: "projects-vision-representations-2",
          title: 'Vision Representations 2',
          description: "Representation Fine-Tuning for Vision-Language Models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vis3p/";
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
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://neuromorphic.cs.wisc.edu/people", "_blank");
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
