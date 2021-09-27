import type { Ref } from 'vue';

import { watch, ref, unref } from 'vue';
import { message } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { FeatureGroup, Validator } from '/@/api/feature/model/featureModel';
import { get, update } from '/@/api/feature/feature';
import { ReturnInnerMethods } from '/@/components/Modal';

interface UseFeature {
  providerName: Ref<string>;
  providerKey: Ref<string | null>;
  formRel: Ref<any>;
  modalMethods: ReturnInnerMethods;
}

export function useFeature({ providerName, providerKey, formRel, modalMethods }: UseFeature) {
  const { t } = useI18n();
  const featureGroup = ref<{ groups: FeatureGroup[] }>({
    groups: [],
  });
  const featureGroupKey = ref(0);

  watch(
    () => unref(providerKey),
    (key) => {
      if (key !== undefined) {
        const form = unref(formRel);
        form.resetFields();
        onGroupChange(0);
        get({
          providerName: unref(providerName),
          providerKey: key,
        }).then((res) => {
          featureGroup.value.groups = mapFeatures(res.groups);
        });
      }
    }
  );

  function getFeatures(groups: FeatureGroup[]) {
    const features: { name: string; value: string }[] = [];
    groups.forEach((g) => {
      g.features.forEach((f) => {
        if (f.value !== null) {
          features.push({
            name: f.name,
            value: String(f.value),
          });
        }
      });
    });
    return features;
  }

  function mapFeatures(groups: FeatureGroup[]) {
    groups.forEach((g) => {
      g.features.forEach((f) => {
        switch (f.valueType?.validator.name) {
          case 'BOOLEAN':
            f.value = String(f.value).toLocaleLowerCase() === 'true';
            break;
          case 'NUMERIC':
            f.value = Number(f.value);
            break;
        }
      });
    });
    return groups;
  }

  function numericValidator(validator: Validator) {
    return {
      validator: (_, value) => {
        if (value < validator.properties.MinValue || value > validator.properties.MaxValue) {
          return Promise.reject(
            t('AbpFeatureManagement.ThisFieldMustBeBetween{0}And{1}', [
              validator.properties.MinValue,
              validator.properties.MaxValue,
            ] as Recordable)
          );
        } else {
          return Promise.resolve();
        }
      },
      type: 'number',
      trigger: 'change',
    };
  }

  function validator(validator: Validator) {
    const featureRules: { [key: string]: any }[] = new Array<{ [key: string]: any }>();
    if (validator.name === 'NUMERIC' && validator.properties) {
      featureRules.push({
        type: 'number',
        required: true,
        trigger: 'blur',
      });
      featureRules.push(numericValidator(validator));
    } else if (validator.name === 'STRING' && validator.properties) {
      if (
        validator.properties.AllowNull &&
        validator.properties.AllowNull.toLowerCase() === 'true'
      ) {
        const ruleRequired: { [key: string]: any } = {};
        ruleRequired.required = true;
        ruleRequired.trigger = 'blur';
        ruleRequired.messahe = t('AbpFeatureManagement.ThisFieldIsRequired');
        featureRules.push(ruleRequired);
      }
      const ruleString: { [key: string]: any } = {};
      ruleString.min = validator.properties.MinLength;
      ruleString.max = validator.properties.MaxLength;
      ruleString.trigger = 'blur';
      ruleString.message = t('AbpFeatureManagement.ThisFieldMustBeBetween{0}And{1}', [
        validator.properties.MinValue,
        validator.properties.MaxValue,
      ] as Recordable);
      featureRules.push(ruleString);
    }
    return featureRules;
  }

  function onGroupChange(activeKey) {
    featureGroupKey.value = activeKey;
  }

  function handleSubmit() {
    const form = unref(formRel);
    form.validate().then(() => {
      update(
        {
          providerName: unref(providerName),
          providerKey: unref(providerKey),
        },
        {
          features: getFeatures(unref(featureGroup).groups),
        }
      ).then(() => {
        modalMethods.closeModal();
        message.success(t('AbpUi.Successful'));
      });
    });
  }

  return {
    featureGroup,
    featureGroupKey,
    validator,
    handleSubmit,
    onGroupChange,
  };
}
