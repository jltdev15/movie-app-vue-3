<script setup>
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

import { useAuthStore } from '../../stores/AuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const { isError, isLoading, errorMessage } = storeToRefs(authStore);

const user = reactive({
    email: '',
    password: '',
})

const resetError = () => {
    isError.value = null;
    errorMessage.value = ''
}

const submitHandler = async () => {
    const payload = {
        email: user.email,
        password: user.password
    }
    try {
        await authStore.login(payload)
        user.email = ''
        user.password = ''
        router.replace('/')

    } catch (err) {
        console.log(err)

    }

}

</script>

<template>

    <div class="bg-gray-50 md:h-screen font-[sans-serif] text-[#333]">
        <div class="flex flex-col items-center justify-center px-4 py-6 md:max-h-screen">
            <div class="w-full max-w-md px-6 py-8 bg-white border border-gray-300 rounded">

                <h2 class="text-3xl font-extrabold text-center">
                    Log in to your account
                </h2>
                <form @submit.prevent="submitHandler" class="mt-10 space-y-4">
                    <div>
                        <input @focus="resetError" v-model="user.email" name="email" type="email" autocomplete="email"
                            required
                            class="w-full px-4 py-3 text-sm border-2 rounded outline-none focus:border-blue-500"
                            placeholder="Email address" require />
                    </div>
                    <div>
                        <input @focus="resetError" v-model="user.password" name="password" type="password"
                            autocomplete="current-password" required
                            class="w-full px-4 py-3 text-sm border-2 rounded outline-none focus:border-blue-500"
                            placeholder="Password" require />
                    </div>
                    <div v-if="isError" class="text-center">
                        <p class="inline-block px-2 bg-red-600 text-gray-50">{{ errorMessage }}</p>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex items-center">

                            <label for="remember-me" class="block ml-3 text-sm">
                                <router-link class="text-blue-600 hover:text-blue-500"
                                    to="/auth/register">Register</router-link>
                            </label>
                        </div>
                        <div>
                            <a href="jajvascript:void(0);" class="text-sm text-blue-600 hover:text-blue-500">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <div class="!mt-10">
                        <button type="submit"
                            class="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>