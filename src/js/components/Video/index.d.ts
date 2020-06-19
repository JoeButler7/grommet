import * as React from "react";
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType, Omit } from "../../utils";

export interface VideoProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  autoPlay?: boolean;
  controls?: "false" | "over" | "below";
  fit?: "cover" | "contain";
  gridArea?: GridAreaType;
  loop?: boolean;
  margin?: MarginType;
  messages?: {
    scrubber?: string,
    meter?: string,
    playButton?: string,
    pauseButton?: string,
    fullScreen?: string,
    volumeUp?: string,
    volueDown?: string,
    closeMenu?: string,
    openMenu?: string};
  mute?: boolean;
}

declare const Video: React.ComponentClass<VideoProps & JSX.IntrinsicElements['video'] & Omit<JSX.IntrinsicElements['video'], 'controls'>>;

export { Video };
