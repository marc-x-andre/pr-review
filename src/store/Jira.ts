import { create } from "zustand";

type JiraStore = {
  url?: string;
  setUrl: (url: string) => void;
};

export const useJiraStore = create<JiraStore>((set) => ({
  url: undefined,
  setUrl: (url) => {
    localStorage.setItem("jira_url", url);
    set(() => ({
      url,
    }));
  },
}));
