<template>
  <div>
    <div @click="playAudio" :class="['custom-audio', type]">
      <CustomSoundIcon
          :isStart="isPlay"
          :style="{ marginLeft: '10px' }"
          :barStyle="{ backgroundColor: type === '' ? '#fff' : '#1f1f1f' }"
      />
      <div style="margin-left: 10px">{{ audioTime }}"</div>
      <audio
          ref="audioRef"
          @ended="handleAudioEnd"
          @loadedmetadata="emit('onLoadedMetadata')"
          :src="audioUrl"
          controls
          style="display: none"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, defineEmits, defineProps} from 'vue';
import CustomSoundIcon from "@/components/CustomSoundIcon.vue";

const props = defineProps({
  audioUrl: String,
  time: Number,
  type: String
});

const emit = defineEmits(["onLoadedMetadata"])

const audioTime = ref(props.time);
const audioRef = ref(null);
const isPlay = ref(false);
const isPause = ref(true);

const playAudio = () => {
  if (audioRef.value && isPause.value) {
    audioRef.value.pause();
    isPlay.value = true;
    audioRef.value.currentTime = 0;
    audioRef.value.play();
    isPause.value = false;
  } else {
    audioRef.value.pause();
    isPause.value = true;
    isPlay.value = false;
  }
};

const handleAudioEnd = () => {
  isPlay.value = false;
  isPause.value = true;
};


</script>

<style scoped>
.custom-audio {
  background-color: #4C9BFF;
  width: 150px;
  height: 32px;
  border-radius: 5px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-audio.minor {
  background-color: #FFFFFF;
  color: #1F1F1F;
}
</style>
