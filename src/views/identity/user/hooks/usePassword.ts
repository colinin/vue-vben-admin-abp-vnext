import { createVNode } from 'vue';
import { Button } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchema } from '/@/components/Form';
import { useModal } from '/@/components/Modal';
import { useRandomPassword } from '/@/hooks/security/useRandomPassword';

export function usePassword() {
  const { t } = useI18n();
  const formSchemas: FormSchema[] = [
    {
      field: 'password',
      component: 'InputSearch',
      label: t('AbpIdentity.Password'),
      colProps: { span: 24 },
      required: true,
      componentProps: ({ formModel }) => {
        return {
          allowClear: false,
          enterButton: createVNode(
            Button,
            {
              type: 'primary',
            },
            () => 'Random',
          ),
          onSearch: () => {
            formModel.password = generatePassword();
          },
        };
      },
    },
  ];
  const [registerPasswordModal, { openModal }] = useModal();
  const { generatePassword } = useRandomPassword();

  function showPasswordModal(userId: string) {
    openModal(true, userId, true);
  }

  return { formSchemas, registerPasswordModal, showPasswordModal, generatePassword };
}
