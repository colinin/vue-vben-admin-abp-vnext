<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('AbpOssManagement.Objects:UploadFile')"
    :width="660"
    :min-height="300"
  >
    <BasicUpload
      :max-size="maxSize"
      :max-number="10"
      :api="uploadObject"
      :upload-params="uploadParams"
    />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicUpload } from '/@/components/Upload';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { uploadObject } from '/@/api/oss-management/oss';
  import { useAbpStoreWidthOut } from '/@/store/modules/abp';

  export default defineComponent({
    name: 'OssUploadModal',
    components: { BasicModal, BasicUpload },
    setup() {
      const { t } = useI18n();
      const bucket = ref('');
      const path = ref('');
      const [registerModal] = useModalInner((data) => {
        path.value = data.path;
        bucket.value = data.bucket;
      });

      const uploadParams = computed(() => {
        return {
          bucket: unref(bucket),
          path: unref(path.value),
        };
      });

      const maxSize = computed(() => {
        const abpStore = useAbpStoreWidthOut();
        const { values } = abpStore.getApplication.setting;
        if (values && values['Abp.OssManagement.FileLimitLength']) {
          return Number(values['Abp.OssManagement.FileLimitLength']);
        }
        return 20;
      });

      return {
        t,
        maxSize,
        uploadObject,
        uploadParams,
        registerModal,
      };
    },
  });
</script>
