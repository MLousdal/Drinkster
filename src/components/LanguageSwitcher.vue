<template>
  <select
    @change="switchLanguage"
    class="block h-fit w-fit rounded-lg border border-neutral-300 bg-neutral-50 p-1 pe-2 text-sm text-neutral-900 focus:border-amber-400 focus:ring-amber-400 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
  >
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="locale === sLocale"
    >
      {{ t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Tr from '@/i18n/translation'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()

const supportedLocales = Tr.supportedLocales

const router = useRouter()

async function switchLanguage(e: Event) {
  const newLocale = e.target!.value  

  await Tr.switchLanguage(newLocale)

  try {
    await router.replace({ params: { locale: newLocale } })
  } catch (e) {
    console.log(e)
    router.push('/')
  }
}
</script>
