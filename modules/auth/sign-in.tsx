import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { useAuth } from '../../providers/auth';
import { SignInSchema } from './validation';

export const SignIn = () => {
  const [showPass, setShowPass] = useState(false);

  const { login } = useAuth();

  const toggleHidePass = () => setShowPass((prev) => !prev);

  const onSubmit = (val: any) => {
    console.log('val', val);
    login();
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={onSubmit}
      >
        {({ values, submitForm, setFieldValue, errors }) => (
          <>
            <TextInput
              mode="outlined"
              value={values.email}
              onChangeText={(text) => setFieldValue('email', text)}
              label="Email"
              style={styles.input}
              error={!!errors.email}
            />
            <TextInput
              mode="outlined"
              error={!!errors.password}
              style={styles.input}
              onChangeText={(text) => setFieldValue('password', text)}
              label="Password"
              value={values.password}
              secureTextEntry={!showPass}
              right={
                <TextInput.Icon
                  onPress={toggleHidePass}
                  icon={showPass ? 'eye-off' : 'eye'}
                />
              }
            />
            <Button
              style={styles.button}
              mode="contained-tonal"
              onPress={() => submitForm()}
            >
              Sign In
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  input: {
    width: '90%',
  },
  button: {
    marginTop: 15,
    width: '90%',
    textAlign: 'center',
  },
});
