# **App Name**: ExcuseForge AI

## Core Features:

- User Authentication: Secure user signup/login using Google or email/password. Store user details including email, userId, subscription plan, and daily usage count in Firestore.
- Excuse Generation Form: Intuitive input form on the homepage to select the situation, tone, target person, and urgency level for the excuse.
- AI Excuse Generation: Generate realistic excuse messages using OpenAI API, tailored to user selections, ensuring the tone matches the selected preference. The system incorporates a 'tool' that assesses the provided inputs (situation, tone, target person, urgency) to deliver contextually relevant and appropriate outputs.
- Freemium Logic: Implement logic to limit free users to 5 excuses per day with a watermark, while premium users get unlimited access without watermarks. Display upgrade banners for free users.
- Firestore Database: Use Firestore to manage user data, track daily usage, and store subscription status.
- Usage Limit Management: Implement daily usage reset and show a popup when free users exceed the limit, prompting them to upgrade.
- Subscription System: Integrate Razorpay or Stripe for premium subscriptions. Upon successful payment, update the user's Firestore record to reflect their PREMIUM plan.
- Excuse Result UI: Display the generated excuse in a card component with options to copy to clipboard, share (WhatsApp/social media), and download as text.
- Dashboard: Create a dashboard page for logged-in users to view their subscription status, usage count, upgrade subscription, and logout.

## Style Guidelines:

- Primary color: Deep Indigo (#4B0082), reflecting trustworthiness and sophistication.
- Background color: Light Grayish-Blue (#D8D9E2) to provide a gentle, unobtrusive backdrop.
- Accent color: Gold (#FFD700), used sparingly to highlight key elements and actions, signifying quality and premium features.
- Headline font: 'Space Grotesk' (sans-serif) for a computerized, scientific feel. Body font: 'Inter' (sans-serif) for a modern, neutral look.
- Use simple, line-based icons that complement the modern UI. Icons should be related to different excuse scenarios and subscription features.
- Card-based layout for excuse display and dashboard information. Use a clean, minimal design with ample spacing.
- Subtle animations for excuse generation, button hovers, and transitions to provide a smooth user experience.