import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import { useGithubStore } from "../store/Github";
import { useState } from "react";
import data from "@emoji-mart/data";
import CopyAll from "@mui/icons-material/CopyAll";
import Picker from "@emoji-mart/react";
import { useJiraStore } from "../store/Jira";

const CopyToClipboardButton = () => {
  const handleClick = () => {
    var range = document.createRange();
    range.selectNode(document.getElementById("textContent")!);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges(); // clear current selection
      selection.addRange(range); // to select text
      document.execCommand("copy");
      selection.removeAllRanges(); // to deselect
    }
  };

  return (
    <IconButton
      size="sm"
      sx={{
        position: "absolute",
        right: "var(--Alert-padding)",
      }}
      onClick={handleClick}
    >
      <CopyAll />
    </IconButton>
  );
};

export function PRForm() {
  const [openEmojiModal, setOpenEmojiModal] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("🌱");
  const { prInfo, errorPR, setPRInfo } = useGithubStore();
  const { url } = useJiraStore();

  const renderEmojiList = () => {
    const emojis = ["🐛", "🏗️", "💪", "💥", "🌱", "📦", "🎨", "🖼"].map((e) => (
      <Button color="neutral" onClick={() => setEmoji(e)} variant="outlined">
        {e}
      </Button>
    ));

    return [
      ...emojis,
      <Button
        color="neutral"
        onClick={() => setOpenEmojiModal(true)}
        variant="outlined"
      >
        ⁉
      </Button>,
    ];
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Typography level="title-lg">PR Sharing</Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(300px, 300px))",
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <Input
            placeholder="Github URL"
            color={errorPR ? "danger" : prInfo?.title ? "success" : "neutral"}
            onChange={(e) => setPRInfo(e.target.value)}
          />
        </FormControl>

        <Modal
          open={openEmojiModal}
          onClose={() => {
            setOpenEmojiModal(false);
          }}
        >
          <ModalDialog
            sx={{ padding: "0", border: "none", borderRadius: "20px" }}
          >
            <Picker
              data={data}
              onEmojiSelect={(e: { native: string }) => {
                setEmoji(e.native);
                setOpenEmojiModal(false);
              }}
            />
          </ModalDialog>
        </Modal>

        <Stack
          sx={{ gridColumn: "1/-1" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {renderEmojiList()}
        </Stack>

        <Alert
          size="lg"
          sx={{
            gridColumn: "1/-1",
          }}
        >
          <div
            id="textContent"
            style={{
              lineHeight: "0.75rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span>
              {emoji}
              {"   "}
              {prInfo?.title ? prInfo?.title : "Hotfix : Change app name"}
            </span>
            <br />
            <blockquote
              style={{
                lineHeight: "1.5rem",
                textAlign: "left",
                paddingLeft: "0.75rem",
                marginLeft: "0.5rem",
                borderLeft: "3px solid #555",
              }}
            >
              <span>
                PR :{" "}
                <a
                  target="_blank"
                  href={
                    prInfo?.url
                      ? prInfo?.url
                      : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  }
                >
                  {prInfo?.ticket ? prInfo?.ticket : "ABC-XXX"}
                </a>{" "}
                → {prInfo?.branch ? prInfo?.branch : "branch"}
              </span>
              <br />
              <span>
                JIRA:{" "}
                <a
                  target="_blank"
                  href={`${url}/${prInfo?.ticket ? prInfo?.ticket : "ABC-XXX"}`}
                >
                  {url}/{prInfo?.ticket ? prInfo?.ticket : "ABC-XXX"}
                </a>
              </span>
            </blockquote>
          </div>
          <CopyToClipboardButton />
        </Alert>
      </CardContent>
    </Card>
  );
}
