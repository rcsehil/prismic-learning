import axios from 'axios';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

interface Habit {
  name: string;
  description: string;
  benefits: string[];
}

interface HabitCategory {
  category: string;
  habits: Habit[];
}

async function importHabits() {
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
  const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME;

  if (!accessToken || !repositoryName) {
    throw new Error('Missing Prismic credentials');
  }

  // Base64 encode the access token
  const encodedToken = Buffer.from(accessToken).toString('base64');

  // Read habits data
  const habitsPath = join(__dirname, '..', 'habits.json');
  const habitsFile = await readFile(habitsPath, 'utf-8');
  const habitsData: { habits: HabitCategory[] } = JSON.parse(habitsFile);

  const apiEndpoint = `https://migration.prismic.io/documents`;

  for (const category of habitsData.habits) {
    for (const habit of category.habits) {
      try {
        const response = await axios.post(apiEndpoint, 
          {
            type: 'habit',
            title: habit.name,
            lang: 'en-us',
            data: { 
              name: habit.name,
              description: [{
                type: 'paragraph',
                text: habit.description,
                spans: []
              }],
              category: category.category,
              benefits: habit.benefits.map((benefit) => ({
                benefit: benefit
              })),
              difficulty_level: 'Beginner',
              implementation_tips: []
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'x-api-key': "cSaZlfkQlF9C6CEAM2Del6MNX9WonlV86HPbeEJL",
              "repository": repositoryName
            }
          }
        );

        if (response.status !== 201) {
          throw new Error(`Invalid response status: ${response.status}`);
        }

        console.log(`Imported habit: ${habit.name}`);
      } catch (error: any) {
        console.error(`Error importing habit ${habit.name}:`, 
          error.response ? error.response.data : error.message
        );
      }
    }
  }
}

// Run the import
importHabits().then(() => {
  console.log('Habit import completed');
}).catch((error: any) => {
  console.error('Import failed:', error);
});
