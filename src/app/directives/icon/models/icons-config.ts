export interface IconPack {
  prefix: string;

  /**
   * A descriptive name for the icon pack
   */
  name?: string;

  /**
   * Distinguishable name used to target specific icon pack when using the icon directive.
   */
  key: string;

  /**
   * An svg file path or svg element string that contains icon symbols.
   * If a path is provided, its content will be inserted to the `<body>` element at
   * app initialization phase if `embed` property of the injected {@link IconsConfig} is not set to `false`.
   */
  svg: string;

  /**
   * Specifies the default svg attribute to be used for `color` property.
   */
  coloring?: 'fill' | 'stroke' | 'none';

  /**
   * Overrides the default 24x24 icon size in pixels.
   */
  size?: number;

  /** @internal */
  embedded?: boolean;
}

export interface IconsConfig {
  /**
   * Single or multiple icon packs.
   * If an array is provided, the default one is the first one provided.
   */
  pack: IconPack | IconPack[];

  /**
   * Key-value paris to override loaded icon symbols that exist in provided icon packs.
   * The key should hold a string reference to the pack and the symbol (like `fa:twitter`)
   * while the value should be an svg symbol.
   */
  overrides?: {
    [key: string]: string;
  };

  /**
   * Set it to `false` to prevent loading svg symbols into the dom.
   * By default, svg symbols file is inserted to the `<body>` element at app initialization phase.
   */
  embed?: boolean;
}
