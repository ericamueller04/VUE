document.addEventListener('DOMContentLoaded', function() {
    // Add SVG filters for colorblindness simulation
    addColorblindnessFilters();
    
    // Image filter functionality
    setupImageFilters();
    
    // Image upload functionality
    setupImageUpload();
    
    // Contact form submission
    setupContactForm();
    
    // Setup dropdown toggles for colorblindness types
    setupDropdownToggles();
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
    const originalImage = document.querySelector('.original-image');
    const filteredImage = document.querySelector('.filtered-image');
    
    if (filterButtons.length > 0 && originalImage && filteredImage) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Remove all filter classes from the filtered image
                filteredImage.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'monochromacy');
                
                // Add the selected filter class
                const filter = this.getAttribute('data-filter');
                if (filter !== 'normal') {
                    filteredImage.classList.add(filter);
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
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for your message${name ? ', ' + name : ''}! We'll get back to you${email ? ' at ' + email : ''} soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
}

// Setup image upload functionality
function setupImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const originalImage = document.querySelector('.original-image');
    const filteredImage = document.querySelector('.filtered-image');
    const saveButton = document.getElementById('saveImage');
    
    if (imageUpload && originalImage && filteredImage) {
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
                    // Set both images to the uploaded image
                    originalImage.src = readerEvent.target.result;
                    filteredImage.src = readerEvent.target.result;
                    
                    // Apply the active filter to the filtered image
                    const activeFilterBtn = document.querySelector('.filter-btn.active');
                    if (activeFilterBtn) {
                        const filter = activeFilterBtn.getAttribute('data-filter');
                        
                        // Remove all filter classes
                        filteredImage.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'monochromacy');
                        
                        // Add the selected filter class
                        if (filter !== 'normal') {
                            filteredImage.classList.add(filter);
                        }
                    }
                };
                
                // Read the image file
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Setup save image functionality
    if (saveButton && filteredImage) {
        saveButton.addEventListener('click', function() {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions to match the image
            canvas.width = filteredImage.naturalWidth;
            canvas.height = filteredImage.naturalHeight;
            
            // Draw the filtered image onto the canvas
            ctx.filter = getComputedStyle(filteredImage).filter;
            ctx.drawImage(filteredImage, 0, 0);
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.download = 'vue-filtered-image.png';
            
            // Convert canvas to data URL and set as link href
            link.href = canvas.toDataURL('image/png');
            
            // Append link to body, click it, and remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

// Setup dropdown toggles for colorblindness types
function setupDropdownToggles() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const typeHeaders = document.querySelectorAll('.type-header');
    
    if (dropdownToggles.length > 0) {
        // Make dropdown toggles clickable
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleDropdown(this);
            });
        });
        
        // Make type headers clickable
        typeHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const toggle = this.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggleDropdown(toggle);
                }
            });
        });
    }
}

// Toggle dropdown content
function toggleDropdown(toggle) {
    const parent = toggle.closest('.type-dropdown');
    const content = parent.querySelector('.type-content');
    
    // Close all other dropdowns
    document.querySelectorAll('.type-content').forEach(item => {
        if (item !== content) {
            item.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        if (btn !== toggle) {
            btn.classList.remove('active');
        }
    });
    
    // Toggle this dropdown
    content.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Function to apply filter to the filtered image
function applyFilter(type) {
    const filteredImage = document.querySelector('.filtered-image');
    
    if (filteredImage) {
        // Remove all filter classes
        filteredImage.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'monochromacy');
        
        // Apply the selected filter
        if (type !== 'normal') {
            filteredImage.classList.add(type);
        }
    }
}
