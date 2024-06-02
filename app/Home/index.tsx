import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  AnimatedFAB,
  Avatar,
  Button,
  Card,
  Dialog,
  Searchbar,
  Snackbar,
  Text,
  useTheme
} from "react-native-paper";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { Contact, ReduxState } from "@/types";
import styles from "@/app/Home/index.styles";
import Container from "@/components/container";
import {
  clearFilterContact,
  fetchContacts,
  filterContact
} from "@/redux/actions/contacts.action";
import contactsService from "@/services/contacts";

const { deleteContact: deleteContactApi } = contactsService;

const Home = (): React.JSX.Element => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { loading, filteredData: contacts } = useSelector(
    (state: ReduxState) => state.contacts
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [extendedFAB, setExtendedFAB] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const mutationDeleteContact = useMutation({
    mutationFn: () => {
      return deleteContactApi(selectedId);
    },
    onSuccess: () => {
      setSnackbarMessage(`Data has been successfully delete`);
      setShowSnackbar(true);
      setSelectedId("");
      dispatch(fetchContacts());
    },
    onError: (error: any) => {
      setSnackbarMessage(error.message);
      setShowSnackbar(true);
      setSelectedId("");
    }
  });

  useEffect(() => {
    setOnSearch(false);
  }, [contacts]);

  const _onDeletePress = (id: string): void => {
    setSelectedId(id);
    setShowDialog(true);
  };

  const _renderItem = (item: Contact): React.JSX.Element => (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: item.photo }} />
        <View style={styles.contentBody}>
          <Text variant="titleLarge" lineBreakMode="tail">
            {item.firstName + " " + item.lastName}
          </Text>
          <Text variant="bodyMedium">{item.age + " years old"}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          icon="account-edit"
          mode="contained"
          onPress={() => router.push("ContactForm/" + item.id)}
        >
          Edit
        </Button>
        <Button
          icon="trash-can"
          mode="contained"
          onPress={() => _onDeletePress(item.id)}
          theme={{ colors: { primary: colors.error } }}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  const _onClearSearch = (): void => {
    setSearchValue("");
    setOnSearch(false);
    dispatch(clearFilterContact());
  };

  const _onRefreshList = (): void => {
    _onClearSearch();
    dispatch(fetchContacts());
  };

  const _renderRefreshControl = (): React.JSX.Element => (
    <RefreshControl refreshing={loading} onRefresh={_onRefreshList} />
  );

  const _onChangeSearch = (query: string): void => setSearchValue(query);

  const _onSearchPress = (): void => {
    setOnSearch(true);
    dispatch(filterContact(searchValue));
  };

  const _renderSearchBar = (): React.JSX.Element => (
    <Searchbar
      value={searchValue}
      onChangeText={_onChangeSearch}
      loading={onSearch}
      onIconPress={_onSearchPress}
      onClearIconPress={_onClearSearch}
      placeholder="Contact name"
    />
  );

  const _renderContactList = (contacts: Contact[]): React.JSX.Element => (
    <FlatList
      data={contacts}
      renderItem={({ item }) => _renderItem(item)}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      refreshControl={_renderRefreshControl()}
    />
  );

  const _renderAddButton = (): React.JSX.Element => (
    <AnimatedFAB
      icon="account-plus"
      label="New contact"
      style={styles.addButton}
      onPress={() => router.push("ContactForm/new")}
      extended={extendedFAB}
      onLongPress={() => setExtendedFAB(true)}
      onTouchEnd={() => setExtendedFAB(false)}
    />
  );

  const _renderContent = (contacts: Contact[]): React.JSX.Element => (
    <View style={styles.contentContainer}>
      {_renderSearchBar()}
      {_renderContactList(contacts)}
    </View>
  );

  const _renderSnackbar = (): React.JSX.Element => (
    <Snackbar visible={showSnackbar} onDismiss={() => setShowSnackbar(false)}>
      {snackbarMessage}
    </Snackbar>
  );

  const _onConfirmDelete = (): void => {
    setShowDialog(false);
    mutationDeleteContact.mutate();
  };

  const _renderConfirmationDialog = (): React.JSX.Element => (
    <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
      <Dialog.Title>Are you sure?</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{`Are you sure want to delete this contact?`}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={_onConfirmDelete}>Yes</Button>
        <Button onPress={() => setShowDialog(false)}>No</Button>
      </Dialog.Actions>
    </Dialog>
  );

  return (
    <Container loading={loading && contacts.length === 0}>
      {_renderContent(contacts)}
      {_renderAddButton()}
      {_renderSnackbar()}
      {_renderConfirmationDialog()}
    </Container>
  );
};

export default Home;
