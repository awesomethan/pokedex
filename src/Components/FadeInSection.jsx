import React, { useRef, useState, useEffect } from "react";

const FadeInSection = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const node = domRef.current; // snapshot the ref

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const timeout = setTimeout(() => {
      if (node) observer.observe(node);
    }, 50);

    return () => {
      clearTimeout(timeout);
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
