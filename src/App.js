import { Box, Center, Image, Text, Input, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsEqual, setPasswordsEqual] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwordsNotEqualText = "Passwords are not equal";
  const passwordErrorText =
    "Password must be at least 8 characters long, containing a number, a lowercase and an uppercase letter";

  const isValidPassword = useCallback((password) => {
    const re = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    return re.test(String(password));
  }, []);

  useEffect(() => {
    setPasswordError(
      isValidPassword(password) || password === "" ? "" : passwordErrorText
    );
  }, [password, isValidPassword]);

  useEffect(() => {
    setConfirmPasswordError(
      isValidPassword(confirmPassword) || confirmPassword === ""
        ? ""
        : passwordErrorText
    );
  }, [confirmPassword, isValidPassword]);

  useEffect(() => {
    setPasswordsEqual(password !== confirmPassword ? false : true);
  }, [password, confirmPassword]);

  const isPasswordInvalid = passwordError !== "" || !passwordsEqual;
  const isConfirmPasswordInvalid =
    confirmPasswordError !== "" || !passwordsEqual;

  return (
    <Center flexDir="column" minH="100vh">
      <Image
        src="https://res.cloudinary.com/v1b3m/image/upload/v1640323421/AfroPay/ic_launcher_acatiz.png"
        height={16}
      />
      <Box maxW={60}>
        <Text fontSize={24} fontWeight="black" textAlign="center" my={1}>
          Reset Password
        </Text>
        <Box my={1}>
          <Text>New Password:</Text>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={isPasswordInvalid}
          />
          {isPasswordInvalid && (
            <Text color="red.500" fontSize="12px">
              {passwordError !== "" ? passwordError : passwordsNotEqualText}
            </Text>
          )}
        </Box>
        <Box my={1}>
          <Text>Confirm Password:</Text>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={isConfirmPasswordInvalid}
          />
          {isConfirmPasswordInvalid && (
            <Text color="red.500" fontSize="12px">
              {confirmPasswordError !== ""
                ? confirmPasswordError
                : passwordsNotEqualText}
            </Text>
          )}
        </Box>
        <Button my={2}>SUBMIT</Button>
      </Box>
    </Center>
  );
}
