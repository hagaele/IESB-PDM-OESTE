export const themes = {
  light: {
    background: '#FFFFFF',
    card: '#EBECF9',
    text: '#1E1E24',
    primary: '#4757B8',
    onPrimary: '#FFFFFF',
    textMuted: '#6B7280',
    border: '#C5C8E6',
    inputBackground: '#FFFFFF',
    error: '#E31E24',
    summaryBackground: '#DDE0F5',
    summaryText: '#2A3380',
    tagBackground: '#DDE0F5',
    tagText: '#1E1E24',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    background: '#1E1E24',
    card: '#2F2F37',
    text: '#F5F5F7',
    primary: '#A6ACE4',
    onPrimary: '#1E1E24',
    textMuted: '#A1A1AA',
    border: '#46464F',
    inputBackground: '#2F2F37',
    error: '#FF6B6B',
    summaryBackground: '#3A3A45',
    summaryText: '#F5F5F7',
    tagBackground: '#46464F',
    tagText: '#F5F5F7',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

export function getColors(scheme) {
  return themes[scheme === 'dark' ? 'dark' : 'light'];
}