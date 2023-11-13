<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk, mdiAlertCircle } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";


const store = useAuthStore()
const { isLoggedIn, errors, errormsg, fetchUser } = storeToRefs(store)
const { handleLogin } = store
let errorNotification = ref(false)


const form = reactive({
  email: '',
  password: '',
  remember: true
})

const error = reactive({
  email: false,
  password: false
})



const router = useRouter()

//defining form validation rules
const validateForm = ()=> {
  if(!form.email || !form.email.includes("@")){
    error.email = true;
  }else{
    error.email = false;
  }

  if(!form.password){
    error.password = true;
  }else{
    error.password = false;
  }

  if(error.email || error.password){
    return false;
  }else{
    return true;
  }
}

const submit = async () => {

  if(!validateForm()){
    return false;
  }

  await handleLogin(form)
  if(errormsg.value){
    errorNotification.value = true;
  }
  if (isLoggedIn.value) {
      router.push({ name: 'dashboard' })
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
    
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <NotificationBar v-if="errorNotification" color="danger" :outline="false" @dismiss-notification="()=>errorNotification=false">
          {{ errormsg }}
        </NotificationBar>
        <FormField label="Login" :help="error.email?'Please enter valid email':'Please enter your email'" :error="error.email">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="email"
            autocomplete="username"
            :error="error.email"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password" :error="error.password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
            :error="error.password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
