import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { DataStructure } from '../models/DataStructure.js';

// Read local seed file as the data source so server works without a DB
// Resolve relative to this file to avoid reliance on process.cwd()
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.resolve(__dirname, '../../seed/data-structures.json');
let data = [];
try {
  const raw = fs.readFileSync(seedPath, 'utf-8');
  data = JSON.parse(raw);
} catch (e) {
  console.error('Failed to read seed data:', e.message);
  data = [];
}

export const router = express.Router();

// GET /api/ds - list minimal info (served from seed file)
router.get('/', (_req, res) => {
  const useDB = mongoose.connection?.readyState === 1;
  if (useDB) {
    DataStructure.find({}, 'slug name tags order')
      .sort({ order: 1, name: 1 })
      .lean()
      .then(docs => res.json(docs))
      .catch(() => res.status(500).json({ error: 'Failed to load data' }));
  } else {
    try {
      const list = data
        .map(({ slug, name, tags, order }) => ({ slug, name, tags, order }))
        .sort((a, b) => (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name || ''));
      res.json(list);
    } catch (e) {
      res.status(500).json({ error: 'Failed to load data' });
    }
  }
});

// GET /api/ds/:slug - full details including snippets (from seed)
router.get('/:slug', (req, res) => {
  const useDB = mongoose.connection?.readyState === 1;
  const { slug } = req.params;
  if (useDB) {
    DataStructure.findOne({ slug }).lean()
      .then(doc => {
        if (!doc) return res.status(404).json({ error: 'Not found' });
        res.json(doc);
      })
      .catch(() => res.status(500).json({ error: 'Failed to load data' }));
  } else {
    try {
      const ds = data.find(d => d.slug === slug);
      if (!ds) return res.status(404).json({ error: 'Not found' });
      res.json(ds);
    } catch (e) {
      res.status(500).json({ error: 'Failed to load data' });
    }
  }
});

// GET /api/ds/:slug/snippets?lang=c
router.get('/:slug/snippets', async (req, res) => {
  const useDB = mongoose.connection?.readyState === 1;
  const { slug } = req.params;
  const { lang } = req.query;
  if (useDB) {
    try {
      const doc = await DataStructure.findOne({ slug }, 'codeSnippets').lean();
      if (!doc) return res.status(404).json({ error: 'Not found' });
      let snippets = doc.codeSnippets || [];
      if (lang) snippets = snippets.filter(s => s.language?.toLowerCase() === String(lang).toLowerCase());
      res.json(snippets);
    } catch {
      res.status(500).json({ error: 'Failed to load snippets' });
    }
  } else {
    try {
      const ds = data.find(d => d.slug === slug);
      if (!ds) return res.status(404).json({ error: 'Not found' });
      let snippets = ds.codeSnippets || [];
      if (lang) snippets = snippets.filter(s => s.language?.toLowerCase() === String(lang).toLowerCase());
      res.json(snippets);
    } catch (e) {
      res.status(500).json({ error: 'Failed to load snippets' });
    }
  }
});
