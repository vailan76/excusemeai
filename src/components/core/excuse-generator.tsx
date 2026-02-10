'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import type { FormState } from '@/lib/actions';
import { generateExcuseAction } from '@/lib/actions';
import ExcuseGeneratorForm from './excuse-generator-form';
import ExcuseResultCard from './excuse-result-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const initialState: FormState = {
  excuse: null,
  watermark: false,
  error: null,
};

export default function ExcuseGenerator() {
  const [state, formAction] = useFormState(generateExcuseAction, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    await formAction(formData);
    setIsSubmitting(false);
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
