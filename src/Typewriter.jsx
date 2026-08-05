import { useEffect, useRef, useState } from "react";

export default function Typewriter({
  text,
  shouldStart,
  onDone,
  instant = false,
  className = "",
  caretClassName = "",
  scrollRef = null,
}) {
  const cleanText = (text || "").trim();
  const [displayed, setDisplayed] = useState("");
  const [typedText, setTypedText] = useState(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    setTypedText(null);
  }, [cleanText]);

  useEffect(() => {
    if (instant) {
      setDisplayed(cleanText);
      setTypedText(cleanText);
      const timer = setTimeout(() => onDoneRef.current?.(), 0);
      return () => clearTimeout(timer);
    }

    if (!shouldStart) return undefined;

    if (typedText === cleanText) {
      setDisplayed(cleanText);
      return undefined;
    }

    setDisplayed("");
    let interval;

    const startDelay = setTimeout(() => {
      let index = 0;

      interval = setInterval(() => {
        setDisplayed(cleanText.slice(0, index + 1));
        index += 1;

        const target = scrollRef?.current;
        if (target) target.scrollTop = target.scrollHeight;

        if (index >= cleanText.length) {
          clearInterval(interval);
          setTypedText(cleanText);
          setDisplayed(cleanText);
          setTimeout(() => onDoneRef.current?.(), 250);
        }
      }, 15);
    }, 350);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [cleanText, shouldStart, typedText, instant, scrollRef]);

  return (
    <p className={className}>
      {displayed}
      {typedText !== cleanText && <span className={caretClassName}>|</span>}
    </p>
  );
}
