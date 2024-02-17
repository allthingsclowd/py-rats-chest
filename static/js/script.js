document.addEventListener('DOMContentLoaded', function() {
    function fetchData(endpoint) {
        fetch(endpoint, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.images) {
                    const outputDiv = document.getElementById('output');
                    outputDiv.innerHTML = ''; // Clear previous output
                    data.images.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        outputDiv.appendChild(img);
                    });
                } else if (data.message) {
                    document.getElementById('output').textContent = data.message;
                } else if (data.content) {
                    document.getElementById('output').textContent = data.content;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to process the request');
            });
    }

    document.getElementById('generate_traffic').addEventListener('click', function() { fetchData('/generate_traffic'); });
    document.getElementById('deploy_malware').addEventListener('click', function() { fetchData('/deploy_malware'); });
    document.getElementById('deploy_nmap').addEventListener('click', function() { fetchData('/deploy_nmap'); });
    document.getElementById('read_passwords').addEventListener('click', function() { fetchData('/read_passwords'); });
});
