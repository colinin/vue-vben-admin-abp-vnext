<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="上传文件"
    :width="660"
    :min-height="300"
  >
    <BasicUpload :maxSize="20" :maxNumber="10" :api="uploadObject" :upload-params="uploadParams" />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { BasicUpload } from '/@/components/Upload';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { uploadObject } from '/@/api/oss-management/oss';

  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    preview?: string;
    originFileObj?: any;
    file: string | Blob;
  }

  export default defineComponent({
    name: 'OssUploadModal',
    components: { BasicModal, BasicUpload },
    setup() {
      const bucket = ref('');
      const path = ref('');
      const fileList = ref<FileItem[]>([]);
      const [registerModal] = useModalInner((data) => {
        path.value = data.path;
        bucket.value = data.bucket;
      });

      const uploadParams = computed(() => {
        return {
          bucket: unref(bucket),
          path: unref(path),
        };
      });

      function beforeUpload(file: FileItem) {
        fileList.value = [...fileList.value, file];
        return false;
      }

      return {
        fileList,
        uploadObject,
        uploadParams,
        registerModal,
        beforeUpload,
      };
    },
  });
</script>
