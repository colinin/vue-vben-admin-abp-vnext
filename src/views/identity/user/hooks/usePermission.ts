import { useModal } from '/@/components/Modal';
import { useUserStoreWidthOut } from '/@/store/modules/user';

export function usePermission() {
  const [registerModel, { openModal }] = useModal();

  function showPermissionModal(userId: string) {
    const userStore = useUserStoreWidthOut();
    const props = {
      providerName: 'U',
      providerKey: userId,
      readonly: userStore.getUserInfo.userId === userId,
    };
    openModal(true, props, true);
  }

  return {
    registerModel,
    showPermissionModal,
  };
}
