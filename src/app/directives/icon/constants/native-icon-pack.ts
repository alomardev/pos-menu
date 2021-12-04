import { IconPack } from "../models/icons-config"

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="scp-icon-dialog-close">
    <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </g>
  </symbol>
	<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="scp-icon-collapsible-chevron-down">
    <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </g>
  </symbol>
  <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="scp-icon-paginator-next">
    <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </g>
	</symbol>
	<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="scp-icon-paginator-last">
    <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6.74,18l6,-6l-6,-6"/>
      <path d="M16.244,18l0,-12"/>
    </g>
	</symbol>
  <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="scp-icon-paginator-prev">
    <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </g>
	</symbol>
	<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="scp-icon-paginator-first">
    <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.204,6l-6,6l6,6"/>
      <path d="M7.7,6l0,12"/>
    </g>
	</symbol>
	<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="scp-icon-clear">
    <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M15 9l-6 6M9 9l6 6"/>
    </g>
	</symbol>
</svg>
`

export const NATIVE_ICON_PACK: IconPack = {
  name: 'Library Icons',
  key: 'native',
  svg: svg,
  prefix: 'scp-icon-',
  coloring: 'stroke',
  size: 24,
};
