# NNPhotography Backend
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)
![License](https://img.shields.io/github/license/nagpalnitesh/nnphotography-backend?cacheSeconds=300)
![Last Commit](https://img.shields.io/github/last-commit/nagpalnitesh/nnphotography-backend)
![Repo Size](https://img.shields.io/github/repo-size/nagpalnitesh/nnphotography-backend)

Backend REST API powering **NNPhotography**, a wildlife and nature photography portfolio built with **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary**.

> 🌿 Live Website: https://nnphotography.in

---

## Features

- 📷 Gallery image API
- 🖼️ Homepage slider API
- ☁️ Cloudinary image management
- 🚀 Optimized API responses
- 🔒 Secure image delivery using HTTPS
- 📁 Folder-based image organization
- 🌐 RESTful API architecture

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary
- dotenv

---

## Project Structure

```text
.
├── controllers/
├── models/
├── routes/
├── .env.example
├── server.js
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nagpalnitesh/nnphotography-backend.git
cd nnphotography-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file from the example.

```bash
cp .env.example .env
```

Update the values.

```env
PORT=5000

MONGODB_URI=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Start the server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/gallery` | Fetch gallery images |
| GET | `/api/home` | Fetch homepage slider images |

---

## Sample Response

```json
{
  "id": "DSC_4981_qda0tg",
  "url": "https://res.cloudinary.com/...",
  "width": 6016,
  "height": 4000,
  "format": "jpg"
}
```

The API intentionally exposes only the fields required by the frontend and hides Cloudinary-specific metadata.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `MONGODB_URI` | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## Security

The backend follows a minimal-response approach by exposing only the data required by the client application.

Hidden Cloudinary fields include:

- asset_id
- public_id
- version
- resource_type
- type
- folder
- created_at
- bytes
- last_updated

---

## Deployment

This backend is designed to be deployed on platforms such as:

- Render
- Railway
- Fly.io
- DigitalOcean
- AWS
- VPS

---

## Related Project

### NNPhotography

Wildlife and nature photography portfolio showcasing birds, reptiles, insects, mammals, landscapes, and macro photography.

**Website**

https://nnphotography.in

---

## Future Improvements

- Species API
- Image search
- Filtering by category
- Pagination
- Image metadata
- EXIF information
- Authentication for admin uploads
- API documentation (Swagger)

---

## License

This project is licensed under the MIT License.

---

## Author

**Nitesh Nagpal**

- Website: https://nnphotography.in
- GitHub: https://github.com/nagpalnitesh

---

If you find this project useful, consider giving it a ⭐ on GitHub.
