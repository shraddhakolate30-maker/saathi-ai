# SAATHI AI 🛡️
### AI Detects • Humans Understand • You Decide.

**Recognize Early. Reach Help. Protect Dignity.**

SAATHI AI is a women's safety and early-intervention prototype designed to help people recognize potential warning signs of controlling behaviour, harassment, stalking, and intimidation.

Many unsafe situations do not begin with a single major incident. They may develop through repeated unwanted contact, digital monitoring, isolation, threats, or behaviour that makes someone feel unsafe.

SAATHI AI aims to make it easier to recognize these patterns, understand possible risks, and explore practical next steps without taking away the user's choice.

The project combines open-weight AI concepts, accessible safety information, and a human-centred approach to early awareness.

> **Our principle:** AI can help identify patterns, but people deserve dignity, privacy, and control over their decisions.

---

## 🌟 Why SAATHI AI?

People experiencing controlling behaviour or harassment may not always recognize the warning signs early. They may also feel uncertain about what to do or where to find support.

SAATHI AI is designed to provide an approachable starting point for understanding concerning behaviour and exploring available support options.

It is not designed to judge people, determine guilt, or replace trained professionals.

## 🌐 Live Demo

Try the SAATHI AI prototype:

Open SAATHI AI Demo : https://saathi-ai-women-s-safety-platform.ai.studio

Note: This is a prototype. Some features are demonstrations and may not be connected to a live support service.

---

## ✨ Features

### 1. AI Safety Check
Describe a situation and receive an AI-generated analysis of potential warning signs.

The analysis may identify patterns such as:
- Repeated unwanted contact.
- Controlling or possessive behaviour.
- Digital monitoring or surveillance.
- Attempts to isolate someone from friends or family.
- Intimidating statements or threats.
- Repeated boundary violations.

The AI provides observations and possible next steps to help users think through a situation.

**Important:** AI-generated results can be incomplete or inaccurate. They are not a formal risk assessment or a guarantee of safety.

### 2. Practical Safety Suggestions
The AI Safety Check can suggest practical steps based on the situation described.

Suggestions may include maintaining a record of unwanted contact, reviewing account privacy settings, contacting a trusted person, or seeking professional support when appropriate.

Recommendations should be considered carefully in the context of the user's circumstances.

### 3. Confidential Help Request Interface
SAATHI AI includes a Help Request interface intended to demonstrate how someone could request further support.

The interface is designed around respectful communication and user choice.

**Current limitation:** The presence of this interface does not mean that requests are delivered to a real support team. Actual secure submission, storage, and advocate-response workflows require further implementation and testing.

### 4. Human Review Dashboard Demonstration
The project includes an interface demonstrating how a human reviewer could examine a safety-related request.

The intended approach is to keep people involved in sensitive decisions rather than relying entirely on AI.

**Current limitation:** The dashboard is a demonstration. It does not guarantee that a trained advocate receives or reviews submissions.

### 5. Safety Resources
SAATHI AI includes a safety resources section intended to help users find relevant support information.

The long-term goal is to provide reliable emergency contacts, support organizations, and guidance appropriate to the user's location.

**Current limitation:** Resource accuracy, regional coverage, and the availability of every listed service must be independently verified.

### 6. Privacy-Aware User Experience
The project emphasizes user choice, respectful language, and careful handling of sensitive situations.

The intended design avoids pressuring users to report an incident or make a particular decision.

However, a privacy-focused interface alone does not guarantee that information is never stored, logged, or transmitted. The application's actual data handling must be verified before making stronger privacy promises.

### 7. Model Transparency
SAATHI AI aims to make the role and limitations of AI understandable to users.

AI should support awareness and decision-making, not make final judgments about a person or situation.

### 8. Accessible, User-Centred Interface
The website is designed to make safety information approachable through clear sections, feature cards, straightforward navigation, and an easy-to-understand workflow.

### 9. Quick Safety Exit
The interface includes a Quick Safety Exit feature intended to let users leave the current page quickly.

A quick exit cannot guarantee privacy or erase browser history, network records, or other traces of activity.

---

## 🔄 How It Works

1. **Describe:** The user describes a concerning situation in the AI Safety Check.
2. **Analyze:** The AI examines the description for possible warning signs.
3. **Understand:** The user reviews the observations and suggested next steps.
4. **Explore:** The user can explore the available safety information and support options.
5. **Choose:** The user decides what action, if any, is appropriate for their situation.

SAATHI AI is intended to support informed decisions, not make decisions on behalf of users.

---

## 🧠 AI and Open Innovation

SAATHI AI explores the use of open-weight AI models, including Google's Gemma model family, for safety awareness.

Open-weight models can give developers more opportunities to experiment, inspect implementation choices, adapt applications, and build tools for specific needs.

This project explores how such models might support early awareness while keeping human judgment and user autonomy central.

AI-generated analysis should always be treated as advisory. A model cannot independently establish whether abuse or harassment has occurred, verify every claim, or guarantee that a suggested action is safe.

**Implementation note:** The exact model identifier, integration method, and deployment configuration should be confirmed against the project's source code before making claims about the specific model used.

---

## 🛠️ Technology Stack

The project repository includes the following technologies and configuration:

- **React** — user interface
- **TypeScript** — application development
- **Vite** — development and build tooling
- **Node.js** — server-side runtime
- **Google AI Studio** — AI-assisted development environment
- **Gemma / open-weight AI** — intended AI analysis component; exact integration should be verified in the source code

---

## 🚧 Future Scope

The current project is a prototype. The following improvements are planned or require further implementation and testing.

### 1. Secure Help Request Submission
- Implement a working backend for help requests.
- Validate incoming data and protect sensitive information.
- Define clear consent and data-retention policies.
- Avoid collecting unnecessary personal information.
- Provide clear feedback about whether a request was successfully submitted.

### 2. Real Human Support Workflow
- Connect the dashboard to an authorized support team.
- Create reviewer authentication and access controls.
- Add request status tracking and appropriate follow-up.
- Establish procedures for consent, escalation, and responsible handling.
- Ensure that no user is promised a human response unless the service can actually provide one.

### 3. Verified Safety Resource Directory
- Verify emergency contacts and support organizations.
- Add region-specific resources.
- Provide clear opening hours and service eligibility where available.
- Review resource information regularly to keep it accurate.

### 4. Multilingual Support
- Add Marathi, Hindi, and other regional languages.
- Make safety guidance easier to understand for more users.
- Test translations for clarity and cultural sensitivity.

### 5. Improved AI Analysis
- Evaluate model responses across a wider range of scenarios.
- Reduce misleading, overly confident, or insensitive responses.
- Improve the distinction between concerning behaviour, uncertainty, and immediate danger.
- Test for bias and inconsistent results.
- Provide clear explanations of model limitations.

### 6. User-Controlled Safety Planning
- Explore optional safety plans based on a user's circumstances.
- Provide general suggestions for documenting incidents and seeking support.
- Avoid recommendations that could increase danger in a particular situation.
- Keep decisions under the user's control.

### 7. Stronger Privacy and Security
- Review server logs and data flows.
- Minimize collection and retention of sensitive data.
- Add secure authentication where needed.
- Assess encryption and access-control requirements.
- Conduct security and privacy testing before handling real cases.

### 8. Accessibility Improvements
- Improve keyboard navigation and screen-reader support.
- Test colour contrast and text readability.
- Make the interface usable across mobile devices and different screen sizes.

### 9. Safe Feedback and Evaluation
- Add an optional feedback mechanism that does not require unnecessary personal details.
- Evaluate whether users understand the AI's limitations.
- Test the interface with appropriate consent and safeguards.
- Use feedback to improve usability and clarity.

### 10. Deployment and Reliability
- Establish a stable public deployment.
- Configure production environment variables securely.
- Add error handling and monitoring without exposing sensitive information.
- Test the application under realistic conditions.

---

## ⚠️ Safety and Responsible Use

SAATHI AI is an educational prototype for safety awareness.

- It is not an emergency-response service.
- It does not replace police, healthcare professionals, legal advisers, or trained support organizations.
- AI results may be inaccurate or incomplete.
- It cannot determine guilt or verify that an incident occurred.
- The Human Review Dashboard is not proof of real human review.
- Do not enter identifying or highly sensitive information into an unverified demo.
- Do not assume that information entered into the prototype is private or unrecorded.
- A Quick Safety Exit cannot erase all traces of browsing activity.

If you are in immediate danger in India, call **112**, India's pan-India emergency number, when it is safe to do so.

---

## 🎯 Project Vision

Our vision is to make early safety awareness easier to access and understand.

SAATHI AI explores how AI can support people without replacing human judgment, removing personal choice, or making promises that technology cannot guarantee.

**Recognize Early. Reach Help. Protect Dignity.**

---

## 📌 Project Status

SAATHI AI is an evolving prototype developed for the Hacktoberfest 2026 Side Hustle challenge.

The AI Safety Check has been tested with example scenarios. Other components, including help-request processing, human review, privacy protections, and safety-resource accuracy, require further verification or implementation before real-world use.

## 🤝 Contributing

Contributions, suggestions, and constructive feedback are welcome.

Potential contribution areas include accessibility, multilingual support, privacy engineering, AI evaluation, verified safety resources, documentation, and testing.

Please prioritize user safety, privacy, and responsible AI practices when contributing.

## 📄 License

A license has not yet been specified. A suitable open-source license should be added before the project is presented as an openly licensed repository.
