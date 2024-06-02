import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  scrollContent: {
    flexGrow: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  formContainer: {
    flex: 1
  },
  titlePage: {
    marginBottom: 20
  },
  avatarContainer: {
    alignItems: "center"
  },
  avatar: {
    marginBottom: 15
  },
  buttonsContainer: {
    rowGap: 20,
    justifyContent: "flex-end"
  }
});
