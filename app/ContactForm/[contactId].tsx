import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import {
  Divider,
  HelperText,
  Text,
  Avatar,
  Button,
  useTheme,
  Snackbar,
  Dialog
} from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "@/firebaseConfig";
import { useDispatch } from "react-redux";

import contactSchema from "@/app/ContactForm/ContactForm.validation";
import Container from "@/components/container";
import TextField from "@/components/textfield";
import { Contact, ContactDataType } from "@/types";
import ContactFormStyles from "./ContactForm.styles";
import contactsService from "@/services/contacts";
import { fetchContacts } from "@/redux/actions/contacts.action";

const {
  fetchContacts: fetchContactsApi,
  postContact: postContactApi,
  updateContact: UpdateContactApi
} = contactsService;

const _getDefaultValues = (contact: Contact): ContactDataType => ({
  firstName: contact?.firstName || "",
  lastName: contact?.lastName || "",
  age: contact?.age || 0,
  photo: contact?.photo || ""
});

const ContactForm = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [onUpload, setOnUpload] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { contactId = "new" } = useLocalSearchParams<{ contactId: string }>();
  const { isLoading, data } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => fetchContactsApi(contactId),
    enabled: contactId !== "new"
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<ContactDataType>({
    defaultValues: _getDefaultValues(data?.data as Contact),
    resolver: yupResolver(contactSchema)
  });
  const mutationContact = useMutation({
    mutationFn: (data: ContactDataType) => {
      return contactId === "new"
        ? postContactApi(data)
        : UpdateContactApi(contactId, data);
    },
    onSuccess: () => {
      setSnackbarMessage(
        `Data has been successfully ${contactId === "new" ? "created" : "updated"}`
      );
      setShowSnackbar(true);
      dispatch(fetchContacts());
      router.back();
    }
  });

  const _renderTitlePage = (): React.JSX.Element => (
    <View style={ContactFormStyles.titlePage}>
      <Text variant={"headlineMedium"}>Contact Form</Text>
      <Divider />
    </View>
  );

  const commonAvatarProps = {
    size: 100,
    style: ContactFormStyles.avatar
  };

  const _renderAvatar = (): React.JSX.Element =>
    getValues("photo") ? (
      <Avatar.Image
        source={{ uri: getValues("photo") }}
        {...commonAvatarProps}
      />
    ) : (
      <Avatar.Icon icon="account" {...commonAvatarProps} />
    );

  const onUploadPress = async (): Promise<void> => {
    setOnUpload(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      if (!imageUri) return;
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);

        const reference = ref(firebaseStorage, filename);
        await uploadBytes(reference, blob);

        const downloadURL = await getDownloadURL(reference);

        setValue("photo", downloadURL);
        setSnackbarMessage("Image uploaded");
        setShowSnackbar(true);
      } catch (error: any) {
        setSnackbarMessage("Upload image failed " + error?._baseMessage);
        setShowSnackbar(true);
      }
    }

    setOnUpload(false);
  };

  const _renderUploadButton = (): React.JSX.Element => (
    <Button
      icon="upload"
      mode="contained"
      loading={onUpload}
      onPress={onUploadPress}
      disabled={onUpload}
    >
      Upload image
    </Button>
  );

  const _renderHelperText = (): React.JSX.Element => (
    <HelperText type="error" visible={!!errors.photo?.message}>
      {errors.photo?.message}
    </HelperText>
  );

  const _renderAvatarForm = (): React.JSX.Element => (
    <View style={ContactFormStyles.avatarContainer}>
      {_renderAvatar()}
      {_renderUploadButton()}
      {_renderHelperText()}
    </View>
  );

  const _renderForm = (): React.JSX.Element => (
    <KeyboardAvoidingView>
      <TextField label="First name" name="firstName" control={control} />
      <HelperText type="error" visible={!!errors.firstName?.message}>
        {errors.firstName?.message}
      </HelperText>
      <TextField label="Last name" name="lastName" control={control} />
      <HelperText type="error" visible={!!errors.lastName?.message}>
        {errors.lastName?.message}
      </HelperText>
      <TextField
        label="Age"
        name="age"
        control={control}
        keyboardType="numeric"
      />
      <HelperText type="error" visible={!!errors.age?.message}>
        {errors.age?.message}
      </HelperText>
    </KeyboardAvoidingView>
  );

  const _resetForm = (): void => {
    reset(_getDefaultValues(data?.data as Contact));
  };

  const _renderButtons = (): React.JSX.Element => (
    <View style={ContactFormStyles.buttonsContainer}>
      <Button
        icon="cached"
        mode="contained"
        onPress={_resetForm}
        disabled={onUpload}
        theme={{ colors: { primary: colors.onSurfaceVariant } }}
      >
        Reset
      </Button>
      <Button
        icon="send"
        mode="contained"
        onPress={() => setShowDialog(true)}
        disabled={onUpload}
      >
        Save
      </Button>
    </View>
  );

  const _renderSnackbar = (): React.JSX.Element => (
    <Snackbar visible={showSnackbar} onDismiss={() => setShowSnackbar(false)}>
      {snackbarMessage}
    </Snackbar>
  );

  const _doSubmitForm: SubmitHandler<ContactDataType> = (
    data: ContactDataType
  ): void => {
    setOnUpload(true);

    mutationContact.mutate(data);
  };

  const _onSubmitForm = (): void => {
    setShowDialog(false);
    handleSubmit(_doSubmitForm)();
  };

  const _renderConfirmationDialog = (): React.JSX.Element => (
    <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
      <Dialog.Title>Are you sure?</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{`Are you sure want to ${contactId === "new" ? "add" : "edit"} this contact?`}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={_onSubmitForm}>Yes</Button>
        <Button onPress={() => setShowDialog(false)}>No</Button>
      </Dialog.Actions>
    </Dialog>
  );

  const _renderContent = (): React.JSX.Element => (
    <ScrollView
      style={ContactFormStyles.scrollContainer}
      contentContainerStyle={ContactFormStyles.scrollContent}
    >
      <View style={ContactFormStyles.contentContainer}>
        {_renderTitlePage()}
        {_renderAvatarForm()}
        {_renderForm()}
        {_renderButtons()}
        {_renderSnackbar()}
        {_renderConfirmationDialog()}
      </View>
    </ScrollView>
  );

  useEffect(() => {
    _resetForm();
  }, [data]);

  return <Container loading={isLoading}>{_renderContent()}</Container>;
};

export default ContactForm;
