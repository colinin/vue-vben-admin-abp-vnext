import { useI18n } from '/@/hooks/web/useI18n';
import { useModal } from '/@/components/Modal';
import { lock, unlock } from '/@/api/identity/user';
import { FormSchema } from '/@/components/Form';

export enum LockType {
  Seconds = 1,
  Minutes = 60,
  Hours = 3600,
  Days = 86400,
  Months = 2678400, // 按31天计算
  Years = 32140800, // 按31*12天计算
}

interface UseLock {
  emit: EmitType;
}

export function useLock({ emit }: UseLock) {
  const { t } = useI18n();
  const [registerLockModal, { openModal }] = useModal();

  const formSchemas: FormSchema[] = [
    {
      field: 'seconds',
      component: 'Input',
      label: t('AbpIdentity.LockTime'),
      colProps: { span: 24 },
      required: true,
    },
    {
      field: 'type',
      component: 'Select',
      label: t('AbpIdentity.LockType'),
      colProps: { span: 24 },
      required: true,
      defaultValue: LockType.Seconds,
      componentProps: {
        options: [
          { label: '秒', value: LockType.Seconds },
          { label: '分', value: LockType.Minutes },
          { label: '时', value: LockType.Hours },
          { label: '天', value: LockType.Days },
          { label: '月', value: LockType.Months },
          { label: '年', value: LockType.Years },
        ],
      },
    },
  ];

  function handleLock(id: string, input: { seconds: number; type: LockType }) {
    return lock(id, input.type * input.seconds).then(() => {
      emit('change');
    });
  }

  function handleUnLock(id: string) {
    return unlock(id);
  }

  function showLockModal(userId: string) {
    openModal(true, { userId }, true);
  }

  return {
    formSchemas,
    handleLock,
    handleUnLock,
    registerLockModal,
    showLockModal,
  };
}
