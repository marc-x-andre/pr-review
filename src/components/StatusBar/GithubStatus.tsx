import Button from "@mui/joy/Button";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import GitHub from "@mui/icons-material/GitHub";
import { useGithubStore } from "../../store/Github";
import { useState } from "react";

export function GithubStatus() {
  const [openGithubModal, setOpenGithubModal] = useState<boolean>(false);
  const [tokenInput, setTokenInput] = useState<string>("");
  const { username, errorToken, setToken } = useGithubStore();
  return (
    <>
      <Button
        startDecorator={<GitHub />}
        color={errorToken ? "danger" : username ? "success" : "neutral"}
        onClick={() => setOpenGithubModal(true)}
        size="sm"
        variant="soft"
      >
        {username || (errorToken ? "invalid" : "Github")}
      </Button>
      <Modal
        open={openGithubModal}
        onClose={() => {
          setOpenGithubModal(false);
          if (tokenInput && tokenInput !== "") {
            setToken(tokenInput);
          }
        }}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Set your Github token</DialogTitle>
          <DialogContent>Stored locally, never displayed again</DialogContent>
          <FormControl>
            <Input
              placeholder="gh_token"
              autoFocus
              required
              onChange={(e) => {
                setTokenInput(e.target.value);
              }}
            />
          </FormControl>
        </ModalDialog>
      </Modal>
    </>
  );
}
