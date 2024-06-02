import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contentContainer: {
    marginVertical: 50,
    paddingHorizontal: 15
  },
  cardContainer: {
    marginTop: 30,
    margin: 10,
    padding: 10
  },
  cardContent: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
    marginBottom: 10
  },
  contentBody: {
    rowGap: 3,
    maxWidth: "80%"
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 20
  }
});
