'use server';
/**
 * @fileOverview AI excuse generation flow. Generates realistic excuses based on user inputs.
 *
 * - generateRealisticExcuse - The function to generate the excuse.
 * - GenerateRealisticExcuseInput - The input type for the generateRealisticExcuse function.
 * - GenerateRealisticExcuseOutput - The output type for the generateRealisticExcuse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRealisticExcuseInputSchema = z.object({
  situation: z
    .enum([
      'Skip college',
      'Assignment delay',
      'Late to office',
      'Cancel meeting',
      'Cancel date',
      'Family excuse',
      'Travel excuse',
      'Custom text',
    ])
    .describe('The situation for which the excuse is needed.'),
  tone: z
    .enum(['Professional', 'Funny', 'Emotional', 'Casual', 'Dramatic'])
    .describe('The desired tone of the excuse.'),
  targetPerson: z
    .enum(['Boss', 'Teacher', 'Friend', 'Partner', 'Parent'])
    .describe('The target person for the excuse.'),
  urgencyLevel: z.enum(['Low', 'Medium', 'Emergency']).describe('The urgency level of the situation.'),
  customText: z.string().optional().describe('Custom situation text if selected.'),
});
export type GenerateRealisticExcuseInput = z.infer<typeof GenerateRealisticExcuseInputSchema>;

const GenerateRealisticExcuseOutputSchema = z.object({
  excuse: z.string().describe('The generated excuse.'),
});
export type GenerateRealisticExcuseOutput = z.infer<typeof GenerateRealisticExcuseOutputSchema>;

export async function generateRealisticExcuse(
  input: GenerateRealisticExcuseInput
): Promise<GenerateRealisticExcuseOutput> {
  return generateRealisticExcuseFlow(input);
}

const excusePrompt = ai.definePrompt({
  name: 'excusePrompt',
  input: {schema: GenerateRealisticExcuseInputSchema},
  output: {schema: GenerateRealisticExcuseOutputSchema},
  prompt: `You are an AI assistant designed to generate realistic and contextually appropriate excuses based on user input.

  Situation: {{situation}}
  Tone: {{tone}}
  Target Person: {{targetPerson}}
  Urgency Level: {{urgencyLevel}}
  {{#if customText}}
  Custom Text: {{customText}}
  {{/if}}

  Generate an excuse that is between 2 to 5 sentences long. The tone must match the user selection. Make sure the excuse is realistic.

  Here's the excuse:`,
});

const generateRealisticExcuseFlow = ai.defineFlow(
  {
    name: 'generateRealisticExcuseFlow',
    inputSchema: GenerateRealisticExcuseInputSchema,
    outputSchema: GenerateRealisticExcuseOutputSchema,
  },
  async input => {
    const {output} = await excusePrompt(input);
    return output!;
  }
);
