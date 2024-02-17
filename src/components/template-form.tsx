import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Alert from "@mui/joy/Alert";
import { useState } from "react";
import { useJiraStore } from "../store/Jira";

export function TemplateForm() {
  const [title, setTitle] = useState<string>("");
  const [ticket, setTicket] = useState<string>("");
  const [documentation, setDocumentation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { url } = useJiraStore();

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Typography level="title-lg">PR Template</Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(300px, 300px))",
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: "1", gridRow: "1" }}>
          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ gridColumn: "2", gridRow: "1" }}>
          <Input
            placeholder="Ticket"
            onChange={(e) => setTicket(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <Input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <Input
            placeholder="Documentation"
            onChange={(e) => setDocumentation(e.target.value)}
          />
        </FormControl>

        <Alert
          size="lg"
          sx={{
            gridColumn: "1/-1",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              textAlign: "start",
              alignContent: "flex-start",
            }}
          >
            <span>## {title}</span>
            <span>{description}</span>
            {url ? (
              <span>
                [Jira ticket](
                {(url.endsWith("/") ? url : url + "/") + "browse/" + ticket})
              </span>
            ) : (
              <i>Missing Jira URL ↘</i>
            )}
            <span>### Documentation</span>
            {documentation}
          </div>
        </Alert>
      </CardContent>
    </Card>
  );
}
