export type BrandColor = keyof typeof brandColors;

export const brandColors = {
  react: '#00d8ff',
  javascript: '#f7df1e',
  typescript: '#3178c6',
  facebook: '#1877f2',
  twitter: '#1da1f2',
  instagram: '#e1306c',
  github: '#6e5494',
} as const;
