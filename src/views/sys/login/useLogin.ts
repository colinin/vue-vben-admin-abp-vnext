import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useValidation } from '/@/hooks/abp/useValidation';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
  MOBILE_REGISTER,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();
  const { ruleCreator } = useValidation();

  const getUserNameFormRule = computed(() =>
    ruleCreator.fieldRequired({
      name: 'UserName',
      resourceName: 'AbpAccount',
      prefix: 'DisplayName',
    }),
  );
  const getPasswordFormRule = computed(() =>
    ruleCreator.fieldRequired({
      name: 'Password',
      resourceName: 'AbpAccount',
      prefix: 'DisplayName',
    }),
  );
  const getEmailFormRule = computed(() =>
    ruleCreator.fieldRequired({ name: 'Email', resourceName: 'AbpAccount', prefix: 'DisplayName' }),
  );
  const getMobileFormRule = computed(() =>
    ruleCreator.fieldRequired({
      name: 'PhoneNumber',
      resourceName: 'AbpAccount',
      prefix: 'DisplayName',
    }),
  );
  const getMobileCodeFormRule = computed(() =>
    ruleCreator.fieldRequired({
      name: 'SmsVerifyCode',
      resourceName: 'AbpAccount',
      prefix: 'DisplayName',
    }),
  );

  // const validatePolicy = async (_: RuleObject, value: boolean) => {
  //   return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
  // };

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const userNameFormRule = unref(getUserNameFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const emailFormRule = unref(getEmailFormRule);
    const mobileFormRule = unref(getMobileFormRule);
    const mobileCodeFormRule = unref(getMobileCodeFormRule);

    const mobileRule = {
      code: mobileCodeFormRule,
      phoneNumber: mobileFormRule,
    };
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          userName: userNameFormRule,
          password: passwordFormRule,
          emailAddress: emailFormRule,
          // policy: [{ validator: validatePolicy, trigger: 'change' }],
        };

      // register form rules
      case LoginStateEnum.MOBILE_REGISTER:
        const mobileCodeRule = unref(getMobileCodeFormRule);
        return {
          userName: userNameFormRule,
          password: passwordFormRule,
          phoneNumber: mobileFormRule,
          code: mobileCodeRule,
        };

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          userName: userNameFormRule,
          ...mobileRule,
        };

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return mobileRule;

      // login form rules
      default:
        return {
          userName: userNameFormRule,
          password: passwordFormRule,
        };
    }
  });
  return { getFormRules };
}
