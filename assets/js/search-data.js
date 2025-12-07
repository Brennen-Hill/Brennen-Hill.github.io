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
        },{id: "nav-presentations",
          title: "presentations",
          description: "A collection of my posters, talks, and conference presentations.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/presentations/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "presentations-co-evolving-complexity-an-adversarial-framework-for-automatic-marl-curricula",
          title: 'Co-Evolving Complexity: An Adversarial Framework for Automatic MARL Curricula',
          description: "Presented at the NeuriPS Workshop on Scaling Environments for Agents",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/Co-Evolving-Complexity/";
            },},{id: "presentations-cognitive-architecture",
          title: 'Cognitive Architecture',
          description: "Presented at the NeurIPS Workshop on Interpreting Cognition in Deep Learning Models",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/Cognitive-Architecture/";
            },},{id: "presentations-communicating-plans-not-percepts",
          title: 'Communicating Plans, Not Percepts',
          description: "Presented at the NeurIPS Workshop on Embodied World Models",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/Communicating-Plans-Not-Percepts/";
            },},{id: "presentations-from-emergence-to-intention",
          title: 'From Emergence to Intention',
          description: "Presented at the NeurIPS Workshop on Optimization for Machine Learning",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/From-Emergence-to-Intention/";
            },},{id: "presentations-the-geometry-of-cortical-computation-manifold-disentanglement-and-predictive-dynamics-in-vcnet",
          title: 'The Geometry of Cortical Computation: Manifold Disentanglement and Predictive Dynamics in VCNet',
          description: "Presented at the NeurIPS Workshop on Symmetry and Geometry in Neural Representations",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/Geometry-of-Cortical-Computation/";
            },},{id: "presentations-the-physical-basis-of-prediction",
          title: 'The Physical Basis of Prediction',
          description: "Presented at the NeurIPS Workshop on Embodied World Models",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/Physical-Basis-of-Prediction/";
            },},{id: "presentations-the-physical-basis-of-prediction",
          title: 'The Physical Basis of Prediction',
          description: "Presented at the NeurIPS Workshop on Scaling Environments for Agents",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/Scaling-The-Physical-Basis-of-Prediction/";
            },},{id: "presentations-generative-world-models-of-tasks",
          title: 'Generative World Models of Tasks',
          description: "Presented at the NeurIPS Workshop on Embodied World Models",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/World-Models-of-Tasks/";
            },},{id: "projects-badger-vision",
          title: 'Badger Vision',
          description: "Hack Midwest Winner and Best Enterprise Scale Business Solution",
          section: "Projects",handler: () => {
              window.location.href = "/projects/badger-vision/";
            },},{id: "projects-embodied-ai",
          title: 'Embodied AI',
          description: "Robust Robotic State Estimation via Manifold Disentanglement for Embodied AI on the Edge.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/embodied-ai/";
            },},{id: "projects-exosky",
          title: 'ExoSky',
          description: "Global Honorable Mention for an Exoplanet Constellation Creator &amp; Explorer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/exosky/";
            },},{id: "projects-llm-training",
          title: 'LLM Training',
          description: "Training and fine-tuning an LLM for reasoning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/llm-training/";
            },},{id: "projects-quantum-circuit",
          title: 'Quantum Circuit',
          description: "Production-Ready Pattern Matching for Quantum Circuit Optimization.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/quantum-circuit/";
            },},{id: "projects-quantum-compiler",
          title: 'Quantum Compiler',
          description: "Architecting a Multi-Pass Compiler for High-Performance Quantum Control on the QICK tProcessor",
          section: "Projects",handler: () => {
              window.location.href = "/projects/quantum-compiler/";
            },},{id: "projects-rl-skating",
          title: 'RL Skating',
          description: "Reinforcement Learning for Quadruped Roller Skating.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/rl-skating/";
            },},{id: "projects-robotics-platform",
          title: 'Robotics Platform',
          description: "3D Robotic Simulation &amp; Analysis Platform",
          section: "Projects",handler: () => {
              window.location.href = "/projects/robotics-platform/";
            },},{id: "projects-sign-language-learner",
          title: 'Sign Language Learner',
          description: "Systematic Analysis of Transfer Learning for Sign Language Recognition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/sign-language-learner/";
            },},{id: "projects-research-amp-developement-in-embodied-ai-and-robotics",
          title: 'Research &amp;amp; Developement in Embodied AI and Robotics',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/stealth-startup/";
            },},{id: "projects-thunder-warrior",
          title: 'Thunder Warrior',
          description: "The game mechanics, web portal, and systems of a massive multiplayer game.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/thunder-warrior/";
            },},{id: "projects-vision-language-representations",
          title: 'Vision-Language Representations',
          description: "Representation Fine-Tuning for Vision-Language Models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vision-representations/";
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
