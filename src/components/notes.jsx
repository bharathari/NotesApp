import * as React from "react";
import {
  Sheet,
  Box,
  Grid,
  styled,
  Button,
  Typography,
  FormLabel,
  Input,
  DialogActions,
  FormControl,
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  DialogContent,
  Textarea,
  Card,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/joy";
import * as Yup from "yup";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Backdrop } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import PushPinIcon from '@mui/icons-material/PushPin';
const initialNotes = [

  {
    title: "hello2",
    tagline: "sample tagline2",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit. ",
  },
  {
    title: "hello3",
    tagline: "sample tagline3",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit.",
  },
  {
    title: "hello4",
    tagline: "sample tagline4",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit.",
  },
  {
    title: "hello5",
    tagline: "sample tagline5",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit.",
  },
  {
    title: "hello6",
    tagline: "sample tagline6",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit.",
  },
  {
    title: "hello8",
    tagline: "sample tagline6",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit.",
  },
  {
    title: "hello7",
    tagline: "sample tagline6",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit.",
  },
  // Add more notes if needed
];
const newNote = {
  title: "",
  tagline: "",
  body: "",
};
const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  tagline: Yup.string().required("tagline is required"),
  body: Yup.string().required("body is required"),
});

export default function SimpleSheet() {
  const [note, setNotes] = React.useState(initialNotes);
  const [pinnedNotes, setPinnedNotes] = React.useState([  {
    title: "hello1",
    tagline: "sample tagline1",
    body: "this is for testing purpose Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores iusto veniam? Recusandae impedit animi sit vitae sint numquam pariatur sunt facilis nobis ducimus minus deleniti, molestias tenetur, iste odit.",
  },]);
  const [upload, toggleUpload] = React.useState(false);
  const [view, toggleView] = React.useState(false);
  const [selectedDataItem, setSelectedDataItem] = React.useState(null);

  // Pagination state
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(note.length / itemsPerPage);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: newNote,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handlePin = (index,e) => {
    const newPinnedNote = note[index];
    const updatedNotes = note.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setPinnedNotes([...pinnedNotes, newPinnedNote]);
  };
  const Unpin=(index)=>{
    const newUnpin=pinnedNotes[index];
    const updatedPinnedNotes=pinnedNotes.filter((_,i)=>i!==index);
    setPinnedNotes(updatedPinnedNotes);
    setNotes([newUnpin,...note]);

  }
  const onSubmit = (data) => {
    setNotes([...note, data]);
    toggleUpload(false);
    reset(newNote);
  };

  const handleOpenUserMod = (dataIndex) => {
    toggleView(true);
    setSelectedDataItem(note[dataIndex]);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedNotes = note.slice(startIndex, startIndex + itemsPerPage);

  const NoteTitle = styled(Box)({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover .icons": {
      visibility: "visible",
    },
  });

  const Icons = styled(Box)({
    visibility: "hidden",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  });

  return (
    <>
      <Box
        sx={{
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          mt: "2em",
        }}
      >
        <Sheet
          variant="outlined"
          color="neutral"
          sx={{ p: 4, pt: 1, borderRadius: "0.5em", maxWidth: "38em" }}
        >
          {pinnedNotes.length > 0 && (
            <>
              <Typography variant="h1" component="h2">
                Pinned Notes
              </Typography>
              <br />
              <Grid
                container
                spacing={{ xs: 4, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 8 }}
                sx={{ flexGrow: 1 }}
              >
                {pinnedNotes.map((note, index) => (
                  <Grid xs={6} sm={4} md={4} key={index}>
                    <Stack sx={{ maxWidth: "60ch" }}>
                      <Card
                        onClick={() => handleOpenUserMod(index)}
                        sx={{
                          cursor: "pointer",
                          maxWidth: "20em",
                          backgroundColor: "#e5f9fe",
                        }}
                      >
                        <NoteTitle>
                          <Typography level="title-lg">{note.title}</Typography>
                          <Icons className="icons">
                            

                            <Tooltip title="Unpin">
                              <IconButton onClick={()=>{Unpin(index)}}>
                                <PushPinIcon />
                              </IconButton>
                            </Tooltip>
                          </Icons>
                        </NoteTitle>
                        <Typography level="body-md" sx={{ opacity: "50%" }}>
                          {note.tagline}
                        </Typography>
                      </Card>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          <Typography variant="h1" component="h2">
            Notes
          </Typography>
          <br />
          <Grid
            container
            spacing={{ xs: 4, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 8 }}
            sx={{ flexGrow: 1 }}
          >
            {paginatedNotes.map((note, index) => (
              <Grid xs={6} sm={4} md={4} key={index}>
                <Stack sx={{ maxWidth: "60ch" }}>
                  <Card
                    onClick={() => handleOpenUserMod(startIndex + index)}
                    sx={{
                      cursor: "pointer",
                      maxWidth: "20em",
                      backgroundColor: "#e5f9fe",
                    }}
                  >
                    <NoteTitle>
                      <Typography level="title-lg">{note.title}</Typography>
                      <Icons className="icons">

                        <IconButton
                          onClick={() => handlePin(startIndex + index)}
                        >
                          <PushPinOutlinedIcon />
                        </IconButton>
                      </Icons>
                    </NoteTitle>
                    <Typography level="body-md" sx={{ opacity: "50%" }}>
                      {note.tagline}
                    </Typography>
                  </Card>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </Button>
            <Box>
              <Button
                onClick={handleNextPage}
                sx={{ mr: 1 }}
                disabled={page === totalPages}
              >
                Next
              </Button>
              <Button onClick={() => toggleUpload(true)}>Add Notes</Button>
            </Box>
          </Box>
        </Sheet>
      </Box>
      <Modal
        open={upload}
        onClose={() => toggleUpload(false)}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: "hsla(341, 0%, 94%, 0.4)" },
          },
        }}
      >
        <ModalDialog variant="outlined" role="dialog" sx={{ width: "35em" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
              <FileUploadOutlinedIcon />
              Add Notes
            </DialogTitle>
            <Divider />
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <FormControl>
                  <br />
                  <FormLabel>Title</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Type Here"
                    {...register("title")}
                  />
                  {errors.title && (
                    <Box
                      sx={{
                        display: "flex",
                        mt: "0.1em",
                        mb: "1em",
                        ml: "1em",
                      }}
                    >
                      <ErrorOutlineOutlined
                        sx={{ marginRight: "0.2em", fontSize: "1em" }}
                      />
                      <Typography color="error" sx={{ fontSize: "0.8em" }}>
                        {errors.title.message}
                      </Typography>
                    </Box>
                  )}
                  <FormLabel>Tag Line</FormLabel>
                  <Input
                    size="md"
                    placeholder="Type Here"
                    {...register("tagline")}
                  />
                  {errors.tagline && (
                    <Box
                      sx={{
                        display: "flex",
                        mt: "0.1em",
                        mb: "1em",
                        ml: "1em",
                      }}
                    >
                      <ErrorOutlineOutlined
                        sx={{ marginRight: "0.2em", fontSize: "1em" }}
                      />
                      <Typography color="error" sx={{ fontSize: "0.8em" }}>
                        {errors.tagline.message}
                      </Typography>
                    </Box>
                  )}
                  <FormLabel>Body</FormLabel>
                  <Textarea
                    placeholder="Type here"
                    sx={{ mb: 1 }}
                    {...register("body")}
                  />
                  {errors.body && (
                    <Box
                      sx={{
                        display: "flex",
                        mt: "0.1em",
                        mb: "1em",
                        ml: "1em",
                      }}
                    >
                      <ErrorOutlineOutlined
                        sx={{ marginRight: "0.2em", fontSize: "1em" }}
                      />
                      <Typography color="error" sx={{ fontSize: "0.8em" }}>
                        {errors.body.message}
                      </Typography>
                    </Box>
                  )}
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" type="submit">
                Add Note
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => toggleUpload(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </ModalDialog>
      </Modal>
      <Modal
        open={view}
        onClose={() => toggleView(false)}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: "hsla(175, 100%, 100%, 0.3)" },
          },
        }}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Notes</DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              height: "auto",
              maxHeight: "200px",
              overflowY: "scroll",
            }}
          >
            <Sheet>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography level="title-lg" sx={{ mr: 4 }}>
                  Title:{" "}
                </Typography>
                {selectedDataItem?.title}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography level="title-lg" sx={{ mr: 1 }}>
                  Tagline:
                </Typography>
                {selectedDataItem?.tagline}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography level="title-lg" sx={{ mr: 3 }}>
                  Body:{" "}
                </Typography>
                {selectedDataItem?.body}
              </Box>
            </Sheet>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => toggleView(false)}>
              Close
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
