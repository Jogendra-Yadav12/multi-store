import {
  insertCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../Model/category.js';


export const addCategory = (req, res) => {
  const { name, slug, parent_id, meta_title, meta_desc, description, status } = req.body;
  const image = req.file ? req.file.filename : null; 
  const parentId = parent_id === '' ? null : parent_id;
  const statusValue = status === 'active' ? 1 : 0;
  const values = [name, slug, parentId, meta_title, meta_desc, image, description, statusValue];
  console.log(values);
  debugger;
  insertCategory(values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ status: 'success',message: 'Category added successfully', categoryId: result.insertId });
  });
};

export const getCategories = (req, res) => {
  getAllCategories((err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

export const getCategory = (req, res) => {
  const { id } = req.params;
  getCategoryById(id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json(results[0]);
  });
};

export const updateCategoryById = (req, res) => {
  const { id } = req.params;
  const { name, image, description, status } = req.body;
  const values = [name, slug, image || '', description || '', status || 1, id];

  updateCategory(values, (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Category updated' });
  });
};

export const deleteCategoryById = (req, res) => {
  const { id } = req.params;
  deleteCategory(id, (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Category deleted' });
  });
};
