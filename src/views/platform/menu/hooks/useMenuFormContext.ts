import type { Ref } from 'vue';
import type { TabFormSchema, FormActionType } from '/@/components/Form/src/types/form';

import { unref, computed, watch, h } from 'vue';
import { Checkbox } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { cloneDeep } from 'lodash-es';

import { get as getLayout, getAll as getAllLayout } from '/@/api/platform/layout';
import { get as getData } from '/@/api/platform/dataDic';
import { getAll as getAllMenu, create, update } from '/@/api/platform/menu';
import { DataItem, ValueType } from '/@/api/platform/model/dataItemModel';

import { listToTree } from '/@/utils/helper/treeHelper';
import { Menu, UpdateMenu, CreateMenu } from '/@/api/platform/model/menuModel';

interface UseMenuFormContext {
  menuModel: Ref<Menu>;
  formElRef: Ref<Nullable<FormActionType>>;
}

export function useMenuFormContext({ menuModel, formElRef }: UseMenuFormContext) {
  const { t } = useI18n();

  function getMetaFormSchemas(meta: DataItem[]): TabFormSchema[] {
    return meta.map((item) => {
      const schema: TabFormSchema = {
        tab: t('AppPlatform.DisplayName:Meta'),
        field: 'meta.'.concat(item.name),
        label: item.displayName,
        colProps: { span: 24 },
        required: !item.allowBeNull,
        component: 'Input',
      };
      switch (item.valueType) {
        case ValueType.Boolean:
          schema.component = 'Checkbox';
          let checked = item.defaultValue === 'true';
          schema.render = ({ model, field }) => {
            if (model[field]) {
              checked = model[field] === 'true';
            }
            return h(Checkbox, {
              checked: checked,
              value: item.displayName,
              onChange: (e: ChangeEvent) => {
                model[field] = e.target.checked.toString();
              },
            });
          };
          break;
        case ValueType.Date:
          schema.component = 'DatePicker';
          if (item.defaultValue) {
            schema.defaultValue = new Date(item.defaultValue);
          }
          break;
        case ValueType.DateTime:
          schema.component = 'TimePicker';
          if (item.defaultValue) {
            schema.defaultValue = new Date(item.defaultValue);
          }
          break;
        case ValueType.Numeic:
          schema.component = 'InputNumber';
          if (item.defaultValue) {
            schema.defaultValue = Number(item.defaultValue);
          }
          break;
        case ValueType.Array:
          schema.component = 'Input';
          schema.componentProps = {
            placeholder: item.description,
          };
          break;
        default:
        case ValueType.String:
        case ValueType.Object:
          if (item.name === 'icon') {
            schema.component = 'IconPicker';
          } else {
            schema.component = 'Input';
            schema.componentProps = {
              placeholder: item.description,
            };
          }
          schema.defaultValue = item.defaultValue;
          break;
      }
      return schema;
    });
  }

  function getBasicFormSchemas(): TabFormSchema[] {
    return [
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'id',
        component: 'Input',
        label: 'id',
        colProps: { span: 24 },
        ifShow: false,
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'layoutId',
        component: 'ApiSelect',
        label: t('AppPlatform.DisplayName:Layout'),
        colProps: { span: 24 },
        required: true,
        componentProps: {
          api: () => getAllLayout(),
          resultField: 'items',
          labelField: 'displayName',
          valueField: 'id',
          onChange(val) {
            appendMenuMetaItem(val);
          },
          onOptionsChange() {
            const menu = unref(menuModel);
            appendMenuMetaItem(menu.layoutId);
          },
        },
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'isPublic',
        component: 'Checkbox',
        label: t('AppPlatform.DisplayName:IsPublic'),
        colProps: { span: 24 },
        renderComponentContent: t('AppPlatform.DisplayName:IsPublic'),
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'parentId',
        label: t('AppPlatform.DisplayName:ParentMenu'),
        component: 'TreeSelect',
        colProps: { span: 24 },
        componentProps: {
          replaceFields: {
            title: 'displayName',
            key: 'id',
            value: 'id',
          },
          getPopupContainer: () => document.body,
        },
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'name',
        component: 'Input',
        label: t('AppPlatform.DisplayName:Name'),
        colProps: { span: 24 },
        required: true,
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'displayName',
        component: 'Input',
        label: t('AppPlatform.DisplayName:DisplayName'),
        colProps: { span: 24 },
        required: true,
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'path',
        component: 'Input',
        label: t('AppPlatform.DisplayName:Path'),
        colProps: { span: 24 },
        required: true,
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'component',
        component: 'Input',
        label: t('AppPlatform.DisplayName:Component'),
        colProps: { span: 24 },
        required: true,
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'redirect',
        component: 'Input',
        label: t('AppPlatform.DisplayName:Redirect'),
        colProps: { span: 24 },
      },
      {
        tab: t('AppPlatform.DisplayName:Basic'),
        field: 'description',
        component: 'InputTextArea',
        label: t('AppPlatform.DisplayName:Description'),
        colProps: { span: 24 },
      },
    ];
  }

  const getFormSchemas = computed((): TabFormSchema[] => {
    return [...getBasicFormSchemas()];
  });

  const formTitle = computed((): string => {
    const menu = unref(menuModel);
    if (menu.id) {
      return t('AppPlatform.Menu:EditByName', [menu.displayName] as Recordable);
    }
    return t('AppPlatform.Menu:AddNew');
  });

  async function appendMenuMetaItem(layoutId: string) {
    if (layoutId) {
      const formEl = unref(formElRef);
      const layout = await getLayout(layoutId);
      const { items } = await getData(layout.dataId);
      const metaSchemas = getMetaFormSchemas(items);

      const schemas = unref(getFormSchemas);
      const oldMetaSchemas = schemas.filter((x) => x.tab === '元数据');
      oldMetaSchemas.forEach((x) => {
        formEl?.removeSchemaByFiled(x.field);
        const index = schemas.findIndex((s) => s.field === x.field);
        if (index) {
          schemas.splice(index, 1);
        }
      });
      metaSchemas.forEach((x) => {
        schemas.push(x);
        formEl?.appendSchemaByField(x, '');
      });
      formEl?.setFieldsValue(unref(menuModel));
    }
  }

  async function warpParentRootMenu(framework?: string) {
    const formEl = unref(formElRef);
    const { items } = await getAllMenu({
      filter: '',
      sorting: 'name',
      framework: framework ?? '',
    });
    const treeData = listToTree(items, { id: 'id', pid: 'parentId' });
    const menu = unref(menuModel);
    formEl?.updateSchema({
      field: 'parentId',
      defaultValue: menu.parentId,
      componentProps: { treeData },
    });
  }

  function handleFormSubmit() {
    const formEl = unref(formElRef);
    return formEl?.validate().then(() => {
      const model = unref(menuModel);
      const input = formEl?.getFieldsValue();
      return model.id
        ? update(model.id, cloneDeep(input) as UpdateMenu)
        : create(cloneDeep(input) as CreateMenu);
    });
  }

  watch(
    () => unref(menuModel),
    (model) => {
      const formEl = unref(formElRef);
      formEl?.resetFields();
      formEl?.setFieldsValue(model);
    },
    { immediate: true }
  );

  return {
    formTitle,
    getFormSchemas,
    handleFormSubmit,
    warpParentRootMenu,
  };
}
