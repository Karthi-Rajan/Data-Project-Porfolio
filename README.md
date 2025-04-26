
# 3D Portfolio

This is a **3D Portfolio Website** built using **React** and **Three.js** to showcase 3D models, video renders, and image renders in an interactive and modern layout. The portfolio features filterable content, animated modal popups, and smooth navigation.

---

## Features

 
● Showcase 3D models (GLB format) with interactive controls  
● Display video renders (MP4) and image renders (PNG, JPG)  
● Filter by content type (3D, Video, Images)  
● Scrollable horizontal gallery with dot indicators (no scrollbar)  
● Clickable thumbnails open customized modal popups for each asset  
● Separate scenes for each 3D model to allow unique lighting, environment, and camera settings  
● Dynamic section highlighting in the header  
● GSAP-powered animations for smooth transitions and modal openings  

---

## Technologies Used

- **React** - Frontend framework
- **Three.js** - 3D model rendering
- **GSAP** - Animations
- **React Three Fiber** - 3D scene management
- **Tailwind CSS** - Styling
- **React Router** - Navigation handling

---

## Folder Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Portfolio.jsx
│   ├── Modal.jsx
│   ├── ThreeScenes/
│   │   ├── ModelOneScene.jsx
│   │   ├── ModelTwoScene.jsx
│   │   └── ...
│
├── assets/
│   ├── images/
│   ├── videos/
│   ├── models/
│
├── App.js
└── index.js
```

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Selva-21-11/3D-portfolio.git
   ```

2. Navigate to the project folder

   ```bash
   cd 3D-portfolio
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

---

## Usage

- Visit the homepage to see the dynamic header and landing section.
- Scroll to the **Portfolio** section to explore the 3D models, video renders, and image renders.
- Use the **filter buttons** to sort by content type.
- Click on any thumbnail to open a **modal popup** with either a:
    - 3D model (with interactive camera controls and lighting)
    - Video player
    - Image preview
- Each 3D model has **its own dedicated scene**, allowing for per-model customization.

---

## Customization

- Add your **GLB models**, images, and videos to the `assets` folder.
- Customize scenes inside `ThreeScenes` to change lighting, camera angles, or add environment maps.
- Modify modal animations inside `Modal.jsx` using **GSAP**.

---

## Future Enhancements (Optional)

- Add mobile responsiveness for smaller screens.
- Optimize lazy loading for 3D models.
- Add more transition effects between sections.

---

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request with any improvements or additional features.

---


## Contact

If you have any questions or want to connect:

- GitHub: [Selva-21-11](https://github.com/Selva-21-11)
