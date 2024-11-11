<template>
  <div>
    <div class="navbar-admin">
      <i class="pi pi-bars bars-icon"></i>
      <div class="text-wrapper-7">Keys</div>
      <div class="user-icon">
        <i class="pi pi-user"></i>
      </div>
    </div>

    <div class="keys-view">
      <h2 class="header">Administrar Stripe Keys</h2>
      <LinksCard title="Key stripe" modifiedDate="20/10/2024"
        @edit="openModal({ name: 'Key stripe', publicKey: '', privateKey: '' }, 'key')" />

      <h2 class="header">Administrar Links App Móvil</h2>
      <div class="link-cards">
        <KeyCard title="Link Play Store" description="https://play.google.com/store/games" modifiedDate="20/10/2024"
          @edit="openModal({ name: 'Link Play Store', link: 'https://play.google.com/store/games' }, 'link')" />
        <KeyCard title="Link App Store" description="https://www.apple.com/mx/app-store/" modifiedDate="20/10/2024"
          @edit="openModal({ name: 'Link App Store', link: 'https://www.apple.com/mx/app-store/' }, 'link')" />
      </div>

      <ModalEditKey v-if="isModalVisible && modalType === 'key'" :isVisible="isModalVisible" :keyData="currentKeyData"
        @close="closeModal" @save="updateKey" />

      <ModalEditLink v-if="isModalVisible && modalType === 'link'" :isVisible="isModalVisible" :keyData="currentKeyData"
        @close="closeModal" @save="updateLink" />
    </div>
  </div>
</template>

<script>
import KeyCard from '../components/KeyCard.vue';
import LinksCard from '../components/LinksCard.vue';
import ModalEditKey from '../components/ModalEditKey.vue';
import ModalEditLink from '../components/ModalEditLink.vue';

export default {
  name: "AdminKeyView",
  components: {
    KeyCard,
    LinksCard,
    ModalEditKey,
    ModalEditLink,
  },
  data() {
    return {
      isModalVisible: false,
      currentKeyData: null,
      modalType: null,
      keys: [
        { name: 'Key stripe', publicKey: '', privateKey: '' },
        { name: 'Link Play Store', link: 'https://play.google.com/store/games' },
        { name: 'Link App Store', link: 'https://www.apple.com/mx/app-store/' },
      ],
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
      this.currentKeyData = null;
      this.modalType = null;
    },
    updateKey(updatedData) {
      console.log("Stripe key updated:", updatedData);
      this.closeModal();
      this.keys = this.keys.map(key => {
        if (key.name === updatedData.name) {
          return updatedData;
        }
        return key;
      });
    },
    updateLink(updatedData) {
      console.log("App link updated:", updatedData);
      this.closeModal();
      this.keys = this.keys.map(key => {
        if (key.name === updatedData.name) {
          return updatedData;
        }
        return key;
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Roboto-Regular", Helvetica;
}

.keys-view {
  padding: 20px;
}

.header {
  color: #252525;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: left;
  margin-left: 30px;
  font-weight: normal;
  padding-top: 20px;
}

.link-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.navbar-admin {
  display: flex;
  align-items: center;
  padding: 12px 32px;
  gap: 24px;
  width: 100%;
}

.bars-icon {
  font-size: 1.5rem;
  color: #252525;
  margin-right: 8px;
}

.text-wrapper-7 {
  font-size: 1.2rem;
  flex: 1;
}

.user-icon {
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.user-icon i {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .navbar-admin {
    padding: 10px 20px;
    gap: 16px;
  }

  .header {
    font-size: 12px;
    margin-left: 20px;
  }

  .link-cards {
    gap: 10px;
  }

  .user-icon {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .navbar-admin {
    padding: 8px 16px;
    gap: 12px;
  }

  .text-wrapper-7 {
    font-size: 1rem;
  }

  .link-cards {
    gap: 8px;
    justify-content: center;
  }

  .link-cards>div {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
