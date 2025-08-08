// Jobs Page Script
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is verified
    const verifiedCertificate = localStorage.getItem('verifiedCertificate');
    if (!verifiedCertificate) {
        window.location.href = 'job.html';
        return;
    }

    // Sample job data
    const jobsData = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "TechCorp Inc.",
            location: "Pune",
            type: "Full-time",
            experience: "Mid Level",
            category: "Technology",
            salary: "₹18,000 - ₹50,000",
            description: "Join our dynamic team to build cutting-edge web applications using React, TypeScript, and modern development practices. You'll work on user-facing features that impact millions of users worldwide.",
            tags: ["React", "TypeScript", "CSS", "JavaScript"],
            logo: "TC"
        },
        {
            id: 2,
            title: "Digital Marketing Specialist",
            company: "Growth Labs",
            location: "New York, NY",
            type: "Remote",
            experience: "Entry Level",
            category: "Marketing",
            salary: "$55,000 - $75,000",
            description: "Drive digital marketing campaigns across multiple channels. Perfect opportunity for recent graduates to learn and grow in a supportive environment with experienced mentors.",
            tags: ["SEO", "Social Media", "Analytics", "Content Marketing"],
            logo: "GL"
        },
        {
            id: 3,
            title: "UX/UI Designer",
            company: "Design Studio Pro",
            location: "Austin, TX",
            type: "Full-time",
            experience: "Mid Level",
            category: "Design",
            salary: "$70,000 - $95,000",
            description: "Create intuitive and beautiful user experiences for web and mobile applications. Work closely with developers and product managers to bring designs to life.",
            tags: ["Figma", "Sketch", "Prototyping", "User Research"],
            logo: "DS"
        },
        {
            id: 4,
            title: "Data Analyst Intern",
            company: "Analytics Hub",
            location: "Chicago, IL",
            type: "Internship",
            experience: "Entry Level",
            category: "Technology",
            salary: "$25 - $35/hour",
            description: "Gain hands-on experience in data analysis, visualization, and business intelligence. Work with real datasets and contribute to data-driven decision making.",
            tags: ["Python", "SQL", "Tableau", "Excel"],
            logo: "AH"
        },
        {
            id: 5,
            title: "Financial Analyst",
            company: "Capital Ventures",
            location: "Boston, MA",
            type: "Full-time",
            experience: "Entry Level",
            category: "Finance",
            salary: "$65,000 - $80,000",
            description: "Analyze financial data, create reports, and support investment decisions. Great opportunity to start your career in finance with comprehensive training program.",
            tags: ["Excel", "Financial Modeling", "Bloomberg", "Analysis"],
            logo: "CV"
        },
        {
            id: 6,
            title: "Software Engineer",
            company: "Innovation Labs",
            location: "Seattle, WA",
            type: "Full-time",
            experience: "Senior Level",
            category: "Technology",
            salary: "$120,000 - $160,000",
            description: "Lead development of scalable backend systems and mentor junior developers. Work with cutting-edge technologies in a fast-paced environment.",
            tags: ["Node.js", "Python", "AWS", "Docker"],
            logo: "IL"
        },
        {
            id: 7,
            title: "Content Marketing Manager",
            company: "Brand Builders",
            location: "Los Angeles, CA",
            type: "Part-time",
            experience: "Mid Level",
            category: "Marketing",
            salary: "$40 - $60/hour",
            description: "Develop and execute content marketing strategies to build brand awareness and drive customer engagement across digital channels.",
            tags: ["Content Strategy", "Writing", "SEO", "Social Media"],
            logo: "BB"
        },
        {
            id: 8,
            title: "Healthcare Data Specialist",
            company: "MedTech Solutions",
            location: "Dallas, TX",
            type: "Remote",
            experience: "Entry Level",
            category: "Healthcare",
            salary: "$58,000 - $72,000",
            description: "Work with healthcare data to improve patient outcomes and operational efficiency. No prior healthcare experience required - we provide comprehensive training.",
            tags: ["Healthcare", "Data Analysis", "HIPAA", "SQL"],
            logo: "MT"
        },
        {
            id: 9,
            title: "Product Designer",
            company: "Creative Solutions",
            location: "Portland, OR",
            type: "Full-time",
            experience: "Senior Level",
            category: "Design",
            salary: "$90,000 - $125,000",
            description: "Lead product design initiatives from concept to launch. Collaborate with cross-functional teams to create user-centered designs that drive business results.",
            tags: ["Product Design", "User Research", "Figma", "Design Systems"],
            logo: "CS"
        },
        {
            id: 10,
            title: "DevOps Engineer",
            company: "Cloud First",
            location: "Denver, CO",
            type: "Full-time",
            experience: "Mid Level",
            category: "Technology",
            salary: "$95,000 - $130,000",
            description: "Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability and security across multiple environments.",
            tags: ["AWS", "Docker", "Kubernetes", "Jenkins"],
            logo: "CF"
        }
    ];

    let filteredJobs = [...jobsData];

    // DOM Elements
    const jobsGrid = document.getElementById('jobsGrid');

    // Initialize page
    renderJobs(filteredJobs);
    setupEventListeners();

    function renderJobs(jobs) {
        if (jobs.length === 0) {
            jobsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                    <h3 style="color: #4a5568; margin-bottom: 10px;">No jobs found</h3>
                    <p style="color: #718096;">Try adjusting your filters to see more opportunities.</p>
                </div>
            `;
            return;
        }

        jobsGrid.innerHTML = jobs.map((job, index) => `
            <div class="job-card" style="animation-delay: ${(index * 0.1)}s">
                <div class="job-header">
                    <div class="company-logo">${job.logo}</div>
                    <div class="job-info">
                        <h3>${job.title}</h3>
                        <div class="company-name">${job.company}</div>
                    </div>
                </div>
                
                <div class="job-meta">
                    <div class="meta-item">
                        <span>📍</span>
                        <span>${job.location}</span>
                    </div>
                    <div class="meta-item">
                        <span>💼</span>
                        <span>${job.type}</span>
                    </div>
                    <div class="meta-item">
                        <span>⭐</span>
                        <span>${job.experience}</span>
                    </div>
                </div>
                
                <div class="job-description">
                    ${job.description}
                </div>
                
                <div class="job-tags">
                    ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="job-footer">
                    <div class="salary">${job.salary}</div>
                    <button class="apply-btn" onclick="applyToJob(${job.id})">Apply Now</button>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Logout functionality
        document.querySelector('.logout').addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('verifiedCertificate');
                localStorage.removeItem('verificationTime');
                window.location.href = 'index.html';
            }
        });
    }

    // Global function for apply button
    window.applyToJob = function(jobId) {
        const job = jobsData.find(j => j.id === jobId);
        if (job) {
            // Create application modal or redirect
            showApplicationModal(job);
        }
    };

    function showApplicationModal(job) {
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <button onclick="this.closest('.modal').remove()" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #718096;
                ">×</button>
                
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: white;
                    font-size: 2rem;
                ">🎉</div>
                
                <h3 style="color: #2d3748; margin-bottom: 10px; font-size: 1.5rem;">Application Submitted!</h3>
                <p style="color: #718096; margin-bottom: 20px;">
                    Your application for <strong>${job.title}</strong> at <strong>${job.company}</strong> has been submitted successfully.
                </p>
                <p style="color: #4a5568; font-size: 0.9rem; margin-bottom: 25px;">
                    We'll notify you within 2-3 business days about the next steps.
                </p>
                
                <button onclick="this.closest('.modal').remove()" style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">Continue Browsing</button>
            </div>
        `;

        modal.className = 'modal';
        document.body.appendChild(modal);

        // Close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Add success animation
        setTimeout(() => {
            const modalContent = modal.querySelector('div');
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 100);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.remove();
            }
        }, 10000);
    }

    // Add some interactive enhancements
    document.addEventListener('scroll', function() {
        const header = document.querySelector('.jobs-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Update stats dynamically
    function updateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const totalJobs = jobsData.length;
        const companies = new Set(jobsData.map(job => job.company)).size;
        
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = totalJobs + '+';
            statNumbers[1].textContent = companies + '+';
        }
    }

    // Initial stats update
    updateStats();

    // Welcome message with certificate info
    setTimeout(() => {
        const welcomeSection = document.querySelector('.welcome-content p');
        if (welcomeSection && verifiedCertificate) {
            welcomeSection.innerHTML += `<br><small style="opacity: 0.8;">Certificate ID: ${verifiedCertificate}</small>`;
        }
    }, 1000);
});