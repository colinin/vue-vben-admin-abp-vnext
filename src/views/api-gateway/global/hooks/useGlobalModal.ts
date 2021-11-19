import { Ref } from 'vue';

import { computed, ref, unref, reactive, watchEffect } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { getActivedList } from '/@/api/api-gateway/group';
import { getLoadBalancerProviders } from '/@/api/api-gateway/basic';
import { getByAppId, create, update } from '/@/api/api-gateway/global';
import {
  CreateGlobalConfiguration,
  UpdateGlobalConfiguration,
} from '/@/api/api-gateway/model/globalModel';
import { ReturnInnerMethods } from '/@/components/Modal';

interface UseGlobalModal {
  emit: EmitType;
  appIdRef: Ref<string>;
  formElRef: Ref<any>;
  modalMethods: ReturnInnerMethods;
}

export function useGlobalModal({ emit, appIdRef, formElRef, modalMethods }: UseGlobalModal) {
  const { t } = useI18n();
  const modelRef = ref<Recordable>({});
  const appIdOptions = ref<any>([]);
  const balancerOptions = ref<any>([]);

  const radioOptions = reactive([
    { label: t('ApiGateway.DisplayName:Enable'), value: true },
    { label: t('ApiGateway.DisplayName:Disable'), value: false },
  ]);

  const discoveryOptions = reactive([
    { label: t('ApiGateway.None'), value: '' },
    { label: 'Consul', value: 'Consul' },
    { label: 'Eureka', value: 'Eureka' },
    { label: 'Zookeeper', value: 'Zookeeper' },
  ]);

  const formRules = reactive({
    appId: [
      {
        required: true,
        message: t('AbpValidation.The {0} field is required', [t('ApiGateway.DisplayName:AppId')]),
      },
    ],
    baseUrl: [
      {
        required: true,
        message: t('AbpValidation.The {0} field is required', [
          t('ApiGateway.DisplayName:BaseUrl'),
        ]),
      },
    ],
  });

  const formTitle = computed(() => {
    const model = unref(modelRef);
    if (model && model.itemId) {
      return t('ApiGateway.Group:EditBy', [model.appId]);
    }
    return t('ApiGateway.Group:AddNew');
  });

  watchEffect(() => {
    initModel();
    !unref(appIdRef) && fetchOptions();
    unref(appIdRef) && fetchModel();
  });

  function initModel() {
    // 嵌套对象初始化一下
    modelRef.value = {
      downstreamScheme: 'HTTP',
      qoSOptions: {
        timeoutValue: 10000,
        durationOfBreak: 60000,
        exceptionsAllowedBeforeBreaking: 50,
      },
      rateLimitOptions: {
        httpStatusCode: 429,
        disableRateLimitHeaders: false,
        quotaExceededMessage:
          '{\n  "error": {\n    "code": "429",\n    "message": "您的操作过快,请稍后再试!",\n    "details": "您的操作过快,请稍后再试!",\n    "data": {},\n    "validationErrors": []\n  }\n}',
      },
      httpHandlerOptions: {
        useProxy: false,
        useTracing: false,
        allowAutoRedirect: false,
        useCookieContainer: false,
      },
      loadBalancerOptions: {},
      serviceDiscoveryProvider: {},
    };
  }

  function fetchOptions() {
    getActivedList().then((res) => {
      appIdOptions.value = res.items.map((item) => {
        return {
          label: item.appName,
          value: item.appId,
        };
      });
    });
    getLoadBalancerProviders().then((res) => {
      balancerOptions.value = res.items.map((item) => {
        return {
          label: item.displayName,
          value: item.type,
        };
      });
    });
  }

  function fetchModel() {
    getByAppId(unref(appIdRef)).then((res) => {
      modelRef.value = res;
    });
  }

  function handleCancel() {
    const formEl = unref(formElRef);
    formEl.clearValidate();
  }

  function handleSubmit() {
    const formEl = unref(formElRef);
    formEl.validate().then(() => {
      const model = unref(modelRef);
      const { changeOkLoading, closeModal } = modalMethods;
      changeOkLoading(true);
      const api = model.itemId
        ? update(model as UpdateGlobalConfiguration)
        : create(model as CreateGlobalConfiguration);
      api
        .then((res) => {
          initModel();
          closeModal();
          emit('change', res);
        })
        .finally(() => {
          changeOkLoading(false);
        });
    });
  }

  return {
    modelRef,
    formTitle,
    formRules,
    radioOptions,
    appIdOptions,
    balancerOptions,
    discoveryOptions,
    handleCancel,
    handleSubmit,
  };
}
