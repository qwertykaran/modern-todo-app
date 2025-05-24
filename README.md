# 📝 Modern Todo App

A sleek and modern todo application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and a **Java Spring Boot** backend. This app supports real-time task management with a clean, responsive UI and dark mode support.

---

## 🚀 Features

- ✅ Add, edit, and delete todos  
- 📅 Filter todos by completion status (All, Active, Completed)  
- 🎨 Responsive design with dark mode support  
- 💾 Persistent data using local storage (frontend)  
- ⚡ Fast and efficient performance  
- 🔗 Backend API powered by Java and Spring Boot for scalable and robust data management  

---

## 🔧 Tech Stack

- **Frontend:**  
  - [Next.js 14](https://nextjs.org/)  
  - [TypeScript](https://www.typescriptlang.org/)  
  - [Tailwind CSS](https://tailwindcss.com/)  

- **Backend:**  
  - **Java**  
  - [Spring Boot](https://spring.io/projects/spring-boot)  

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later recommended)  
- Java JDK 17+  
- Maven or Gradle (for Spring Boot build)  

---

### Setup Frontend

```bash
git clone https://github.com/qwertykaran/modern-todo-app.git
cd modern-todo-app
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

### Backend
```bash
cd ../backend

# Run Spring Boot application using Maven wrapper
./mvnw spring-boot:run

```
Alternatively, run the main class from your IDE (IntelliJ, Eclipse).
The backend API will be available at http://localhost:8080.

###🛠️ Usage
Add new todos by typing in the input box and pressing Enter or clicking the Add button.

Edit todos by clicking the edit icon next to each task.

Toggle task completion with the checkbox.

Filter tasks by All, Active, or Completed using filter buttons.

Delete todos by clicking the delete icon.

Switch between light and dark modes using the toggle in the header.

Todos sync locally and with the backend API if configured.

### 📁 Project Structure
bash
```
Copy code
modern-todo-app/
├── frontend/        # Next.js + TypeScript + Tailwind CSS frontend
├── backend/         # Java Spring Boot backend API
├── README.md
└── ...
```
### 🎯 Roadmap
Add user authentication and authorization

Connect frontend and backend for persistent storage

Add database support (PostgreSQL, MySQL) in backend

Implement real-time collaboration with WebSocket or Server-Sent Events

Deploy frontend and backend to cloud platforms (Vercel, Heroku, AWS)

Write comprehensive unit, integration, and E2E tests

### 🤝 Contributing
Contributions are welcome! Please:

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to your branch (git push origin feature-name)

Open a pull request

Please follow existing code style and write meaningful commit messages.

### 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

### 🙌 Acknowledgments
Inspired by modern web app architectures combining React and Java backend

Thanks to creators and maintainers of Next.js, Tailwind CSS, Spring Boot, and open-source contributors

Special thanks to the community for valuable resources and support

### 📞 Contact
Created by Karan Soni
Feel free to reach out at sonikaran440@gmail.com.

Happy coding! 🚀
