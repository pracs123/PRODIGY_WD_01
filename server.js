const express = require('express');
const app = express();
const path = require('path');

// Dummy data
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Add new item
app.post('/api/items', (req, res) => {
    const newItem = {
      id: items.length + 1,
      name: req.body.name
    };
    items.push(newItem);
    res.json(newItem);
  });
  
  // Update item
  app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const selectedItem = items.find(item => item.id === itemId);
    if (!selectedItem) return res.status(404).send('Item not found');
    selectedItem.name = req.body.name;
    res.json(selectedItem);
  });
  
  // Delete item
  app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    items = items.filter(item => item.id !== itemId);
    res.sendStatus(200);
  });
  