// cftc.theme — component base. Consumers import "cftc.theme/theme.css" once,
// then use these components. Tokens live in tokens/*.json (DTCG) and compile to
// CSS variables via Style Dictionary.

export { Eyebrow, eyebrow, type EyebrowProps } from "./components/ui/eyebrow";
export { Display, display, type DisplayProps } from "./components/ui/display";
export { Heading, heading, type HeadingProps } from "./components/ui/heading";
export { Text, text, type TextProps } from "./components/ui/text";
export { Button, button, type ButtonProps } from "./components/ui/button";
export { Input, input, type InputProps } from "./components/ui/input";
export { OtpInput, type OtpInputProps } from "./components/ui/otp-input";
export { Panel, panel, type PanelProps } from "./components/ui/panel";
export { Stat, type StatProps } from "./components/ui/stat";
export { ProgressBar, type ProgressBarProps } from "./components/ui/progress-bar";
export { Divider, divider, type DividerProps } from "./components/ui/divider";
export { Badge, badge, type BadgeProps } from "./components/ui/badge";
export { TopBar, type TopBarProps, type NavItem } from "./components/ui/top-bar";

export { cn } from "./lib/cn";
