// cftc.theme — component base. Consumers import "cftc.theme/theme.css" once,
// then use these components. Tokens live in tokens/*.json (DTCG) and compile to
// CSS variables via Style Dictionary.

// Typography
export { Eyebrow, eyebrow, type EyebrowProps } from "./components/ui/eyebrow";
export { Label, label, type LabelProps } from "./components/ui/label";
export { Display, display, type DisplayProps } from "./components/ui/display";
export { Heading, heading, type HeadingProps } from "./components/ui/heading";
export { Text, text, type TextProps } from "./components/ui/text";

// Forms
export { Button, button, type ButtonProps } from "./components/ui/button";
export { Input, input, type InputProps } from "./components/ui/input";
export { Textarea, type TextareaProps } from "./components/ui/textarea";
export { Select, type SelectProps, type SelectOption } from "./components/ui/select";
export { Checkbox, type CheckboxProps } from "./components/ui/checkbox";
export { Switch, type SwitchProps } from "./components/ui/switch";
export { OtpInput, type OtpInputProps } from "./components/ui/otp-input";
export { CopyField, type CopyFieldProps } from "./components/ui/copy-field";

// Layout & feedback
export { Panel, panel, type PanelProps } from "./components/ui/panel";
export { Divider, divider, type DividerProps } from "./components/ui/divider";
export { SectionHeader, type SectionHeaderProps } from "./components/ui/section-header";
export { StatStrip, type StatStripProps } from "./components/ui/stat-strip";
export { Alert, alert, type AlertProps } from "./components/ui/alert";
export { Modal, type ModalProps } from "./components/ui/modal";
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedOption,
} from "./components/ui/segmented-control";
export { Pagination, type PaginationProps } from "./components/ui/pagination";
export { Accordion, type AccordionProps, type AccordionItemData } from "./components/ui/accordion";
export { TopBar, type TopBarProps, type NavItem } from "./components/ui/top-bar";
export { Footer, type FooterProps, type FooterLink } from "./components/ui/footer";

// Data display & media
export { Stat, type StatProps } from "./components/ui/stat";
export { ProgressBar, type ProgressBarProps } from "./components/ui/progress-bar";
export { DataList, type DataListProps, type DataColumn } from "./components/ui/data-list";
export {
  DistributionBar,
  type DistributionBarProps,
  type DistributionItem,
} from "./components/ui/distribution-bar";
export { Legend, type LegendProps, type LegendItem } from "./components/ui/legend";
export { Badge, badge, type BadgeProps } from "./components/ui/badge";
export { Ribbon, ribbon, type RibbonProps } from "./components/ui/ribbon";
export { MediaCard, type MediaCardProps } from "./components/ui/media-card";
export { ArticleCard, type ArticleCardProps } from "./components/ui/article-card";
export { SdgCard, type SdgCardProps } from "./components/ui/sdg-card";
export { QuizCard, type QuizCardProps, type QuizAnswer } from "./components/ui/quiz-card";
export { CategoryCard, type CategoryCardProps } from "./components/ui/category-card";
export { SpeciesGrid, type SpeciesGridProps, type SpeciesDatum } from "./components/ui/species-grid";
export { Avatar, avatar, type AvatarProps } from "./components/ui/avatar";
export { Skeleton, type SkeletonProps } from "./components/ui/skeleton";

export { cn } from "./lib/cn";
