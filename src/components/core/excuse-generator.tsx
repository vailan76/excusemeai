'use client';

import { useState } from 'react';
import {
  generateRealisticExcuse,
  type GenerateRealisticExcuseInput,
} from '@/ai/flows/generate-realistic-excuse';
import ExcuseGeneratorForm from './excuse-generator-form';
import ExcuseResultCard from './excuse-result-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

type FormState = {
  excuse: string | null;
  watermark: boolean;
  error: string | null;
};

const initialState: FormState = {
  excuse: null,
  watermark: false,
  error: null,
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


export default function ExcuseGenerator() {
  const [state, setState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setState(initialState); // Reset state on new submission

    if (!user) {
      // User not logged in, redirect to login
      router.push('/login?redirect=/');
      setIsSubmitting(false);
      return;
    }

    const userDocRef = doc(firestore, 'users', user.uid);
    
    try {
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // This case should ideally not happen if user doc is created on signup.
        throw new Error("User data not found. Please try logging in again.");
      }

      const userData = userDoc.data();
      const isPremiumUser = userData.plan === 'PREMIUM';
      
      const today = new Date().toDateString();
      const lastUsageDate = userData.lastUsageDate?.toDate();
      const lastUsage = lastUsageDate ? lastUsageDate.toDateString() : null;

      let currentUsage = userData.dailyUsage || 0;
      if (today !== lastUsage) {
        currentUsage = 0;
      }

      if (!isPremiumUser && currentUsage >= 5) {
        setState({
          excuse: null,
          watermark: false,
          error: 'Daily limit reached. Upgrade to Premium for unlimited excuses.',
        });
        setIsSubmitting(false);
        return;
      }
      
      const parsed = ExcuseSchema.safeParse(Object.fromEntries(formData));

      if (!parsed.success) {
        setState({
          excuse: null,
          watermark: false,
          error: 'Invalid form data. Please try again.',
        });
        setIsSubmitting(false);
        return;
      }
      
      const input: GenerateRealisticExcuseInput = parsed.data;
      const result = await generateRealisticExcuse(input);

      // Update usage count
      if (!isPremiumUser) {
        await updateDoc(userDocRef, {
          dailyUsage: currentUsage + 1,
          lastUsageDate: serverTimestamp()
        });
      }

      setState({
        excuse: result.excuse,
        watermark: !isPremiumUser,
        error: null,
      });

    } catch (e: any) {
      console.error(e);
      setState({
        excuse: null,
        watermark: false,
        error: e.message || 'Failed to generate excuse. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <ExcuseGeneratorForm formAction={handleFormSubmit} isSubmitting={isSubmitting} />

      {state.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {state.error}
            {state.error.includes('limit reached') && (
              <Button asChild size="sm" className="mt-4">
                <Link href="/pricing">Upgrade to Premium</Link>
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {state.excuse && <ExcuseResultCard excuse={state.excuse} watermark={state.watermark} />}
    </div>
  );
}
