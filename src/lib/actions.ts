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

// This is a server action, but the logic has been moved to the client-side
// in ExcuseGenerator.tsx to handle authentication and user data securely
// on the client. This file can be removed or repurposed if server-side
// logic is needed in the future.
export async function generateExcuseAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  console.log("This server action is not in use. See src/components/core/excuse-generator.tsx")

  return {
      excuse: null,
      watermark: false,
      error: 'This action is not in use.',
    };
}
