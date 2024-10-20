<template>
    <div class="flex justify-content-center align-items-center">
        <Card class="p-4 border-round shadow-2 sm:w-10 md:w-8 lg:w-6 xl:w-4 m-2 sm:m-4 md:m-6 lg:m-8">
            <template #content>
                <div class="flex justify-content-center">
                    <img src="../../assets/images/logo.jpg" alt="Crochet Mart" class="logo" />
                </div>

                <div class="field mb-3">
                    <label for="email">Correo electrónico</label>
                    <InputText id="email" v-model="email" class="w-full" :class="{ 'p-invalid': emailError }"
                        placeholder="user34v@hotmail.com" />
                    <small v-if="emailError" class="p-error">Correo inválido.</small>
                </div>

                <div class="field mb-3">
                    <label for="password">Contraseña</label>
                    <Password id="password" v-model="password" inputStyle="width: 100%; padding-right: 2rem;"
                        class="w-full" :class="{ 'p-invalid': passwordError }" placeholder="*****************"
                        toggleMask :promptLabel="'Ingresa tu contraseña'" :weakLabel="'Débil'" :mediumLabel="'Moderada'"
                        :strongLabel="'Fuerte'">
                        <template #footer>
                            <Divider />
                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                <li>Almenos una letra mayuscula</li>
                                <li>Almenos una letra minuscula</li>
                                <li>Almenos un numero y un caracter especial</li>
                                <li>Minimo 8 caracteres</li>
                            </ul>
                        </template>
                    </Password>

                    <small v-if="passwordError" class="p-error">La contraseña es requerida.</small>
                </div>
                <div class="flex justify-content-end mb-3">
                    <a href="/recuperar-contraseña" class="forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="w-full">
                    <Button label="Ingresar" style="background-color: #252525;" class="w-full" @click="login" />
                    <small v-if="loginError" class="p-error block mt-2">Credenciales incorrectas.</small>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Password from 'primevue/password';
export default {
    components: {
        InputText,
        Button,
        Card,
        Password,
    },
    data() {
        return {
            email: '',
            password: '',
            emailError: false,
            passwordError: false,
            loginError: false,
        };
    },
    methods: {
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        login() {
            this.emailError = !this.validateEmail(this.email);
            this.passwordError = this.password === '';

            if (!this.emailError && !this.passwordError) {
                if (this.email !== 'user34v@hotmail.com' || this.password !== '123456') {
                    this.loginError = true;
                } else {
                    this.loginError = false;
                }
            }
        },
    },
};
</script>

<style scoped>
.forgot-password {
    color: #6b6b6b;
    text-decoration: none;
    font-size: 0.9rem;
}

.forgot-password:hover {
    text-decoration: underline;
    color: #000;
}

.logo {
    width: 100%;
    height: auto;
}
</style>
