import type { Ref } from 'vue';

import { computed, ref, reactive, unref, watch } from 'vue';
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { useI18n } from '/@/hooks/web/useI18n';

import { get, create, update } from '/@/api/identity-server/identityResources';
import { IdentityResource } from '/@/api/identity-server/model/identityResourcesModel';

interface UseModal {
  modelIdRef: Ref<string>;
  formElRef: Ref<any>;
  tabActivedKey: Ref<string>;
}

export function useModal({ modelIdRef, formElRef, tabActivedKey }: UseModal) {
  const { t } = useI18n();
  const modelRef = ref<IdentityResource>({} as IdentityResource);

  const isEdit = computed(() => {
    if (unref(modelRef)?.id) {
      return true;
    }
    return false;
  });
  const formTitle = computed(() => {
    return isEdit.value
      ? t('AbpIdentityServer.Resource:Name', [
          unref(modelRef)?.displayName ?? unref(modelRef)?.name,
        ] as Recordable)
      : t('AbpIdentityServer.Resource:New');
  });
  const formRules = reactive({
    name: [
      {
        trigger: 'blur',
        required: true,
        message: `${t('common.inputText')} ${t('AbpIdentityServer.Name')}`,
      },
    ],
  });

  watch(
    () => unref(modelIdRef),
    (id) => {
      unref(formElRef)?.resetFields();
      if (id) {
        get(id).then((res) => {
          modelRef.value = res;
        });
      } else {
        modelRef.value = Object.assign({
          userClaims: [],
          properties: [],
        });
      }
    }
  );

  function handleChangeTab(activeKey) {
    tabActivedKey.value = activeKey;
  }

  function handleVisibleModal(visible: boolean) {
    if (!visible) {
      tabActivedKey.value = 'basic';
    }
  }

  function handleSubmit() {
    return new Promise<any>((resolve, reject) => {
      const formEl = unref(formElRef);
      formEl
        .validate()
        .then(() => {
          const input = cloneDeep(unref(modelRef));
          const api = isEdit.value
            ? update(input.id, Object.assign(input))
            : create(Object.assign(input));
          api
            .then((res) => {
              message.success(t('AbpIdentityServer.Successful'));
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return {
    isEdit,
    modelRef,
    formRules,
    formTitle,
    handleChangeTab,
    handleVisibleModal,
    handleSubmit,
  };
}
