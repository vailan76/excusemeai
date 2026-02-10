import ExcuseGenerator from '@/components/core/excuse-generator';

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Excuse Me AI
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Generate smart, funny, and professional excuses instantly
        </p>
      </div>

      <ExcuseGenerator />
    </div>
  );
}
