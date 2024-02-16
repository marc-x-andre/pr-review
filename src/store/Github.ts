import { create } from "zustand";
import { Octokit } from "@octokit/core";

const requestParams = {
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
};

type GithubStore = {
  octokit?: Octokit;
  token?: string;
  showModal: boolean;
  prInfo?: {
    ticket: string;
    branch: string;
    title: string;
    url: string;
  };
  username?: string;
  loading: boolean;
  errorToken: boolean;
  errorPR: boolean;
  setToken: (token: string) => void;
  getUserInfo: () => void;
  setPRInfo: (url: string) => void;
};

export const useGithubStore = create<GithubStore>((set, get) => ({
  octokit: undefined,
  token: undefined,
  showModal: false,
  prInfo: undefined,
  username: undefined,
  loading: false,
  errorToken: false,
  errorPR: false,

  setToken: (token) => {
    localStorage.setItem("gh_token", token);
    set(() => ({
      token,
      octokit: new Octokit({ auth: token }),
    }));
    get().getUserInfo();
  },

  getUserInfo: () => {
    set(() => ({
      loading: true,
      errorToken: false,
    }));
    get()
      .octokit!.request("GET /user", requestParams)
      .then((response: any) => {
        set(() => ({
          username: response.data.login,
        }));
      })
      .catch(() => {
        set(() => ({
          errorToken: true,
        }));
      })
      .finally(() => {
        set(() => ({
          loading: true,
        }));
      });
  },

  setPRInfo: (url: string) => {
    set(() => ({
      errorPR: false,
    }));
    let simplifyUrl = url.replace("https://", "");
    simplifyUrl = simplifyUrl.replace("http://", "");
    const sections = simplifyUrl.split("/");
    if (sections[4]) {
      get()
        .octokit!.request("GET /repos/{owner}/{repo}/pulls/{pull_number}", {
          owner: sections[1],
          repo: sections[2],
          pull_number: sections[4] as any,
          ...requestParams,
        })
        .then((response) => {
          set(() => ({
            prInfo: {
              ticket: response.data.head.ref.split("/")[1],
              branch: response.data.base.ref,
              title: response.data.title,
              url,
            },
          }));
        })
        .catch(() => {
          set(() => ({
            errorPR: true,
          }));
        })
        .finally(() => {
          set(() => ({
            loading: true,
          }));
        });
    } else {
      set(() => ({
        errorPR: true,
        prInfo: undefined,
      }));
    }
  },
}));
