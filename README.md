## 🛠 Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Tailwind CSS
- **Architecture**: RESTful API, MVC Pattern, Modular CSS

## 📁 Project Structure

```
Web_app/
├── server.js                 # Application entry point
├── src/
│   ├── app.js               
│   ├── models/              # MongoDB schemas
│   │   ├── urlModel.js      # URL shortener model
│   │   ├── invoiceModel.js  # Invoice model
│   │   ├── feedbackModel.js # Feedback model
│   │   └── taskModel.js     # Task model
│   ├── controllers/         
│   │   ├── urlController.js
│   │   ├── invoiceController.js
│   │   ├── feedbackController.js
│   │   └── taskController.js
│   ├── routes/              # API routes
│   │   ├── urlRoutes.js
│   │   ├── invoiceRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── taskRoutes.js
│   └── utils/
│       └── shortener.js      # URL shortening utility
├── public/                  # Static files
│   ├── common.html          
│   ├── css/                 # Organized CSS files
│   │   ├── common.css       
│   │   ├── index.css        # Home page styles
│   │   ├── shorten.css      # URL Shortener styles
│   │   ├── invoice.css      # Invoice Generator styles
│   │   ├── feedback.css     # Feedback Collection styles
│   │   └── tasks.css        # Task Management styles
│   ├── index.html           # Home page
│   ├── shorten.html         # URL Shortener page
│   ├── invoice.html         # Invoice Generator page
│   ├── feedback.html        # Feedback Collection page
│   └── tasks.html           # Task Management page
├── package.json
└── README.md
```

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/web-app.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system with database `urlshortener` (default: `mongodb://localhost:27017/urlshortener`)

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`



### URL Shortener
- `POST /shorten` - Create short URL
- `GET /:shortCode` - Redirect to original URL

### Invoice Management
- `POST /api/invoices` - Create invoice
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get specific invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Feedback Collection
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/:id` - Get specific feedback
- `DELETE /api/feedback/:id` - Delete feedback
- `GET /api/feedback-stats` - Get feedback statistics

### Task Management
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/task-stats` - Get task statistics
- `GET /api/tasks/status/:status` - Get tasks by status
- `GET /api/tasks/priority/:priority` - Get tasks by priority
