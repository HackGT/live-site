import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

// The users service caps each page at 100 profiles
const USER_PAGE_LIMIT = 100;

export const fetchAllUsers = async () => {
  const getPage = (offset: number) =>
    axios.get(apiUrl(Service.USERS, "/users"), { params: { limit: USER_PAGE_LIMIT, offset } });

  const firstPage = await getPage(0);
  const pageCount = Math.ceil(firstPage.data.total / USER_PAGE_LIMIT);
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(pageCount - 1, 0) }, (_, i) => getPage((i + 1) * USER_PAGE_LIMIT))
  );

  return [firstPage, ...remainingPages].reduce(
    (profiles: any[], res) => profiles.concat(res.data.profiles),
    []
  );
};

export const getUserLabel = (user: any) => {
  const fullName = [user.name?.first, user.name?.last].filter(Boolean).join(" ");
  if (fullName && user.email) return `${fullName} (${user.email})`;
  return fullName || user.email || user.userId;
};
