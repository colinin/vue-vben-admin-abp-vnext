import { Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { CreateRoute, Route, UpdateRoute } from '/@/api/api-gateway/model/routeModel';
import { create, update } from '/@/api/api-gateway/route';
import { FormActionType, TabFormSchema } from '/@/components/Form';

import { getModalFormSchemas } from '../components/ModalData';
import { computed, watch, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

interface UseGlobalFormContext {
  formModel: Ref<Nullable<Route>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useRouteFormContext({ formModel, formElRef }: UseGlobalFormContext) {
  const { t } = useI18n();
  const getFormSchemas = computed((): TabFormSchema[] => {
    return [...getModalFormSchemas()];
  });

  const getFormTitle = computed(() => {
    const model = unref(formModel);
    if (model && model.reRouteId) {
      return t('ApiGateway.Route:EditBy', [model.reRouteName] as Recordable);
    }
    return t('ApiGateway.Route:AddNew');
  });

  async function handleFormSubmit(val) {
    const api: Promise<Route> = val.reRouteId
      ? update(cloneDeep(val) as UpdateRoute)
      : create(cloneDeep(val) as CreateRoute);
    return api;
  }

  watch(
    () => unref(formModel),
    (model) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      formEl?.setFieldsValue(model);
    }
  );
  return {
    getFormTitle,
    getFormSchemas,
    handleFormSubmit,
  };
}
