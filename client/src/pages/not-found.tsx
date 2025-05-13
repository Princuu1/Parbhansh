import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <Card className="w-full max-w-md border border-red-300 shadow-lg dark:bg-[white]">
        <CardContent className="pt-8 pb-10 text-center">
          <div className="flex flex-col items-center gap-4">
            {/* Lottie animation with fixed 50x50 pixels size */}
            <DotLottieReact
              src="https://lottie.host/b300a79a-3abe-4a34-8d6c-9033349845c2/t0dmR14Hw1.lottie"
              loop
              autoplay
              style={{ width: 150, height: 150 }}
            />
            <h1 className="text-3xl font-extrabold text-red-700">404 — Page Not Found</h1>
            <p className="mt-2 text-base text-red-600">
              Oops! We can’t seem to find the page you’re looking for.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="px-6 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Go Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
