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
import { useGithubStore } from "../store/Github";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export function PRForm() {
  const [openEmojiModal, setOpenEmojiModal] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("🌱");
  const { prInfo, errorPR, setPRInfo } = useGithubStore();

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
      <Typography level="title-lg">PR Message</Typography>
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
            style={{
              lineHeight: "1.75em",
            }}
          >
            <span>
              {emoji} PR :{" "}
              <a
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
            <blockquote
              style={{
                borderLeft: "solid #a5a5a5 3px",
                borderRadius: "2px",
                display: "flex",
                paddingLeft: "1rem",
              }}
            >
              {prInfo?.title ? prInfo?.title : "Hotfix : Change app name"}
            </blockquote>
          </div>
        </Alert>
      </CardContent>
    </Card>
  );
}
