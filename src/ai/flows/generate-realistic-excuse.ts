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
    .enum(['Professional', 'Funny', 'Emotional', 'Casual', 'Dramatic', 'Custom text'])
    .describe('The desired tone of the excuse.'),
  targetPerson: z
    .enum(['Boss', 'Teacher', 'Friend', 'Partner', 'Parent', 'Custom text'])
    .describe('The target person for the excuse.'),
  urgencyLevel: z.enum(['Low', 'Medium', 'Emergency', 'Custom text']).describe('The urgency level of the situation.'),
  customText: z.string().optional().describe('Custom situation text if selected.'),
  customTone: z.string().optional().describe('Custom tone text if selected.'),
  customTargetPerson: z.string().optional().describe('Custom target person text if selected.'),
  customUrgencyLevel: z.string().optional().describe('Custom urgency level text if selected.'),
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

const PromptInputSchema = z.object({
  situation: z.string().describe('The situation for which the excuse is needed.'),
  tone: z.string().describe('The desired tone of the excuse.'),
  targetPerson: z.string().describe('The target person for the excuse.'),
  urgencyLevel: z.string().describe('The urgency level of the situation.'),
});

const excusePrompt = ai.definePrompt({
  name: 'excusePrompt',
  input: {schema: PromptInputSchema},
  output: {schema: GenerateRealisticExcuseOutputSchema},
  prompt: `You are an AI assistant designed to generate realistic and contextually appropriate excuses based on user input.

  Situation: {{situation}}
  Tone: {{tone}}
  Target Person: {{targetPerson}}
  Urgency Level: {{urgencyLevel}}

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
    const modelInput = {
      situation: input.situation === 'Custom text' ? input.customText ?? '' : input.situation,
      tone: input.tone === 'Custom text' ? input.customTone ?? '' : input.tone,
      targetPerson:
        input.targetPerson === 'Custom text' ? input.customTargetPerson ?? '' : input.targetPerson,
      urgencyLevel:
        input.urgencyLevel === 'Custom text' ? input.customUrgencyLevel ?? '' : input.urgencyLevel,
    };

    const {output} = await excusePrompt(modelInput);
    return output!;
  }
);
