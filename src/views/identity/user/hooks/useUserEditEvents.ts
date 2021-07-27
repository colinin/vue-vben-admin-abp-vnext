import { Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useI18n } from '/@/hooks/web/useI18n';
import { computed, watch, ref, unref } from 'vue';
import { FormActionType } from '/@/components/Form';
import { CreateUser, User, UpdateUser } from '/@/api/identity/model/userModel';
import { create, getAssignableRoles, getById, getRoleList, update } from '/@/api/identity/user';
import { getModalFormSchemas } from '../datas/ModalData';

interface UseUserEditEventContext {
  userIdRef: Ref<Nullable<string>>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useUserEditEvents({ userIdRef, formElRef }: UseUserEditEventContext) {
  const { t } = useI18n();
  const thisUser = ref<Nullable<User>>(null);

  const userTitle = computed(() => {
    if (unref(thisUser)) {
      return t('AbpIdentity.Edit');
    }
    return t('AbpIdentity.NewUser');
  });

  const userSchemas = computed(() => {
    return [...getModalFormSchemas()];
  });

  function handleSaveUser(val) {
    console.log(val);
    const api = val.id
      ? update(val.id, cloneDeep(val) as UpdateUser)
      : create(cloneDeep(val) as CreateUser);
    return api.then((user) => {
      thisUser.value = user;
    });
  }

  async function warpAssignableRoles() {
    const { items } = await getAssignableRoles();
    const roleOptions = items.map((role) => {
      return {
        key: role.name,
        label: role.name,
        value: role.name,
      };
    });
    const formEl = unref(formElRef);
    formEl?.updateSchema({
      field: 'roleNames',
      componentProps: {
        options: roleOptions,
      },
    });
  }

  watch(
    () => unref(userIdRef),
    async (id) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      if (id) {
        const user = await getById(id);
        const userRoles = await getRoleList(id);
        const roleNames = userRoles.items.map((role) => role.name);
        thisUser.value = user;
        formEl?.setFieldsValue(
          Object.assign(user, {
            roleNames: roleNames,
          })
        );
      } else {
        thisUser.value = null;
      }
    }
  );

  return {
    userTitle,
    userSchemas,
    handleSaveUser,
    warpAssignableRoles,
  };
}
