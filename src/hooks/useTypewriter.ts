
import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 30) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setDisplayText('');
        setIsTyping(true);
        let i = 0;

        // Safety check for empty text
        if (!text) {
            setIsTyping(false);
            return;
        }

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                setIsTyping(false);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return { displayText, isTyping };
}
