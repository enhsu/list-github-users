import { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { getErrorMessage } from "~/utils/getErrorMessage";
import { RootState, ThunkType } from "..";
import { UserType } from "./slice";

export enum Actions {
  FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST",
  FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS",
  FETCH_ONE_DATA_SUCCESS = "FETCH_ONE_DATA_SUCCESS",
  FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE",
  FETCH_DATA = "FETCH_DATA",
}

// export const fetchData = () => {
//   return {
//     type: Actions.FETCH_DATA,
//   };
// };

export const fetchDataSucces = (response: UserType[]) => {
  return {
    type: Actions.FETCH_DATA_SUCCESS,
    payload: { response },
  };
};

export const fetchOneDataSuccess = (response: UserType) => {
  return {
    type: Actions.FETCH_ONE_DATA_SUCCESS,
    payload: { response },
  };
};

export const fetchDataFailure = (error: unknown) => {
  return {
    type: Actions.FETCH_DATA_FAILURE,
    payload: { error: getErrorMessage(error) },
  };
};

export const fetchDataRequest = () => {
  return {
    type: Actions.FETCH_DATA_REQUEST,
  };
};

export const fetchUsers =
  (since: number = 0): ThunkType =>
  async (dispatch) => {
    dispatch(fetchDataRequest());
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Accept: "application/vnd.github+json",
      },
      baseURL: "https://api.github.com/users",
      method: "get",
      params: {
        since: since,
        per_page: 20,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);

        const users = response.data as UserType[];
        console.log(users);
        dispatch(fetchDataSucces(users));
      })
      .catch((err) => {
        dispatch(fetchDataFailure(err));
      });
  };

export const fetchUser =
  (user: string = ""): ThunkType =>
  async (dispatch) => {
    dispatch(fetchDataRequest());
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Accept: "application/vnd.github+json",
      },
      baseURL: "https://api.github.com/users",
      url: user,
      method: "get",
    };
    axios(axiosConfig)
      .then((response) => {
        console.log("user: ", response);
        const user = response.data as UserType;
        dispatch(fetchOneDataSuccess(user));
      })
      .catch((err) => {
        dispatch(fetchDataFailure(err));
      });
  };
