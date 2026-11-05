/**
 * Motion tiers (Architecture.md 9.2, Design.md 11.3).
 * 0 = reduced motion; 1 = touch / small viewport / low power / slow network; 2 = full desktop.
 * BOOTSTRAP_SCRIPT applies the same rules before first paint; tests keep the two in sync.
 */
export type MotionTier = 0 | 1 | 2;

export type TierSignals = {
  reducedMotion: boolean;
  coarsePointer: boolean;
  viewportWidth: number;
  saveData?: boolean;
  effectiveType?: string;
  hardwareConcurrency?: number;
  deviceMemory?: number;
};

export function computeTier(s: TierSignals): MotionTier {
  if (s.reducedMotion) return 0;
  const slowNetwork = s.effectiveType ? /(^|-)(2g|3g)$/.test(s.effectiveType) : false;
  const lowPower =
    (s.hardwareConcurrency !== undefined && s.hardwareConcurrency <= 4) ||
    (s.deviceMemory !== undefined && s.deviceMemory <= 4);
  if (s.coarsePointer || s.viewportWidth < 1024 || s.saveData === true || slowNetwork || lowPower)
    return 1;
  return 2;
}

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
};

export function readSignals(): TierSignals {
  const n = navigator as NavigatorWithHints;
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    coarsePointer: window.matchMedia('(hover: none) and (pointer: coarse)').matches,
    viewportWidth: window.innerWidth,
    ...(n.connection?.saveData !== undefined ? { saveData: n.connection.saveData } : {}),
    ...(n.connection?.effectiveType ? { effectiveType: n.connection.effectiveType } : {}),
    ...(n.hardwareConcurrency ? { hardwareConcurrency: n.hardwareConcurrency } : {}),
    ...(n.deviceMemory ? { deviceMemory: n.deviceMemory } : {}),
  };
}

export const LOADER_SEEN_KEY = 'tps.loader.seen';

/**
 * Runs in <head> before first paint (static string, no user data). Sets html[data-motion-tier],
 * html[data-loader] ("on" | "off") and html[data-js]. While the loader plays it also handles
 * skip (any key, click or the Skip button) and completion, marking the loader seen for the session.
 * The loader itself is pure CSS; a CSS fail-safe hides it at 2.2 s even if this never runs.
 */
export const BOOTSTRAP_SCRIPT = `(function(){var d=document.documentElement;try{
var mm=function(q){return window.matchMedia(q).matches};
var n=navigator,c=n.connection||{};
var rm=mm('(prefers-reduced-motion: reduce)');
var slow=/(^|-)(2g|3g)$/.test(c.effectiveType||'');
var low=(n.hardwareConcurrency&&n.hardwareConcurrency<=4)||(n.deviceMemory&&n.deviceMemory<=4);
var t=rm?0:(mm('(hover: none) and (pointer: coarse)')||window.innerWidth<1024||c.saveData===true||slow||low)?1:2;
d.setAttribute('data-motion-tier',String(t));
d.setAttribute('data-js','');
var seen=false;try{seen=sessionStorage.getItem('${LOADER_SEEN_KEY}')==='1'}catch(e){}
if(rm||seen){d.setAttribute('data-loader','off');return}
d.setAttribute('data-loader','on');
var done=function(){if(d.getAttribute('data-loader')!=='on')return;d.setAttribute('data-loader','done');try{sessionStorage.setItem('${LOADER_SEEN_KEY}','1')}catch(e){}};
window.addEventListener('keydown',done,{once:true});
window.addEventListener('pointerdown',done,{once:true});
window.addEventListener('animationend',function(e){if(e.animationName==='tps-loader-out')done()});
setTimeout(done,2300);
}catch(e){d.setAttribute('data-loader','off')}})();`;
