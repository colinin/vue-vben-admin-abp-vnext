import type { Ref } from 'vue';

import { computed, unref, watch } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { getModalFormSchemas } from '../datas/ModalData';
import { FormActionType } from '/@/components/Form';
import { Role } from '/@/api/identity/model/roleModel';
import { create, update } from '/@/api/identity/role';

interface UseRoleFormContext {
  roleRef: Ref<Nullable<Role>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useRoleModal({ roleRef, formElRef }: UseRoleFormContext) {
  const { t } = useI18n();
  const formTitle = computed(() => {
    return unref(roleRef)?.id ? t('AbpIdentity.Edit') : t('AbpIdentity.NewRole');
  });
  const formSchemas = computed(() => {
    return [...getModalFormSchemas()];
  });

  function handleSubmit(input) {
    return input.id ? update(input.id, input) : create(input);
  }

  watch(
    () => unref(roleRef),
    (role) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      formEl?.setFieldsValue(role);
    },
    {
      immediate: true,
    }
  );

  return {
    formTitle,
    formSchemas,
    handleSubmit,
  };
}
