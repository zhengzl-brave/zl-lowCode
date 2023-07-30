import { isNotNull } from "@/utils";
import { beautifierOpts } from "@/utils/beautifierLoader";
import { getVue2JS } from "@/utils/tools/vue2js-generator";
import { genVue3JS } from "@/utils/tools/vue3js-generator";
import { html_beautify, js_beautify, css_beautify } from 'js-beautify'

export function buildClassAttr(ctn: any, defaultClass: any) {
  const cop = ctn.options;
  let gridClassArray = [];
  !!defaultClass && gridClassArray.push(defaultClass);
  !!cop.customClass &&
    cop.customClass.length > 0 &&
    gridClassArray.push(cop.customClass.join(" "));
  return gridClassArray.length > 0 ? `class="${gridClassArray.join(" ")}"` : "";
}

const containerTemplates: any = {
  //容器组件属性
  grid: (ctn: any, formConfig: any) => {
    const gridClassAttr = buildClassAttr(ctn, null);
    const gridTemplate = `<el-row ${gridClassAttr}>
  ${ctn.cols
    .map((col: any) => {
      const colOpt = col.options;
      const spanAttr = !!colOpt.responsive ? "" : `:span="${colOpt.span}"`;
      const mdAttr = !colOpt.responsive ? "" : `:md="${colOpt.md}"`;
      const smAttr = !colOpt.responsive ? "" : `:sm="${colOpt.sm}"`;
      const xsAttr = !colOpt.responsive ? "" : `:xs="${colOpt.xs}"`;
      const offsetAttr = !!colOpt.offset ? `:offset="${colOpt.offset}"` : "";
      const pushAttr = !!colOpt.push ? `:push="${colOpt.push}"` : "";
      const pullAttr = !!colOpt.pull ? `:pull="${colOpt.pull}"` : "";
      const colClassAttr = buildClassAttr(col, "grid-cell");
      return `<el-col ${spanAttr} ${mdAttr} ${smAttr} ${xsAttr} ${offsetAttr} ${pushAttr} ${pullAttr} ${colClassAttr}>
      ${col.widgetList
        .map((cw: any) => {
          if (cw.category === "container") {
            return buildContainerWidget(cw, formConfig);
          } else {
            return buildFieldWidget(cw, formConfig);
          }
        })
        .join("")}
      </el-col>`;
    })
    .join("")}
  </el-row>`;

    return gridTemplate;
  },

  table: (ctn: any, formConfig: any) => {
    const tableClassAttr = buildClassAttr(ctn, "table-layout");
    const tableTemplate = `<div class="table-container">
    <table ${tableClassAttr}><tbody>
    ${ctn.rows
      .map((tr: any) => {
        return `<tr>${tr.cols
          .filter((td: any) => !td.merged)
          .map((td: any) => {
            const tdOpt = td.options;
            const tdClassAttr = buildClassAttr(td, "table-cell");
            const colspanAttr =
              !isNaN(tdOpt.colspan) && tdOpt.colspan !== 1
                ? `colspan="${tdOpt.colspan}"`
                : "";
            const rowspanAttr =
              !isNaN(tdOpt.rowspan) && tdOpt.rowspan !== 1
                ? `rowspan="${tdOpt.rowspan}"`
                : "";

            let tdStyleArray = [];
            !!tdOpt.cellWidth &&
              tdStyleArray.push("width: " + tdOpt.cellWidth + " !important");
            !!tdOpt.cellHeight &&
              tdStyleArray.push("height: " + tdOpt.cellHeight + " !important");
            let tdStyleAttr =
              tdStyleArray.length > 0
                ? `style="${tdStyleArray.join(";")}"`
                : "";

            return `<td ${tdClassAttr} ${colspanAttr} ${rowspanAttr} ${tdStyleAttr}>${td.widgetList
              .map((tw: any) => {
                if (tw.category === "container") {
                  return buildContainerWidget(tw, formConfig);
                } else {
                  return buildFieldWidget(tw, formConfig);
                }
              })
              .join("")}
                      </td>`;
          })
          .join("")}</tr>`;
      })
      .join("")}
    </tbody></table>
  </div>`;
    return tableTemplate;
  },

  tab: (ctn: any, formConfig: any) => {
    const tabClassAttr = buildClassAttr(ctn, null);
    const vModel =
      ctn.tabs && ctn.tabs.length > 0
        ? `v-model="${ctn.options.name}ActiveTab"`
        : "";
    const tabTemplate = `<div class="tab-container">
    <el-tabs ${vModel} type="${ctn.displayType}" ${tabClassAttr}>
      ${ctn.tabs
        .map((tab: any) => {
          const tabOpt = tab.options;
          const disabledAttr = tabOpt.disabled === true ? `disabled` : "";
          return `<el-tab-pane name="${tabOpt.name}" label="${
            tabOpt.label
          }" ${disabledAttr}>
          ${tab.widgetList
            .map((tw: any) => {
              if (tw.category === "container") {
                return buildContainerWidget(tw, formConfig);
              } else {
                return buildFieldWidget(tw, formConfig);
              }
            })
            .join("")}</el-tab-pane>`;
        })
        .join("")}
    </el-tabs>
  </div>`;

    return tabTemplate;
  },
};

function buildRadioChildren(widget: any) {
  let wop = widget.options;
  const childTag = !!wop.buttonStyle ? "el-radio-button" : "el-radio";
  const borderAttr = !!wop.border ? `border` : "";
  const styleAttr = `style="{display: ${wop.displayStyle}}"`;
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.value"
            :disabled="item.disabled" ${borderAttr} ${styleAttr}>{{item.label}}</${childTag}>`;
}

function buildCheckboxChildren(widget: any) {
  let wop = widget.options;
  const childTag = !!wop.buttonStyle ? "el-checkbox-button" : "el-checkbox";
  const borderAttr = !!wop.border ? `border` : "";
  const styleAttr = `style="{display: ${wop.displayStyle}}"`;
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.value"
            :disabled="item.disabled" ${borderAttr} ${styleAttr}>{{item.label}}</${childTag}>`;
}

function buildSelectChildren(widget: any) {
  let wop = widget.options;
  const childTag = "el-option";
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></${childTag}>`;
}

const elTemplates: any = {
  //字段组件属性
  input: (widget: any, formConfig: any) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      showPassword,
      placeholder,
      clearable,
      minlength,
      maxlength,
      showWordLimit,
      prefixIcon,
      suffixIcon,
      appendButtonChild,
    } = getElAttrs(widget, formConfig);
    return `<el-input ${vModel} ${readonly} ${disabled} ${size} ${type} ${showPassword} ${placeholder} ${clearable}
              ${minlength} ${maxlength} ${showWordLimit} ${prefixIcon} ${suffixIcon}>${appendButtonChild}</el-input>`;
  },

  textarea: (widget: any, formConfig: any) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      showPassword,
      placeholder,
      rows,
      clearable,
      minlength,
      maxlength,
      showWordLimit,
    } = getElAttrs(widget, formConfig);
    return `<el-input type="textarea" ${vModel} ${readonly} ${disabled} ${size} ${type} ${showPassword} ${placeholder}
              ${rows} ${clearable} ${minlength} ${maxlength} ${showWordLimit}></el-input>`;
  },

  number: (widget: any, formConfig: any) => {
    const {
      vModel,
      disabled,
      size,
      type,
      showPassword,
      placeholder,
      controlsPosition,
      min,
      max,
      precision,
      step,
    } = getElAttrs(widget, formConfig);
    return `<el-input-number ${vModel} class="full-width-input" ${disabled} ${size} ${type} ${showPassword}
              ${placeholder} ${controlsPosition} ${min} ${max} ${precision} ${step}></el-input-number>`;
  },

  radio: (widget: any, formConfig: any) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig);
    const radioOptions = buildRadioChildren(widget);
    return `<el-radio-group ${vModel} ${disabled} ${size}>${radioOptions}</el-radio-group>`;
  },

  checkbox: (widget: any, formConfig: any) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig);
    const checkboxOptions = buildCheckboxChildren(widget);
    return `<el-checkbox-group ${vModel} ${disabled} ${size}>${checkboxOptions}</el-checkbox-group>`;
  },

  select: (widget: any, formConfig: any) => {
    const {
      vModel,
      disabled,
      size,
      clearable,
      filterable,
      allowCreate,
      defaultFirstOption,
      automaticDropdown,
      multiple,
      multipleLimit,
      remote,
      placeholder,
    } = getElAttrs(widget, formConfig);
    const selectOptions = buildSelectChildren(widget);
    return `<el-select ${vModel} class="full-width-input" ${disabled} ${size} ${clearable} ${filterable}
              ${allowCreate} ${defaultFirstOption} ${automaticDropdown} ${multiple} ${multipleLimit} ${placeholder}
              ${remote}>${selectOptions}</el-select>`;
  },

  time: (widget: any, formConfig: any) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      placeholder,
      clearable,
      format,
      editable,
    } = getElAttrs(widget, formConfig);
    return `<el-time-picker ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
              value-format="HH:mm:ss" ${placeholder} ${clearable} ${editable}></el-time-picker>`;
  },

  "time-range": (widget: any, formConfig: any) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      startPlaceholder,
      endPlaceholder,
      clearable,
      format,
      editable,
    } = getElAttrs(widget, formConfig);
    return `<el-time-picker is-range ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
              value-format="HH:mm:ss" ${startPlaceholder} ${endPlaceholder} ${clearable} ${editable}></el-time-picker>`;
  },

  date: (widget: any, formConfig: any) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      placeholder,
      clearable,
      format,
      valueFormat,
      editable,
    } = getElAttrs(widget, formConfig);
    return `<el-date-picker ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
                ${valueFormat} ${placeholder} ${clearable} ${editable}></el-date-picker>`;
  },

  "date-range": (widget: any, formConfig: any) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      startPlaceholder,
      endPlaceholder,
      clearable,
      format,
      valueFormat,
      editable,
    } = getElAttrs(widget, formConfig);
    return `<el-date-picker is-range ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
              ${valueFormat} ${startPlaceholder} ${endPlaceholder} ${clearable} ${editable}></el-date-picker>`;
  },

  switch: (widget: any, formConfig: any) => {
    const {
      vModel,
      disabled,
      activeText,
      inactiveText,
      activeColor,
      inactiveColor,
      switchWidth,
    } = getElAttrs(widget, formConfig);
    return `<el-switch ${vModel} ${disabled} ${activeText} ${inactiveText} ${activeColor} ${inactiveColor}
              ${switchWidth}></el-switch>`;
  },

  rate: (widget: any, formConfig: any) => {
    const {
      vModel,
      disabled,
      rateMax,
      lowThreshold,
      highThreshold,
      allowHalf,
      showText,
      showScore,
    } = getElAttrs(widget, formConfig);
    return `<el-rate ${vModel} ${disabled} ${rateMax} ${lowThreshold} ${highThreshold} ${allowHalf}
              ${showText} ${showScore}></el-rate>`;
  },

  color: (widget: any, formConfig: any) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig);
    return `<el-color-picker ${vModel} ${disabled} ${size}></el-color-picker>`;
  },

  slider: (widget: any, formConfig: any) => {
    const {
      vModel,
      disabled,
      sliderMin,
      sliderMax,
      sliderStep,
      sliderRange,
      sliderVertical,
    } = getElAttrs(widget, formConfig);
    return `<el-slider ${vModel} ${disabled} ${sliderMin} ${sliderMax} ${sliderStep} ${sliderRange}
              ${sliderVertical}></el-slider>`;
  },

  "picture-upload": (widget: any, formConfig: any) => {
    const {
      disabled,
      uploadAction,
      withCredentials,
      multipleSelect,
      showFileList,
      limit,
      uploadTipSlotChild,
      pictureUploadIconChild,
    } = getElAttrs(widget, formConfig);
    let wop = widget.options;
    return `<el-upload :file-list="${wop.name}FileList" :headers="${wop.name}UploadHeaders" :data="${wop.name}UploadData" 
              ${disabled} ${uploadAction} list-type="picture-card" ${withCredentials} ${multipleSelect} ${showFileList} 
              ${limit}>${uploadTipSlotChild} ${pictureUploadIconChild}</el-upload>`;
  },

  "file-upload": (widget: any, formConfig: any) => {
    const {
      disabled,
      uploadAction,
      withCredentials,
      multipleSelect,
      showFileList,
      limit,
      uploadTipSlotChild,
      fileUploadIconChild,
    } = getElAttrs(widget, formConfig);
    let wop = widget.options;
    return `<el-upload :file-list="${wop.name}FileList" :headers="${wop.name}UploadHeaders" :data="${wop.name}UploadData" 
              ${disabled} ${uploadAction} list-type="picture-card" ${withCredentials} ${multipleSelect} ${showFileList} 
              ${limit}>${uploadTipSlotChild} ${fileUploadIconChild}</el-upload>`;
  },

  "rich-editor": (widget: any, formConfig: any) => {
    const { vModel, disabled, placeholder } = getElAttrs(widget, formConfig);
    return `<vue-editor ${vModel} ${disabled} ${placeholder}></vue-editor>`;
  },

  cascader: (widget: any, formConfig: any) => {
    const { vModel, disabled, size, clearable, filterable, placeholder } =
      getElAttrs(widget, formConfig);
    let wop = widget.options;
    const optionsAttr = `:options="${wop.name}Options"`;
    return `<el-cascader ${vModel} class="full-width-input" ${optionsAttr} ${disabled} ${size} ${clearable}
              ${filterable} ${placeholder}></el-cascader>`;
  },

  "static-text": (widget: any) => {
    return `<div>${widget.options.textContent}</div>`;
  },

  "html-text": (widget: any) => {
    return `<div v-html="${widget.options.htmlContent}"></div>`;
  },

  button: (widget: any, formConfig: any) => {
    const {
      buttonType,
      buttonPlain,
      buttonRound,
      buttonCircle,
      buttonIcon,
      disabled,
    } = getElAttrs(widget, formConfig);
    return `<el-button ${buttonType} ${buttonPlain} ${buttonRound} ${buttonCircle} ${buttonIcon}
              ${disabled}>${widget.options.label}</el-button>`;
  },

  divider: (widget: any, formConfig: any) => {
    const { contentPosition } = getElAttrs(widget, formConfig);
    return `<el-divider direction="horizontal" ${contentPosition}></el-divider>`;
  },
};

export function buildContainerWidget(widget: any, formConfig: any) {
  return containerTemplates[widget.type]
    ? containerTemplates[widget.type](widget, formConfig)
    : null;
}

export function buildFieldWidget(widget: any, formConfig: any) {
  let wop = widget.options;
  const label = wop.labelHidden ? "" : wop.label;
  const labelWidthAttr = wop.labelHidden
    ? `label-width="0"`
    : !!wop.labelWidth
    ? `label-width="${wop.labelWidth}px"`
    : "";
  const labelTooltipAttr = wop.labelTooltip
    ? `title="${wop.labelTooltip}"`
    : "";
  const propAttr = `prop="${wop.name}"`;

  let classArray = [];
  !!wop.required && classArray.push("required");
  !!wop.customClass &&
    wop.customClass.length > 0 &&
    classArray.push(wop.customClass.join(" "));
  if (!!wop.labelAlign) {
    wop.labelAlign !== "label-left-align" && classArray.push(wop.labelAlign);
  } else if (!!widget.formItemFlag) {
    //classArray.push(formConfig.labelAlign || 'label-left-align')
    formConfig.labelAlign !== "label-left-align" &&
      classArray.push(formConfig.labelAlign);
  }
  if (!widget.formItemFlag) {
    classArray.push("static-content-item");
  }
  const classAttr =
    classArray.length > 0 ? `class="${classArray.join(" ")}"` : "";

  let customLabelDom = `<template #label><span class="custom-label">${
    wop.labelIconPosition === "front"
      ? !!wop.labelTooltip
        ? `<el-tooltip content="${wop.labelTooltip}" effect="light"><i class="${wop.labelIconClass}"></i></el-tooltip>${wop.label}`
        : `<i class="${wop.labelIconClass}"></i>${wop.label}`
      : !!wop.labelTooltip
      ? `${wop.label}<el-tooltip content="${wop.labelTooltip}" effect="light"><i class="${wop.labelIconClass}"></i></el-tooltip>`
      : `${wop.label}<i class="${wop.labelIconClass}"></i>`
  }
  </span></template>`;
  !wop.labelIconClass && (customLabelDom = "");

  const fwDom = elTemplates[widget.type]
    ? elTemplates[widget.type](widget, formConfig)
    : null;
  const isFormItem = !!widget.formItemFlag;
  const vShowAttr = !!wop.hidden ? `v-show="false"` : "";
  return isFormItem
    ? `<el-form-item label="${label}" ${labelWidthAttr} ${labelTooltipAttr} ${propAttr} ${classAttr}>
    ${customLabelDom}
    ${fwDom}
  </el-form-item>`
    : `<div ${classAttr} ${vShowAttr}>${fwDom}</div>`;
}

function getElAttrs(widget: any, formConfig: any) {
  //获取El组件属性
  let wop = widget.options;
  return {
    vModel: `v-model="${formConfig.modelName}.${wop.name}"`,
    readonly: wop.readonly ? `readonly="true"` : "",
    disabled: wop.disabled ? `:disabled="true"` : "",
    size: !!wop.size ? `size="${wop.size}"` : "",
    type: !!wop.type
      ? `type="${wop.type === "number" ? "text" : wop.type}"`
      : "",
    showPassword: !!wop.showPassword
      ? `:show-password="${wop.showPassword}"`
      : "",
    placeholder: !!wop.placeholder ? `placeholder="${wop.placeholder}"` : "",
    rows: isNotNull(wop.rows) && !isNaN(wop.rows) ? `rows="${wop.rows}"` : "",
    clearable: !!wop.clearable ? "clearable" : "",
    minlength:
      isNotNull(wop.minLength) && !isNaN(wop.minLength)
        ? `:minlength="${wop.minLength}"`
        : "",
    maxlength:
      isNotNull(wop.maxLength) && !isNaN(wop.maxLength)
        ? `:maxlength="${wop.maxLength}"`
        : "",
    showWordLimit: !!wop.showWordLimit ? `:show-word-limit="true"` : "",
    prefixIcon: !!wop.prefixIcon ? `prefix-icon="${wop.prefixIcon}"` : "",
    suffixIcon: !!wop.suffixIcon ? `suffix-icon="${wop.suffixIcon}"` : "",
    controlsPosition:
      wop.controlsPosition === "right" ? `controls-position="right"` : "",
    min: isNotNull(wop.min) && !isNaN(wop.min) ? `:min="${wop.min}"` : "",
    max: isNotNull(wop.max) && !isNaN(wop.max) ? `:max="${wop.max}"` : "",
    precision:
      isNotNull(wop.precision) && !isNaN(wop.precision)
        ? `:precision="${wop.precision}"`
        : "",
    step: isNotNull(wop.step) && !isNaN(wop.step) ? `:step="${wop.step}"` : "",
    filterable: !!wop.filterable ? `filterable` : "",
    allowCreate: !!wop.allowCreate ? `allow-create` : "",
    defaultFirstOption:
      !!wop.filterable && !!wop.allowCreate ? `default-first-option` : "",
    multiple: !!wop.multiple ? `multiple` : "",
    multipleLimit:
      !isNaN(wop.multipleLimit) && wop.multipleLimit > 0
        ? `:multiple-limit="${wop.multipleLimit}"`
        : "",
    automaticDropdown: !!wop.automaticDropdown ? `automatic-dropdown` : "",
    remote: !!wop.remote ? `remote` : "",
    format: !!wop.format ? `format="${wop.format}"` : "",
    valueFormat: !!wop.valueFormat ? `value-format="${wop.valueFormat}"` : "",
    editable: !!wop.editable ? `:editable="${wop.editable}"` : "",
    startPlaceholder: !!wop.startPlaceholder
      ? `start-placeholder="${wop.startPlaceholder}"`
      : "",
    endPlaceholder: !!wop.endPlaceholder
      ? `end-placeholder="${wop.endPlaceholder}"`
      : "",

    activeText: !!wop.activeText ? `active-text="${wop.activeText}"` : "",
    inactiveText: !!wop.inactiveText
      ? `inactive-text="${wop.inactiveText}"`
      : "",
    activeColor: !!wop.activeColor ? `active-color="${wop.activeColor}"` : "",
    inactiveColor: !!wop.inactiveColor
      ? `inactive-color="${wop.inactiveColor}"`
      : "",
    switchWidth:
      !isNaN(wop.switchWidth) && wop.switchWidth !== 40
        ? `:width="${wop.switchWidth}"`
        : "",

    rateMax: !isNaN(wop.max) && wop.max !== 5 ? `:max="${wop.max}"` : "",
    lowThreshold:
      !isNaN(wop.lowThreshold) && wop.lowThreshold !== 2
        ? `:low-threshold="${wop.lowThreshold}"`
        : "",
    highThreshold:
      !isNaN(wop.highThreshold) && wop.highThreshold !== 4
        ? `:high-threshold="${wop.highThreshold}"`
        : "",
    allowHalf: !!wop.allowHalf ? `allow-half` : "",
    showText: !!wop.showText ? `show-text` : "",
    showScore: !!wop.showScore ? `show-score` : "",

    sliderMin: !isNaN(wop.min) && wop.min !== 0 ? `:min="${wop.min}"` : "",
    sliderMax: !isNaN(wop.max) && wop.max !== 100 ? `:max="${wop.max}"` : "",
    sliderStep: !isNaN(wop.step) && wop.step !== 1 ? `:step="${wop.step}"` : "",
    sliderRange: !!wop.range ? `range` : "",
    sliderVertical: !!wop.vertical ? `vertical` : "",

    uploadAction: !!wop.uploadURL ? `action="${wop.uploadURL}"` : "",
    withCredentials: !!wop.withCredentials ? `with-credentials` : "",
    multipleSelect: !!wop.multipleSelect ? `multiple` : "",
    showFileList: !!wop.showFileList ? `show-file-list` : "",
    limit: !isNaN(wop.limit) ? `:limit="${wop.limit}"` : "",
    uploadTipSlotChild: !!wop.uploadTip
      ? `<template #tip><div class="el-upload__tip">${wop.uploadTip}</div></template>`
      : "",
    pictureUploadIconChild: `<template #default><i class="el-icon-plus"></i></template>`,
    fileUploadIconChild: `<template #default><i class="el-icon-plus"></i></template>`,

    buttonType: !!wop.type ? `type="${wop.type}"` : "",
    buttonPlain: !!wop.plain ? `plain` : "",
    buttonRound: !!wop.round ? `round` : "",
    buttonCircle: !!wop.circle ? `circle` : "",
    buttonIcon: !!wop.icon ? `icon="${wop.icon}"` : "",

    contentPosition:
      !!wop.contentPosition && wop.contentPosition !== "center"
        ? `content-position="${wop.contentPosition}"`
        : "",

    appendButtonChild: !!wop.appendButton
      ? `<template #append><el-button class="${wop.buttonIcon}" ${
          !!wop.appendButtonDisabled ? "disabled" : ""
        }></el-button></template>`
      : "",
  };
}

function genTemplate(formConfig: any, widgetList: any, vue3Flag = false) {
  const submitAttr = !!vue3Flag ? `@submit.prevent` : `@submit.native.prevent`;
  let childrenList: any = [];
  widgetList.forEach((wgt: any) => {
    if (wgt.category === "container") {
      childrenList.push(buildContainerWidget(wgt, formConfig));
    } else {
      childrenList.push(buildFieldWidget(wgt, formConfig));
    }
  });

  const formTemplate = `  <el-form :model="${formConfig.modelName}" ref="${
    formConfig.refName
  }" :rules="${formConfig.rulesName}"
    label-position="${formConfig.labelPosition}" label-width="${
    formConfig.labelWidth
  }px" size="${formConfig.size || "default"}"
    ${submitAttr}>
  ${!!childrenList ? childrenList.join("\n") : ""}
  </el-form>`;

  return formTemplate;
}

const genGlobalCSS = function (formConfig: any) {
  const globalCssTemplate = `  .el-input-number.full-width-input, .el-cascader.full-width-input {
      width: 100% !important;
    }
    
    .el-form-item--medium {
      .el-radio {
        line-height: 36px !important;
      }
    
      .el-rate{
        margin-top: 8px;
      }
    }
  
    .el-form-item--small {
      .el-radio {
        line-height: 32px !important;
      }
    
      .el-rate{
        margin-top: 6px;
      }
    }
  
    .el-form-item--mini {
      .el-radio {
        line-height: 28px !important;
      }
    
      .el-rate{
        margin-top: 4px;
      }
    }
    
    .clear-fix:before, .clear-fix:after {
      display: table;
      content: "";
    }
  
    .clear-fix:after {
      clear: both;
    }
  
    .float-right {
      float: right;
    }
  
  ${formConfig.cssCode}`;

  return globalCssTemplate;
};

const genScopedCSS = function (vue3Flag = false) {
  //const vDeep = !!vue3Flag ? `::v-deep` : `:deep`
  const cssTemplate = `  div.table-container {
      table.table-layout {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        
        td.table-cell {
          display: table-cell;
          height: 36px;
          border: 1px solid #e1e2e3;
        }
      }
    }
    
    div.tab-container {
    }
    
    .label-left-align ${
      !!vue3Flag
        ? `:deep(.el-form-item__label)`
        : `::v-deep .el-form-item__label`
    } {
      text-align: left;
    }
  
    .label-center-align ${
      !!vue3Flag
        ? `:deep(.el-form-item__label)`
        : `::v-deep .el-form-item__label`
    } {
      text-align: center;
    }
  
    .label-right-align ${
      !!vue3Flag
        ? `:deep(.el-form-item__label)`
        : `::v-deep .el-form-item__label`
    } {
      text-align: right;
    }
    
    .custom-label {
    }
    
    .static-content-item {
      min-height: 20px;
      display: flex;
      align-items: center;
  
      ${
        !!vue3Flag
          ? `:deep(.el-divider--horizontal)`
          : `::v-deep .el-divider--horizontal`
      } {
        margin: 0;
      }
    }`;

  return cssTemplate;
};

export const genSFC = function (
  formConfig: any,
  widgetList: any,
  vue3Flag = false
) {
  const html = html_beautify(genTemplate(formConfig, widgetList, vue3Flag), beautifierOpts.html);
  const js = js_beautify(vue3Flag
    ? genVue3JS(formConfig, widgetList)
    : getVue2JS(formConfig, widgetList), beautifierOpts.js);
  const globalCss = css_beautify(genGlobalCSS(formConfig), beautifierOpts.css);
  const scopedCss = css_beautify(genScopedCSS(vue3Flag), beautifierOpts.css);

//   以下代码最好不要格式化它，让它贴着最左
return `
<template>
${html}
</template>

<script>
${js}
</script>

<style lang="scss">
${globalCss}
</style>

<style lang="scss" scoped>
${scopedCss}
</style>`
};
