<template>
  <BasicModal
    @register="registerModal"
    :title="t('AbpOssManagement.Objects')"
    :width="966"
    :min-height="466"
  >
    <ImagePreview :image-list="previewImages" />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ImagePreview } from '/@/components/Preview';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { OssObject } from '/@/api/oss-management/model/ossModel';
  import { downloadUrl } from '/@/api/oss-management/oss';
  import { format } from '/@/utils/strings';

  export default defineComponent({
    name: 'OssPreviewModal',
    components: { BasicModal, ImagePreview },
    setup() {
      const { t } = useI18n();
      const bucket = ref('');
      const objects = ref<OssObject[]>([]);
      const [registerModal] = useModalInner((data) => {
        bucket.value = data.bucket;
        objects.value = data.objects;
      });
      const previewImages = computed(() => {
        const objs = unref(objects);
        return objs
          .filter((obj) => !obj.isFolder)
          .map((obj) => {
            return {
              src: generateOssUrl(unref(bucket), obj.path, obj.name),
              width: '100%',
              height: '100%',
            };
          });
      });

      function generateOssUrl(bucket: string, path: string, object: string) {
        if (path) {
          // 对 Path部分的 URL 编码
          let _path = encodeURIComponent(path);
          if (_path.endsWith('%2F')) {
            _path = _path.substring(0, _path.length - 3);
          }
        }
        return format(downloadUrl, { bucket: bucket, path: path, name: object });
      }

      return {
        t,
        previewImages,
        registerModal,
      };
    },
  });
</script>
