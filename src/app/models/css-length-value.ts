export type CSSAbsoluteLength = `${number}${'cm'|'mm'|'Q'|'in'|'pc'|'pt'|'px'}`;
export type CSSRelativeLength = `${number}${'em'|'ex'|'ch'|'rem'|'lh'|'vw'|'vh'|'vmin'|'vmax'}`;

export type CSSLengthValue = CSSAbsoluteLength | CSSRelativeLength;
