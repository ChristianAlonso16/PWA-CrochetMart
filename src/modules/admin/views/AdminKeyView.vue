<template>
  <div class="keys-view">
    <h2>Administrar Stripe Keys</h2>
    <KeyCard
      title="Key stripe"
      description="Clave para Stripe"
      modifiedDate="20/10/2024"
      @edit="openModal({ name: 'Key stripe', publicKey: '', privateKey: '' }, 'key')"
    />

    <h2>Administrar Links App Móvil</h2>
    <div class="link-cards">
      <KeyCard
        title="Link Play Store"
        description="https://play.google.com/store/games"
        modifiedDate="20/10/2024"
        @edit="openModal({ name: 'Link Play Store', link: 'https://play.google.com/store/games' }, 'link')"
      />
      <KeyCard
        title="Link App Store"
        description="https://www.apple.com/mx/app-store/"
        modifiedDate="20/10/2024"
        @edit="openModal({ name: 'Link App Store', link: 'https://www.apple.com/mx/app-store/' }, 'link')"
      />
    </div>

    <ModalEditKey
      v-if="isModalVisible && modalType === 'key'"
      :isVisible="isModalVisible"
      :keyData="currentKeyData"
      @close="closeModal"
      @save="updateKey"
    />

    <ModalEditLink
      v-if="isModalVisible && modalType === 'link'"
      :isVisible="isModalVisible"
      :keyData="currentKeyData"
      @close="closeModal"
      @save="updateLink"
    />
  </div>
</template>

<script>
import KeyCard from '../components/KeyCard.vue';
import ModalEditKey from '../components/ModalEditKey.vue';
import ModalEditLink from '../components/ModalEditLink.vue';

export default {
  name: "AdminKeyView",
  components: {
    KeyCard,
    ModalEditKey,
    ModalEditLink
  },
  data() {
    return {
      isModalVisible: false,
      currentKeyData: null,
      modalType: null,
    };
  },
  methods: {
    openModal(keyData, type) {
      this.currentKeyData = keyData;
      this.modalType = type;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    updateKey(updatedData) {
      console.log("Stripe key updated:", updatedData);
      this.closeModal();
    },
    updateLink(updatedData) {
      console.log("App link updated:", updatedData);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.keys-view {
  padding: 20px;
}
h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}
.link-cards {
  display: flex;
  gap: 20px;
}
</style>
