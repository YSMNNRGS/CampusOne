import React, { useContext, useMemo, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppContext } from '../context/AppContext';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import globalStyles, { lightTheme, darkTheme } from '../styles/globalStyles';

export default function AuthScreen() {
  const { handleLogin, handleSignup, theme } = useContext(AppContext);

  const colors = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupSapId, setSignupSapId] = useState('');
  const [signupSemester, setSignupSemester] = useState('');
  const [signupGpa, setSignupGpa] = useState('');
  const [signupCgpa, setSignupCgpa] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email.trim());

  const validateLogin = () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setMessage('Please enter your email and password.');
      return false;
    }

    if (!validateEmail(loginEmail)) {
      setMessage('Please enter a valid email address.');
      return false;
    }

    if (loginPassword.trim().length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return false;
    }

    setMessage('');
    return true;
  };

  const validateSignup = () => {
    if (
      !signupName.trim() ||
      !signupEmail.trim() ||
      !signupPassword.trim() ||
      !signupSapId.trim() ||
      !signupSemester.trim() ||
      !signupGpa.trim() ||
      !signupCgpa.trim()
    ) {
      setMessage('Please fill in all signup fields.');
      return false;
    }

    if (!validateEmail(signupEmail)) {
      setMessage('Please enter a valid email address.');
      return false;
    }

    if (signupPassword.trim().length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return false;
    }

    if (isNaN(Number(signupGpa)) || Number(signupGpa) < 0 || Number(signupGpa) > 4) {
      setMessage('GPA must be a number between 0 and 4.');
      return false;
    }

    if (isNaN(Number(signupCgpa)) || Number(signupCgpa) < 0 || Number(signupCgpa) > 4) {
      setMessage('CGPA must be a number between 0 and 4.');
      return false;
    }

    setMessage('');
    return true;
  };

  const onLogin = async () => {
    if (!validateLogin()) return;

    try {
      setIsLoading(true);
      setMessage('');

      const result = await handleLogin(loginEmail, loginPassword);

      if (!result.success) {
        setMessage(result.message || 'Login failed.');
        return;
      }

      setMessage('Login successful.');
    } catch (error) {
      console.log('Login error:', error);
      setMessage('Something went wrong while logging in.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async () => {
    if (!validateSignup()) return;

    try {
      setIsLoading(true);
      setMessage('');

      const result = await handleSignup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        sapId: signupSapId,
        semester: signupSemester,
        gpa: signupGpa,
        cgpa: signupCgpa,
      });

      if (!result.success) {
        setMessage(result.message || 'Signup failed.');
        return;
      }

      setMessage('Account created successfully.');
    } catch (error) {
      console.log('Signup error:', error);
      setMessage('Something went wrong while signing up.');
    } finally {
      setIsLoading(false);
    }
  };

  const FormScroll = Platform.OS === 'web' ? ScrollView : KeyboardAwareScrollView;

  return (
    <ImageBackground
      source={require('../../assets/BG1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} pointerEvents="none" />

      <FormScroll
        style={[
          { flex: 1 },
          Platform.OS === 'web' && styles.webFormScroll,
        ]}
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
        <View style={styles.contentWrap}>
          <View style={styles.brandBlock}>
            <Text style={styles.brandTitle}>CampusONE</Text>
            <Text style={styles.brandSubtitle}>
              Your student portal for profile, courses, and campus life.
            </Text>
          </View>

          <View
            style={[
              styles.authCard,
              globalStyles.shadowSoft,
              {
                backgroundColor:
                  theme === 'dark' ? 'rgba(17, 24, 39, 0.92)' : 'rgba(255, 255, 255, 0.94)',
                borderColor: theme === 'dark' ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.modeRow}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  {
                    backgroundColor: !isSignupMode ? colors.primary : 'transparent',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => {
                  setIsSignupMode(false);
                  setMessage('');
                }}
              >
                <Text
                  style={[
                    styles.modeText,
                    { color: !isSignupMode ? '#FFFFFF' : colors.primary },
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modeButton,
                  {
                    backgroundColor: isSignupMode ? colors.primary : 'transparent',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => {
                  setIsSignupMode(true);
                  setMessage('');
                }}
              >
                <Text
                  style={[
                    styles.modeText,
                    { color: isSignupMode ? '#FFFFFF' : colors.primary },
                  ]}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {isSignupMode ? 'Create Your Account' : 'Welcome Back'}
            </Text>
            <Text style={[styles.cardSubTitle, { color: colors.subText }]}>
              {isSignupMode
                ? 'Enter your student details to create a full profile'
                : 'Log in to access your student portal'}
            </Text>

            {!isSignupMode ? (
              <>
                <CustomInput
                  placeholder="Email address"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  iconName="mail-outline"
                  keyboardType="email-address"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />

                <CustomInput
                  placeholder="Password"
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  secureTextEntry={true}
                  iconName="lock-closed-outline"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />
              </>
            ) : (
              <>
                <CustomInput
                  placeholder="Full name"
                  value={signupName}
                  onChangeText={setSignupName}
                  iconName="person-outline"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />

                <CustomInput
                  placeholder="Email address"
                  value={signupEmail}
                  onChangeText={setSignupEmail}
                  iconName="mail-outline"
                  keyboardType="email-address"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />

                <CustomInput
                  placeholder="Password"
                  value={signupPassword}
                  onChangeText={setSignupPassword}
                  secureTextEntry={true}
                  iconName="lock-closed-outline"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />

                <CustomInput
                  placeholder="SAP ID"
                  value={signupSapId}
                  onChangeText={setSignupSapId}
                  iconName="card-outline"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />

                <CustomInput
                  placeholder="Semester"
                  value={signupSemester}
                  onChangeText={setSignupSemester}
                  iconName="layers-outline"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />

                <CustomInput
                  placeholder="GPA"
                  value={signupGpa}
                  onChangeText={setSignupGpa}
                  iconName="bar-chart-outline"
                  keyboardType="decimal-pad"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />

                <CustomInput
                  placeholder="CGPA"
                  value={signupCgpa}
                  onChangeText={setSignupCgpa}
                  iconName="school-outline"
                  keyboardType="decimal-pad"
                  backgroundColor={colors.inputBackground}
                  textColor={colors.text}
                  placeholderTextColor={colors.subText}
                  borderColor={colors.border}
                />
              </>
            )}

            {!!message && (
              <Text
                style={[
                  styles.messageText,
                  {
                    color: message.toLowerCase().includes('success')
                      ? colors.success
                      : colors.danger,
                  },
                ]}
              >
                {message}
              </Text>
            )}

            {!isSignupMode ? (
              <CustomButton
                title="Login"
                onPress={onLogin}
                loading={isLoading}
                backgroundColor={colors.primary}
                textColor="#FFFFFF"
                style={{ marginTop: 4 }}
              />
            ) : (
              <CustomButton
                title="Create Account"
                onPress={onSignup}
                loading={isLoading}
                backgroundColor={colors.primary}
                textColor="#FFFFFF"
                style={{ marginTop: 4 }}
              />
            )}
          </View>
        </View>
      </FormScroll>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 20, 45, 0.55)',
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

  webFormScroll: {
    height: '100vh',
    overflowY: 'auto',
  },

  contentWrap: {
    flex: 1,
    justifyContent: Platform.OS === 'web' ? 'flex-start' : 'center',
  },

  brandBlock: {
    marginBottom: 22,
  },

  brandTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.3,
  },

  brandSubtitle: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 22,
    width: '85%',
  },

  authCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 22,
  },

  modeRow: {
    flexDirection: 'row',
    marginBottom: 18,
    gap: 10,
  },

  modeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },

  modeText: {
    fontSize: 14,
    fontWeight: '700',
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },

  cardSubTitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },

  messageText: {
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '600',
  },
});