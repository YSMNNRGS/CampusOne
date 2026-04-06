import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../styles/globalStyles';

export default function CourseCard({ course, index, colors, theme, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        styles.courseCard,
        globalStyles.shadowSoft,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.courseTopRow}>
        <View
          style={[
            styles.courseNumberBox,
            { backgroundColor: theme === 'dark' ? '#1E3A8A' : '#DBEAFE' },
          ]}
        >
          <Text
            style={[
              styles.courseNumberText,
              { color: theme === 'dark' ? '#FFFFFF' : '#1D4ED8' },
            ]}
          >
            {index + 1}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.courseName, { color: colors.text }]}>
            {course.name}
          </Text>
          <Text style={[styles.courseMeta, { color: colors.subText }]}>
            Registered Course
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.subText} />
      </View>

      <View
        style={[
          styles.timingBox,
          {
            backgroundColor: theme === 'dark' ? colors.inputBackground : '#F8FAFC',
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons
          name="time-outline"
          size={18}
          color={colors.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.timingText, { color: colors.text }]}>
          {course.timing}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  courseCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
  },

  courseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  courseNumberBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  courseNumberText: {
    fontSize: 16,
    fontWeight: '800',
  },

  courseName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  courseMeta: {
    fontSize: 13,
  },

  timingBox: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  timingText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});