/**
 * 摘自 https://www.html5tricks.com/demo/js-passwd-generator/index.html
 * 侵权请联系删除
 */
import { createVNode } from 'vue';
import { Button } from 'ant-design-vue';
import { useAbpStoreWithOut } from '/@/store/modules/abp';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchema } from '/@/components/Form';
import { useModal } from '/@/components/Modal';

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
  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
    defaultNumber: getRandomNumber,
  };

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function generatePassword() {
    const abpStore = useAbpStoreWithOut();
    const { setting } = abpStore.getApplication;
    const settings = setting.values;
    // 根据配置项生成随机密码
    // 密码长度
    const length = Number(settings['Abp.Identity.Password.RequiredLength'] ?? '0');
    // 需要小写字母
    const lower = settings['Abp.Identity.Password.RequireLowercase'] === 'true';
    // 需要大写字母
    const upper = settings['Abp.Identity.Password.RequireUppercase'] === 'true';
    // 需要数字
    const number = settings['Abp.Identity.Password.RequireDigit'] === 'true';
    // 需要符号
    const symbol = settings['Abp.Identity.Password.RequireNonAlphanumeric'] === 'true';
    // 默认生成数字
    const defaultNumber = !lower && !upper && !number && !symbol;

    let generatedPassword = '';
    const typesArr = [{ lower }, { upper }, { number }, { symbol }, { defaultNumber }].filter(
      (item) => Object.values(item)[0],
    );
    for (let i = 0; i < length; i++) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
    return generatedPassword.slice(0, length);
  }

  function showPasswordModal(userId: string) {
    openModal(true, userId, true);
  }

  return { formSchemas, registerPasswordModal, showPasswordModal, generatePassword };
}
