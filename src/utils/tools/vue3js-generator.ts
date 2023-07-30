import {
  buildDefaultValueListFn,
  buildFieldOptionsFn,
  buildRulesListFn,
} from "@/utils/tools/vue2js-generator";
import { traverseFieldWidgets } from "@/utils";

export const genVue3JS = function (formConfig: any, widgetList: any) {
  let defaultValueList: any = [];
  let rulesList: any = [];
  let fieldOptions: any = [];
  traverseFieldWidgets(widgetList, (widget: any) => {
    buildDefaultValueListFn(defaultValueList)(widget);
    buildRulesListFn(rulesList)(widget);
    buildFieldOptionsFn(fieldOptions)(widget);
  });

  const v3JSTemplate = `  import { defineComponent, toRefs, reactive, getCurrentInstance } from 'vue'
    
    export default defineComponent({
      components: {},
      props: {},
      setup() {
        const state = reactive({
          ${formConfig.modelName}: {
            ${defaultValueList.join("\n")}
          },
          
          ${formConfig.rulesName}: {
            ${rulesList.join("\n")}
          },
    
          ${fieldOptions.join("\n")}
          
        })
      
        const instance = getCurrentInstance()
        
        const submitForm = () => {
          instance.proxy.$refs['vForm'].validate(valid => {
            if (!valid) return
            
            //TODO: 提交表单
          })
        }
        
        const resetForm = () => {
          instance.proxy.$refs['vForm'].resetFields()
        }
        
        return {
          ...toRefs(state),
          submitForm,
          resetForm
        }
      }
    })`;

  return v3JSTemplate;
};
