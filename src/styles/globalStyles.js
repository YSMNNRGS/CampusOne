import { StyleSheet } from 'react-native';

export const lightTheme = {
  background: '#F4F7FB',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  primary: '#1D4ED8',
  primaryDark: '#1E3A8A',
  text: '#0F172A',
  subText: '#475569',
  border: '#D9E2EC',
  inputBackground: '#F8FAFC',
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
  muted: '#94A3B8',
};

export const darkTheme = {
  background: '#0F172A',
  surface: '#111827',
  card: '#1E293B',
  primary: '#3B82F6',
  primaryDark: '#1D4ED8',
  text: '#F8FAFC',
  subText: '#CBD5E1',
  border: '#334155',
  inputBackground: '#1F2937',
  danger: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  muted: '#94A3B8',
};

const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 28,
  },

  card: {
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
  },

  smallCard: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
  },

  shadowSoft: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },

  pageSubTitle: {
    fontSize: 14,
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },

  cardSubTitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default globalStyles;