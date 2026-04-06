import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../context/AppContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import globalStyles, { lightTheme, darkTheme } from '../styles/globalStyles';

export default function EditProfile({ navigation }) {
  const { student, theme, handleProfileUpdate } = useContext(AppContext);

  const colors = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  const [name, setName] = useState('');
  const [sapId, setSapId] = useState('');
  const [semester, setSemester] = useState('');
  const [gpa, setGpa] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [courses, setCourses] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const profile = student?.profile || {};

    setName(profile.name || '');
    setSapId(profile.sapId || '');
    setSemester(profile.semester || '');
    setGpa(profile.gpa ? String(profile.gpa) : '');
    setCgpa(profile.cgpa ? String(profile.cgpa) : '');
    setProfilePicture(profile.profilePicture || '');
    setCourses(profile.courses || []);
  }, [student]);

  const handleCourseChange = (index, field, value) => {
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      updatedCourses[index] = {
        ...updatedCourses[index],
        [field]: value,
      };
      return updatedCourses;
    });
  };

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        setMessage('Permission to access gallery was denied.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfilePicture(result.assets[0].uri);
        setMessage('Profile picture selected.');
      }
    } catch (error) {
      console.log('Image picker error:', error);
      setMessage('Could not open image picker.');
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      setMessage('Please enter the student name.');
      return false;
    }

    if (!semester.trim()) {
      setMessage('Please enter the semester.');
      return false;
    }

    if (!gpa.trim() || isNaN(Number(gpa))) {
      setMessage('Please enter a valid GPA.');
      return false;
    }

    if (!cgpa.trim() || isNaN(Number(cgpa))) {
      setMessage('Please enter a valid CGPA.');
      return false;
    }

    if (Number(gpa) < 0 || Number(gpa) > 4) {
      setMessage('GPA should be between 0 and 4.');
      return false;
    }

    if (Number(cgpa) < 0 || Number(cgpa) > 4) {
      setMessage('CGPA should be between 0 and 4.');
      return false;
    }

    for (let i = 0; i < courses.length; i++) {
      if (!courses[i].name?.trim() || !courses[i].timing?.trim()) {
        setMessage(`Please complete course ${i + 1} name and timing.`);
        return false;
      }
    }

    setMessage('');
    return true;
  };

  const onSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      setMessage('');

      const result = await handleProfileUpdate({
        name: name.trim(),
        sapId: sapId.trim(),
        semester: semester.trim(),
        gpa: Number(gpa).toFixed(2),
        cgpa: Number(cgpa).toFixed(2),
        profilePicture,
        courses,
      });

      if (!result.success) {
        setMessage(result.message || 'Could not save profile.');
        return;
      }

      setMessage('Profile updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.log('Profile update error:', error);
      setMessage('Something went wrong while saving your profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const firstLetter = name?.charAt(0)?.toUpperCase() || 'S';
  const FormScroll = Platform.OS === 'web' ? ScrollView : KeyboardAwareScrollView;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <FormScroll
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS === 'web' && styles.webScrollContent,
        ]}
        {...(Platform.OS !== 'web'
          ? {
              enableOnAndroid: true,
              extraScrollHeight: 100,
            }
          : {})}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
            style={[
              styles.backButton,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>Edit Profile</Text>
            <Text style={[styles.pageSubTitle, { color: colors.subText }]}>
              Update your academic and personal details
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.avatarCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.avatarImage} />
          ) : (
            <View
              style={[
                styles.avatarCircle,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Text style={styles.avatarLetter}>{firstLetter}</Text>
            </View>
          )}

          <View style={{ flex: 1 }}>
            <Text style={[styles.avatarTitle, { color: colors.text }]}>
              Profile Picture
            </Text>
            <Text style={[styles.avatarSubTitle, { color: colors.subText }]}>
              Select an actual image from your device
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={pickImage}
          style={[
            styles.imagePickButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="image-outline" size={20} color={colors.primary} />
          <Text style={[styles.imagePickText, { color: colors.text }]}>
            Choose Profile Picture
          </Text>
        </TouchableOpacity>

        <View
          style={[
            styles.sectionCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Student Information
          </Text>

          <CustomInput
            placeholder="Student name"
            value={name}
            onChangeText={setName}
            iconName="person-outline"
            backgroundColor={colors.inputBackground}
            textColor={colors.text}
            placeholderTextColor={colors.subText}
            borderColor={colors.border}
          />

          <CustomInput
            placeholder="SAP ID"
            value={sapId}
            onChangeText={setSapId}
            iconName="card-outline"
            backgroundColor={colors.inputBackground}
            textColor={colors.text}
            placeholderTextColor={colors.subText}
            borderColor={colors.border}
          />

          <CustomInput
            placeholder="Semester"
            value={semester}
            onChangeText={setSemester}
            iconName="layers-outline"
            backgroundColor={colors.inputBackground}
            textColor={colors.text}
            placeholderTextColor={colors.subText}
            borderColor={colors.border}
          />

          <CustomInput
            placeholder="GPA"
            value={gpa}
            onChangeText={setGpa}
            keyboardType="decimal-pad"
            iconName="bar-chart-outline"
            backgroundColor={colors.inputBackground}
            textColor={colors.text}
            placeholderTextColor={colors.subText}
            borderColor={colors.border}
          />

          <CustomInput
            placeholder="CGPA"
            value={cgpa}
            onChangeText={setCgpa}
            keyboardType="decimal-pad"
            iconName="school-outline"
            backgroundColor={colors.inputBackground}
            textColor={colors.text}
            placeholderTextColor={colors.subText}
            borderColor={colors.border}
          />
        </View>

        <View
          style={[
            styles.sectionCard,
            globalStyles.shadowSoft,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.courseHeaderRow}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Enrolled Courses
              </Text>
              <Text style={[styles.courseSectionSub, { color: colors.subText }]}>
                Edit course titles and timings for all 7 saved courses
              </Text>
            </View>
            <Ionicons name="book-outline" size={22} color={colors.primary} />
          </View>

          {courses.map((course, index) => (
            <View
              key={course.id || index}
              style={[
                styles.courseEditorCard,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.courseLabel, { color: colors.text }]}>
                Course {index + 1}
              </Text>

              <CustomInput
                placeholder="Course name"
                value={course.name}
                onChangeText={(value) => handleCourseChange(index, 'name', value)}
                iconName="library-outline"
                backgroundColor={colors.card}
                textColor={colors.text}
                placeholderTextColor={colors.subText}
                borderColor={colors.border}
              />

              <CustomInput
                placeholder="Course timing"
                value={course.timing}
                onChangeText={(value) => handleCourseChange(index, 'timing', value)}
                iconName="time-outline"
                backgroundColor={colors.card}
                textColor={colors.text}
                placeholderTextColor={colors.subText}
                borderColor={colors.border}
              />
            </View>
          ))}
        </View>

        {!!message && (
          <Text
            style={[
              styles.messageText,
              {
                color:
                  message.toLowerCase().includes('success') ||
                  message.toLowerCase().includes('selected')
                    ? colors.success
                    : colors.danger,
              },
            ]}
          >
            {message}
          </Text>
        )}

        <CustomButton
          title="Save Changes"
          onPress={onSave}
          loading={isSaving}
          backgroundColor={colors.primary}
          textColor="#FFFFFF"
          style={{ marginTop: 6, marginBottom: 24 }}
        />
      </FormScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 120,
  },

  webScrollContent: {
    justifyContent: 'flex-start',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 3,
  },

  pageSubTitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  avatarCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 14,
  },

  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  avatarTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  avatarSubTitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  imagePickButton: {
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  imagePickText: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
  },

  sectionCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },

  courseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  courseSectionSub: {
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 260,
  },

  courseEditorCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },

  courseLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },

  messageText: {
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '600',
  },
});