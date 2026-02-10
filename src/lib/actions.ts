'use server';

import {
  generateRealisticExcuse,
  type GenerateRealisticExcuseInput,
} from '@/ai/flows/generate-realistic-excuse';
import { z } from 'zod';

export type FormState = {
  excuse: string | null;
  watermark: boolean;
  error: string | null;
};

const ExcuseSchema = z.object({
  situation: z.enum([
    'Skip college',
    'Assignment delay',
    'Late to office',
    'Cancel meeting',
    'Cancel date',
    'Family excuse',
    'Travel excuse',
    'Custom text',
  ]),
  tone: z.enum(['Professional', 'Funny', 'Emotional', 'Casual', 'Dramatic', 'Custom text']),
  targetPerson: z.enum(['Boss', 'Teacher', 'Friend', 'Partner', 'Parent', 'Custom text']),
  urgencyLevel: z.enum(['Low', 'Medium', 'Emergency', 'Custom text']),
  customText: z.string().optional(),
  customTone: z.string().optional(),
  customTargetPerson: z.string().optional(),
  customUrgencyLevel: z.string().optional(),
});

export async function generateExcuseAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Mocking auth and freemium logic for now.
  // In a real app, you'd get the user from a session, check their plan and usage.
  const isPremiumUser = false; // Mock.
  const usageLimitReached = Math.random() < 0.1; // Mock a 10% chance of hitting the limit for demo purposes.

  // This is a placeholder for user authentication. In a real app, this would be a check for a valid user session.
  const isAuthenticated = true; 

  if (!isAuthenticated) {
     return {
      excuse: null,
      watermark: false,
      error: 'You must be logged in to generate an excuse.',
    };
  }

  if (!isPremiumUser && usageLimitReached) {
    return {
      excuse: null,
      watermark: false,
      error: 'Daily limit reached. Upgrade to Premium for unlimited excuses.',
    };
  }

  const parsed = ExcuseSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      excuse: null,
      watermark: false,
      error: 'Invalid form data. Please try again.',
    };
  }

  const input: GenerateRealisticExcuseInput = parsed.data;

  try {
    const result = await generateRealisticExcuse(input);

    // In a real app, update usage count in DB here.

    return {
      excuse: result.excuse,
      watermark: !isPremiumUser,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      excuse: null,
      watermark: false,
      error: 'Failed to generate excuse. Please try again later.',
    };
  }
}
