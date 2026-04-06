import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USERS: 'USERS',
  CURRENT_USER: 'CURRENT_USER',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
  THEME: 'THEME',
};

const defaultCourses = [
  { id: 'c1', name: 'Operating Systems', timing: 'Mon 9:00 AM - 10:30 AM' },
  { id: 'c2', name: 'Database Systems', timing: 'Mon 11:00 AM - 12:30 PM' },
  { id: 'c3', name: 'Software Engineering', timing: 'Tue 9:00 AM - 10:30 AM' },
  { id: 'c4', name: 'Computer Networks', timing: 'Tue 11:00 AM - 12:30 PM' },
  { id: 'c5', name: 'Mobile App Development', timing: 'Wed 9:00 AM - 10:30 AM' },
  { id: 'c6', name: 'Artificial Intelligence', timing: 'Thu 9:00 AM - 10:30 AM' },
  { id: 'c7', name: 'Human Computer Interaction', timing: 'Fri 10:00 AM - 11:30 AM' },
];

const generateId = () => Date.now().toString();

const getItem = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setItem = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getAllUsers = async () => {
  const users = await getItem(STORAGE_KEYS.USERS);
  return users || [];
};

export const saveAllUsers = async (users) => {
  await setItem(STORAGE_KEYS.USERS, users);
};

export const signupUser = async (signupData) => {
  const users = await getAllUsers();
  const normalizedEmail = signupData.email.trim().toLowerCase();

  const exists = users.some((u) => u.email === normalizedEmail);

  if (exists) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const newUser = {
    id: generateId(),
    email: normalizedEmail,
    password: signupData.password.trim(),
    profile: {
      name: signupData.name.trim(),
      sapId: signupData.sapId.trim(),
      semester: signupData.semester.trim(),
      gpa: Number(signupData.gpa).toFixed(2),
      cgpa: Number(signupData.cgpa).toFixed(2),
      profilePicture: '',
      courses: defaultCourses,
    },
  };

  const updatedUsers = [...users, newUser];
  await saveAllUsers(updatedUsers);
  await setItem(STORAGE_KEYS.CURRENT_USER, newUser);
  await setItem(STORAGE_KEYS.IS_LOGGED_IN, true);

  return { success: true, user: newUser };
};

export const loginUser = async (email, password) => {
  const users = await getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const user = users.find((u) => u.email === normalizedEmail);

  if (!user) {
    return { success: false, message: 'No account found with this email.' };
  }

  if (user.password !== cleanPassword) {
    return { success: false, message: 'Incorrect password.' };
  }

  await setItem(STORAGE_KEYS.CURRENT_USER, user);
  await setItem(STORAGE_KEYS.IS_LOGGED_IN, true);

  return { success: true, user };
};

export const logoutUser = async () => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.CURRENT_USER,
    STORAGE_KEYS.IS_LOGGED_IN,
  ]);
};

export const getCurrentUser = async () => {
  return await getItem(STORAGE_KEYS.CURRENT_USER);
};

export const getLoginStatus = async () => {
  const status = await getItem(STORAGE_KEYS.IS_LOGGED_IN);
  return status === true;
};

export const saveTheme = async (theme) => {
  await setItem(STORAGE_KEYS.THEME, theme);
};

export const getSavedTheme = async () => {
  return await getItem(STORAGE_KEYS.THEME);
};

export const clearAppStorage = async () => {
  await AsyncStorage.clear();
};

export const updateCurrentUserProfile = async (updatedProfile) => {
  const users = await getAllUsers();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { success: false, message: 'No user logged in.' };
  }

  const updatedUser = {
    ...currentUser,
    profile: {
      ...currentUser.profile,
      ...updatedProfile,
    },
  };

  const updatedUsers = users.map((u) =>
    u.id === currentUser.id ? updatedUser : u
  );

  await saveAllUsers(updatedUsers);
  await setItem(STORAGE_KEYS.CURRENT_USER, updatedUser);

  return { success: true, user: updatedUser };
};