import Authenticate from "./components/Authenticate";

export default function App() {

  const [isVisible, setIsVisible] = useState(true);
  const [logins, setLogins] = useState(["test@gmail.com"]);

  /**
   * Each callback should return object that contains success and/or error.
   * @param {Object} data
   * @returns {{ success: Boolean, error: String }}
   */
  const submitAuth = async(data, route) => {
      const signUpRaw = await fetch(`http://test.com/${route}`, {
          method: "POST", 
          body: JSON.stringify(data)
      });
      if(signUpRaw.status !== 200) {
          return {
              success: false,
              error: await signUpRaw.text()
          };
      }
      const { emails } = await signUpRaw.json();
      setLogins(emails);
      return {
          success: true
      };
  };

  const submitSignIn = async (data) => await submitAuth(data, "signin");
  const submitSignUp = async (data) => await submitAuth(data, "signup");
  const submitBioLogin = async (data) => await submitAuth(data, "biologin");
  const submitPinCodeRequest = async (data) => await submitAuth(data, "reset");
  const submitNewPassword = async (data) => await submitAuth(data, "doreset");



  return (
    <Authenticate
    visible={isVisible}
    onLogin={submitSignIn} 
    onSignUp={submitSignUp}
    onBioLogin={submitBioLogin}
    logins={logins}
    onPinCodeRequest={submitPinCodeRequest}
    onSubmitNewPassword={submitNewPassword}
    enableBio={true}
>
    <Text>Challenge</Text>

</Authenticate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
