# Py-Rats-Chest

Welcome to the Py-Rats-Chest, a demonstration Flask application repository designed to showcase various aspects of application security and CI/CD processes using Docker, GitHub Actions, and Flask. This application is a playful nod to pirates, hence "Py-Rats", and is intended strictly for educational and demonstration purposes.

## ⚠️ Disclaimer

This application, including its features like simulated malware deployment and system scanning with Nmap, is **for test and demonstration purposes only**. It is **not** intended to be used in a production environment or left running on any system without strict supervision. Use it at your own risk, and always ensure you have permission to run such applications on your network and systems.

## Application Overview

The Py-Rats-Chest Flask application provides a simple web interface to demonstrate the following functionalities:

<img width="1159" alt="image" src="https://github.com/allthingsclowd/py-rats-chest/assets/9472095/e497bee5-ef23-4714-9f44-47288fa557a2">

- **Generate Traffic**: Fetches and displays two random images from the [Aqua Security Blog](https://blog.aquasec.com).
- **Deploy Malware**: Simulates the deployment of malware by creating a harmless file that mimics the EICAR test file.
- **Deploy Nmap**: Installs Nmap, showcasing the ability to manage system-level packages through a web application.
- **Read Passwords**: Reads and displays content from the system's `/etc/passwd` file, simulating the exposure of sensitive information.

The application is written in Python using Flask and utilizes external libraries like `requests` and `BeautifulSoup` for web scraping, as well as `subprocess` for system interactions.

## CI-Pipeline Overview

The repository includes a `.github/workflows/ci-pipeline.yml` file that defines a GitHub Actions workflow for automatically building, testing, and pushing the Docker image of the application to GitHub Container Registry (GHCR). Key steps include:

- **Checkout**: Clones the repository to the runner.
- **Login to GHCR**: Authenticates to GitHub Container Registry using a provided token.
- **Set up Docker Buildx**: Prepares Docker Buildx for building multi-architecture images.
- **Calculate Next Version**: Determines the next version tag for the Docker image based on existing tags.
- **Build and Push the Docker Image**: Builds the Docker image and pushes it to GHCR with the calculated version tag.
- **Run Container for Testing**: Runs the newly built Docker container.
- **Test Container Endpoints**: Performs simple `curl` requests to test the application's endpoints.

## Consuming the Docker Image

To run the Docker image locally or in your own environment, ensure Docker is installed and then execute:

```bash
docker run -d -p 8080:5000 ghcr.io/allthingsclowd/py-rats-chest:<tag>
```

Replace `<tag>` with the specific version you wish to run. Access the application by navigating to `http://localhost:8080` in your web browser.

## Conclusion

The Py-Rats-Chest project is a hands-on way to explore application security concepts, Docker containerization, and GitHub Actions automation in a safe, controlled environment. Remember, this application should not be deployed in production or used without comprehensive understanding and caution.

---
