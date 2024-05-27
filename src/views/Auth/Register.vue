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
    confirmPassword: '',

})

const resetError = () => {
    isError.value = null;
    errorMessage.value = ''
}

const submitHandler = async () => {
    // Validate if password is match
    if (user.password !== user.confirmPassword) {
        isError.value = true;
        return errorMessage.value = 'Password not match'
    }
    const payload = {
        email: user.email,
        password: user.password
    }
    try {
        await authStore.register(payload)
        user.email = ''
        user.password = ''
        user.confirmPassword = ''
        router.replace('/auth/login')
    } catch (err) {
        console.log(err)

    }

}

</script>


<template>
    <div>
        <div class="flex flex-col  font-[sans-serif] text-[#333] sm:h-screen p-4">
            <div class="py-3 text-3xl font-bold text-center">
                <h1>Account Registration</h1>
            </div>
            <div class="w-full max-w-md p-6 mx-auto border border-gray-300 rounded-md">

                <form @submit.prevent="submitHandler">
                    <div class="space-y-6">
                        <div>
                            <label class="block mb-2 text-sm">Email Address</label>
                            <input @focus="resetError" v-model="user.email" name="email" type="email"
                                class="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-md outline-blue-500"
                                placeholder="Enter email" required />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm">Password</label>
                            <input v-model="user.password" name="password" type="password"
                                class="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-md outline-blue-500"
                                placeholder="Enter password" required />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm">Confirm Password</label>
                            <input v-model="user.confirmPassword" name="cpassword" type="password"
                                class="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-md outline-blue-500"
                                placeholder="Enter confirm password" required />
                        </div>
                        <div v-if="isError" class="text-center">
                            <p class="inline-block px-2 bg-red-600 text-gray-50">{{ errorMessage }}</p>
                        </div>

                    </div>
                    <div class="!mt-10">
                        <button type="submit"
                            class="w-full px-4 py-3 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
                            Create an account
                        </button>
                    </div>
                    <p class="mt-6 text-sm text-center">Already have an account? <router-link to="/auth/login"
                            class="ml-1 font-semibold text-blue-600 hover:underline">Login here</router-link></p>
                </form>
            </div>
        </div>
    </div>
</template>