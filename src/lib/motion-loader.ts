/**
 * Lazy GSAP loader (Architecture.md 9.1, plan section 4). GSAP, ScrollTrigger, SplitText and
 * CustomEase are imported on demand after hydration so they stay out of the critical bundle.
 * The brand "rise" curve is registered as the "peakRise" ease (Design.md 11.4).
 */
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import type { SplitText as SplitTextType } from 'gsap/SplitText';

export type MotionLib = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  SplitText: typeof SplitTextType;
};

let pending: Promise<MotionLib> | null = null;

export function loadMotion(): Promise<MotionLib> {
  pending ??= Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/SplitText'),
    import('gsap/CustomEase'),
  ]).then(([g, st, sp, ce]) => {
    const gsap = g.gsap;
    gsap.registerPlugin(st.ScrollTrigger, sp.SplitText, ce.CustomEase);
    ce.CustomEase.create('peakRise', '0.2,0.7,0.2,1');
    gsap.defaults({ ease: 'peakRise' });
    st.ScrollTrigger.config({ ignoreMobileResize: true });
    return { gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText };
  });
  return pending;
}
