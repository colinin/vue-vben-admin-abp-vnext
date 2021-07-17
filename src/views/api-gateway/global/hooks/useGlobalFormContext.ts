import { Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import {
  CreateGlobalConfiguration,
  GlobalConfiguration,
  UpdateGlobalConfiguration,
} from '/@/api/api-gateway/model/globalModel';
import { create, update } from '/@/api/api-gateway/global';
import { FormActionType, TabFormSchema } from '/@/components/Form';

import { getModalFormSchemas } from '../components/ModalData';
import { computed, watch, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

interface UseGlobalFormContext {
  formModel: Ref<Nullable<GlobalConfiguration>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useGlobalFormContext({ formModel, formElRef }: UseGlobalFormContext) {
  const { t } = useI18n();
  const getFormSchemas = computed((): TabFormSchema[] => {
    return [...getModalFormSchemas()];
  });

  const getFormTitle = computed(() => {
    const model = unref(formModel);
    if (model && model.itemId) {
      return t('ApiGateway.Group:EditBy', [model.appId] as Recordable);
    }
    return t('ApiGateway.Group:AddNew');
  });

  async function handleFormSubmit(val) {
    const api: Promise<GlobalConfiguration> = val.itemId
      ? update(cloneDeep(val) as UpdateGlobalConfiguration)
      : create(cloneDeep(val) as CreateGlobalConfiguration);
    return api;
  }

  watch(
    () => unref(formModel),
    (model) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      console.log('setFieldsValue', model);
      formEl?.setFieldsValue(model);
    }
  );
  return {
    getFormTitle,
    getFormSchemas,
    handleFormSubmit,
  };
}
