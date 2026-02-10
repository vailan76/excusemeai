'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

type ExcuseGeneratorFormProps = {
  formAction: (formData: FormData) => void;
  isSubmitting: boolean;
};

export default function ExcuseGeneratorForm({ formAction, isSubmitting }: ExcuseGeneratorFormProps) {
  const [situation, setSituation] = useState('');

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Create Your Excuse</CardTitle>
          <CardDescription>Fill in the details below to generate the perfect excuse.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="situation">Situation</Label>
              <Select name="situation" required onValueChange={setSituation}>
                <SelectTrigger id="situation">
                  <SelectValue placeholder="Select a situation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Skip college">Skip college</SelectItem>
                  <SelectItem value="Assignment delay">Assignment delay</SelectItem>
                  <SelectItem value="Late to office">Late to office</SelectItem>
                  <SelectItem value="Cancel meeting">Cancel meeting</SelectItem>
                  <SelectItem value="Cancel date">Cancel date</SelectItem>
                  <SelectItem value="Family excuse">Family excuse</SelectItem>
                  <SelectItem value="Travel excuse">Travel excuse</SelectItem>
                  <SelectItem value="Custom text">Custom text</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select name="tone" required defaultValue="Casual">
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Funny">Funny</SelectItem>
                  <SelectItem value="Emotional">Emotional</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Dramatic">Dramatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetPerson">Target Person</Label>
              <Select name="targetPerson" required defaultValue="Friend">
                <SelectTrigger id="targetPerson">
                  <SelectValue placeholder="Who is this for?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boss">Boss</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgencyLevel">Urgency</Label>
              <Select name="urgencyLevel" required defaultValue="Medium">
                <SelectTrigger id="urgencyLevel">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {situation === 'Custom text' && (
            <div className="space-y-2">
              <Label htmlFor="customText">Custom Situation</Label>
              <Textarea
                id="customText"
                name="customText"
                placeholder="e.g., I need an excuse for why my pet rock is sick."
                required
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Excuse'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
