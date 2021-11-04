import type { App, Directive, DirectiveBinding } from 'vue';
import { useAbpStoreWithOut } from '/@/store/modules/abp';

function isFeature(el: Element, binding: any) {
  const abpStore = useAbpStoreWithOut();
  const { features } = abpStore.getApplication;
  const definedFeatures = features.values;
  if (!definedFeatures) return;

  const value = binding.value;
  if (!value) return;
  console.log(value, definedFeatures);
  if (definedFeatures[value] === 'false') {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isFeature(el, binding);
};

const featureDirective: Directive = {
  mounted,
};

export function setupFeatureDirective(app: App) {
  app.directive('feature', featureDirective);
}

export default featureDirective;
