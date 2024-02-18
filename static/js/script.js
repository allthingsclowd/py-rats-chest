document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.id;
            fetch(`/${action}`, { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    const output = document.getElementById('output');
                    if (Array.isArray(data)) {
                        output.innerHTML = data.map(imgSrc => `<img src="${imgSrc}" style="max-width: 100%; height: auto;">`).join('');
                    } else if (data.content) {
                        output.innerHTML = `<pre>${data.content}</pre>`;
                    } else {
                        output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    output.innerText = `Error: ${error}`;
                });
        });
    });

    const internetToggleButton = document.getElementById('internet_toggle');
    internetToggleButton.addEventListener('mouseover', () => {
        const newX = Math.random() * (window.innerWidth - internetToggleButton.offsetWidth) + window.scrollX;
        const newY = Math.random() * (window.innerHeight - internetToggleButton.offsetHeight) + window.scrollY;
        internetToggleButton.style.left = `${newX}px`;
        internetToggleButton.style.top = `${newY}px`;
    });
});
