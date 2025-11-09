<div align="center">

# 🧠 VisuAlgo Clone

Interactive data structure visualizers (Array, Linked List, Queue, Stack, Binary Tree, BST) with beautiful animated backgrounds (Ballpit + Aurora) and a small backend that serves C-language code snippets for each structure.

🚀 Built with React + Vite (frontend) and Express + MongoDB (backend).

</div>


## ✨ Features

- 🎨 Animated landing (Ballpit) and menu (Aurora shader background)
- 🧰 Visualizers: Array, Linked List, Queue, Stack, Binary Tree, BST
- 🧾 “View C Code” modal fetches snippets from the backend
- 🔁 Create/Insert/Remove/Update operations (where applicable)
- 🧭 Consistent navigation with “Back to Menu” across all pages

## 🏗️ Architecture Overview

- Frontend: Vite multi-page app using standard HTML entries (e.g., `array.html` → `src/arrayMain.jsx`)
- Backend: Express API with MongoDB; snippets are embedded within DataStructure documents (Option A)
- Integration: Frontend calls `GET /api/ds/:slug/snippets?lang=c` to render C code in a modal

## 🧪 Tech Stack

- Frontend: React 19, Vite, GSAP, OGL (Aurora), Three.js (Ballpit), Tailwind via CDN/custom CSS
- Backend: Node.js (Express), MongoDB (Mongoose), Helmet, CORS, compression, dotenv, morgan

## 🗂️ Project Structure

```
root/
	landing.html        # Landing page (-> src/landingMain.jsx)
	menu.html           # Menu with Aurora (-> src/main.jsx)
	array.html          # Array visualizer (-> src/arrayMain.jsx)
	linked_list.html    # Linked list (-> src/llMain.jsx)
	queue.html          # Queue (-> src/queueMain.jsx)
	stack.html          # Stack (-> src/stackMain.jsx)
	binarytree.html     # Binary tree (-> src/binaryTreeMain.jsx)
	bst.html            # Binary search tree (-> src/bstMain.jsx)

	public/             # Static public assets
	src/
		App.jsx           # Menu component
		index.css         # Global styles
		TextType.jsx      # Typing header utility
		assets/           # Media assets (e.g., videos/images)
		components/
			Aurora.jsx      # Aurora shader background
			Ballpit.jsx     # Ballpit animation
			CodeModal.jsx   # Fetch + display code snippets
		pages/
			Landing.jsx
			ArrayApp.jsx
			LinkedListApp.jsx
			QueueApp.jsx
			StackApp.jsx
			BinaryTreeApp.jsx
			BSTApp.jsx
		arrayMain.jsx
		llMain.jsx
		queueMain.jsx
		stackMain.jsx
		landingMain.jsx
		binaryTreeMain.jsx
		bstMain.jsx

	server/
		package.json
		.env.example      # Copy to .env and edit
		src/
			index.js        # Express app bootstrap
			models/DataStructure.js
			routes/dataStructures.js
			seed.js
		seed/data-structures.json

	package.json
	vite.config.js
	eslint.config.js
	README.md
```

> Note: We removed an old CRA scaffold and migrated Binary Tree & BST to proper React components for consistency.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- MongoDB (local or Atlas URL)

### Frontend (React + Vite)

```powershell
npm install
npm run dev
```

Open the app on the port Vite suggests (e.g., http://localhost:5173 or 5174).


### Backend (Express + MongoDB)

Located in `server/`.

1) Create `.env` from example:

```powershell
cd server
copy .env.example .env
```

In `.env`, set your Mongo connection string (examples):

```
MONGODB_URI=mongodb://127.0.0.1:27017/visualgo
PORT=4000
```

2) Install, seed, and run:

```powershell
cd server
npm install
npm run seed
npm run dev
```

The server runs at http://localhost:4000

### Frontend ↔ Backend Integration

The UI’s “View C Code” buttons call:

```
GET /api/ds/:slug/snippets?lang=c
```

By default the client uses `http://localhost:4000` (see `src/components/CodeModal.jsx`).
If you change the backend port or host, pass a custom `apiBase` prop to `CodeModal` or adjust it globally.

---

## 📚 API Reference

- `GET /api/health` — health check
- `GET /api/ds` — list data structures `{ slug, name, tags, order }`
- `GET /api/ds/:slug` — full data structure with embedded `codeSnippets`
- `GET /api/ds/:slug/snippets?lang=c` — filtered snippet list

### Data Model (Embedded Snippets — Option A)

```json
{
	"slug": "linked-list",
	"name": "Linked List",
	"description": "Singly linked list in C",
	"order": 2,
	"tags": ["linear"],
	"related": ["queue", "stack"],
	"codeSnippets": [
		{
			"id": "ll-c-basic",
			"language": "c",
			"title": "Singly Linked List (C)",
			"complexity": { "time": "O(n)", "space": "O(1)" },
			"code": "..."
		}
	]
}
```

Seed file: `server/seed/data-structures.json` — edit and re-run `npm run seed` to update.

---

## 🛠️ Useful Scripts

Frontend:
```powershell
npm run dev      # start Vite dev server
npm run build    # build for production (single entry by default)
npm run preview  # preview build
```

Backend (inside `server/`):
```powershell
npm run dev      # start Express in dev mode
npm run seed     # seed MongoDB with initial snippets
```

---

## 🧩 Production Build (optional)

This project uses multiple HTML entries (e.g., `array.html`, `bst.html`). Vite dev supports that out-of-the-box. If you want a multi-page production build, add rollup inputs in `vite.config.js`:

```js
// vite.config.js (example)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				landing: 'landing.html',
				menu: 'menu.html',
				array: 'array.html',
				linked_list: 'linked_list.html',
				queue: 'queue.html',
				stack: 'stack.html',
				binarytree: 'binarytree.html',
				bst: 'bst.html'
			}
		}
	}
})
```

Then:

```powershell
npm run build
```

The output will appear in `dist/` with separate pages.

---

## 🐛 Troubleshooting

- “View C Code” shows an error: Ensure backend is running on `http://localhost:4000` and MongoDB is reachable.
- Vite says “Port 5173 in use”: It will auto-pick another port (e.g., 5174). Use the URL shown in the console.
- Windows firewall prompt: Allow Node.js to listen on local ports on first run.

---

## 📦 Shipping / Sharing the Project

Include these in your zip:
- `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js` (optional)
- All HTML files at root (`*.html`)
- `public/`, `src/`
- `server/` (without your private `.env`, but do include `.env.example`)

Exclude:
- `node_modules/` and `server/node_modules/`
- `dist/` (unless you’re sharing the built site only)
- Real `.env` files

---



---

## 🙌 Acknowledgements

- Thanks to the open-source community behind React, Vite, OGL, Three.js, and Tailwind.
- Created for learning & teaching data structures through visualization.
npm run seed
npm run dev
```

Server runs on http://localhost:4000

### API Endpoints

- `GET /api/health` — health check
- `GET /api/ds` — list data structures `{ slug, name, tags, order }`
- `GET /api/ds/:slug` — full data structure (embedded `codeSnippets`)
- `GET /api/ds/:slug/snippets?lang=c` — filtered snippets by language

### Data Model (Option A: Embedded Snippets)

```json
{
	"slug": "linked-list",
	"name": "Linked List",
	"description": "Singly linked list in C",
	"order": 2,
	"tags": ["linear"],
	"related": ["queue", "stack"],
	"codeSnippets": [
		{
			"id": "ll-c-basic",
			"language": "c",
			"title": "Singly Linked List (C)",
			"complexity": { "time": "O(n)", "space": "O(1)" },
			"code": "..."
		}
	]
}
```

### Seeding

Seed file: `server/seed/data-structures.json` — edit and re-run `npm run seed` to update.

### Frontend Integration (Planned)

Will add a modal component that fetches `/api/ds/:slug` and displays code snippets with syntax highlighting.

### License / Attribution

Educational clone inspired by VisuAlgo style. Not affiliated with original site.

