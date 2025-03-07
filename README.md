# Realtime Todo App

A real-time Todo application built using **Nx**, **React**, **NestJS**, **PostgreSQL**, **Sequelize**, **Shadcn** and **Tailwind CSS**.

## Features

### **Required Stories**
- ❕ as a user, can create to-do items**, such as a grocery list.
- ❕ as another user, can collaborate in real-time** with a user, so that we can (for example) edit our family shopping list together.

### **Optional Stories**
- **Mark as Done**: I, as a user, can mark to-do items as “done” to avoid clutter and focus on pending tasks.
- **Filtering Done Items**: I, as a user, can filter the to-do list and view items that were marked as done for retrospective purposes.
- **Real-time Cursor Tracking**: I, as a user, can see the cursor and/or selection of another user while they type/edit text to enable focused discussions during online calls.
- **Data Persistence**: I, as a user, can be sure that my to-dos are persisted, ensuring no loss of important information upon server restarts.

## Getting Started
### Installation

1. Install dependencies:
   ```sh
   npm install
   ```


### Run application

1. Start the database:
   ```sh
   docker-compose up -d
   ```

2. Start the backend:
   ```sh
   npm run startApi
   ```

3. Start the frontend:
   ```sh
   npm run startClient
   ```
4. Open your browser and visit `http://localhost:4200`

## License

This project is licensed under the MIT License.
