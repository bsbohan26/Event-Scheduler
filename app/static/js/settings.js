// Settings Management Module
const SettingsManager = {
    stripe: null,
    card: null,

    init() {
        this.setupEventListeners();
        this.initializeStripe();
    },

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => this.updateLoginInfo(e));
        
        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => this.sendContactMessage(e));
    },

    initializeStripe() {
        // Initialize Stripe
        this.stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your publishable key
        
        // Create an instance of Elements
        const elements = this.stripe.elements();
        
        // Create an instance of the card Element
        this.card = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#32325d',
                }
            }
        });

        // Add an instance of the card Element into the `card-element` div
        this.card.mount('#card-element');

        // Handle real-time validation errors from the card Element
        this.card.addEventListener('change', (event) => {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        // Handle form submission
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const {token, error} = await this.stripe.createToken(this.card);

            if (error) {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = error.message;
            } else {
                this.handlePaymentToken(token);
            }
        });
    },

    async updateLoginInfo(event) {
        event.preventDefault();
        
        const formData = {
            email: document.getElementById('email').value,
            currentPassword: document.getElementById('currentPassword').value,
            newPassword: document.getElementById('newPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };

        if (formData.newPassword !== formData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            // Here you would typically make an API call to update the login info
            console.log('Updating login info:', formData);
            alert('Login information updated successfully!');
        } catch (error) {
            console.error('Error updating login info:', error);
            alert('Failed to update login information. Please try again.');
        }
    },

    async handlePaymentToken(token) {
        try {
            // Here you would typically send the token to your server
            console.log('Payment token:', token);
            alert('Payment method updated successfully!');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Failed to update payment method. Please try again.');
        }
    },

    async sendContactMessage(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value
        };

        try {
            // Here you would typically make an API call to send the message
            console.log('Sending contact message:', formData);
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    }
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => SettingsManager.init()); 