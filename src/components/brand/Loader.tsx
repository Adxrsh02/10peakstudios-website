import { LogoHorizontal3DLight } from './svg/LogoHorizontal3DLight';
import { LoaderController } from './LoaderController';

/**
 * Logo loader (PRD-GLB-04, Design.md 11.6, Architecture.md 9.5). Server-rendered inline SVG of the
 * supplied horizontal light lockup; its parts are revealed in sequence by CSS (src/styles/loader.css)
 * and end exactly as supplied (misuse rules M1 to M9). Shown only when the head bootstrap sets
 * html[data-loader="on"] (first visit per session, motion allowed). Skip: any key, click or the
 * button. Real page content renders underneath; the node is removed after it finishes.
 */
export function Loader() {
  return (
    <LoaderController>
      <div className="tps-loader" role="presentation">
        <LogoHorizontal3DLight aria-hidden="true" className="tps-loader__logo" />
        <button type="button" className="tps-loader__skip">
          Skip intro
        </button>
      </div>
    </LoaderController>
  );
}
