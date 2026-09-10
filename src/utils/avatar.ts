export type AvatarPreset = [string, string];

export const AVATAR_PRESETS: AvatarPreset[] = [
  ['#b3872a', '#0f6b4d'],
  ['#7a5a95', '#0ea5e9'],
  ['#b3423a', '#f59e0b'],
  ['#14b8a6', '#22c55e'],
  ['#ec4899', '#f472b6'],
  ['#6366f1', '#a07cc5'],
  ['#f59e0b', '#ef4444'],
  ['#14b8a6', '#06b6d4'],
];

export function generateAvatarGradient(colors: AvatarPreset): string {
  return `linear-gradient(150deg, ${colors[0]}, ${colors[1]})`;
}

export function getAvatarColor(index: number): AvatarPreset {
  return AVATAR_PRESETS[index % AVATAR_PRESETS.length];
}

export function hashStringToPreset(str: string): AvatarPreset {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_PRESETS[Math.abs(hash) % AVATAR_PRESETS.length];
}
