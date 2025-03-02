// Internship Data
const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: '3SV Software Solutions',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Online (Work from Home)',
      duration: '1 months',
      stipend: '₹69 (Certification Charges)',
      skills: ['React', 'JavaScript', 'HTML', 'CSS'],
      applicationsEnding: 'Actively hiring',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'Backend Developer Intern',
      company: '3SV Software Solutions',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Online (Work from Home)',
      duration: '1 months',
      stipend: '₹69 (Certification Charges)',
      skills: ['Node.js', 'Express', 'MongoDB', 'API Development'],
      applicationsEnding: 'Actively hiring',
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'Python Developer',
      company: '3SV Software Solutions',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Online (Work from Home)',
      duration: '1 months',
      stipend: '₹69 (Certification Charges)',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Wireframing'],
      applicationsEnding: 'Actively hiring',
      category: 'Python Developer'
    },
    {
      id: 4,
      title: 'Web Development',
      company: '3SV Software Solutions',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Online (Work from Home)',
      duration: '1 months',
      stipend: '₹69 (Certification Charges)',
      skills: ['React Native', 'Flutter', 'Mobile UI', 'API Integration'],
      applicationsEnding: 'Actively hiring',
      category: 'Web Development'
    },
    {
      id: 5,
      title: 'Data Analyst Intern',
      company: '3SV Software Solutions',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Online (Work from Home)',
      duration: '1 months',
      stipend: '₹69 (Certification Charges)',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      applicationsEnding: 'Applications ending in 6 days',
      category: 'Data Analyst'
    },
    {
      id: 6,
      title: 'Digital Marketing Intern',
      company: '3SV Software Solutions',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Online (Work from Home)',
      duration: '1 months',
      stipend: '₹69 (Certification Charges)',
      skills: ['Social Media Marketing', 'SEO', 'Content Creation', 'Analytics'],
      applicationsEnding: 'Closed',
      category: 'Marketing'
    }
  ];
  
  // DOM Elements
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNav = document.getElementById('mobile-nav');
  const categoryButtons = document.querySelectorAll('.category-card');
  const internshipGrid = document.getElementById('internship-grid');
  const currentYearElement = document.getElementById('current-year');
  const slider = document.getElementById('hero-slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dots = document.querySelectorAll('.dot');
  
  // Set current year in footer
  currentYearElement.textContent = new Date().getFullYear();
  
  // Mobile Menu Toggle
  menuIcon.addEventListener('click', () => {
    mobileNav.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  });
  
  closeIcon.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
  
  // Slider functionality
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Initialize slider
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the current slide
    slides[index].classList.add('active');
    
    // Add active class to current dot
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Next slide
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slideCount) {
      next = 0;
    }
    showSlide(next);
  }
  
  // Previous slide
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) {
      prev = slideCount - 1;
    }
    showSlide(prev);
  }
  
  // Event listeners for slider controls
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-index'));
      showSlide(slideIndex);
    });
  });
  
  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto slide on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // Resume auto slide when mouse leaves
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Filter state
  let currentCategory = 'all';
  
  // Filter internships based on category
  function filterInternships() {
    return internships.filter(internship => {
      return currentCategory === 'all' || internship.category === currentCategory;
    });
  }
  
  // Render internship cards
  function renderInternships() {
    const filteredInternships = filterInternships();
    
    internshipGrid.innerHTML = '';
    
    filteredInternships.forEach(internship => {
      const internshipCard = document.createElement('div');
      internshipCard.className = 'internship-card';
      
      const statusClass = internship.applicationsEnding === 'Actively hiring' 
        ? 'status-active' 
        : 'status-ending';
      
      const skillsHTML = internship.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
      ).join('');
      
      internshipCard.innerHTML = `
        <div class="internship-content">
          <div class="internship-header">
            <div>
              <h3 class="internship-title">${internship.title}</h3>
              <p class="internship-company">${internship.company}</p>
            </div>
            ${internship.logo ? `<img src="${internship.logo}" alt="${internship.company} logo" class="internship-logo">` : ''}
          </div>
          
          <div class="internship-details">
            <div class="internship-detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>${internship.location}</span>
            </div>
            
            <div class="internship-detail">
              <i class="fas fa-calendar"></i>
              <span>${internship.duration}</span>
            </div>
            
            <div class="internship-detail">
              <i class="fas fa-briefcase"></i>
              <span>${internship.stipend}</span>
            </div>
          </div>
          
          <div class="internship-skills">
            ${skillsHTML}
          </div>
          
          <div class="internship-footer">
            <span class="status-tag ${statusClass}">
              ${internship.applicationsEnding}
            </span>
            
            <button class="apply-btn" onclick="redirectToForm()">
              Apply Now <i class="fas fa-external-link-alt" ></i>
            </button>
          </div>
        </div>
      `;
      
      internshipGrid.appendChild(internshipCard);
    });
  }
  
  // Initialize the page
  function init() {
    // Initialize slider
    showSlide(0);
    
    // Render initial internships
    renderInternships();
    
    // Category filter
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update current category
        currentCategory = button.getAttribute('data-category');
        
        // Re-render internships
        renderInternships();
      });
    });
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);




  //form link 
  function redirectToForm() {
    window.location.href = "https://forms.gle/CnRcL3R3DvVcmCfE6"; // Your Google Form link
}