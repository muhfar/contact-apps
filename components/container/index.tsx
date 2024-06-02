import { SafeAreaView, View } from "react-native";

import ContainerStyles from "./Container.styles";
import { ContainerProps } from "./Container.types";
import { ActivityIndicator, useTheme } from "react-native-paper";

const Container = (props: ContainerProps): React.JSX.Element => {
  const theme = useTheme();

  const _renderLoading = (): React.JSX.Element => (
    <View style={ContainerStyles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );

  const _renderContent = (props: ContainerProps): React.JSX.Element => (
    <View style={ContainerStyles.contentContainer}>{props.children}</View>
  );

  return (
    <SafeAreaView
      style={[
        ContainerStyles.container,
        { backgroundColor: theme.colors.background }
      ]}
    >
      {props.loading ? _renderLoading() : _renderContent(props)}
    </SafeAreaView>
  );
};

export default Container;
