// 生成随机id
export const generateId = function () {
  return Math.floor(
    Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000
  );
};

export function isNotNull(value: any) {
  return (value !== null) && (value !== undefined);
}


// 对象深拷贝
export const deepClone = function (origin: any) {
  if (origin === undefined) {
    return undefined;
  }
  return JSON.parse(JSON.stringify(origin));
};

/* 浅拷贝对象属性，obj2覆盖obj1 */
export const overwriteObj = function(obj1: any, obj2: any) {  
  Object.keys(obj2).forEach(prop => {
    obj1[prop] = obj2[prop]
  })
}

export function getDefaultFormConfig() {
  return {
    modelName: 'formData',
    refName: 'vForm',
    rulesName: 'rules',
    labelWidth: 80,
    labelPosition: 'left',
    size: '',
    labelAlign: 'label-left-align',
    cssCode: '',
    customClass: [],
    functions: '',  //全局函数
    layoutType: 'PC',
    jsonVersion: 3,

    onFormCreated: '',
    onFormMounted: '',
    onFormDataChange: '',
  }
}

export function buildDefaultFormJson() {
  return {
    widgetList: [],
    formConfig: deepClone( getDefaultFormConfig() )
  }
}

/*加载远程js，加载成功后执行回调函数*/
export const loadRemoteScript = function(srcPath: any, callback: any) {  
  let sid = encodeURIComponent(srcPath)
  let oldScriptEle = document.getElementById(sid)

  if (!oldScriptEle) {
    let s = document.createElement('script') as any
    s.src = srcPath
    s.id = sid
    document.body.appendChild(s)

    s.onload = s.onreadystatechange = function (_: any, isAbort: any) { /* 借鉴自ace.js */
      if (isAbort || !s.readyState || s.readyState === "loaded" || s.readyState === "complete") {
        s = s.onload = s.onreadystatechange = null
        if (!isAbort) {
          callback()
        }
      }
    }
  }
}


export function traverseFieldWidgets(widgetList: any, handler: any, parent = null) {
  if (!widgetList) {
    return
  }

  widgetList.map((w: any) => {
    if (w.formItemFlag) {
      handler(w, parent)
    } else if (w.type === 'grid') {
      w.cols.map((col: any) => {
        traverseFieldWidgets(col.widgetList, handler, w)
      })
    } else if (w.type === 'table') {
      w.rows.map((row: any) => {
        row.cols.map((cell: any) => {
          traverseFieldWidgets(cell.widgetList, handler, w)
        })
      })
    } else if (w.type === 'tab') {
      w.tabs.map((tab: any) => {
        traverseFieldWidgets(tab.widgetList, handler, w)
      })
    } else if (w.type === 'sub-form') {
      traverseFieldWidgets(w.widgetList, handler, w)
    } else if (w.category === 'container') {  //自定义容器
      traverseFieldWidgets(w.widgetList, handler, w)
    }
  })
}

export const addWindowResizeHandler = (handler: any) => {
  let oldHandler: any = window.onresize
  if (typeof window.onresize != 'function') {
    window.onresize = handler
  } else {
    window.onresize = function () {
      oldHandler()
      handler()
    }
  }
}
