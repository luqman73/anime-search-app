This document outlines how I used AI (ChatGPT) to assist during the development of this project.
I come from a Laravel background and still consider myself new to React. Because of that, I often asked the AI to relate React concepts to Laravel patterns so I could understand them more easily.

Overview

I mainly used AI for:

Styling help with Tailwind CSS

Structuring components and pages

Managing Redux Toolkit logic for search and pagination

Writing TypeScript types

Debugging UI issues and improving loading states

All code suggestions were reviewed, rewritten where needed, and aligned with my own understanding and project goals.

Prompts and Context
1. Adapting from Laravel to React

Context:
Early in the project, I told the AI:

"I was a Laravel developer before and I consider I’m new in React. Please relate Laravel with React if possible so that I can understand more."
AI Assistance:
It explained concepts like state management in Redux compared to Laravel controllers and request handling. It also related React components to Laravel Blade templates and props to controller data.
My Adjustment:
Used these parallels to quickly grasp how data flows in React and how Redux actions feel like Laravel controller methods.

2. Anime Card Styling

Context:
I wanted to make each anime card more visually appealing.
Prompt Summary:

"Can you make the card design look better or more stylish?"
AI Assistance:
Suggested adding transparency, shadows, and hover animations.
My Adjustment:
Used glass-like backgrounds and subtle transitions to create depth without clutter.

3. Background Gradient

Context:
The original background felt too plain.
Prompt Summary:

"Let's make the background look gradient a little bit"
AI Assistance:
Suggested gradient utilities from Tailwind and composition ideas for contrast.
My Adjustment:
Tuned gradient direction and colors to complement the dark theme.

4. Loading States

Context:
The app initially showed a simple “Loading...” text.
Prompt Summary:

"Make the loading animation more alive"
AI Assistance:
Recommended using Tailwind’s animate-pulse with skeleton placeholders.
My Adjustment:
Created loaders for both the search and detail pages to improve UX consistency.

5. Missing Synopsis Fallback

Context:
Some anime entries had no synopsis.
Prompt Summary:

"If there’s no synopsis, I think i want to display ‘Synopsis not available’?"
AI Assistance:
Suggested conditional rendering for better user feedback.
My Adjustment:
Added a fallback message to keep layout consistent and avoid empty sections.

6. Detail Page Loading

Context:
Wanted to match the detail page loading style with the search page.
Prompt Summary:

"How to adjust the loading design?"
AI Assistance:
Suggested keeping background and animation consistent.
My Adjustment:
Applied the same gradient and dark theme for visual unity.

Reflection

Transitioning from Laravel to React was a shift in mindset, going from server-rendered templates to component-driven UIs. Using AI helped me understand how React’s declarative logic compares to Laravel’s structured flow.
It guided me to think more in terms of state and components instead of routes and views, which made the learning curve smoother.