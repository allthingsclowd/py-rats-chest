document.addEventListener('DOMContentLoaded', function() {
    // Handle the funny Internet On/Off button
    const toggleInternetButton = document.getElementById('internet_toggle');
    toggleInternetButton.addEventListener('mouseover', function() {
        const newX = Math.random() * (window.innerWidth - this.clientWidth);
        const newY = Math.random() * (window.innerHeight - this.clientHeight);
        this.style.transform = `translate(${newX}px, ${newY}px)`;
    });

    // Function to toggle button states
    function toggleButtonState(button, initialStateClass, toggleStateClass, initialText, toggleText) {
        if (button.classList.contains(initialStateClass)) {
            button.classList.remove(initialStateClass);
            button.classList.add(toggleStateClass);
            button.textContent = toggleText;
        } else {
            button.classList.remove(toggleStateClass);
            button.classList.add(initialStateClass);
            button.textContent = initialText;
        }
    }

    // Generic function to make POST requests and handle responses
    function makePostRequest(url, button, initialStateClass, toggleStateClass, initialText, toggleText) {
        fetch(url, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                const outputDiv = document.getElementById('output');
                outputDiv.innerHTML = ''; // Clear previous output

                if (data.images) {
                    data.images.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        outputDiv.appendChild(img);
                    });
                } else if (data.content) {
                    const content = document.createElement('pre');
                    content.textContent = data.content;
                    outputDiv.appendChild(content);
                }

                toggleButtonState(button, initialStateClass, toggleStateClass, initialText, toggleText);
            })
            .catch(error => console.error('Error:', error));
    }

    // Setup button event listeners and actions
    const buttons = [
        { id: 'generate_traffic', url: '/generate_traffic', initialStateClass: 'green', toggleStateClass: 'red', initialText: 'Generate Traffic', toggleText: 'Reset' },
        { id: 'deploy_malware', url: '/deploy_malware', initialStateClass: 'blue', toggleStateClass: 'yellow', initialText: 'Deploy Malware', toggleText: 'Reset' },
        { id: 'deploy_nmap', url: '/deploy_nmap', initialStateClass: 'green', toggleStateClass: 'red', initialText: 'Deploy Nmap', toggleText: 'Reset' },
        { id: 'read_passwords', url: '/read_passwords', initialStateClass: 'blue', toggleStateClass: 'yellow', initialText: 'Read Passwords', toggleText: 'Reset' },
    ];

    buttons.forEach(({ id, url, initialStateClass, toggleStateClass, initialText, toggleText }) => {
        const button = document.getElementById(id);
        button.addEventListener('click', function() {
            if (this.textContent === initialText) {
                makePostRequest(url, this, initialStateClass, toggleStateClass, initialText, toggleText);
            } else {
                // Reset action, specific logic per button if necessary
                document.getElementById('output').innerHTML = ''; // Clear output
                toggleButtonState(this, initialStateClass, toggleStateClass, initialText, toggleText);
            }
        });
    });
});
