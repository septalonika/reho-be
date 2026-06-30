const PATTERNS = [
  /[?&]v=([^&#]+)/,
  /youtu\.be\/([^?#]+)/,
  /youtube\.com\/embed\/([^?#]+)/,
  /youtube\.com\/shorts\/([^?#]+)/,
];

export function extractYouTubeId(url: string): string | null {
  for (const pattern of PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
