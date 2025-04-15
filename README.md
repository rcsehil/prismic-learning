This is a Habits Library page.
All Habit content is served from Prismic.io

## Working with the project
```bash
# install dependencies
npm install

# start the dev server
npm run dev

# start slice-machine
npx @slicemachine/init@latest

# running unit tests
npm run test

# running playwright tests
npm run test:playwright
```

With the dev server running, open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

## Content Modeling

Habit models a habit, with fields for name, description, main image, benefits, difficulty level, implementation tips, and category. Category is a content relationship to the Habit Category type.

Habit Category models a category, with fields for name and description.

## GenAI Collaboration

### AI-Assisted Development
This project was developed with the assistance of generative AI tools, specifically:

#### Tools Used
- **Primary AI Assistant**: Windsurf
- **Collaboration Approach**: Pair programming with AI, content generation for site

#### AI Contribution Areas
- Code generation
- Debugging
- Architecture suggestions
- Refactoring
- Documentation assistance

#### Ethical AI Usage Guidelines
- All AI-generated code is reviewed and approved by human developers
- AI suggestions are treated as recommendations, not absolute solutions
- Critical thinking and human judgment are applied to all AI-generated content

#### Transparency
- AI contributions are used to enhance productivity and explore innovative solutions
- The final implementation and architectural decisions remain human-driven

### Limitations and Disclaimer
While AI assists in development, it does not replace:
- Human creativity
- Critical problem-solving
- Comprehensive understanding of project requirements

## Future improvements
- Rewrite playwright tests, no time to do that now.
- Add a CI/CD pipeline.
- Deploy to Vercel.
- Refactor the Habits Library page:
 - separate network calls from rendering
 - add pagination
 - implement robust error handling

- Design the habits detail page.
