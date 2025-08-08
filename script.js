// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functionality
const modal = document.getElementById('applicationModal');
const modalTitle = document.getElementById('modalTitle');
const internshipTypeSelect = document.getElementById('internshipType');

function openModal(position = '') {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (position) {
        modalTitle.textContent = `Apply for ${position}`;
        internshipTypeSelect.value = getInternshipValue(position);
    } else {
        modalTitle.textContent = 'Apply for Internship';
    }
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('applicationForm').reset();
}

function getInternshipValue(position) {
    const mapping = {
        'Frontend Development': 'frontend',
        'Backend Development': 'backend',
        'Mobile App Development': 'mobile',
        'Data Science & Analytics': 'data-science',
        'Cybersecurity': 'cybersecurity',
        'UI/UX Design': 'ui-ux'
    };
    return mapping[position] || '';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Form submissions with backend integration
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--success-color)';
            this.reset();
            
            // Show success notification
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
        
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showNotification('Error sending message. Please try again.', 'error');
        
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'var(--primary-color)';
    } finally {
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'var(--primary-color)';
            submitBtn.disabled = false;
        }, 3000);
    }
});

document.getElementById('applicationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'college', 'course', 'year', 'internshipType', 'skills', 'motivation', 'resume', 'terms'];
    const missingFields = requiredFields.filter(field => {
        const value = formData.get(field);
        return !value || value === '';
    });
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate file size (5MB max)
    const resumeFile = formData.get('resume');
    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
        showNotification('Resume file size should not exceed 5MB.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-submit-modal');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Submitting Application...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/apply', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            closeModal();
            showSuccessMessage();
            this.reset();
            
            console.log('Application submitted successfully:', result.data);
        } else {
            throw new Error(result.message || 'Failed to submit application');
        }
        
    } catch (error) {
        console.error('Error submitting application:', error);
        showNotification('Error submitting application. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.internship-card, .testimonial-card, .step, .feature');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Real-time form validation
document.addEventListener('DOMContentLoaded', () => {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                input.style.borderColor = 'var(--error-color)';
                showTooltip(input, 'Please enter a valid email address');
            } else {
                input.style.borderColor = 'var(--border-color)';
                hideTooltip(input);
            }
        });
    });
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validatePhone(input.value)) {
                input.style.borderColor = 'var(--error-color)';
                showTooltip(input, 'Please enter a valid phone number');
            } else {
                input.style.borderColor = 'var(--border-color)';
                hideTooltip(input);
            }
        });
    });
});

function showTooltip(element, message) {
    hideTooltip(element); // Remove existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--error-color);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.85rem;
        z-index: 1000;
        white-space: nowrap;
        top: ${element.offsetTop + element.offsetHeight + 5}px;
        left: ${element.offsetLeft}px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    element.parentNode.style.position = 'relative';
    element.parentNode.appendChild(tooltip);
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
}

function hideTooltip(element) {
    const existingTooltip = element.parentNode.querySelector('.tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll event
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent operations here
}, 10));

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log(`Event tracked: ${eventName}`, eventData);
    // Real analytics implementation would go here
}

// Track form submissions
document.addEventListener('submit', (e) => {
    const formId = e.target.id;
    trackEvent('form_submission', { form: formId });
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-apply, .btn-apply-card, .btn-primary')) {
        trackEvent('button_click', { 
            button: e.target.textContent,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

console.log('3SV Software Solutions - Internship Platform Loaded Successfully!');









