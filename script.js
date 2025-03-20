document.addEventListener('DOMContentLoaded', function() {
    // Add SVG filters for colorblindness simulation
    addColorblindnessFilters();
    
    // Navigation functionality
    setupNavigation();
    
    // Image filter functionality
    setupImageFilters();
    
    // Image upload functionality
    setupImageUpload();
    
    // Contact form submission
    setupContactForm();
    
    // Simulation button
    document.getElementById('simulateBtn').addEventListener('click', function() {
        // Scroll to the image demo section
        document.getElementById('imageDemo').scrollIntoView({ behavior: 'smooth' });
    });
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
        </svg>
    `;
    document.body.appendChild(svgFilters);
}

// Setup navigation between pages
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the corresponding page
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });
}

// Setup image filter functionality
function setupImageFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const image = document.querySelector('.original-image');
    
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

// Setup contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
            
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
