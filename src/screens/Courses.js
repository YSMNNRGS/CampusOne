import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import globalStyles, { lightTheme, darkTheme } from '../styles/globalStyles';

export default function Courses() {
  const { student, theme } = useContext(AppContext);
  const colors = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  const courses = student?.profile?.courses || [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.scrollContent}
      >
        <View style={styles.headerBlock}>
          <Text style={[globalStyles.pageTitle, { color: colors.text }]}>
            Enrolled Courses
          </Text>
          <Text style={[globalStyles.pageSubTitle, { color: colors.subText }]}>
            View your registered courses and class timings
          </Text>
        </View>

        <View
          style={[
            styles.summaryCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.summaryIconWrap,
              { backgroundColor: theme === 'dark' ? '#1E293B' : '#EFF6FF' },
            ]}
          >
            <Ionicons name="book-outline" size={24} color={colors.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[globalStyles.cardTitle, { color: colors.text }]}>
              Current Semester Courses
            </Text>
            <Text style={[globalStyles.cardSubTitle, { color: colors.subText }]}>
              You are currently enrolled in {courses.length} courses
            </Text>
          </View>
        </View>

        {courses.length === 0 ? (
          <View
            style={[
              styles.emptyCard,
              globalStyles.shadowSoft,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={34}
              color={colors.primary}
              style={{ marginBottom: 10 }}
            />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No courses found
            </Text>
            <Text style={[styles.emptySubTitle, { color: colors.subText }]}>
              Your enrolled courses will appear here once they are saved in your profile.
            </Text>
          </View>
        ) : (
          courses.map((course, index) => (
            <CourseCard
              key={course.id || index}
              course={course}
              index={index}
              colors={colors}
              theme={theme}
              onPress={() => {}}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerBlock: {
    marginBottom: 20,
  },

  summaryCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  emptyCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  emptySubTitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});