import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import globalStyles, { lightTheme, darkTheme } from '../styles/globalStyles';

export default function Settings() {
  const {
    theme,
    handleThemeToggle,
    handleLogout,
    handleResetApp,
    student,
  } = useContext(AppContext);

  const colors = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  const currentThemeLabel = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  const studentName = student?.profile?.name || 'Student';

  const confirmLogout = () => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm('Are you sure you want to log out of CampusONE?');
    if (confirmed) {
      handleLogout();
    }
    return;
  }

  Alert.alert(
    'Logout',
    'Are you sure you want to log out of CampusONE?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await handleLogout();
        },
      },
    ]
  );
};

const confirmReset = () => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm(
      'This will clear all saved accounts, session data, theme settings, and student information. Continue?'
    );
    if (confirmed) {
      handleResetApp();
    }
    return;
  }

  Alert.alert(
    'Reset App Data',
    'This will clear all saved accounts, session data, theme settings, and student information from AsyncStorage. This action cannot be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await handleResetApp();
        },
      },
    ]
  );
};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerBlock}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.pageSubTitle, { color: colors.subText }]}>
            Manage your app appearance, session, and saved data
          </Text>
        </View>

        <View
          style={[
            styles.accountCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.accountIconWrap,
              { backgroundColor: theme === 'dark' ? '#1E293B' : '#EFF6FF' },
            ]}
          >
            <Ionicons name="person-circle-outline" size={28} color={colors.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.accountTitle, { color: colors.text }]}>
              {studentName}
            </Text>
            <Text style={[styles.accountSubTitle, { color: colors.subText }]}>
              CampusONE active student account
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>

        <View
          style={[
            styles.settingCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.settingLeft}>
            <View
              style={[
                styles.settingIconBox,
                { backgroundColor: theme === 'dark' ? '#1F2937' : '#EFF6FF' },
              ]}
            >
              <Ionicons
                name={theme === 'dark' ? 'moon-outline' : 'sunny-outline'}
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                App Theme
              </Text>
              <Text style={[styles.settingSubTitle, { color: colors.subText }]}>
                Apply {currentThemeLabel.toLowerCase()} across the whole app
              </Text>
            </View>
          </View>

          <Switch
            value={theme === 'dark'}
            onValueChange={handleThemeToggle}
            thumbColor="#FFFFFF"
            trackColor={{ false: '#CBD5E1', true: colors.primary }}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Session</Text>

        <TouchableOpacity
          activeOpacity={0.88}
          style={[
            styles.actionCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={confirmLogout}
        >
          <View style={styles.settingLeft}>
            <View
              style={[
                styles.settingIconBox,
                { backgroundColor: theme === 'dark' ? '#1F2937' : '#EFF6FF' },
              ]}
            >
              <Ionicons name="log-out-outline" size={22} color={colors.primary} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Logout
              </Text>
              <Text style={[styles.settingSubTitle, { color: colors.subText }]}>
                Sign out from your current student session
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.subText} />
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Danger Zone</Text>

        <TouchableOpacity
          activeOpacity={0.88}
          style={[
            styles.actionCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: theme === 'dark' ? '#7F1D1D' : '#FECACA',
            },
          ]}
          onPress={confirmReset}
        >
          <View style={styles.settingLeft}>
            <View
              style={[
                styles.settingIconBox,
                { backgroundColor: theme === 'dark' ? '#3F1D1D' : '#FEF2F2' },
              ]}
            >
              <Ionicons name="trash-outline" size={22} color={colors.danger} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.settingTitle, { color: colors.danger }]}>
                Reset App Data
              </Text>
              <Text style={[styles.settingSubTitle, { color: colors.subText }]}>
                Clear all saved users, theme, session, and student data
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.subText} />
        </TouchableOpacity>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.infoText, { color: colors.subText }]}>
            Theme changes are saved in AsyncStorage and applied globally to all screens.
            Reset removes all locally saved app data.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,
  },

  headerBlock: {
    marginBottom: 20,
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

  accountCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  accountTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },

  accountSubTitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 12,
  },

  settingCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },

  settingIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  settingSubTitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  infoCard: {
    marginTop: 6,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
});