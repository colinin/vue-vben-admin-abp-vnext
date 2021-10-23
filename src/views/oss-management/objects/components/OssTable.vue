<template>
  <div class="content">
    <Card :title="t('AbpOssManagement.Objects:FileSystem')">
      <CardGrid style="width: 25%">
        <CardMeta>
          <template #title>
            <Select
              style="width: 100%"
              :placeholder="t('AbpOssManagement.Containers:Select')"
              @change="handleContainerChange"
            >
              <Option
                v-for="container in containers"
                :key="container.name"
                :value="container.name"
                >{{ container.name }}</Option
              >
            </Select>
          </template>
          <template #description>
            <a-button
              v-if="hasPermission('AbpOssManagement.OssObject.Create')"
              :disabled="lockTree"
              style="width: 100%; margin-bottom: 20px"
              ghost
              type="primary"
              @click="handleNewFolder"
              >{{ t('AbpOssManagement.Objects:CreateFolder') }}</a-button
            >
            <DirectoryTree
              v-if="!lockTree"
              :tree-data="folders"
              :expandedKeys="expandedKeys"
              @expand="handleFolderExpand"
              @select="handleSelectFolder"
            />
          </template>
        </CardMeta>
      </CardGrid>
      <CardGrid style="width: 75%">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <a-button
              v-if="hasPermission('AbpOssManagement.OssObject.Create')"
              v-feature="'AbpOssManagement.OssObject.UploadFile'"
              :disabled="lockTree"
              type="primary"
              @click="handleUpload"
              >{{ t('AbpOssManagement.Objects:UploadFile') }}</a-button
            >
          </template>
          <template #action="{ record }">
            <TableAction
              :stop-button-propagation="true"
              :actions="[
                {
                  color: 'success',
                  label: t('AbpOssManagement.Objects:Preview'),
                  icon: 'ant-design:search-outlined',
                  onClick: handlePreview.bind(null, record),
                },
                {
                  auth: 'AbpOssManagement.OssObject.Delete',
                  color: 'error',
                  label: t('AbpOssManagement.Delete'),
                  icon: 'ant-design:delete-outlined',
                  onClick: handleDelete.bind(null, record),
                },
                {
                  auth: 'AbpOssManagement.OssObject.Download',
                  ifShow: !record.isFolder,
                  label: t('AbpOssManagement.Objects:Download'),
                  icon: 'ant-design:download-outlined',
                  onClick: handleDownload.bind(null, record),
                },
              ]"
            />
          </template>
        </BasicTable>
      </CardGrid>
    </Card>
    <OssUploadModal @register="registerUploadModal" />
    <OssFolderModal @register="registerFolderModal" />
    <OssPreviewModal @register="registerPreviewModal" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, unref } from 'vue';
  import { Card, Modal, Tree, Select } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getContainers, getObjects, deleteObject, downloadUrl } from '/@/api/oss-management/oss';
  import { OssContainer, OssObject } from '/@/api/oss-management/model/ossModel';
  import { getDataColumns } from '../datas/TableData';
  import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
  import { format } from '/@/utils/strings';
  import OssUploadModal from './OssUploadModal.vue';
  import OssFolderModal from './OssFolderModal.vue';
  import OssPreviewModal from './OssPreviewModal.vue';

  export default defineComponent({
    name: 'OssTable',
    components: {
      Card,
      CardGrid: Card.Grid,
      CardMeta: Card.Meta,
      BasicTable,
      TableAction,
      Select,
      Option: Select.Option,
      DirectoryTree: Tree.DirectoryTree,
      OssUploadModal,
      OssFolderModal,
      OssPreviewModal,
    },
    setup() {
      // 暂时不将逻辑代码移动到hooks，也不算太复杂 Orz...

      const { t } = useI18n();
      const rootFolder: TreeDataItem = {
        key: './',
        title: t('AbpOssManagement.Objects:Root'),
        path: '',
        children: [],
      };
      const folders = ref<TreeDataItem[]>([rootFolder]);
      const objects = ref<OssObject[]>([]);
      const containers = ref<OssContainer[]>([]);
      const bucket = ref('');
      const path = ref('');
      const marker = ref('');
      const expandedKeys = ref<string[]>([]);
      const { hasPermission } = usePermission();
      const [registerFolderModal, { openModal: openFolderModal }] = useModal();
      const [registerUploadModal, { openModal: openUploadModal }] = useModal();
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
      const [registerTable, { reload, setPagination, setTableData }] = useTable({
        rowKey: 'name',
        title: t('AbpOssManagement.DisplayName:OssObject'),
        columns: getDataColumns(),
        api: getObjects,
        fetchSetting: {
          pageField: 'skipCount',
          sizeField: 'maxResultCount',
          listField: 'objects',
          totalField: 'maxKeys',
        },
        beforeFetch: (request) => {
          request.marker = request.skipCount === 1 ? '' : unref(marker);
          request.bucket = unref(bucket);
          request.prefix = unref(path);
          request.delimiter = '/';
        },
        beforeResponse: (res) => {
          marker.value = res.nextMarker;
          return res;
        },
        pagination: true,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        tableSetting: {
          redo: false,
        },
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        immediate: false,
        rowSelection: { type: 'checkbox' },
        actionColumn: {
          width: 240,
          title: t('table.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const lockTree = computed(() => {
        return unref(bucket) ? false : true;
      });

      onMounted(() => {
        getContainers({
          prefix: '',
          marker: '',
          sorting: '',
          skipCount: 1,
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
        marker.value = '';
        expandedKeys.value = [];
      }

      function handleFolderExpand(keys, e) {
        expandedKeys.value = keys;
        path.value = e.node.dataRef.path + e.node.eventKey;
        getObjects({
          bucket: unref(bucket),
          prefix: unref(path),
          delimiter: '/',
          marker: '',
          encodingType: '',
          sorting: '',
          skipCount: 1,
          maxResultCount: 10,
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

      function handleSelectFolder(folders, e) {
        marker.value = '';
        path.value = e.node.dataRef.path + folders[0];
        getObjects({
          bucket: unref(bucket),
          prefix: unref(path),
          marker: unref(marker),
          delimiter: '/',
          encodingType: '',
          sorting: '',
          skipCount: 1,
          maxResultCount: 10,
        }).then((res) => {
          objects.value = res.objects;
          marker.value = res.nextMarker;
          setTableData(res.objects);
          setPagination({
            total: res.maxKeys,
          });
        });
      }

      function handleDelete(record) {
        Modal.warning({
          title: t('AbpUi.AreYouSure'),
          content: t('AbpUi.ItemWillBeDeletedMessage'),
          okCancel: true,
          onOk: () => {
            deleteObject({
              bucket: unref(bucket),
              path: unref(path),
              object: record.name,
            }).then(() => {
              reload();
            });
          },
        });
      }

      function handleDownload(record) {
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = generateOssUrl(unref(bucket), record.path, record.name);
        link.setAttribute('download', record.name);
        document.body.appendChild(link);
        link.click();
      }

      function generateOssUrl(bucket: string, path: string, object: string) {
        if (path) {
          // 对 Path部分的 URL 编码
          path = encodeURIComponent(path);
          if (path.endsWith('%2F')) {
            path = path.substring(0, path.length - 3);
          }
        }
        return format(downloadUrl, { bucket: bucket, path: path, name: object });
      }

      function handleUpload() {
        openUploadModal(true, {
          bucket: unref(bucket),
          // 去掉头部的./标记
          path: unref(path).substring(2),
        });
      }

      function handleNewFolder() {
        openFolderModal(true, {
          bucket: unref(bucket),
          path: unref(path),
        });
      }

      function handlePreview(record) {
        openPreviewModal(true, {
          bucket: unref(bucket),
          objects: [record],
        });
      }

      return {
        t,
        folders,
        lockTree,
        expandedKeys,
        handleFolderExpand,
        handleSelectFolder,
        containers,
        handleContainerChange,
        registerUploadModal,
        handleUpload,
        handleNewFolder,
        hasPermission,
        registerTable,
        handleDelete,
        handleDownload,
        registerFolderModal,
        registerPreviewModal,
        handlePreview,
      };
    },
  });
</script>
