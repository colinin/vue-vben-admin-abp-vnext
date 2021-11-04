<template>
  <BasicModal
    @register="registerModal"
    :title="t('AbpOssManagement.Objects:Preview')"
    :width="966"
    :min-height="466"
  >
    <ImagePreview :image-list="previewImages" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, watch } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ImagePreview } from '/@/components/Preview';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { OssObject } from '/@/api/oss-management/model/ossModel';
  import { downloadBlob } from '/@/api/oss-management/oss';

  export default defineComponent({
    name: 'OssPreviewModal',
    components: { BasicModal, ImagePreview },
    setup() {
      const { t } = useI18n();
      const bucket = ref('');
      const objects = ref<OssObject[]>([]);
      const previewImages = ref<any[]>([]);
      const [registerModal] = useModalInner((data) => {
        bucket.value = data.bucket;
        objects.value = data.objects;
      });

      watch(
        () => unref(objects),
        async (objs) => {
          previewImages.value = [];
          const images: any[] = [];
          for (let i = 0; i < objs.length; i++) {
            const blob = await downloadBlob(unref(bucket), objs[i].path, objs[i].name);
            images.push({
              src: URL.createObjectURL(blob),
              width: '100%',
              height: '100%',
            });
          }
          previewImages.value = images;
        },
      );

      return {
        t,
        previewImages,
        registerModal,
      };
    },
  });
</script>
