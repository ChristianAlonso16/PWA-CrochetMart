<template>
    <div id="app" class="landing-page">
        <!-- Header Section -->
        <header class="header">
            <h1>Este es un ejemplo para poder iniciar la aplicacion en el landpage</h1>
            <p>Por favor cambia esto</p>
            <Button label="Inicia pronto" class="p-button-raised p-button-secondary get-started-btn" />
        </header>

        <!-- Features Section -->
        <section class="features">
            <h2>Our Key Features</h2>
            <div class="feature-cards">
                <Card v-for="(feature, index) in features" :key="index" class="feature-card">
                    <template #header>
                        <img :src="feature.icon" alt="feature-icon" class="feature-icon" />
                    </template>
                    <template #title>
                        {{ feature.title }}
                    </template>
                    <template #content>
                        <p>{{ feature.description }}</p>
                    </template>
                    <template #footer>
                        <Button icon="pi pi-info-circle" label="Learn More"
                            class="p-button-rounded p-button-secondary" />
                    </template>
                </Card>
            </div>
        </section>

        <!-- Footer Section -->
        <footer class="footer">
            <p>© 2024 Your Company - All Rights Reserved</p>
        </footer>
    </div>
</template>

<script>
import Button from 'primevue/button';
import Card from 'primevue/card';

export default {
    name: 'App',
    components: {
        Button,
        Card
    },
    data() {
        return {
            features: [
                {
                    title: 'High Performance',
                    description: 'Our product delivers unmatched speed and efficiency.',
                    icon: 'https://via.placeholder.com/64'
                },
                {
                    title: 'Easy to Use',
                    description: 'Designed with simplicity in mind, no complex setup required.',
                    icon: 'https://via.placeholder.com/64'
                },
                {
                    title: 'Customer Support',
                    description: 'Our team is here to help you 24/7.',
                    icon: 'https://via.placeholder.com/64'
                }
            ]
        };
    }
};
</script>

<style scoped>
.landing-page {
    font-family: 'Poppins', sans-serif;
    color: #333;
    text-align: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.header {
    background-color: #242424;
    color: white;
    padding: 4rem 1.5rem;
}

.header h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: 700;
}

.header p {
    font-size: 1.5rem;
    margin: 1.5rem 0;
}

.get-started-btn {
    margin-top: 1rem;
    font-size: 1.2rem;
    padding: 0.75rem 2rem;
}

.features {
    padding: 3rem 1.5rem;
    background-color: #f4f6f9;
}

.features h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
}

.feature-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
}

.feature-card {
    width: 100%;
    max-width: 320px;
}

.feature-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
}

.footer {
    background-color: #242424;
    color: white;
    padding: 1rem;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 2rem;
}

@media (max-width: 768px) {
    .header h1 {
        font-size: 2.2rem;
    }

    .header p {
        font-size: 1.2rem;
    }

    .feature-card {
        max-width: 100%;
    }

    .features h2 {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .header h1 {
        font-size: 1.8rem;
    }

    .header p {
        font-size: 1rem;
    }

    .get-started-btn {
        font-size: 1rem;
        padding: 0.5rem 1.5rem;
    }

    .features h2 {
        font-size: 1.8rem;
    }
}
</style>
