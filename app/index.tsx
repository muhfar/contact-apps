import { useDispatch } from "react-redux";
import { Redirect } from "expo-router";
import { useEffect } from "react";

import { fetchContacts } from "@/redux/actions/contacts.action";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return <Redirect href={"Home"} />;
}
