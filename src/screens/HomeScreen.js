import React, { useContext, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import globalStyles, { lightTheme, darkTheme } from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const {
    student,
    theme,
    refreshStudent,
    handleThemeToggle,
  } = useContext(AppContext);

  const colors = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  useEffect(() => {
    refreshStudent();
  }, []);

  const profile = student?.profile || {};
  const profilePicture = profile.profilePicture || '';
  const studentName = profile.name || 'Student';
  const sapId = profile.sapId || 'Not assigned';
  const semester = profile.semester || 'Not set';
  const gpa = profile.gpa || '0.00';
  const cgpa = profile.cgpa || '0.00';

  const firstLetter = studentName?.charAt(0)?.toUpperCase() || 'S';
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topHeader}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={[styles.welcomeText, { color: colors.subText }]}>
              Welcome back
            </Text>
            <Text style={[styles.studentName, { color: colors.text }]}>
              {studentName}
            </Text>
            <Text style={[styles.portalText, { color: colors.subText }]}>
              CampusONE Student Portal
            </Text>
          </View>

         {profilePicture ? (
  <Image source={{ uri: profilePicture }} style={styles.avatarImage} />
) : (
  <View
    style={[
      styles.avatarCircle,
      {
        backgroundColor: colors.primary,
        borderColor: theme === 'dark' ? '#1E293B' : '#DBEAFE',
      },
    ]}
  >
    <Text style={styles.avatarLetter}>{firstLetter}</Text>
  </View>
)}
</View>

        <View
          style={[
            styles.profileCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Academic Profile
              </Text>
              <Text style={[styles.cardSubtitle, { color: colors.subText }]}>
                Your latest saved student details
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.editChip,
                {
                  backgroundColor: theme === 'dark' ? '#1E3A8A' : '#DBEAFE',
                },
              ]}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Ionicons
                name="create-outline"
                size={16}
                color={theme === 'dark' ? '#FFFFFF' : '#1D4ED8'}
              />
              <Text
                style={[
                  styles.editChipText,
                  { color: theme === 'dark' ? '#FFFFFF' : '#1D4ED8' },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>SAP ID</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{sapId}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Semester</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{semester}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { color: colors.text }]}>
          Performance Snapshot
        </Text>

        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              globalStyles.shadowSoft,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.statIconBox,
                { backgroundColor: theme === 'dark' ? '#1E3A8A' : '#DBEAFE' },
              ]}
            >
              <Ionicons
                name="bar-chart-outline"
                size={20}
                color={theme === 'dark' ? '#FFFFFF' : '#1D4ED8'}
              />
            </View>
            <Text style={[styles.statLabel, { color: colors.subText }]}>GPA</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{gpa}</Text>
          </View>

          <View
            style={[
              styles.statCard,
              globalStyles.shadowSoft,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.statIconBox,
                { backgroundColor: theme === 'dark' ? '#14532D' : '#DCFCE7' },
              ]}
            >
              <Ionicons
                name="school-outline"
                size={20}
                color={theme === 'dark' ? '#FFFFFF' : '#166534'}
              />
            </View>
            <Text style={[styles.statLabel, { color: colors.subText }]}>CGPA</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{cgpa}</Text>
          </View>
        </View>

        <View
          style={[
            styles.themeCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.themeLeft}>
            <View
              style={[
                styles.themeIconCircle,
                { backgroundColor: theme === 'dark' ? '#1F2937' : '#EFF6FF' },
              ]}
            >
              <Ionicons
                name={theme === 'dark' ? 'moon-outline' : 'sunny-outline'}
                size={20}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={[styles.themeTitle, { color: colors.text }]}>
                App Theme
              </Text>
              <Text style={[styles.themeSub, { color: colors.subText }]}>
                Switch theme across the whole app
              </Text>
            </View>
          </View>

          <Switch
            value={theme === 'dark'}
            onValueChange={handleThemeToggle}
            thumbColor={theme === 'dark' ? '#FFFFFF' : '#FFFFFF'}
            trackColor={{ false: '#CBD5E1', true: colors.primary }}
          />
        </View>

        <Text style={[styles.sectionHeading, { color: colors.text }]}>
          Quick Access
        </Text>

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
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View
            style={[
              styles.actionIconBox,
              { backgroundColor: theme === 'dark' ? '#1E293B' : '#EFF6FF' },
            ]}
          >
            <Ionicons name="person-outline" size={22} color={colors.primary} />
          </View>

          <View style={styles.actionTextWrap}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              Edit Profile
            </Text>
            <Text style={[styles.actionSubTitle, { color: colors.subText }]}>
              Update your student details and academic info
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.subText} />
        </TouchableOpacity>

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
          onPress={() => navigation.navigate('CoursesTab')}
        >
          <View
            style={[
              styles.actionIconBox,
              { backgroundColor: theme === 'dark' ? '#1E293B' : '#EFF6FF' },
            ]}
          >
            <Ionicons name="book-outline" size={22} color={colors.primary} />
          </View>

          <View style={styles.actionTextWrap}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              Enrolled Courses
            </Text>
            <Text style={[styles.actionSubTitle, { color: colors.subText }]}>
              View your 7 registered courses and timings
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.subText} />
        </TouchableOpacity>

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
          onPress={() => navigation.navigate('SettingsTab')}
        >
          <View
            style={[
              styles.actionIconBox,
              { backgroundColor: theme === 'dark' ? '#1E293B' : '#EFF6FF' },
            ]}
          >
            <Ionicons name="settings-outline" size={22} color={colors.primary} />
          </View>

          <View style={styles.actionTextWrap}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              Settings
            </Text>
            <Text style={[styles.actionSubTitle, { color: colors.subText }]}>
              Manage theme, logout, and reset options
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.subText} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  welcomeText: {
    fontSize: 14,
    marginBottom: 4,
  },

  studentName: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },

  portalText: {
    fontSize: 14,
    lineHeight: 20,
  },

  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },

  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  profileCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 22,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 13,
    lineHeight: 19,
  },

  editChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  editChipText: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },

  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoItem: {
    width: '48%',
  },

  infoLabel: {
    fontSize: 13,
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '700',
  },

  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  statCard: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
  },

  statIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  statLabel: {
    fontSize: 13,
    marginBottom: 6,
  },

  statValue: {
    fontSize: 24,
    fontWeight: '800',
  },

  themeCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    marginBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  avatarImage: {
  width: 64,
  height: 64,
  borderRadius: 32,
  borderWidth: 3,
},

  themeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  themeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },

  themeSub: {
    fontSize: 13,
    lineHeight: 18,
  },

  actionCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  actionTextWrap: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  actionSubTitle: {
    fontSize: 13,
    lineHeight: 18,
  },
});