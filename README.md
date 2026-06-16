# The antBox Library

Interactive preread and aptitude learning library for Antbox-style capsule prep.

The app contains two learning books:

- **Finance Pre-Read**: 117 finance/accounting terms, scenarios, search, progress tracking, and Ant assistant support.
- **Aptitude Vault**: 90 quant aptitude cards covering number systems, interest, percentages, profit and loss, ratio, averages, time and work, pipes and cisterns, probability, memory tables, diagrams, practice hints, and formula cards.

## Features

- Antbox-branded landing page and book views
- Full-document local search
- Reviewed checkmarks and progress tracking
- Expandable chapter/unit reading experience
- Cheat-sheet formula cards
- Assistant panel named **Ant**
- Server-side AI integration with Gemini first and Groq fallback
- Local-first answers from the preread/aptitude corpus

## Tech Stack

- HTML, CSS, and vanilla JavaScript frontend
- Node.js local server
- Server API routes for corpus search and assistant answers
- Gemini and Groq API support through server-side environment variables

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

- Library home: `http://localhost:4283/`
- Finance book: `http://localhost:4283/finance`
- Aptitude book: `http://localhost:4283/aptitude`

If no `PORT` is provided, the server uses its default from `server.mjs`. For the current preview workflow:

```bash
PORT=4283 npm run dev
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
GEMINI_API_KEY=
GROQ_API_KEY=
GEMINI_MODEL=gemini-1.5-flash
GROQ_MODEL=llama-3.1-8b-instant
```

Do not commit `.env.local`.

## Credits

Initial finance preread HTML/content base: **Rohit and the Antbox team**.

Further product integration, interactive library build, assistant flow, aptitude expansion, search experience, and deployment preparation: **Piyush (`piyushx17`)**.

## Notes

This project is built as a learning tool, not a static PDF dump. The goal is to make preread content searchable, interactive, and easier to revise before real work, mocks, and placement preparation.
