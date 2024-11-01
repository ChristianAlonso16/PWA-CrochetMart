<template>
    <div class="flex w-full">
        <!-- Contenedor principal (Navbar y Router View) -->
        <div class="w-full">
            <!-- Navbar (primera fila) -->
            <div>
                <Navbar/>
            </div>
            <!-- Router View (segunda fila) -->
            <div>
                <router-view/>
            </div>
            <!-- Footer (tercer fila) -->
            <div>
                <Footer/>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/modules/client/components/ClientNavbar.vue';
import Footer from '@/modules/client/components/ClientFooter.vue';

export default {
    components: {
        Navbar, Footer
    },
    data() {
        return {
        }
    },
}
</script>