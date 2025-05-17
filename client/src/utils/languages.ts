export const languages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'ruby',
  'php',
  'go',
  'rust',
  'swift',
  'html',
  'css',
  'sql',
  'markdown',
  'json',
  'yaml',
  'xml',
  'shell',
  'plaintext'
] as const;

export type Language = typeof languages[number]; 