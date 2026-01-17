import React, { useState, useEffect } from "react";
import { Quote, RefreshCw } from "lucide-react";

const QUOTES = [
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
    { text: "The garden suggests there is a place where we can meet nature halfway.", author: "Michael Pollan" },
    { text: "To plant a garden is to believe in tomorrow.", author: "Audrey Hepburn" },
    { text: "Every flower is a soul blossoming in nature.", author: "Gerard De Nerval" },
    { text: "Adopt the pace of nature: her secret is patience.", author: "Ralph Waldo Emerson" },
    { text: "Wherever you go, no matter what the weather, always bring your own sunshine.", author: "Anthony J. D'Angelo" },
    { text: "Life begins the day you start a garden.", author: "Chinese Proverb" },
    { text: "In the depth of winter, I finally learned that within me there lay an invincible summer.", author: "Albert Camus" },
    { text: "Growth is the only evidence of life.", author: "John Henry Newman" }
];

export const DailyQuote: React.FC = () => {
    const [quote, setQuote] = useState(QUOTES[0]);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Deterministic quote based on day of year to be consistent
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        setQuote(QUOTES[dayOfYear % QUOTES.length]);
    }, []);

    const refreshQuote = () => {
        setIsFading(true);
        setTimeout(() => {
            const random = Math.floor(Math.random() * QUOTES.length);
            setQuote(QUOTES[random]);
            setIsFading(false);
        }, 300);
    };

    return (
        <div className="relative group max-w-lg mx-auto mb-8 text-center p-6 rounded-2xl bg-secondary/20 border border-border/50">
            <Quote className="w-6 h-6 text-primary/20 mx-auto mb-3" />
            <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <p className="font-serif text-lg text-foreground/80 italic mb-2 leading-relaxed">
                    "{quote.text}"
                </p>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    — {quote.author}
                </p>
            </div>

            <button
                onClick={refreshQuote}
                className="absolute top-4 right-4 p-1.5 text-muted-foreground/30 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                title="New inspiration"
            >
                <RefreshCw className="w-3.5 h-3.5" />
            </button>
        </div>
    );
};
