import { ref, unref, onMounted } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';

import { getContainers, getObjects } from '/@/api/oss-management/oss';
import { OssContainer } from '/@/api/oss-management/model/ossModel';

import { formatPagedRequest } from '/@/utils/http/abp/helper';

export function useObjects() {
  const { t } = useI18n();
  const containers = ref<OssContainer[]>([]);
  const rootFolder: TreeDataItem = {
    key: './',
    title: t('AbpOssManagement.Objects:Root'),
    path: '',
    children: [],
  };
  const folders = ref<TreeDataItem[]>([rootFolder]);

  const bucket = ref('');
  const path = ref('');
  const expandedKeys = ref<string[]>([]);

  onMounted(() => {
    getContainers({
      prefix: '',
      marker: '',
      sorting: '',
      skipCount: 0,
      maxResultCount: 100,
    }).then((res) => {
      containers.value = res.containers;
    });
  });

  function handleContainerChange(container) {
    rootFolder.value = {
      key: './',
      title: t('AbpOssManagement.Objects:Root'),
      path: '',
      isLeaf: false,
      children: [],
    };
    bucket.value = container;
    folders.value = [rootFolder];
    expandedKeys.value = [];
  }

  function fetchFolders(keys, e) {
    expandedKeys.value = keys;
    path.value = e.node.dataRef.path + e.node.eventKey;
    getObjects({
      bucket: unref(bucket),
      prefix: unref(path),
      delimiter: '/',
      marker: '',
      encodingType: '',
      sorting: '',
      skipCount: 0,
      maxResultCount: 100,
    }).then((res) => {
      const fs = res.objects
        .filter((item) => item.isFolder)
        .map((item) => {
          return {
            key: item.name,
            title: item.name,
            createDate: item.creationTime,
            path: item.path,
            children: [],
          } as TreeDataItem;
        });
      e.node.dataRef.children = [...fs];
    });
  }

  function beforeFetch(request: any) {
    request.bucket = unref(bucket);
    request.prefix = unref(path);
    request.delimiter = '/';
    formatPagedRequest(request);
  }

  return {
    bucket,
    path,
    containers,
    expandedKeys,
    folders,
    beforeFetch,
    fetchFolders,
    handleContainerChange,
  };
}
