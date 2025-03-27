document.addEventListener('DOMContentLoaded', function() {
    // Add SVG filters for colorblindness simulation
    addColorblindnessFilters();
    
    // Image filter functionality
    setupImageFilters();
    
    // Image upload functionality
    setupImageUpload();
    
    // Contact form submission
    setupContactForm();
    
    // Play button on About page
    setupPlayButton();
    
    // Simulation button on Home page
    const simulateBtn = document.getElementById('simulateBtn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            // Scroll to the image demo section
            document.getElementById('imageDemo').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Add SVG filters to the document for colorblindness simulation
function addColorblindnessFilters() {
    const svgFilters = document.createElement('div');
    svgFilters.classList.add('svg-filters');
    svgFilters.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg">
            <filter id="protanopia-filter">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.567, 0.433, 0,     0, 0
                            0.558, 0.442, 0,     0, 0
                            0,     0.242, 0.758, 0, 0
                            0,     0,     0,     1, 0"/>
            </filter>
            <filter id="deuteranopia-filter">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.625, 0.375, 0,   0, 0
                            0.7,   0.3,   0,   0, 0
                            0,     0.3,   0.7, 0, 0
                            0,     0,     0,   1, 0"/>
            </filter>
            <filter id="tritanopia-filter">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.95, 0.05,  0,     0, 0
                            0,    0.433, 0.567, 0, 0
                            0,    0.475, 0.525, 0, 0
                            0,    0,     0,     1, 0"/>
            </filter>
            <filter id="monochromacy-filter">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.299, 0.587, 0.114, 0, 0
                            0.299, 0.587, 0.114, 0, 0
                            0.299, 0.587, 0.114, 0, 0
                            0,     0,     0,     1, 0"/>
            </filter>
        </svg>
    `;
    document.body.appendChild(svgFilters);
}


// Setup image filter functionality
function setupImageFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const image = document.querySelector('.original-image');
    
    if (filterButtons.length > 0 && image) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Remove all filter classes from the image
                image.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
                
                // Add the selected filter class
                const filter = this.getAttribute('data-filter');
                if (filter !== 'normal') {
                    image.classList.add(filter);
                }
            });
        });
    }
}

// Setup contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for your message! We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
}

// Setup image upload functionality
function setupImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const image = document.querySelector('.original-image');
    
    if (imageUpload && image) {
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Check if the file is an image
                if (!file.type.match('image.*')) {
                    alert('Please select an image file');
                    return;
                }
                
                // Create a FileReader to read the image
                const reader = new FileReader();
                
                // Set up the FileReader onload event
                reader.onload = function(readerEvent) {
                    // Set the image source to the uploaded image
                    image.src = readerEvent.target.result;
                    
                    // Reset any active filters
                    const activeFilterBtn = document.querySelector('.filter-btn.active');
                    if (activeFilterBtn) {
                        // Trigger a click on the active filter button to apply the filter to the new image
                        activeFilterBtn.click();
                    }
                };
                
                // Read the image file
                reader.readAsDataURL(file);
            }
        });
    }
}

// Function to toggle between different colorblindness simulations
function toggleSimulation(type) {
    const image = document.querySelector('.original-image');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (image) {
        // Remove all filter classes
        image.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
        
        // Update active button
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === type) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Apply the selected filter
        if (type !== 'normal') {
            image.classList.add(type);
        }
    }
}

// Setup dropdown toggles on About page
function setupPlayButton() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const simulationImage = document.querySelector('.simulation-image');
    
    if (dropdownToggles.length > 0) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const parent = this.closest('.type-dropdown');
                const content = parent.querySelector('.type-content');
                const filterType = this.getAttribute('data-type');
                
                // Toggle dropdown content
                if (content.classList.contains('active')) {
                    content.classList.remove('active');
                    this.classList.remove('active');
                    
                    // Remove filter from image
                    if (simulationImage) {
                        simulationImage.classList.remove(filterType);
                    }
                } else {
                    // Close all other dropdowns
                    document.querySelectorAll('.type-content').forEach(item => {
                        item.classList.remove('active');
                    });
                    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Open this dropdown
                    content.classList.add('active');
                    this.classList.add('active');
                    
                    // Apply filter to image
                    if (simulationImage) {
                        // Remove all filters first
                        simulationImage.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'monochromacy');
                        // Apply this filter
                        simulationImage.classList.add(filterType);
                    }
                }
            });
        });
        
        // Make type headers also clickable
        const typeHeaders = document.querySelectorAll('.type-header');
        typeHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                // Don't trigger if the button itself was clicked (it has its own event handler)
                if (e.target.classList.contains('dropdown-toggle')) return;
                
                // Trigger click on the toggle button
                const toggle = this.querySelector('.dropdown-toggle');
                if (toggle) toggle.click();
            });
        });
    }
}
