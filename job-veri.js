// Certificate Verification Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('verificationForm');
    const certificateInput = document.getElementById('certificateId');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = form.querySelector('.verify-btn');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Valid certificate IDs for demonstration
    const validCertificates = [
        'CERT2024-001',
        'CERT2024-002', 
        'CERT2024-003',
        '3SV2025001',
        'CERT2024-005',
        'INTERN2024-001',
        'INTERN2024-002',
        'TECH2024-001',
        'DESIGN2024-001',
        'FINANCE2024-001'
    ];

    // Real-time input formatting
    certificateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^A-Z0-9-]/gi, '').toUpperCase();
        e.target.value = value;
        
        // Clear error message when user starts typing
        if (errorMessage.classList.contains('show')) {
            errorMessage.classList.remove('show');
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const certificateId = certificateInput.value.trim();
        
        // Validation
        if (!certificateId) {
            showError('Please enter your certificate ID');
            return;
        }

        if (certificateId.length < 8) {
            showError('Certificate ID must be at least 8 characters long');
            return;
        }

        // Show loading state
        showLoading();

        // Simulate API call delay
        setTimeout(() => {
            if (validCertificates.includes(certificateId) || certificateId.startsWith('CERT') || certificateId.startsWith('INTERN')) {
                // Store certificate ID for jobs page
                localStorage.setItem('verifiedCertificate', certificateId);
                localStorage.setItem('verificationTime', new Date().toISOString());
                
                // Success animation and redirect
                showSuccess();
                setTimeout(() => {
                    window.location.href = 'job.html';
                }, 1500);
            } else {
                hideLoading();
                showError('Invalid certificate ID. Please check and try again.');
                shakeCard();
            }
        }, 2000);
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        certificateInput.style.borderColor = '#e53e3e';
        
        setTimeout(() => {
            certificateInput.style.borderColor = '#e2e8f0';
        }, 3000);
    }

    function showLoading() {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }

    function hideLoading() {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }

    function showSuccess() {
        submitBtn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        submitBtn.querySelector('.btn-text').textContent = 'Verification Successful!';
        hideLoading();
        
        // Add success checkmark animation
        const checkmark = document.createElement('div');
        checkmark.innerHTML = '✓';
        checkmark.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            animation: successPulse 0.6s ease;
        `;
        
        submitBtn.appendChild(checkmark);
    }

    function shakeCard() {
        const card = document.querySelector('.verification-card');
        card.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 20%, 40%, 60%, 80% { transform: translateX(0); }
            10%, 30%, 50%, 70% { transform: translateX(-5px); }
            15%, 35%, 55%, 75% { transform: translateX(5px); }
        }
        
        @keyframes successPulse {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Easter egg: Show some sample certificate IDs on triple click
    let clickCount = 0;
    certificateInput.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 3) {
            const samples = validCertificates.slice(0, 3).join(', ');
            certificateInput.placeholder = `Try: ${samples}`;
            setTimeout(() => {
                certificateInput.placeholder = 'Enter your certificate ID (e.g., CERT2024-001)';
                clickCount = 0;
            }, 5000);
        }
        
        setTimeout(() => {
            clickCount = 0;
        }, 1000);
    });
});