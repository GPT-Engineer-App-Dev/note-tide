import { useState } from 'react';
import { Box, Button, Input, Textarea, SimpleGrid, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p="4" borderWidth="1px" borderRadius="lg">
    <Input value={note.title} onChange={(e) => onEdit(note.id, e.target.value, note.content)} variant="unstyled" fontSize="xl" fontWeight="bold" />
    <Textarea value={note.content} onChange={(e) => onEdit(note.id, note.title, e.target.value)} variant="unstyled" mt="2" />
    <Button leftIcon={<FaTrash />} colorScheme="red" variant="ghost" onClick={() => onDelete(note.id)} mt="2">Delete</Button>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (!newTitle || !newContent) {
      toast({
        title: "Error",
        description: "Both title and content are required to add a note.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
    };
    setNotes([...notes, newNote]);
    setNewTitle('');
    setNewContent('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, title, content) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, title, content };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <Box p="8">
      <Box mb="8">
        <Input placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <Textarea placeholder="Content" value={newContent} onChange={(e) => setNewContent(e.target.value)} mt="2" />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote} mt="2">Add Note</Button>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="4">
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;