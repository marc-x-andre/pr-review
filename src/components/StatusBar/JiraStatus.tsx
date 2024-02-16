import Button from "@mui/joy/Button";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import ConfirmationNumber from "@mui/icons-material/ConfirmationNumber";
import { useState } from "react";
import { useJiraStore } from "../../store/Jira";

export function JiraStatus() {
  const [openJiraModal, setOpenJiraModal] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");
  const { url, setUrl } = useJiraStore();
  return (
    <>
      <Button
        startDecorator={<ConfirmationNumber />}
        color={url ? "success" : "neutral"}
        onClick={() => setOpenJiraModal(true)}
        size="sm"
        variant="soft"
      >
        Jira
      </Button>
      <Modal
        open={openJiraModal}
        onClose={() => {
          setOpenJiraModal(false);
          if (urlInput && urlInput !== "") {
            setUrl(urlInput);
          }
        }}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Set your Jira Instance URL</DialogTitle>
          <DialogContent>
            Stored locally, never displayed again. <br />
            Use to create the PR template
          </DialogContent>
          <FormControl>
            <Input
              placeholder="https://acme.atlassian.org/"
              autoFocus
              required
              onChange={(e) => {
                setUrlInput(e.target.value);
              }}
            />
          </FormControl>
        </ModalDialog>
      </Modal>
    </>
  );
}
