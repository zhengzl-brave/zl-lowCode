import { traverseFieldWidgets } from "@/utils";

export function buildDefaultValueListFn(resultList: any) {
  return function (fieldWidget: any) {
    const fop = fieldWidget.options;
    const fd = fop.defaultValue;
    if (fd !== null && fd !== undefined) {
      resultList.push(`${fop.name}: ${JSON.stringify(fd)},`);
    } else {
      resultList.push(`${fop.name}: null,`);
    }
  };
}

export function buildRulesListFn(resultList: any) {
  return function (fieldWidget: any) {
    const fop = fieldWidget.options;
    let fieldRules = [];
    if (!!fop.required) {
      fieldRules.push(`{
          required: true,
          message: '字段值不能为空',
        }`);
    }
    //TODO: 自定义校验函数

    fieldRules.length > 0 &&
      resultList.push(`${fop.name}: [${fieldRules.join(",")}],`);
  };
}

export function buildFieldOptionsFn(resultList: any) {
  return function (fieldWidget: any) {
    const fop = fieldWidget.options;
    const ft = fieldWidget.type;
    if (
      ft === "radio" ||
      ft === "checkbox" ||
      ft === "select" ||
      ft === "cascader"
    ) {
      resultList.push(
        `${fop.name}Options: ${JSON.stringify(fop.optionItems)},`
      );
    }
  };
}


// vue2 script 部分的模板
export const getVue2JS = (formConfig: any, widgetList: any) => {
  let defaultValueList: any = [];
  let rulesList: any = [];
  let fieldOptions: any = [];

  traverseFieldWidgets(widgetList, (widget: any) => {
    buildDefaultValueListFn(defaultValueList)(widget);
    buildRulesListFn(rulesList)(widget);
    buildFieldOptionsFn(fieldOptions)(widget);
  });

  const v2JSTemplate = `  export default {
    components: {},
    props: {},
    data() {
      return {
        ${formConfig.modelName}: {
          ${defaultValueList.join("\n")}
        },
        
        ${formConfig.rulesName}: {
          ${rulesList.join("\n")}
        },
        
        
        ${fieldOptions.join("\n")}
        
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      submitForm() {
        this.$refs['vForm'].validate(valid => {
          if (!valid) return
          
          //TODO: 提交表单
        })
      },
      
      resetForm() {
        this.$refs['vForm'].resetFields()
      }
    }
  }`;
  return v2JSTemplate;
};
