// import { ActionBase } from ..;
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Actions } from "./action";

export interface UserType {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable?: false;
  bio?: string;
  twitter_username?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
  two_factor_authentication?: boolean;
  plan?: {
    name: string;
    space: number;
    private_repos: number;
    collaborators: number;
  };
}

export interface AsyncDataType {
  loading: boolean;
  users: UserType[] | null;
  user: UserType | null;
  error: string;
}

export const initialState: AsyncDataType = {
  loading: false,
  users: null,
  user: null,
  error: "",
};

export const asyncDataReducer = (
  state: AsyncDataType = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case Actions.FETCH_DATA_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
      };
    case Actions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.response,
        error: "",
      };
    case Actions.FETCH_ONE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.response,
        error: "",
      };
    case Actions.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const selectUsers = (state: RootState) => state.asyncData.users;

export const selectUser = (state: RootState) => state.asyncData.user;
