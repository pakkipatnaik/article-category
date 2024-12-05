import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  MenuItem,
  Button,
  Chip,
  Box,
  Typography,
} from '@mui/material';

const App = () => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const categoryOptions = ['Tech', 'Science', 'Health', 'Sports'];

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    const article = { title, categories, tags };
    await axios.post('http://localhost:5000/articles', article);
    setTitle('');
    setCategories([]);
    setTags([]);
    setTagInput('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Article Categories & Tags Management
      </Typography>
      <TextField
        label="Article Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        label="Categories"
        value={selectedCategory}
        onChange={(e) => {
          const category = e.target.value;
          if (!categories.includes(category)) {
            setCategories([...categories, category]);
          }
        }}
        sx={{ mb: 2, width: '100%' }}
      >
        {categoryOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ mb: 2 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            color="primary"
            onDelete={() =>
              setCategories(categories.filter((c) => c !== category))
            }
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Add Tags"
          variant="outlined"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={handleAddTag}>
          Add Tag
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            color="secondary"
            onDelete={() => handleRemoveTag(tag)}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Save Article
      </Button>
    </Box>
  );
};

export default App;
