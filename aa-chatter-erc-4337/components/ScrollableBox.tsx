"use client";
import { useState, useEffect, useRef } from 'react'

//https://dev.to/martinez/real-scroll-for-a-chat-application-22co
export function ScrollableBox({ children, className }: { children: React.ReactNode, className: string }) {
  const container = useRef<HTMLDivElement>(null)
  const [forceScroll, setForceScroll] = useState<boolean>(true);

  const Scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = container.current as HTMLDivElement
    if (scrollHeight <= scrollTop + offsetHeight + 100 || forceScroll) {
      container.current?.scrollTo({top: scrollHeight})
    }
  }

  useEffect(() => {
    Scroll()
  }, [children])


  return <div ref={container} className={[className, "scroll-smooth"].join(" ")} onScroll={() => setForceScroll(false)}>{children}</div>
}