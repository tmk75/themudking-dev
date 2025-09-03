# Recruitment Kanban Pipeline

A Vue 3 Kanban-style recruitment pipeline with drag-and-drop functionality.

## Features

- **8 Pipeline Stages**: Sourcing → Screening → Phone Screen → Interview → Technical Assessment → Final Interview → Offer → Hired
- **Drag & Drop**: Move candidates between stages using Vue Draggable Next
- **WIP Limits**: Work-in-Progress limits for each stage with visual indicators
- **Aging Indicators**: Visual alerts for candidates staying too long in a stage (>7 days)
- **Blocked Candidates**: Visual indicators for blocked candidates
- **Real-time Updates**: Reactive refs for instant UI updates

## Setup

```bash
npm install
npm run dev
```

## Usage

- Drag candidates between columns
- Click "Add Candidate" to add new candidates
- WIP limits show red when exceeded
- Aging items (>7 days) show in orange
- Blocked candidates have red left border

## Tech Stack

- Vue 3 Composition API
- Vue Draggable Next
- Vite
- Reactive refs for state management