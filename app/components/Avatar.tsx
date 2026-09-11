import Image from "next/image";

type Size = "s" | "m" | "l";
type Tone = "subtle" | "solid" | "neutral";

const sizes: Record<Size, { box: string; text: string; px: number }> = {
  s: { box: "size-8", text: "text-label-s", px: 32 },
  m: { box: "size-10", text: "text-label-m", px: 40 },
  l: { box: "size-14", text: "font-display text-title-s", px: 56 },
};

const tones: Record<Tone, string> = {
  subtle: "bg-brand-subtle text-content-brand",
  solid: "bg-brand text-on-brand",
  neutral: "bg-muted text-content-muted",
};

interface AvatarProps {
  name?: string;
  /** Photo URL. Without a photo, shows the initials from `name`. */
  src?: string;
  size?: Size;
  /** `subtle` (light lilac background) is the default; `solid` is a full purple background, e.g. navbar; `neutral` is gray, e.g. a pending/inactive person. */
  tone?: Tone;
  className?: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({
  name = "Marina Rocha",
  src,
  size = "s",
  tone = "subtle",
  className = "",
}: AvatarProps) {
  const { box, text, px } = sizes[size];

  return (
    <span
      className={`relative inline-flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-full ${tones[tone]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={`${px}px`}
          className="object-cover"
        />
      ) : (
        <span className={text}>{initials(name)}</span>
      )}
    </span>
  );
}
