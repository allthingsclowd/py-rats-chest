document.addEventListener('DOMContentLoaded', function() {
    const toggleInternetButton = document.getElementById('internet_toggle');
    toggleInternetButton.addEventListener('mouseover', function(e) {
        const newX = Math.random() * (window.innerWidth - this.clientWidth);
        const newY = Math.random() * (window.innerHeight - this.clientHeight);
        this.style.transform = `translate(${newX}px, ${newY}px)`;
    });

    // Example for "Generate Traffic" button, apply similar logic for others
    document.getElementById('generate_traffic').addEventListener('click', function() {
        if (this.classList.contains('green')) {
            fetch('/generate_traffic', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    const outputDiv = document.getElementById('output');
                    outputDiv.innerHTML = ''; // Clear previous output
                    data.images.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        outputDiv.appendChild(img);
                    });
                    this.classList.remove('green');
                    this.classList.add('red');
                    this.textContent = 'Reset';
                })
                .catch(error => console.error('Error:', error));
        } else {
            // Reset logic here
            this.classList.remove('red');
            this.classList.add('green');
            this.textContent = 'Generate Traffic';
            document.getElementById('output').innerHTML = ''; // Clear output
        }
    });
});
