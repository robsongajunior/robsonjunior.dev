<script setup>
import { ref } from 'vue'

// Contact form posted to Web3Forms (https://web3forms.com), which forwards it by email.
// With JS it sends via fetch and shows the status inline; without JS the plain
// form post still works. The access key is public by design (it only allows sending).
const props = defineProps({
  accessKey: { type: String, required: true },
  labels: { type: Object, required: true } // { subject, name, email, message, submit, sending, sent, error, required }
})

const ENDPOINT = 'https://api.web3forms.com/submit'
const status = ref('idle') // idle | sending | sent | error
const form = ref(null)

async function submit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    const data = Object.fromEntries(new FormData(form.value))
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    })
    const json = await res.json()
    if (!res.ok || !json.success) throw new Error(json.message)
    status.value = 'sent'
    form.value.reset()
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form ref="form" class="form" :action="ENDPOINT" method="POST" @submit.prevent="submit">
    <input type="hidden" name="access_key" :value="props.accessKey" />
    <input type="hidden" name="subject" :value="labels.subject" />
    <input type="hidden" name="from_name" value="robsonjunior.dev" />
    <!-- honeypot: real people never see or tick it -->
    <input type="checkbox" name="botcheck" class="trap" tabindex="-1" autocomplete="off" aria-hidden="true" />

    <label class="field">
      <span class="label">{{ labels.name }}</span>
      <input name="name" type="text" autocomplete="name" required maxlength="120" />
    </label>
    <label class="field">
      <span class="label">{{ labels.email }}</span>
      <input name="email" type="email" autocomplete="email" required maxlength="200" />
    </label>
    <label class="field">
      <span class="label">{{ labels.message }}</span>
      <textarea name="message" rows="7" required maxlength="5000"></textarea>
    </label>

    <div class="foot">
      <button type="submit" :disabled="status === 'sending'">
        {{ status === 'sending' ? labels.sending : labels.submit }} <span aria-hidden="true">→</span>
      </button>
      <p class="status" :class="status" role="status" aria-live="polite">
        <template v-if="status === 'sent'">{{ labels.sent }}</template>
        <template v-else-if="status === 'error'">{{ labels.error }}</template>
      </p>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 20px;
}
.trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.field {
  display: grid;
  gap: 8px;
}
.label {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mute);
}
input,
textarea {
  width: 100%;
  padding: 12px 14px;
  font: inherit;
  font-size: 16px;
  color: var(--paper);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 0;
  transition: border-color 0.2s ease;
}
textarea {
  resize: vertical;
  min-height: 160px;
}
input:hover,
textarea:hover {
  border-color: var(--accent-dim);
}
input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--accent);
  box-shadow: inset 0 0 0 1px var(--accent);
}
.foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
}
button {
  padding: 14px 22px;
  font-family: var(--mono);
  font-weight: 500;
  font-size: 14px;
  color: var(--ink);
  background: var(--accent);
  border: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}
button:hover {
  transform: translateX(3px);
}
button:disabled {
  opacity: 0.6;
  cursor: progress;
  transform: none;
}
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.status {
  margin: 0;
  font-family: var(--mono);
  font-size: 13px;
}
.status.sent {
  color: var(--accent);
}
.status.error {
  color: var(--paper);
}
@media (prefers-reduced-motion: reduce) {
  input,
  textarea,
  button {
    transition: none;
  }
}
</style>
