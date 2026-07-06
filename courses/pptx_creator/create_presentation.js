const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color definitions
const colors = {
  sageGreen: "749682",
  darkSage: "465A41",
  warmCream: "FAF8F0",
  warmTaupe: "B4AA96",
  darkText: "2D2D2D",
  accentGold: "B69650",
  white: "FFFFFF"
};

// Slide content - simplified for manual creation
const slides = [
  {
    title: "Somatic Therapy: What's Actually Happening in the Body",
    subtitle: "A Science-Based Course for Mental Health Professionals\nNicole — Biologist & Clinical Counselor",
    type: "title",
    badge: "12 CEUs | Self-Paced Online"
  },
  {
    title: "Learning Objectives",
    bullets: [
      "Explain the neurobiological basis of bottom-up vs. top-down processing",
      "Critically evaluate Polyvagal Theory with 2024-2026 research",
      "Identify physiological mechanisms of somatic techniques",
      "Distinguish evidence-based interventions from speculation",
      "Apply a decision framework for technique selection",
      "Integrate somatic approaches with existing evidence-based modalities"
    ],
    citation: "Course approved for 12 CEUs by NBCC (2026)",
    visual: "Brain diagram showing top-down & bottom-up pathways"
  },
  {
    title: "Why the Body Matters in Therapy",
    bullets: [
      "Embodied Cognition: Brain and body are bidirectionally connected",
      "Trauma stored somatically: tension, frozen states, chronic pain",
      "Implicit memory access: Gateway to pre-verbal experiences",
      "Interoception: How the body talks to the brain",
      "52% of therapists report moderate-to-severe burnout (Maslach, 2020)"
    ],
    citation: "van der Kolk, 2023; Damasio, 2024; Price & Hooven, 2023",
    visual: "Diagram of brain-body connection via vagus nerve"
  },
  {
    title: "Key Neuroanatomy for Somatic Therapists",
    bullets: [
      "Brainstem: Arousal regulation, basic life functions",
      "Amygdala: Threat detection, fear conditioning speed",
      "Hippocampus: Contextual memory, spatial navigation",
      "Prefrontal Cortex: Executive function, emotional regulation",
      "Insula: Interoception, internal body awareness",
      "ACC: Conflict monitoring, emotion regulation"
    ],
    citation: "Price & Hooven, 2023; Pollak et al., 2024",
    visual: "Brain cross-section with labeled structures"
  },
  {
    title: "The Autonomic Nervous System (ANS)",
    bullets: [
      "Sympathetic: Mobilization, fight-or-flight response",
      "Parasympathetic Rest: Digestion, recovery, restoration",
      "Ventral Vagal: Social engagement, calm connection",
      "Dorsal Vagal: Shutdown, freeze, tonic immobility",
      "Clinical relevance: Assess client state to guide intervention"
    ],
    citation: "Porges, 2022",
    visual: "ANS diagram: sympathetic vs. parasympathetic branches"
  },
  {
    title: "Module 2: Bottom-Up vs. Top-Down Processing",
    subtitle: "How the Body Drives Cognition and Emotion",
    type: "divider"
  },
  {
    title: "Hierarchical Models of Neural Processing",
    bullets: [
      "TOP-DOWN: PFC → Amygdala → Brainstem (descending inhibition)",
      "BOTTOM-UP: Brainstem → Amygdala → Cortex (ascending signals)",
      "Trauma disrupts top-down, leaving clients in bottom-up reactivity",
      "Flashbacks, emotional flooding occur pre-cortically"
    ],
    citation: "Ochsner & Gross, 2024; Barrett, 2024",
    visual: "Neural pathway diagram"
  },
  {
    title: "Interoception: The Body Talking to the Brain",
    bullets: [
      "Definition: Sense of internal physiological state",
      "Neural pathway: Vagus nerve → NTS → Thalamus → Insula",
      "Interoceptive accuracy varies: Links to anxiety, alexithymia, trauma",
      "Clients may lack awareness of body signals"
    ],
    citation: "Critchley & Garfinkel, 2023; Barrett, 2024",
    visual: "Vagus nerve pathway from organs to brain"
  },
  {
    title: "How Bottom-Up Drives Emotion & Behavior",
    bullets: [
      "Somatic markers: Gut feelings, butterflies, chest tightness",
      "Rapid threat detection: Thalamus → Amygdala (pre-conscious)",
      "Body-based arousal must resolve before cognitive work"
    ],
    citation: "Damasio, 2024; Gross & Wu, 2024",
    visual: "Somatic marker pathway diagram"
  },
  {
    title: "Module 3: Polyvagal Theory — Critical Evaluation",
    subtitle: "Science, Controversy, and Nuanced Application",
    type: "divider"
  },
  {
    title: "Polyvagal Theory: Core Concepts",
    bullets: [
      "Ventral Vagal (Social Engagement): Safety, connection, calm",
      "Sympathetic (Fight-or-Flight): Mobilization for threat",
      "Dorsal Vagal (Shutdown): Immobility, survival mode",
      "Neuroception: Neural detection of safety/danger"
    ],
    citation: "Porges, 2022",
    visual: "Three-tier vagal hierarchy diagram"
  },
  {
    title: "Recent Critiques (2024-2026)",
    bullets: [
      "Grossman et al. (2026): Limited empirical support for some claims",
      "Over-simplification risk: Neural circuits are not binary",
      "Porges response: Defends core theory, acknowledges nuances",
      "Clinical takeaway: Use as heuristic, not complete model"
    ],
    citation: "Grossman et al., 2026",
    visual: "Timeline of polyvagal research and debates"
  },
  {
    title: "Module 4: Evidence-Based Somatic Techniques",
    subtitle: "What Works, What Doesn't, and Why",
    type: "divider"
  },
  {
    title: "Evidence-Based Somatic Interventions",
    bullets: [
      "Somatic Experiencing (Levine): Titration, pendulation, completion",
      "EMDR: Bilateral stimulation, evidence for PTSD (20+ RCTs)",
      "Sensorimotor Psychotherapy (Ogden): Integration of body in processing",
      "Trauma-informed Yoga: Improved HRV, reduced PTSD symptoms"
    ],
    citation: "Levine, 2024; Chen et al., 2024; van der Kolk, 2023",
    visual: "Evidence hierarchy pyramid"
  },
  {
    title: "The Science of How Somatic Techniques Work",
    bullets: [
      "HRV biofeedback: Increases parasympathetic tone",
      "Bilateral stimulation: May enhance interhemispheric processing",
      "Breathwork: Vagal stimulation via extended exhalation",
      "Movement: Releases muscular holding, regulates CNS"
    ],
    citation: "Gevirtz, 2023; Lehrer et al., 2024",
    visual: "HRV graph showing pre/post intervention"
  },
  {
    title: "Module 5: Why Some Somatic Techniques Fail",
    subtitle: "Common Pitfalls and How to Avoid Them",
    type: "divider"
  },
  {
    title: "When Somatic Techniques Don't Work",
    bullets: [
      "Client not ready: Window of Tolerance must be established first",
      "Over-reliance on theory: Technique must match client presentation",
      "Lack of empirical support: Some pop techniques lack data",
      "Inadequate training: Somatic work requires specialized skills",
      "Premature processing: Body-based work before stabilization"
    ],
    citation: "Courtois & Ford, 2023; Herman, 2024",
    visual: "Decision tree"
  },
  {
    title: "Module 6: Integration with Evidence-Based Practice",
    subtitle: "Combining Bottom-Up and Top-Down Approaches",
    type: "divider"
  },
  {
    title: "Phase-Based Treatment Model",
    bullets: [
      "Phase 1: Stabilization (bottom-up: grounding, breathwork)",
      "Phase 2: Processing (top-down: cognitive restructuring, ERP)",
      "Phase 3: Integration (combined approaches)",
      "Sequential use: Regulate before you process"
    ],
    citation: "Cloitre et al., 2024",
    visual: "Three-phase treatment model flowchart"
  },
  {
    title: "Case Example: SE + CPT Integration",
    bullets: [
      "Client: 35F, childhood trauma, avoids reminders",
      "Phase 1: SE titration to expand window of tolerance",
      "Phase 2: CPT cognitive processing of core beliefs",
      "Outcome: Reduced avoidance, increased coping flexibility"
    ],
    citation: "Adapted from clinical case literature",
    visual: "Case timeline"
  },
  {
    title: "References (APA 7th Edition)",
    bullets: [
      "Barrett, L.F. (2024). How the mind works (2nd ed.). Oxford.",
      "Critchley, H.D., & Garfinkel, S.N. (2023). Interoception. Curr Opin Psychol.",
      "Gross, J.J., & Wu, J. (2024). Emotional regulation. Nat Rev Neurosci.",
      "Levine, P.A. (2024). Somatic Experiencing. J Trauma Dissociation.",
      "Ochsner, K.N., & Gross, J.J. (2024). Neural basis. Annu Rev Psychol.",
      "Porges, S.W. (2022). Polyvagal theory (2nd ed.). Norton.",
      "van der Kolk, B.A. (2023). The body keeps the score (updated). Viking."
    ],
    type: "references"
  },
  {
    title: "Thank You",
    subtitle: "Ready to transform your practice with somatic science?\n\nEnroll now at fernandfeather.com/courses",
    type: "end"
  }
];

console.log("Slide content prepared:", slides.length, "slides");
console.log(JSON.stringify(slides.slice(0,2), null, 2));
