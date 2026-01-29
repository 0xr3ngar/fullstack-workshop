# Full-Stack Workshop

A full-stack web application built with Next.js, PostgreSQL, and Prisma ORM.

## 🎯 Objective

By the end of this workshop, you'll have built a **Presentation Deck Manager** - that allows users to:

- **Create and manage presentations** with multiple slides
- **Edit presentations** with a rich form interface
- **Preview presentations** before presenting
- **Present in fullscreen mode** with keyboard navigation


Extra credits:
- **MCP Server integration** for AI assistant capabilities
- **Real-time updates** via WebSocket when presentations are modified

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL 16](https://www.postgresql.org/) (via Docker)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Real-time updates**: [ws](https://www.npmjs.com/package/ws) for WebSocket server
- **MCP Server**: [Model Context Protocol](https://modelcontextprotocol.io/) server for AI assistant integration

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for PostgreSQL)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🗺️ Workshop Checkpoints

Follow these checkpoints to build the application step by step:

### 1. Set up Docker with PostgreSQL

Set up a PostgreSQL database using Docker Compose.

<details>
<summary>💡 Hint</summary>

Create a `docker-compose.yml` file in the root directory. Use the `postgres:16-alpine` image and configure environment variables for the database user, password, and database name. Expose port 5432 and add a healthcheck.

</details>

---

### 2. Bootstrap Next.js Application

Initialize a new Next.js project with TypeScript and Tailwind CSS.

<details>
<summary>💡 Hint</summary>

[Next.js Installation](https://nextjs.org/docs/app/getting-started/installation)

</details>

---

### 3. Set up Prisma and the DB

Install Prisma and configure it to work with PostgreSQL. Add a migration to setup your schema and add seed data

<details>
<summary>💡 Hint</summary>

[Prisma + postgres + nextjs](https://nextjs.org/docs/app/getting-started/installation)

</details>

---

### 4. Build the app :troll:

---

### 5. (Optional) Set up MCP Server

Create a Model Context Protocol server for AI assistant integration.

<details>
<summary>💡 Hint</summary>

Install `@modelcontextprotocol/sdk` and create an MCP server that exposes tools for listing, creating, updating, and deleting presentations. Implement the server handlers and configure it to connect to your Prisma database.

</details>

---

### 6. (Optional) Integrate Live Reload in the Frontend

Connect the frontend to the WebSocket server to receive real-time updates.

<details>
<summary>💡 Hint</summary>

Create a WebSocket client utility and a LiveReloadWrapper component. Connect to the WebSocket server and listen for update messages. Use Next.js router to refresh the page or revalidate data when updates are received.

</details>

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
